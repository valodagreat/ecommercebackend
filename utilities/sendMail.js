const nodemailer = require('nodemailer');
const { google } = require('googleapis');


const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID , process.env.CLIENT_SECRET, process.env.REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN})

export const sendMail = async(details) => {
    try {
        const accessToken = await oAuth2Client.getAccessToken();
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: process.env.USER,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken
            }
        })
        const mailOptions = {
            from: 'SHOP IT <support@shopit.com>',
            to: details.email,
            subject: details.subject,
            text: "Welcome to Shop IT",
            html: details.html
        }
        const result = await transport.sendMail(mailOptions)
        return result
    } catch (error) {
        console.log(error)
    }
}
//sendMail({email: "vcaleb01@gmail.com", subject: "Welcome to Shop IT"}).then(result => console.log("Email Sent", result)).catch(error => /////console.log(error.message))