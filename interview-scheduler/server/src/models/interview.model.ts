import mongoose from 'mongoose';

const interviewSchema = new mongoose.Schema({
    candidate_name: { type: String, required: true },
    interviewer_name: { type: String, required: true },
    start_time: { type: Date, required: true },
    end_time: { type: Date, required: true },
    type: { type: String, required: true },
    additional_notes: { type: String },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

export const Interview = mongoose.model('Interview', interviewSchema);
