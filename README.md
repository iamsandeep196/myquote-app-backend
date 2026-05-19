
# MyQuoteApp Backend

A scalable and feature-rich backend API for a modern quote sharing platform built with Node.js, Express.js, and MongoDB.  
This backend powers authentication, quote management, comments, likes, follows, image uploads, and secure REST APIs.

Designed with clean architecture, reusable code structure, and real-world backend development practices.

## Features

- 🔐 Secure User Authentication using JWT
- 📝 Users can create and manage quotes
- 🖼️ Upload quote images using ImageKit
- 🛡️ Protected routes with authentication middleware
- 💬 Users can comment on quotes
- ❌ Users can delete their own comments
- ❤️ Like and unlike quotes
- 👥 Follow and unfollow users
- 🔍 Search users by username
- 🍃 MongoDB database integration
- 🌐 RESTful API architecture
- 📦 Organized folder structure
- ⚡ Async error handling
- 🔑 Password hashing using bcrypt
- 📡 JSON-based API responses
- 🧪 API testing with Postman

## 🛠️ Tech Stack & Tools

- ⚡ **Node.js** — Powerful JavaScript runtime for building scalable backend applications  
- 🚀 **Express.js** — Minimal and fast framework for creating REST APIs and server-side applications  
- 🍃 **MongoDB & Mongoose** — NoSQL database with elegant data modeling and schema management  
- 🔐 **JWT Authentication** — Secure authentication and authorization using JSON Web Tokens  
- 📁 **Multer** — Middleware for handling multipart/form-data and file uploads  
- 🖼️ **ImageKit** — Cloud image storage, optimization, and image delivery service  
- 🧪 **Postman** — API testing, debugging, and endpoint management  
- 🔧 **Git & GitHub** — Distributed version control and project collaboration tools


## 📂 Folder Structure

```bash
backend/
│
├── controllers/     # Business logic and controllers
├── models/          # Database schemas and models
├── routes/          # API route definitions
├── middlewares/     # Custom middleware functions
├── validations/     # Request validation schemas
├── utils/           # Utility/helper functions
├── config/          # Database and third-party configurations
├── .env             # Environment variables
├── app.js           # Express app configurat  
├── package.json     # Project metadata and dependencies
└── package-lock.json
```

## ⚙️ Installation

Clone the repository and install all dependencies.

```bash
git clone https://github.com/iamsandeep196/myquote-app-backend.git

cd myquote-app-backend

npm install
```

---

## 🔑 Environment Variables

Create a `.env` file in the root directory and add the following environment variables.

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret_key

IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

---

## Run Locally

Start the development server.

```bash
node app.js
```

Server will run on:

```bash
http://localhost:3000
```

---

## 📡 API Endpoints

### 🔐 Authentication Routes

| Method | Endpoint |
|---|---|
| POST | /api/auth/register |
| POST | /api/auth/login |
| GET | /api/auth/user |

---

### 📝 Quote Routes

| Method | Endpoint |
|---|---|
| POST | /api/create |
| GET | /api/quotes |
| GET | /api/quotes/:id |
| DELETE | /api/quotes/:id |

---

### 💬 Comment Routes

| Method | Endpoint |
|---|---|
| POST | /api/comments/:quoteId |
| DELETE | /api/comments/:commentId |

---

### ❤️ Toggle Like Routes

| Method | Endpoint |
|---|---|
| POST | /api/quotes/:id/like |

---

### 👥 Toggle Follow Routes

| Method | Endpoint |
|---|---|
| POST | /api/users/:id/follow |

---

### 🔍 Search User Route

| Method | Endpoint |
|---|---|
| GET | /api/auth/users/search?name=sandeep |

---
## 🚧 Project Status

This project is actively under development.  
New features, optimizations, and improvements are being added regularly.


## 👨‍💻 Author

Developed with ❤️ by Sandeep Bharati



