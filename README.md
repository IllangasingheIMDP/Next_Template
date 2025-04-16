
# Next.js & Express Authentication Template

Welcome to the **Next.js & Express Authentication Template**, a robust and scalable starter kit for building secure web applications with user authentication. This repository provides a fully functional setup with a **Next.js** frontend, a **Node.js/Express** backend, **JWT-based authentication**, and a **MySQL** database hosted on Aiven. It includes login, signup, and protected routes for both frontend and backend, with JWT tokens securely stored in cookies.

---

## 🚀 Features

- **Next.js Frontend**: A modern, fast, and SEO-friendly frontend built with Next.js.
- **Express Backend**: A lightweight and flexible Node.js/Express server handling authentication and API routes.
- **JWT Authentication**: Secure user authentication using JSON Web Tokens stored in HTTP-only cookies.
- **Protected Routes**: Both frontend and backend routes are secured, ensuring only authenticated users can access sensitive data.
- **MySQL Database**: Pre-configured integration with a MySQL database hosted on Aiven for persistent data storage.
- **Environment Configuration**: Easily customizable `.env` file for database and server settings.
- **Scalable Architecture**: Modular structure for easy expansion and customization.
- **Responsive Design**: Frontend styled with modern CSS frameworks (e.g., Tailwind CSS or your preferred choice).

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MySQL** (Aiven account or local MySQL instance)
- **Git**

---

## 🛠️ Getting Started

Follow these steps to set up and run the project locally:

### 1. Fork the Repository
Fork this repository to your GitHub account and clone it to your local machine:

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install Dependencies

#### Frontend (Next.js)
Navigate to the root directory and install frontend dependencies:

```bash
npm install
# or
yarn install
```

#### Backend (Express)
Navigate to the `server` folder and install backend dependencies:

```bash
cd server
npm install
# or
yarn install
```

### 3. Configure Environment Variables
Create a `.env` file in the `server` folder and add your database and JWT settings. Example:

```env
DATABASE_URL=mysql://user:password@host:port/database
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

> **Note**: Replace the `DATABASE_URL` with your Aiven MySQL connection string or local MySQL credentials.

### 4. Run the Application

#### Start the Backend
In the `server` folder, run:

```bash
npm run start
# or
yarn start
```

The Express server will start on `http://localhost:5000` (or your specified port).

#### Start the Frontend
In the root directory, run:

```bash
npm run dev
# or
yarn dev
```

The Next.js app will start on `http://localhost:3000`.

### 5. Access the Application
Open your browser and navigate to `http://localhost:3000` to explore the login and signup pages. Protected routes will only be accessible after successful authentication.

---

## 📂 Project Structure

```plaintext
├── server/                 # Express backend
│   ├── routes/             # API routes (auth, protected)
│   ├── middleware/         # JWT authentication middleware
│   ├── config/             # Database configuration
│   ├── .env                # Environment variables
│   └── server.js           # Main Express server
├── pages/                  # Next.js pages (login, signup, protected)
├── components/             # Reusable React components
├── styles/                 # CSS or Tailwind styles
├── public/                 # Static assets
├── .env.local              # Frontend environment variables
├── package.json            # Frontend dependencies
└── README.md               # Project documentation
```

---

## 🔐 Authentication Flow

1. **Signup**: Users can create an account by providing a username, email, and password.
2. **Login**: Users authenticate with their credentials, receiving a JWT stored in an HTTP-only cookie.
3. **Protected Routes**: 
   - **Frontend**: Protected pages are only accessible to authenticated users.
   - **Backend**: API endpoints are secured with JWT middleware.
4. **Logout**: Clears the JWT cookie and redirects to the login page.

---

## 🧪 Testing

To test the application:

1. **Frontend**: Use Next.js's built-in testing tools or frameworks like Jest.
2. **Backend**: Test API endpoints using tools like Postman or cURL.
3. **Database**: Verify data persistence in your MySQL database.

Example API request:

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"yourpassword"}'
```

---

## 🚧 Future Enhancements

- Add password reset functionality.
- Implement role-based access control (RBAC).
- Add frontend form validation with libraries like Formik or React Hook Form.
- Integrate a UI library (e.g., Material-UI, Chakra UI) for enhanced styling.
- Add unit and integration tests for both frontend and backend.

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.


---

## 📧 Contact

For questions or feedback, reach out via:

- **GitHub Issues**: [Create an issue](https://github.com/your-username/your-repo-name/issues)
- **Email**: dasunpramodya616@gmail.com

---

**Happy Coding!** 🎉

