import express from 'express'
import {  Emailverification, Login, Logout, ResetPassword, SignUp } from '../controllers/authController.js';

const router = express.Router();

router.post('/signUp', SignUp);
router.post('/logout',Logout);
router.post('/login',Login)
router.post('/resetpassword',ResetPassword);
router.post('/verify-email',Emailverification)





export default router;