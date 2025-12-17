# E-Commerce Platform - MERN Stack

A full-stack e-commerce platform built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring user authentication, product management, shopping cart, and order processing.

## Features

- ✅ User Authentication (Register, Login, JWT)
- ✅ Protected Routes
- ✅ Modern UI with Tailwind CSS
- ✅ MongoDB Database with Mongoose
- ✅ RESTful API
- ✅ Password Hashing with bcryptjs
- ✅ Responsive Design
- 🚧 Product Management (Coming Soon)
- 🚧 Shopping Cart (Coming Soon)
- 🚧 Order Processing (Coming Soon)

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **React Router** - Routing
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Toastify** - Notifications

## Project Structure

```
E-Commerce-Platform/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Category.js
│   │   ├── Cart.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── users.js
│   ├── middleware/
│   │   └── auth.js
│   ├── .env
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Register.jsx
    │   │   ├── Login.jsx
    │   │   ├── Navbar.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── pages/
    │   │   ├── HomePage.jsx
    │   │   └── Dashboard.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── utils/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── package.json
    └── vite.config.js
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

### 1. Clone the Repository

```bash
git clone <repository-url>
cd E-Commerce-Platform---CSE2512
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file (if not already created)
# Add the following variables:
# MONGO_URI=mongodb://localhost:27017/ecommerce
# JWT_SECRET=your_super_secret_jwt_key_here
# PORT=5000
# NODE_ENV=development

# Start the backend server
npm run dev
```

The backend server will run on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:3000`

### 4. MongoDB Setup

**Option 1: Local MongoDB**
- Install MongoDB on your system
- Start MongoDB service
- Use connection string: `mongodb://localhost:27017/ecommerce`

**Option 2: MongoDB Atlas (Cloud)**
- Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a cluster
- Get your connection string
- Update `MONGO_URI` in backend `.env` file

## API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| GET | `/api/auth/me` | Get current user | Private |

### User Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/users/profile` | Get user profile | Private |
| PUT | `/api/users/profile` | Update user profile | Private |

## Usage

1. **Register a new account**: Navigate to `/register` and create a new account
2. **Login**: Use your credentials to login at `/login`
3. **Dashboard**: After login, you'll be redirected to your dashboard
4. **Protected Routes**: Try accessing `/dashboard` without logging in - you'll be redirected to login

## Environment Variables

### Backend (.env)

```env
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_super_secret_jwt_key_here
PORT=5000
NODE_ENV=development
```

## Scripts

### Backend

```bash
npm start       # Start server (production)
npm run dev     # Start server with nodemon (development)
```

### Frontend

```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run preview # Preview production build
```

## Development Notes

### Adding New Features

1. **Backend**: Add routes in `backend/routes/`, models in `backend/models/`
2. **Frontend**: Add components in `frontend/src/components/`, pages in `frontend/src/pages/`

### Authentication Flow

1. User registers/logs in
2. Backend generates JWT token
3. Token stored in localStorage
4. Token sent with each request via axios interceptor
5. Backend middleware verifies token for protected routes

## Security Features

- Password hashing with bcryptjs (10 salt rounds)
- JWT token authentication
- Protected API routes
- Input validation with express-validator
- CORS enabled
- Secure HTTP headers

## Future Enhancements

- [ ] Product catalog with categories
- [ ] Shopping cart functionality
- [ ] Order management
- [ ] Payment integration
- [ ] Admin dashboard
- [ ] Product reviews and ratings
- [ ] Wishlist
- [ ] Order tracking
- [ ] Email notifications
- [ ] Password reset functionality

## Troubleshooting

**MongoDB Connection Issues**
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify network access (for Atlas)

**Port Already in Use**
- Change PORT in backend `.env`
- Change port in frontend `vite.config.js`

**CORS Issues**
- Backend already has CORS enabled
- Check if ports match in frontend `api.js`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Contact

For questions or support, please contact the development team.

---

**Note**: This is a project for CSE2512 - Software Security. Make sure to review and implement additional security measures before deploying to production.
