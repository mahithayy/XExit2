const express = require('express');
const router = express.Router();
const {
  getAllResignations,
  concludeResignation,
  getAllExitResponses
} = require('../controllers/adminController');

const { authenticateAdmin } = require('../middleware/auth');

// View all pending resignations
router.get('/resignations', authenticateAdmin, getPendingResignations);

// Approve or reject resignation
router.put('/conclude_resignation/:id', authenticateAdmin, processResignation);

// Schedule exit interview
router.post('/schedule_interview', authenticateAdmin, scheduleInterview);

module.exports = router;
