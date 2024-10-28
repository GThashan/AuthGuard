import express from 'express'
import {  Emailverification, Login, Logout, PasswordReset, ResetPassword, SignUp, checkauth } from '../controllers/authController.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/check-auth', verifyToken, checkauth)
router.post('/signUp', SignUp);
router.post('/verify-email',Emailverification);
router.post('/login',Login) 
router.post('/resetpassword',ResetPassword);

router.post('/passwordreset/:token',PasswordReset)
router.post('/logout',Logout);





export default router;