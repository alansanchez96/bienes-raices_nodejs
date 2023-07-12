const viewForgotPassword = (req, res) => {
    res.render('auth/forgot-password', {
        title: 'Recover your password'
    });
}

export {
    viewForgotPassword
}