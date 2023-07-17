import { body, validationResult } from 'express-validator';
import User from '../../../Models/User.js';

const validateEmail = [
    body('email').notEmpty().withMessage('Email is required.')
        .isEmail().withMessage('Email is not valid.'),
];

const emailRequest = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const extractedErrors = errors.array();

        return res.status(422).render('auth/forgot-password', {
            title: 'Recover your password',
            errors: extractedErrors,
            csrfToken: req.csrfToken()
        })
    }

    next();
}

const validatePassword = [
    body('password').notEmpty().withMessage('Password is required.')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number.'),

    body('password_confirmation').custom((value, { req }) => {
        if (value !== req.body.password) throw new Error('Passwords do not match.');
        return true;
    })
];

const passwordRequest = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const extractedErrors = errors.array();

        return res.status(422).render(`auth/reset-password`, {
            title: 'Reset password',
            errors: extractedErrors,
            csrfToken: req.csrfToken(),
            email: req.body.email
        })
    }

    next();
}

export {
    validateEmail,
    emailRequest,
    validatePassword,
    passwordRequest
}