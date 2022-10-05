import db from "../models/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from 'nodemailer';

import dotenv from 'dotenv';
import { validationResult } from "express-validator";


dotenv.config();

const User = db.user;
const Verify=db.verify;

const transporter=nodemailer.createTransport(
{
service:"Gmail",
  auth:{
    user:"naveenmuthu05@gmail.com",
    pass:"atqnkbyqaghpcgrc",
  }}
)
const register = async (req, res) => {
  const errors=validationResult(req);
  if(!errors.isEmpty())
         return res.status(400).json({errors:errors.array()})
  try {

        const critic=req.body.isCritic || false;
        const location=req.body.location || "Chennai";


console.log(req.body)


    const account = await User.create({
      user_name: req.body.user_name,
      password: bcrypt.hashSync(req.body.password, 8),
      email: req.body.email,
      isCritic:critic,
      location:location,
      phone_number: req.body.phone_number,
      profile_picture:'Default.jpeg',
      verified:false
    });
    console.log(account.id);
if(account)
   res.send(account);
    //sendOtp(account,res);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const sendOtp=async ({id,email},res)=>{

try {

const otp=`${Math.floor(Math.random()*999999)+10000}`;

console.log(`The otp is ${otp}`);

const mailOptions={
from:"naveenmuthu05@gmail.com",
to:email,
subject:"Verify your email",
html:`<p>Your OTP <b>${otp}</b> Enter the OTP to verify user</p>`
}
console.log(id)

const newVerify=await Verify.create({
  user_id:id,
  otp:bcrypt.hashSync(otp,8),
  created_at:Date.now(),
  expires_at:Date.now()+3600000,
})


transporter.sendMail(mailOptions,(error,info)=>{
  if(error)
  { 
    console.log("Failed to send Mail!!")
    
  }

  console.log(`Message ${info.messageId} was sent successfully  ${info.response}`)
})


console.log("sending mail.....")

res.json({
status:"Pending",
message:"Verification otp email sent",
data:{
  userId:id,
  email,
}
}) 
} catch (error) {
  
    res.json({
      status:"Failed",
      message:error.message
    })
}
}

const verifyOtp= async(req,res)=>{
  try {
      console.log(req.body)
      const{otp,user_id}=req.body;

      // checking for req data
      if (!otp || !user_id){
          throw Error("OTP details unavailable")
      } else{
          console.log(otp)
          // getting otp
          const recordOtp= await Verify.findOne({
            where: {
              user_id:user_id,
            },
          });
          console.log(recordOtp.otp)

          if (!recordOtp){
              throw new Error(
                  "OTP Authentication Failed!!"
              );
          }else{
              // checking record
              const {expires_at}=recordOtp;
              console.log(expires_at)
              const hashedOtp=recordOtp.otp;

              if(expires_at<Date.now()){
                  await Verify.destroy({
                      where: { user_id:user_id }
                      });
                  throw new Error ("Code has expired,Please request again");
              }else{
                     console.log("Hi")
                  const validOtp=await bcrypt.compareSync(otp,hashedOtp);
                  console.log(validOtp)

                  if (!validOtp){
                      throw new Error("Invalid code passed,check your inbox");
                  }else{

                      await User.update({verified:true},{
                          where:{
                              user_id
                          }
                      });

                      await Verify.destroy({
                          where:{
                              user_id
                          }
                      });

                      res.json({
                          status:"Verified",
                          message:"User email verified successfully.",
                      })
                  
                  }
              }
          
          }
      }
  } catch (error) {
      res.json({
          status:"Failed",
          message:error.message,

      });
  }
}
const login = async (req, res) => {
  
  const errors=validationResult(req);
  if(!errors.isEmpty())
         return res.status(400).json({errors:errors.array()})
  try {
    let account = await User.findOne({
      where: {
        user_name: req.body.user_name,
      },
    });

    const passwordValid = bcrypt.compareSync(
      req.body.password,
      account.password
    );
    if (!passwordValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password",
      });
    }

   let token = jwt.sign({ id: account.id }, process.env.JWT_SECRET, {
      expiresIn: 86400,
    });
res.setHeader("Set-Cookie", `jwt=${token};Path=/;HttpOnly`);


    return res.status(200).send({
      id: account.id,
      username: account.user_name,
      email: account.email,
      phone_number: account.phone_number,
      accessToken: token,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
export { register, login,verifyOtp };