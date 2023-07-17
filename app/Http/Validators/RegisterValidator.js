import { body, validationResult } from 'express-validator';
import User from '../../Models/User.js';

const validateRegister = [
    body('name').notEmpty().withMessage('Name is required.')
        .isAlpha().withMessage('Name must contain only letters and spaces.'),

    body('lastname').notEmpty().withMessage('Last name is required.')
        .isAlpha().withMessage('Last name must contain only letters and spaces.'),

    body('email').notEmpty().withMessage('Email is required.')
        .isEmail().withMessage('Email is not valid.'),

    body('password').notEmpty().withMessage('Password is required.')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number.'),

    body('password_confirmation').custom((value, { req }) => {
        if (value !== req.body.password) throw new Error('Passwords do not match.');
        return true;
    })
];

const registerRequest = async (req, res, next) => {

    const { name, lastname, email } = req.body

    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const extractedErrors = errors.array();

            return res.render('auth/register', {
                title: 'Register your account',
                errors: extractedErrors,
                csrfToken: req.csrfToken(),
                user: {
                    name: name,
                    lastname: lastname,
                    email: email
                }
            })
        }

        const user = await User.findOne({ where: { email } });

        if (user) throw Error('Email is already exists');

        next();
    } catch (error) {
        res.status(400).render('auth/register', {
            title: 'Register your account',
            csrfToken: req.csrfToken(),
            errors: [{ msg: error.message }],
            user: {
                name: name,
                lastname: lastname
            }
        })
    }
}

export {
    validateRegister,
    registerRequest
}