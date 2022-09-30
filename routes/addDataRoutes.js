import express from 'express';

import {addMovies,addGeneralEvents} from '../controllers/addDataController.js';

const router=express.Router();


router.route('/addMovies').post(addMovies);

router.route('/addGeneralEvents').post(addGeneralEvents);


export default router;