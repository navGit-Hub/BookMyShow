import express from 'express';

import {getMovies,getGeneralEvents} from '../controllers/getDataController.js';


const router=express.Router();


router.route('/getMovies').get(getMovies);

router.route('/getGeneralEvents').get(getGeneralEvents);


export default router;