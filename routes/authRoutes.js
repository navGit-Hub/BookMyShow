import express from "express";
import {body,validationResult} from 'express-validator';

import { register,login,verifyOtp } from "../controllers/authController.js";

import verifyRegister from '../middleware/verifyRegister.js'

const router=express.Router();

router.route('/login').post(body("email").isEmail(),body('password').isLength({min:5}),
login);

router.route('/register').post(
body("email").isEmail()
,body('password').isLength({min:5}),verifyRegister,register)

router.route('/verify').post(verifyOtp);


export default router;