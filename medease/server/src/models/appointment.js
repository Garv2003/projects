import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    appointmentDate: Date,
    message: String,
    note: String,
});

const appointment = mongoose.model('Appointment', appointmentSchema);

export default appointment;