import express from 'express';
import controller from '../controllers/flightsController';
import reservation from "../controllers/reservationsController";
import { authentication } from '../middlewares/auth';
const router = express.Router();

router.use("/flights/:id/reserve", authentication);

router.get('/flights', controller.getFlights);
router.get('/flights/:id', controller.getFlight);
router.get('/flights/:id/reserve', reservation.placeReservation);

export = router;