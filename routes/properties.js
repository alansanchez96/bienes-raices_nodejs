import express from "express";
import { create, index } from "../app/Http/Controllers/Properties/PropertyController.js";

const router = express.Router();

router.get('/properties', index);
router.get('/properties/create', create);
// router.post('/login', validateLogin, credentialsRequest, login);

export default router;