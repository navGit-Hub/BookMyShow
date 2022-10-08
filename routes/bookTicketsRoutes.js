import { bookMovieTickets } from "../controllers/bookTicketsController.js";

import verifyToken from '../middleware/verifyToken.js'

import express from 'express';


const router=express.Router();


router.route('/bookMovieTickets').post(verifyToken,bookMovieTickets);


export default router;