import {buyOrRentMovies} from "../controllers/rentBuyMoviesController.js"

import express from 'express';


const router=express.Router();





router.route('/buyRentMovie').post(buyOrRentMovies);


export default router;
