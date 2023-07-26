import express from "express";
import { login, viewLogin } from '../app/Http/Controllers/Auth/LoginController.js';
import { viewRegister, register, confirmAccount } from '../app/Http/Controllers/Auth/RegisterController.js';
import { viewForgotPassword, forgotPassword, viewResetPassword, resetPassword } from '../app/Http/Controllers/Auth/PasswordController.js';
import { validateRegister, registerRequest } from '../app/Http/Validators/Auth/RegisterValidator.js';
import { emailRequest, validateEmail, validatePassword, passwordRequest } from "../app/Http/Validators/Auth/PasswordValidator.js";
import { credentialsRequest, validateLogin } from "../app/Http/Validators/Auth/LoginValidator.js";

const router = express.Router();

router.get('/login', viewLogin);
router.post('/login', validateLogin, credentialsRequest, login);

router.get('/register', viewRegister);
router.post('/register', validateRegister, registerRequest, register);

router.get('/confirm', confirmAccount);

router.get('/forgot-password', viewForgotPassword);
router.post('/forgot-password', validateEmail, emailRequest, forgotPassword);

router.get('/reset-password', viewResetPassword);
router.post('/reset-password', validatePassword, passwordRequest, resetPassword);

export default router