import twilio from 'twilio';
import {
    STORE_OWNER_PHONE_NUMBER,
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN,
    TWILIO_PHONE_NUMBER
} from "../constants/environmet.js";

const client = twilio(TWILIO_ACCOUNT_SID,TWILIO_AUTH_TOKEN);

export const sendSMSToAdmin = async (message)=>{
    try{
        const response = await client.messages.create({
            body:message,
            from:TWILIO_PHONE_NUMBER,
            to:STORE_OWNER_PHONE_NUMBER
        })
        
        return response;
    }catch (error) {
        console.log(error);
        return error;
    }
}

export const sendSMSToUser = async (phoneNumber, message) => {
    try {
        const response = await client.messages.create({
            body: message,
            from: TWILIO_PHONE_NUMBER,
            to: phoneNumber,
        });

        return response;
    } catch (error) {
        console.log(error);
    }
};