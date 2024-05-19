const express = require('express');
const { login, register, validate } = require('../controllers/authController');

const authRouter = express.Router();

authRouter.post('/login', login);
authRouter.post('/register', register);
authRouter.post('/validate', validate);

module.exports = authRouter;  // Ensure the router is correctly exported
