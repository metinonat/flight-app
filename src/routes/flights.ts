import express from 'express';
import controller from '../controllers/flightsController';
const router = express.Router();

router.get('/flights', controller.getFlights);
router.get('/flights/:id', controller.getFlight);

export = router;