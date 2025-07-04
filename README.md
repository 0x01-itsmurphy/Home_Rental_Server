# Home Rental Server API

A modern Node.js backend API for a home rental platform built with Express.js, MongoDB, and Cloudinary.

## Features

- **Authentication & Authorization**: JWT-based authentication with bcrypt password hashing
- **File Upload**: Cloudinary integration for image uploads
- **Database**: MongoDB with Mongoose ODM
- **Security**: Helmet, CORS, and rate limiting
- **Modern JavaScript**: ES6+ features with async/await
- **Input Validation**: Comprehensive request validation
- **Error Handling**: Centralized error handling

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT, bcrypt
- **File Storage**: Cloudinary
- **Security**: Helmet, CORS, express-rate-limit
- **Development**: Nodemon, ESLint

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Home_Rental_Server
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:
```env
PORT=3000
NODE_ENV=development
MONGODB_URL=mongodb://localhost:27017/home_rental_db
CLOUD_NAME=your_cloud_name
API_KEY=your_api_key
API_SECRET=your_api_secret
JWT_SECRET=your_jwt_secret_key_here
BCRYPT_SALT_ROUNDS=10
```

5. Start the server:
```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### Authentication
- `POST /profile/signup` - Register a new user
- `POST /profile/signin` - Login user
- `GET /profile/auth/:username` - Get user profile (requires auth)

### Posts/Properties
- `GET /posts/` - Get all posts
- `GET /posts/:id` - Get single post by ID
- `POST /posts/add` - Create new post (requires auth)

### Admin/CRUD
- `GET /api/getallposts` - Get all posts (admin)
- `DELETE /api/delete/:username` - Delete user (admin)
- `GET /api/checkusername/:username` - Check username availability

### Utility
- `GET /` - API information
- `GET /health` - Health check

## Project Structure

```
Home_Rental_Server/
├── models/
│   ├── data_model.js      # Property/rental data model
│   └── user_model.js      # User model
├── routes/
│   ├── user_route.js      # Authentication routes
│   ├── data_route.js      # Property management routes
│   ├── crud_route.js      # CRUD operations
│   └── new.js             # Utility routes
├── checkToken.js          # JWT middleware
├── config.js              # App configuration
├── index.js               # Main server file
├── package.json           # Dependencies
└── .env.example           # Environment variables template
```

## Request/Response Examples

### Register User
```bash
POST /profile/signup
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "secure_password"
}
```

### Login User
```bash
POST /profile/signin
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "secure_password"
}
```

### Create Property Post
```bash
POST /posts/add
Content-Type: multipart/form-data
Authorization: Bearer <token>

{
  "username": "john_doe",
  "owner": "John Doe",
  "rent": "1200",
  "size": "2BHK",
  "address": "123 Main St",
  "city": "New York",
  "apartment": "Sunset Apartments",
  "phone": "+1234567890",
  "description": "Beautiful apartment...",
  "picture": <file>
}
```

## Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **JWT**: Secure token-based authentication
- **bcrypt**: Password hashing with salt
- **Input Validation**: Request validation and sanitization

## Development

### Scripts
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

### Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| PORT | Server port | No (default: 3000) |
| NODE_ENV | Environment mode | No (default: development) |
| MONGODB_URL | MongoDB connection string | Yes |
| CLOUD_NAME | Cloudinary cloud name | Yes |
| API_KEY | Cloudinary API key | Yes |
| API_SECRET | Cloudinary API secret | Yes |
| JWT_SECRET | JWT secret key | Yes |
| BCRYPT_SALT_ROUNDS | bcrypt salt rounds | No (default: 10) |

## License

This project is licensed under the ISC License.

## Support

For support, please open an issue in the repository or contact the maintainers. 