import express from "express";

import { register,login,verifyOtp } from "../controllers/authController.js";

const router=express.Router();

router.route('/login').post(login);

router.route('/register').post(register)

router.route('/verify').post(verifyOtp);


export default router;





