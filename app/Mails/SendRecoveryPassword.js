import mail from '../../config/mail.js';

const sendRecoveryPassword = async data => {

    const { name, lastname, email, token } = data;

    await mail.sendMail({
        from: process.env.MAIL_FROM,
        to: email,
        subject: 'Reset your password',
        text: 'Reset your password',
        html: `
            <p>Hola ${name} ${lastname}! Recupera tu cuenta en ${process.env.APP_NAME}...</p>

            <a href="${process.env.APP_URL}:${process.env.APP_PORT}/reset-password?token=${token}">Change your password</a>

            <p>Si no olvidaste tu contraseña, porfavor ignora este correo</p>
        `
    })

}

export {
    sendRecoveryPassword
}