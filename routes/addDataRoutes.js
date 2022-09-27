import express from 'express';

import {addMovie,addGeneralEvent} from '../controllers/addDataController.js';

const router=express.Router();


router.route('/addMovie').post(addMovie);

router.route('/addGeneralEvent').post(addGeneralEvent);


export default router;