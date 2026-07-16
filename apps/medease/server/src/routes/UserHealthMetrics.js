const mongoose = require("mongoose");

const healthMetricsSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    bloodPressure: { type: String },
    weight: { type: Number },
    glucoseLevel: { type: Number },
    heartRate: { type: Number },
    recordDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("UserHealthMetrics", healthMetricsSchema);

const appointmentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    doctor: { type: String },
    clinic: { type: String },
    appointmentDate: { type: Date, required: true },
    reminderSent: { type: Boolean, default: false }
});

module.exports = mongoose.model("UserAppointments", appointmentSchema);

router.post("/health-metrics", async (req, res) => {
    const { userId, bloodPressure, weight, glucoseLevel, heartRate } = req.body;

    try {
        const newMetric = new UserHealthMetrics({
            userId,
            bloodPressure,
            weight,
            glucoseLevel,
            heartRate
        });
        await newMetric.save();

        res.status(201).json({ message: "Health metrics saved successfully" });
    } catch (error) {
        console.error("Error saving health metrics:", error);
        res.status(500).send("Error saving health metrics");
    }
});

const cron = require("node-cron");
const UserAppointments = require("./models/UserAppointments");

// Run every day at 8:00 AM to check for upcoming appointments
cron.schedule("0 8 * * *", async () => {
    try {
        const upcomingAppointments = await UserAppointments.find({
            appointmentDate: { $gte: new Date() },
            reminderSent: false
        });

        upcomingAppointments.forEach(appointment => {
            // Send WhatsApp or SMS reminder
            sendReminderMessage(appointment);

            // Mark as reminder sent
            appointment.reminderSent = true;
            appointment.save();
        });
    } catch (error) {
        console.error("Error sending reminders:", error);
    }
});

async function sendReminderMessage(appointment) {
    // Use Twilio or other messaging service to send the reminder
    console.log(`Reminder sent to user for appointment on ${appointment.appointmentDate}`);
}

async function checkHealthTrends(userId) {
    const metrics = await UserHealthMetrics.find({ userId }).sort({ recordDate: -1 }).limit(5);

    // Example logic: send a reminder if latest 5 readings show high blood pressure
    const highBPCount = metrics.filter(metric => parseInt(metric.bloodPressure) > 140).length;

    if (highBPCount >= 3) {
        sendHealthCheckReminder(userId);
    }
}

async function sendHealthCheckReminder(userId) {
    // Use WhatsApp or SMS to send reminder
    console.log(`Reminder: Schedule a check-up for user ${userId}`);
}
