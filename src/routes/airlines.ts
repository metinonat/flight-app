import express from 'express';
import controller from '../controllers/airlinesController';
const router = express.Router();

router.get('/airlines', controller.getAirlines);
router.get('/airlines/:id', controller.getAirline);

export = router;