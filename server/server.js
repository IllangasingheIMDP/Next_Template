const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./config/dbconfig');
const PORT = process.env.PORT || 5000;
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.json());
//routes import
const AuthRoutes = require('./routes/AuthRoute');


//cors configuration

const allowedOrigins = ['http://localhost:3001', 'http://localhost:5174', 'http://16.171.12.238', 'https://lpedu.lk'];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, origin);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,// Allow credentials (cookies, etc.)
}));


//database check
pool.getConnection()
  .then((connection) => {
    console.log('MySQL Connected...');
    connection.release();
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
    process.exit(1);
  });

app.use('/api/auth', AuthRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});