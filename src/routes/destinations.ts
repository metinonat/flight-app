import express from 'express';
import controller from '../controllers/destinationsController';
const router = express.Router();

router.get('/destinations', controller.getDestinations);
router.get('/destinations/:iata', controller.getDestination);

export = router;