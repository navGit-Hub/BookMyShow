import db  from "../models/index.js";


const User = db.user;


const verifyRegister = async (req, res, next) => {
  try {

    let user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (user) {
      res.status(400).send({
        message: "Failed! This email is already in use!",
      });
      return;
    }

    // user = await User.findOne({
    //   where: {
    //     phone_number: req.body.phone_number,
    //   },
    // });
    // if (user) {
    //   res.status(400).send({
    //     message: "Failed! This phone number is already taken!",
    //   });
    //   return;
    // }

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
export default verifyRegister;