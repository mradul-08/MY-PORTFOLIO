import nodemailer from 'nodemailer'

const email = process.env.CONTACT_EMAIL
const password = process.env.CONTACT_EMAIL_PASSWORD

export const transporter = nodemailer.createTransport({
	// service can be ‘hotmail’, ‘yahoo’, etc.
    service: 'gmail',
    auth: {
        user: email,
        pass: password
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
})
