
const nodemailer = require("nodemailer")

const sendMAIL = (to, subject, html) => {
    return new Promise((resolve, reject) => {

        nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        }).sendMail({
            from : `"${process.env.SMTP_SENDER_NAME}" <${process.env.SMTP_SENDER_EMAIL}>`,
            to,
            subject,
            html
        }, (err, info) => {
            if (err) {
                reject("something went wrong")
            }
            resolve("successfully sent")
        })
    })

}
module.exports = { sendMAIL }