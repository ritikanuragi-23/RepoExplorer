const express = require('express');
const router = express.Router();
const repoController = require('../controllers/repoController');

router.post('/analyze', repoController.analyzeRepo);
router.post('/chat', repoController.chatAboutRepo);

module.exports = router;
