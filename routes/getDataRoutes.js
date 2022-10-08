import express from 'express';

import {getMoviesCustom,
    getGeneralEventsCustom,
    getAllGeneralEvents,
    getAllMovies,
getReviews,
getRecommendedMovies,
getAdverts,
getTimings} from '../controllers/getDataController.js';

const router=express.Router();

router.route('/getMoviesCustom').get(getMoviesCustom);

router.route('/getGeneralEventsCustom').get(getGeneralEventsCustom);

router.route('/getAllMovies').get(getAllMovies)

router.route('/getAllGeneralEvents').get(getAllGeneralEvents);

router.route('/getReviews').get(getReviews);

router.route('/getRecommendedMovies').get(getRecommendedMovies)

router.route('/getAdvertisements').get(getAdverts)


router.route('/getTimings').get(getTimings)



export default router;