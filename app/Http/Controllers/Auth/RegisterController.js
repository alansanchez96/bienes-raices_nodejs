const viewRegister = (req, res) => {
    res.render('auth/register', {
        title: 'Register'
    });
}

export {
    viewRegister
}