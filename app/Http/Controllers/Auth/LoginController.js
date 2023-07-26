import { generateJWT } from "../../../Helpers/tokens.js";

const viewLogin = (req, res) => {
    res.render('auth/login', {
        title: 'Login',
        csrfToken: req.csrfToken()
    });
}

const login = (req, res) => {
    const user_id = req.body.user_id

    const token = generateJWT({ user_id })

    return res.cookie('access_token', token, {
        httpOnly: true
    }).redirect('/properties');
}

export {
    viewLogin,
    login
}