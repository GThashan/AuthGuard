import express from 'express'
import { Login, Logout, SignUp } from '../controllers/authController.js';

const router = express.Router();

router.get('/signUp', SignUp);
router.get('/signUp', Login);
router.get('/signUp', Logout);




export default router;