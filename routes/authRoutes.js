import express from "express";
import {body,validationResult} from 'express-validator';

import { register,login,verifyOtp,forgotPassword,updatePassword} from "../controllers/authController.js";

import verifyRegister from '../middleware/verifyRegister.js'
import verifyToken from "../middleware/verifyToken.js";

import {checkSuperUser} from "../middleware/checkSuperUser.js";

import {checkRentedMovies} from '../middleware/checkRentedMovies.js'

const router=express.Router();

router.route('/login').post(body("email").isEmail(),body('password').isLength({min:5}),
checkSuperUser,login);

router.route('/register').post(
body("email").isEmail()
,body('password').isLength({min:5}),verifyRegister,register)

router.route('/verify').post(verifyOtp);



router.route('/forgotPassword').post(body("email").isEmail(),verifyToken,forgotPassword)

router.route('/updatePassword').post(body("email").isEmail(),body('password').isLength({min:5}),
verifyToken,
updatePassword);







export default router;