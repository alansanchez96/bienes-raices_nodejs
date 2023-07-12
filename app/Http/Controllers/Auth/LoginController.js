const viewLogin = (req, res) => {
    res.render('auth/login', {
        title: 'Login'
    });
}

export {
    viewLogin
}