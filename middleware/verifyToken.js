// import  db  from "../models/index.js";

// const User = db.user;

// const verifyUser = async (req, res, next) => {
//   try {
//     let user = await User.findOne({
//       where: {
//         user_id: req.body.user_id,
//       },
//     });
//     next();
//   } catch (err) {
//     res.status(500).send({ message: err.message });
//   }
// };
// export default verifyUser;


import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';


dotenv.config();

const verifyToken = (req, res, next) => {
  let token = req.cookies.jwt || req.headers["x-access-token"];
  // console.log(req.cookies.jwt);
//console.log(token)



  if (!token) {
    return res.status(400).send({
      message: "No token is provided",
    });
  }
  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized access",
        });
      }
      req.userId = decoded.id;
      next();
    })
  
    
  } catch (err) {
    res.status(400).send("Invalid token");
  }
};

export default verifyToken;
