import express from 'express';

import {getMoviesByGenre,getGeneralEventsByOutline,getAllGeneralEvents,getAllMovies} from '../controllers/getDataController.js';


const router=express.Router();

router.route('/getMoviesByGenre').get(getMoviesByGenre);

router.route('/getGeneralEventsByOutline').get(getGeneralEventsByOutline);

router.route('/getAllMovies').get(getAllMovies)

router.route('/getAllGeneralEvents').get(getAllGeneralEvents);

export default router;