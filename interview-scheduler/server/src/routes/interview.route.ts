import { GetAllInterviews, GetInterviewById, UpdateInterview, DeleteInterview, CreateInterview } from '../controllers/interview.controller';
import { isAuthenticated } from '../middlewares/auth.middleware';
import { Router } from 'express';

const interviewRouter: Router = Router();

// Get all interviews for a specific user
interviewRouter.get('/interviews', isAuthenticated, GetAllInterviews);

// Get interview by ID
interviewRouter.get('/:interviewId', isAuthenticated, GetInterviewById);

// Update interview
interviewRouter.put('/:interviewId', UpdateInterview);

// Delete interview
interviewRouter.delete('/:interviewId', isAuthenticated, DeleteInterview);

// Create interview
interviewRouter.post('/create', isAuthenticated, CreateInterview);

export default interviewRouter;