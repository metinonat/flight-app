import express from 'express';
import controller from '../controllers/authController';
import { authentication } from '../middlewares/auth';
const router = express.Router();

// Authentication middleware
router.use("/logout", authentication);

router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/logout', controller.logout);


export = router;