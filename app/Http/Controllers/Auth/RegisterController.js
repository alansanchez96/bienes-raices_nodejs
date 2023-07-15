import User from '../../../Models/User.js';
import { generateId } from '../../../Helpers/tokens.js';

const viewRegister = (req, res) => {
    res.render('auth/register', {
        title: 'Register your account'
    });
}

const register = async (req, res) => {
    try {
        const { name, lastname, email, password } = req.body;

        const response = await User.create({
            name,
            lastname,
            email,
            password,
            token: generateId()
        });

        res.render('templates/message', {
            title: 'You have successfully registered',
            message: 'We have sent a confirmation email. Please check your mailbox.'
        });
    } catch (error) {
        httpError(res, error)
    }
}

export {
    viewRegister,
    register
}