import express from 'express'
import {  Emailverification, SignUp } from '../controllers/authController.js';

const router = express.Router();

router.post('/signUp', SignUp);
router.post('/verify-email',Emailverification)





export default router;