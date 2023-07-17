import { sendRecoveryPassword } from "../../../Mails/SendRecoveryPassword.js";
import { generateId } from "../../../Helpers/tokens.js";
import User from "../../../Models/User.js";
import bcrypt from 'bcrypt';

const viewForgotPassword = (req, res) => {
    res.render('auth/forgot-password', {
        title: 'Recover your password',
        csrfToken: req.csrfToken()
    });
}

const forgotPassword = async (req, res) => {

    try {
        const { email } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) throw Error('Email not exists');

        user.token = generateId();

        await user.save();

        sendRecoveryPassword({
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            token: user.token
        });

        res.status(200).render('templates/message', {
            title: 'Recover your password',
            message: 'Instructions have been sent to your email'
        })
    } catch (error) {
        res.status(422).render('auth/forgot-password', {
            title: 'Recover your password',
            errors: [{ msg: error.message }],
            csrfToken: req.csrfToken()
        })

    }
}

const viewResetPassword = async (req, res) => {
    const { token } = req.query;

    res.cookie('tokenCookie', token);

    const tokenCookie = req.cookies.tokenCookie;

    let user;

    try {
        if (!token) res.redirect(303, '/');

        if (!tokenCookie) {
            user = await User.findOne({ where: { token } });
        } else {
            user = await User.findOne({ where: { token: tokenCookie } });
        }

        if (!user) throw Error('Token invalid');

        res.render('auth/reset-password', {
            title: 'Reset password',
            csrfToken: req.csrfToken(),
            token: tokenCookie
        });
    } catch (error) {
        res.status(422).render('auth/reset-password', {
            title: 'Reset password',
            errors: [{ msg: error.message }],
            csrfToken: req.csrfToken(),
            token: tokenCookie,
            disabled: true
        });
    }
}

const resetPassword = async (req, res) => {
    const { password } = req.body;

    const tokenCookie = req.cookies.tokenCookie;

    try {
        const user = await User.findOne({ where: { token: tokenCookie } });

        if (!user) throw Error('Token invalid');

        const response = await bcrypt.compare(password, user.password);

        if (response) throw Error('Password must not be the same as the previous one');

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);
        user.token = null;

        await user.save();

        await res.clearCookie('tokenCookie');

        res.status(200).render('templates/message', {
            title: 'Reset password',
            message: 'You password has been reset',
            confirm: true
        })
    } catch (error) {
        res.status(400).render('auth/reset-password', {
            title: 'Reset password',
            errors: [{ msg: error.message }],
            csrfToken: req.csrfToken(),
            token: tokenCookie
        })
    }
}

export {
    viewForgotPassword,
    forgotPassword,
    viewResetPassword,
    resetPassword
}