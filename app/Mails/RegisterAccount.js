import mail from '../../config/mail.js';

const mailRegister = async data => {

    const { name, lastname, email, token } = data;

    await mail.sendMail({
        from: process.env.MAIL_FROM,
        to: email,
        subject: 'Confirm your account',
        text: 'Confirm your account',
        html: `
            <p>Hola ${name} ${lastname}! Confirma tu cuenta en ${process.env.APP_NAME}...</p>

            <a href="${process.env.APP_URL}:${process.env.APP_PORT}/confirm?token=${token}">Confirm Account</a>

            <p>Si no creaste ésta cuenta, ignora este correo</p>
        `
    })

}

export {
    mailRegister
}