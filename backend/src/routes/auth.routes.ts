import { Router } from 'express';
import { register, login, logout } from '../controllers/authcontroller';

const router = Router();

// Define authentication routes
router.post('/auth/register', register);
router.post('/auth/login', login);
router.post('/auth/logout', logout);

export default router;
