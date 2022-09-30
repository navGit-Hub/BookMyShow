import express from "express";
import {body,validationResult} from 'express-validator';

import { register,login,verifyOtp } from "../controllers/authController.js";

const router=express.Router();

router.route('/login').post(body('user_name').isLength({min:5}),
body('password').isLength({min:5}),
login);

router.route('/register').post(body('user_name').isLength({min:5}),

body("email").isEmail()
,body('password').isLength({min:5}),
body('phone_number').isLength({min:10}),register)

router.route('/verify').post(verifyOtp);


export default router;