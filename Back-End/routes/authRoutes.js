const express = require('express');
const { login,updateResume,getResume, register, validate,loginJobSeekers, registerJobSeeker } = require('../controllers/authController');
const { authenticate } = require('../middlewares/authMiddleware');

const authRouter = express.Router();

authRouter.post('/login', login);
authRouter.post('/register', register);
authRouter.post('/validate', validate);

// ----------------- for job seeker ------------------//
authRouter.post('/login_jobseeker',loginJobSeekers)
authRouter.post('/register_jobseeker',registerJobSeeker)
authRouter.patch('/apply/resume',authenticate,updateResume);
authRouter.get('/get/resume',authenticate,getResume);

module.exports = authRouter;  // Ensure the router is correctly exported
