const nodemailer = require('nodemailer');


class MailService{

    constructor() {
        this.transport = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            }
        })
    }


    async sendActivationMail(email, activateLink){
        await this.transport.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: 'Link for activation',
            text: '',
            html:
                `
                <div>
                    <h1>For activation go for this link</h1>
                    <a href="${activateLink}">${activateLink}</a>
                </div>
                `
        });
    }
}

module.exports = new MailService();
