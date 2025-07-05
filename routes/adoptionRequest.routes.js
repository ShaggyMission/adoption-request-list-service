const express = require('express');
const router = express.Router();
const controller = require('../controllers/adoptionRequest.controller');

router.get('/adoption-requests', controller.listRequests);

module.exports = router;
