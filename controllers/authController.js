import db from "../models/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


import dotenv from 'dotenv';


dotenv.config();

const User = db.user;

const register = async (req, res) => {
  try {
    const account = await User.create({
      user_name: req.body.user_name,
      password: bcrypt.hashSync(req.body.password, 8),
      email: req.body.email,
      phone_number: req.body.phone_number,
    });
    if (account) res.send({ message: "User was registered successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
const login = async (req, res) => {
  try {
    let account = await User.findOne({
      where: {
        user_name: req.body.user_name,
      },
    });
    account =
      account ??
      (await User.findOne({
        where: {
          email: req.body.email,
        },
      }));
    account =
      account ??
      (await User.findOne({
        where: {
          phone_number: req.body.phone_number,
        },
      }));
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
    var token = jwt.sign({ id: account.id }, process.env.JWT_SECRET, {
      expiresIn: 86400,
    });
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
export { register, login };