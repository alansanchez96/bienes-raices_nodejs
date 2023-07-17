import User from '../../../Models/User.js';
import { generateId } from '../../../Helpers/tokens.js';
import { mailRegister } from '../../../Mails/RegisterAccount.js';

const viewRegister = (req, res) => {
    res.render('auth/register', {
        title: 'Register your account',
        csrfToken: req.csrfToken()
    });
}

const register = async (req, res) => {
    const { name, lastname, email, password } = req.body;

    try {
        const user = await User.create({
            name,
            lastname,
            email,
            password,
            token: generateId()
        });

        mailRegister({
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            token: user.token,
        })

        res.status(201).render('templates/message', {
            title: 'You have successfully registered',
            message: 'We have sent a confirmation email. Please check your mailbox.'
        });
    } catch (error) {
        httpError(res, error)
    }
}

const confirmAccount = async (req, res, next) => {
    try {
        const { token } = req.query;

        if (!token) res.redirect(303, '/');

        const user = await User.findOne({ where: { token } });

        if (!user) throw Error('The token is incorrect');

        user.token = null;
        user.confirmed = true;

        await user.save();

        res.render('templates/message', {
            title: 'Account confirmed',
            message: 'Your account has been confirmed successfully',
            confirm: true
        })
    } catch (error) {
        res.status(400).render('templates/message', {
            title: 'An error has occurred',
            error: error.message
        })
    }
}

export {
    viewRegister,
    register,
    confirmAccount
}