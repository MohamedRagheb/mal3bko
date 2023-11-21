const nodemailer = require('nodemailer');
const verfiyEmailTempelate = require("./emailTempelets/VerifyEmailTempelate")
async function sendVerificationEmail(userEmail,code,userName){
        const transporter = nodemailer.createTransport({
            service: 'Gmail', // Use the email service provider you want
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_password,
            },
        });
        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: userEmail,
            subject: `mal3bko Email verification code`,
            html: verfiyEmailTempelate(code,userName)
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }});

}
    module.exports = sendVerificationEmail
