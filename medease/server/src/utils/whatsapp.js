import twilio from 'twilio';
import "dotenv/config";

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

export async function sendWhatsAppMessage(to, message) {
    try {
        await client.messages.create({
            from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`, // Twilio WhatsApp number
            to: `whatsapp:${to}`, // User's WhatsApp number
            body: message,
        });
        console.log(`Message sent to ${to}`);
    } catch (error) {
        console.error(`Failed to send message to ${to}:`, error);
    }
}

