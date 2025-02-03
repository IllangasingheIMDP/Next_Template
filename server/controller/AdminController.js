
const UserModel = require("../model/UserModel");

const AdminController = {
    getAllUsers:async(req,res)=>{
        try {
            const users=await UserModel.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch users' });
            console.log(error);
        }
    }
}; 
module.exports = AdminController;