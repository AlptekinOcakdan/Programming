import nodemailer from 'nodemailer';
import {FRONTEND_URL, SENDER_EMAIL, SENDER_EMAIL_PASSWORD} from "../constants/environmet.js";
import {emailVerificationTemplate} from "./email-templates/email-verification.js";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: SENDER_EMAIL,
        pass: SENDER_EMAIL_PASSWORD,
    },
});

export async function sendEmail({to, subject, content}) {
    try {
        const mailOptions = {
            from: {
                name: 'E-commerce',
                address: SENDER_EMAIL,
            },
            to,
            subject,
            html:content,
        }
        
        const info = await transporter.sendMail(mailOptions);
        console.log(`Message sent: , ${info.messageId}`)
        return info;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const sendVerificationEmail = async ({to, token})=>{
    console.log('sendVerificationEmail', to, token);
    const subject = 'Verify your email';
    const content = renderEmailTemplate(emailVerificationTemplate,[
        {key: 'appLink', value: FRONTEND_URL},
        {
            key: 'verificationLink',
            value: `${FRONTEND_URL}/verify-email?token=${token}`,
        },
        {
            key: 'unsubscriptionLink',
            value: `${FRONTEND_URL}/unsubscribe?token=${token}`,
        },
    ]);
    
    if (!content) {
        return false;
    }
    
    await sendEmail({to, subject, content});
}

export const renderEmailTemplate =(template, data)=>{
    try {
        let content = template.toString();
        
        data.forEach((element)=>{
            const regex = new RegExp(`{{${element.key}}}`, 'g');
            content = content.replace(regex, element.value);
        }); 
        return content;
    } catch (error){
        console.log(error);
        return false;
    }
}