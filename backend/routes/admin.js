const express = require('express');
const router = express.Router();
const {
  getAllResignations,
  concludeResignation,
  getAllExitResponses
} = require('../controllers/adminController');

const { authenticateAdmin } = require('../middleware/auth');

// View all resignations
router.get('/resignations', authenticateAdmin, getAllResignations);

// Approve or reject resignation
router.put('/conclude_resignation', authenticateAdmin, concludeResignation);

// View all exit responses
router.get('/exit_responses', authenticateAdmin, getAllExitResponses);

module.exports = router;
