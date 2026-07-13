import { Router } from 'express';
import { register, login, getCurrentUser } from '../controllers/auth.controller';
import { isAuthenticated } from '../middlewares/auth.middleware';

const router: Router = Router();

// User Registration
router.post('/register', register);

// User Login
router.post('/login', login);

// Get current user
router.get('/me', isAuthenticated, getCurrentUser);

export default router;