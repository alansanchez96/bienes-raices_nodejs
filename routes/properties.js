import express from "express";
import { create, index, store } from "../app/Http/Controllers/Properties/PropertyController.js";
import { propertyCreateRequest, validatePropertyCreate } from "../app/Http/Validators/Properties/CreatePropertyValidator.js";
import { jwtMiddleware } from '../app/Http/Middlewares/JwtMiddleware.js';

const router = express.Router();

router.get('/properties', jwtMiddleware, index);
router.get('/properties/create', jwtMiddleware, create);
router.post('/properties/create', jwtMiddleware, validatePropertyCreate, propertyCreateRequest, store);

export default router;