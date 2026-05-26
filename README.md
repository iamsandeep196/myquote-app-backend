# 🌟 MyQuote

A modern full-stack social quote sharing platform built with **React.js, Node.js, Express.js, and MongoDB**.  
Users can create quotes, follow creators, upload profile backgrounds, and interact through a secure authentication system.

---

# 🚀 Features

✨ User Authentication (JWT + Cookies)  
🔒 Protected Routes  
📝 Create & Share Quotes  
👥 Follow / Unfollow Users  
🖼️ Profile & Background Images  
☁️ Image Upload with ImageKit  
🚪 Secure Logout System  
⚡ Fast & Responsive UI  

---

# 🛠️ Tech Stack

## 🎨 Frontend
- React.js
- React Router DOM
- Fetch API
- CSS / Tailwind CSS

## ⚙️ Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Cookie Parser

---

# 🔐 Authentication Flow

```text
User Login
   ↓
JWT Token Generated
   ↓
Token Stored in httpOnly Cookie
   ↓
Auth Middleware Verifies Token
   ↓
Protected Routes Accessible
