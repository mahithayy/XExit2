const express = require('express');
const router = express.Router();
const { submitResignation, submitExitResponses} = require('../controllers/userController');
const { authenticateEmployee } = require('../middleware/auth');

// Employee submits resignation
router.post('/resign', authenticateEmployee, submitResignation);

// Employee submits exit interview
router.post('/responses', authenticateEmployee, submitExitResponses);

module.exports = router;
