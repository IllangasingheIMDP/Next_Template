const express = require('express');
const router = express.Router();
const AuthMiddleware=require("../middleware/AuthMiddleware");
const AdminController=require("../controller/AdminController");

router.get('/users',AdminController.getAllUsers);

module.exports = router;