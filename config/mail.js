import nodemailer from 'nodemailer';

const mail = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT
});

export default mail;