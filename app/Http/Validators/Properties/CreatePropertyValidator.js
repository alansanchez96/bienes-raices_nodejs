import { body, validationResult } from 'express-validator';
import Category from "../../../Models/Category.js";
import Price from "../../../Models/Price.js";

const validatePropertyCreate = [
    body('title').notEmpty().withMessage('Announcement is required.'),
    body('description').notEmpty().withMessage('Description is required.')
        .isLength({ max: 200 }).withMessage('Description is too longe'),
    body('category_id').isNumeric().withMessage('Select a category.'),
    body('price_id').isNumeric().withMessage('Select a range price.'),
    body('rooms').isNumeric().withMessage('Select a range room.'),
    body('parking').isNumeric().withMessage('Select a range parking.'),
    body('wc').isNumeric().withMessage('Select a range wc.'),
    body('lat').notEmpty().withMessage('Location is required.'),
];

const propertyCreateRequest = async (req, res, next) => {
    const errors = validationResult(req);

    const { title, description, category_id, price_id, rooms, parking, wc, lat, lng, street } = req.body;

    if (!errors.isEmpty()) {

        const [categories, prices] = await Promise.all([
            Category.findAll(),
            Price.findAll()
        ]).catch(() => {
            res.status(500).render('properties/create', {
                title: 'Post a new property',
                csrfToken: req.csrfToken(),
                errors: [{ msg: 'An error has occurred' }]
            });
        });

        return res.status(422).render('properties/create', {
            title: 'Post a new property',
            csrfToken: req.csrfToken(),
            categories,
            prices,
            errors: errors.array(),
            data: req.body
        });
    }

    next();
}

export {
    validatePropertyCreate,
    propertyCreateRequest
}