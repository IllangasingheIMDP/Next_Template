const express = require('express');
const router = express.Router();
const AuthMiddleware=require("../middleware/AuthMiddleware");
const AdminController=require("../controller/AdminController");

router.get('/users',AuthMiddleware(["Admin"]),  AdminController.getAllUsers);
router.post('/register',AdminController.registerAdmin);
router.post('/login',AdminController.loginAdmin);

module.exports = router;