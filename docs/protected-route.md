# MyQuoteApp

MyQuoteApp is a full-stack social quote sharing application built using the MERN stack. Users can create accounts, log in securely using JWT authentication, post quotes, follow other users, and interact with the quote feed.

The frontend is built with React, React Router, Tailwind CSS, and DaisyUI, while the backend uses Node.js, Express.js, MongoDB, and Mongoose.

The project helped me learn:
- React component architecture
- Protected routes
- JWT authentication with cookies
- REST APIs
- MongoDB relationships
- Follow system logic
- Frontend and backend integration
- State management using React hooks
- Handling async operations and API calls

---

# Problems Faced & Learnings

## 🐛 Issue: Post Background Image Not Showing

### ❓ Problem
If the user does not select a background image while creating a post, the post is created successfully but no background image is displayed.

### 🔍 Cause
The application was not handling cases where the background image field was empty or undefined.

### 💡 Solution
Implemented a default background image fallback when no image is selected by the user.

```js
const bgImage = userBackground || defaultBackground;


```
- Problem what i have faced during in development

- 1-problem After logout, pressing browser back button was showing protected pages again.
- Reason 
- Protected pages were still present in browser history and cache. and i was not cheking user is logged in or not 

- solution 
- i created protectedRoute.jsx file and i fetched getMe api to check user is logged in or not then
i called <Quotes/> components inside the protected route in App.jsx file.

```js

 <Route path="/quotes" element={<ProtectedRoute> <Quotes /></ProtectedRoute>} />


```
