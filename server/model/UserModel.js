const { create } = require("domain");
const pool = require("../config/dbconfig");
const UserModel = {
    findByEmail: async (email) => {
        try {
            const query = 'SELECT * FROM user WHERE email = ?';
            const [rows] = await pool.execute(query, [email]);
            return rows.length ? rows[0] : null;
        } catch (error) {
            throw error;
        }
    },
    createUser: async (username,email,hashedPassword) => {
        try {
            const query = 'INSERT INTO user (username,email, password) VALUES (?,?, ?)';
            await pool.execute(query, [username,email, hashedPassword]);
        } catch (error) {
            throw error;
        }
    },
    getAllUsers:async()=>{
        try {
            const query = 'SELECT * FROM user';
            const [rows] = await pool.execute(query);
            return rows;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = UserModel;