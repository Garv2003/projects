import { Interview } from '../models/interview.model';
import { Request, Response } from 'express';

export const GetAllInterviews = async (req: Request, res: Response) => {
    try {
        const interviews = await Interview.find({ created_by: req.user?._id }).populate('created_by', 'name email');
        res.status(200).json({
            success: true,
            data: {
                interviews,
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch interviews',
            error: (error as Error).message
        });
    }
};

// Get interview by ID
export const GetInterviewById = async (req: Request, res: Response) => {
    try {
        const interview = await Interview.findById(req.params.interviewId)
            .populate('created_by', 'name email');

        if (!interview) {
            res.status(404).json({
                success: false,
                message: 'Interview not found'
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: interview
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch interview',
            error: (error as Error).message
        });
    }
};

// Update interview
export const UpdateInterview = async (req, res) => {
    try {
        const { interviewId } = req.params;
        const updates = req.body;

        const interview = await Interview.findByIdAndUpdate(
            interviewId,
            updates,
            { new: true, runValidators: true }
        ).populate('created_by', 'name email');

        if (!interview) {
            return res.status(404).json({
                success: false,
                message: 'Interview not found'
            });
        }

        res.status(200).json({
            success: true,
            data: interview
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update interview',
            error: (error as Error).message
        });
    }
};

// Delete interview
export const DeleteInterview = async (req: Request, res: Response) => {
    try {
        const interview = await Interview.findByIdAndDelete(req.params.interviewId);

        if (!interview) {
            res.status(404).json({
                success: false,
                message: 'Interview not found'
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: 'Interview deleted successfully'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete interview',
            error: (error as Error).message
        });
    }
};

//Create Interview
export const CreateInterview = async (req: Request, res: Response) => {
    try {
        const newInterview = new Interview({
            ...req.body,
            created_by: req.user?._id
        });
        const savedInterview = await newInterview.save();

        res.status(201).json({
            success: true,
            data: savedInterview
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Failed to create interview',
            error: (error as Error).message
        });
    }
};