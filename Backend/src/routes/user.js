const express = require('express');
const authenticate = require('../middlewares/auth');
const validateApiKey = require('../middlewares/validateApiKeys')
const router = express.Router();

router.get('/profile',validateApiKey, authenticate, (req, res) => {
    res.json(req.user);
}); 

module.exports = router;