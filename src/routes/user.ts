import express from 'express';
import controller from '../controllers/reservationsController';
import { authentication } from '../middlewares/auth';
const router = express.Router();

router.use("/user/reservations", authentication);
router.use("/user/reservations/:id", authentication);

router.get('/user/reservations', controller.getReservations);
router.get("/user/reservations/:id", controller.getReservation);
router.post("/user/reservations/:id", controller.cancelReservation);

export = router;