const express = require('express');
const router = express.Router();
const AuthMiddleware=require("../middleware/AuthMiddleware");
const AuthController = require('../controller/AuthController');

router.get('/userdata',AuthMiddleware(["Admin",'student']),AuthController.getCookieDetail);
module.exports = router;