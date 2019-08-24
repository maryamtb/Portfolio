const nodemailer = require('nodemailer')
const mailGun = require('nodemailer-mailgun-transport')

const auth = {
    auth: {
        api_key: process.env.API_KEY, 
        domain: process.env.DOMAIN
    }
}
const transporter = nodemailer.createTransport(mailGun(auth))

const sendMail = (name, lastname, subject, email, text, cb) => {
    const mailOptions = {
        name: name,
        lastname: lastname,
        subject: subject,
        from: email, 
        to: 'maryamtb.17@gmail.com', 
        text
    }

    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            cb(err, null)
        } else {
            cb(err, data)
        }
    })
}

module.exports = sendMail