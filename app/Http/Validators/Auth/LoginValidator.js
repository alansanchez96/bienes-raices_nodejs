import { body, validationResult } from 'express-validator';
import User from '../../../Models/User.js';

const validateLogin = [
    body('email').notEmpty().withMessage('Email is required.')
        .isEmail().withMessage('Email is not valid.'),

    body('password').notEmpty().withMessage('Password is required.')
];

const credentialsRequest = async (req, res, next) => {

    const { email, password } = req.body;

    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const extractedErrors = errors.array();

            return res.status(422).render('auth/login', {
                title: 'Login',
                errors: extractedErrors,
                csrfToken: req.csrfToken()
            })
        }

        const user = await User.findOne({ where: { email } });

        if (!user) throw Error('Email does not exist');

        if (!user.confirmed) throw Error('Your account has not been confirmed');

        if (!user.verifyCredential(password)) throw Error('Password Incorrect');

        req.body.user_id = user.id;

        next();
    } catch (error) {
        res.status(422).render('auth/login', {
            title: 'Login',
            csrfToken: req.csrfToken(),
            errors: [{ msg: error.message }],
            user: {
                email: email
            }
        })
    }
}

export {
    validateLogin,
    credentialsRequest,
}