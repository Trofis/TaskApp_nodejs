const sgMail = require('@sendgrid/mail')

const sendGridAPIKey = process.env.SENDGRID_API_KEY

sgMail.setApiKey(sendGridAPIKey)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to:email,
        from:"thomas.mendesm@gmail.com",
        subject:"Thanks for joining us",
        text:'Welcome to the app, '+name+'. Let me know how you get along with the app'
    })    
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to:email,
        from:"thomas.mendesm@gmail.com",
        subject:"Why leaving us ?",
        text:'Bye bye '+name+'. We will miss you :('
    })    
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}
