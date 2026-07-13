import mongoose from "mongoose";

const medicationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    strength: String,
    dosage: {
        breakfast: String,
        lunch: String,
        dinner: String,
    },
    frequency: String,
    duration: String,
});

const doctorSchema = new mongoose.Schema({
    doctor: String,
    clinic: String,
    contact: String,
    email: String,
});

const summarySchema = new mongoose.Schema({
    Disease: String,
    Diagnosis: String,
    Recovery: String,
    Tests: String,
    Medications: [medicationSchema],
    DoctorAndClinic: doctorSchema,
    Advice: [String],
    FollowUp: String,
});

const prescriptionSchema = new mongoose.Schema({
    summary: summarySchema,
    publicURL: String,
    imagefile: String,
    wholeSummary: String,
    userId: String,
});

const Prescription = mongoose.model("Prescription", prescriptionSchema);

export default Prescription;