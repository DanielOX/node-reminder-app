const { EMAIL,PASSWORD } = require('./secret')
const nodemailer = require('nodemailer')
var sendinBlue = require('nodemailer-sendinblue-transport');



const transporter = nodemailer.createTransport(sendinBlue({
    apiKey:"jRQpksgm5aq0OVSN"
}))


module.exports = transporter
