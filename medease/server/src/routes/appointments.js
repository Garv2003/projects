import Appointment from "../models/appointment.js";
import express from 'express';

const router = express.Router();

router.post('/create_appointment', async (req, res) => {
    const { userId, appointmentDate, message, note } = req.body;
    console.log(req.body);

    if (!userId || !appointmentDate || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const newAppointment = await Appointment.create({
            userId,
            appointmentDate,
            message,
            note,
        });

        return res.json({
            message: 'Appointment created successfully',
            appointment: newAppointment,
        });
    } catch (error) {
        console.error('Error creating appointment:', error);
        return res.status(500).json({ error: 'Error creating appointment', details: error.message });
    }
});

router.get('/api/get_appointments/:userId', async (req, res) => {
    try {
        const appointments = await appointment.find({ userId: req.params.userId });
        return res.json(appointments);
    }
    catch (error) {
        console.error('Error getting appointments:', error);
        return res.status(500).send('Error getting appointments');
    }
});

router.delete('/api/delete_appointment/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await appointment.findByIdAndDelete(id);
        return res.send('Appointment deleted successfully');
    }
    catch (error) {
        console.error('Error deleting appointment:', error);
        return res.status(500).send('Error deleting appointment');
    }
});

export default router;