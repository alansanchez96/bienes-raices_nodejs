import express from "express";
import { viewLogin } from '../app/Http/Controllers/Auth/LoginController.js';
import { viewRegister, register } from '../app/Http/Controllers/Auth/RegisterController.js';
import { viewForgotPassword } from '../app/Http/Controllers/Auth/PasswordController.js';
import { validateRegister, registerRequest } from '../app/Http/Validators/RegisterValidator.js';

const router = express.Router();

router.get('/login', viewLogin);

router.get('/register', viewRegister);
router.post('/register', validateRegister, registerRequest, register);

router.get('/forgot-password', viewForgotPassword);

export default router