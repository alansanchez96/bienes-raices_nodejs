import express from "express";
import { viewLogin } from '../app/Http/Controllers/Auth/LoginController.js';
import { viewRegister } from '../app/Http/Controllers/Auth/RegisterController.js';
import { viewForgotPassword } from '../app/Http/Controllers/Auth/PasswordController.js';

const router = express.Router();

router.get('/login', viewLogin);
router.get('/register', viewRegister);
router.get('/forgot-password', viewForgotPassword);

export default router