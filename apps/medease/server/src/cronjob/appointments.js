import cron from 'node-cron';
import Appointment from '../models/appointment.js';
import { sendWhatsAppMessage } from '../utils/whatsapp.js';

cron.schedule('*/5 * * * * *', async () => {
    try {
        const now = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(now.getDate() + 1);

        // const appointments = await Appointment.find({
        //     appointmentDate: { $gte: now, $lt: tomorrow },
        // }).populate('userId');

        const appointments = await Appointment.find().populate('userId');
        console.log(appointments);

        for (const appointment of appointments) {
            const user = appointment.userId;
            const message = `Hello ${user.name}, this is a reminder for your appointment scheduled on ${appointment.appointmentDate}.`;
            await sendWhatsAppMessage(user.phone, `${message} Note :${appointment.note}`);
        }

        console.log(`Reminders sent for ${appointments.length} appointments.`);
    } catch (error) {
        console.error('Error scheduling reminders:', error);
    }
});
