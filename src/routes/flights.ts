import express from 'express';
import controller from '../controllers/flightsController';
import reservation from "../controllers/reservationsController";
import { authentication } from '../middlewares/auth';
const router = express.Router();

router.use("/flights/:id/reserve", authentication);
router.use("/flights/:id/available-seats", authentication);

router.get('/flights', controller.getFlights);
router.get('/flights/:id', controller.getFlight);
router.post('/flights/:id/reserve', reservation.placeReservation);
router.get('/flights/:id/available-seats', controller.availableSeats);

export = router;