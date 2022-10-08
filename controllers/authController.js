import db from "../models/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from 'nodemailer';

import dotenv from 'dotenv';
import { validationResult } from "express-validator";
import emailValidator from 'deep-email-validator';

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


async function  validate_email(email)
{
console.log("Hello");
return emailValidator.validate(email);


}






const register = async (req, res) => {
  const errors=validationResult(req);

  if(!errors.isEmpty())
{  console.log(errors)
         return res.status(400).json({errors:errors.array()})}
  try {




//const {validators:{regex}}=await validate_email(req.body.email)

// if(!regex)
//     throw new Error("The email is not valid!!");
   

    const user = await User.create({
     
      password: bcrypt.hashSync(req.body.password, 8),
      email: req.body.email,
    });
    console.log(user.id);
if(user)
   res.send(user);
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
                     
                  const validOtp=await bcrypt.compareSync(otp,hashedOtp);
                  console.log(validOtp)

                  if (!validOtp){
                      throw new Error("Invalid code passed,check your inbox");
                  }else{

                      await User.update({verified:true},{
                          where:{
                              id:user_id
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
    let user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    const passwordValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password",
      });
    }

   let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 86400,
    });
res.setHeader("Set-Cookie", `jwt=${token};Path=/;HttpOnly`);



// let user_history=await db.purchase_history.findOne({
//   where:{
//     user_id:user.id
//   }
// })

// if(user_history)

// if(user_history.booked_tickets)
//       User.update({superStar:true},{
//       where:{
//         id:user.id
//       }


//       })

    return res.status(200).send({
      id: user.id,
      username: user.user_name,
      email: user.email,
      phone_number: user.phone_number,
      accessToken: token,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
export { register, login,verifyOtp };