import express from "express";
import { viewLogin } from '../app/Http/Controllers/LoginController.js';
import { viewRegister } from '../app/Http/Controllers/RegisterController.js';

const router = express.Router();

router.get('/login', viewLogin);
router.get('/register', viewRegister);

export default router