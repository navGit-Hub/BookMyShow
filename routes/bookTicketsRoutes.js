import { bookMovieTickets } from "../controllers/bookTicketsController.js";

import verifyToken from '../middleware/verifyToken.js'



import { makePayment } from "../controllers/paymentController.js";

import { cancelTicket } from "../controllers/cancelTicketController.js";

import express from 'express';

const router=express.Router();

router.route('/bookMovieTickets').post(verifyToken,bookMovieTickets);

router.route('/payment').post(makePayment);

router.route('/cancelTickets').post(cancelTicket);

export default router;