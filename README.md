# 🚀 URL Shortener

A modern and secure URL Shortener built with **Node.js, Express.js, MongoDB Atlas, JWT Authentication, and EJS**.

Users can create an account, log in securely, shorten long URLs, and track click analytics for every generated link.

---

## 🌐 Live Demo

https://url-shortner-ihtr.onrender.com

---

## 📂 GitHub Repository

https://github.com/Adityakirar04/url-shortner

---

# ✨ Features

- 🔐 User Authentication (JWT + Cookies)
- 👤 User Signup & Login
- 🔗 Generate Short URLs
- 📈 Track URL Click Analytics
- 👥 User-specific Dashboard
- 🌍 Redirect to Original URL
- 💾 MongoDB Atlas Database
- 🎨 Responsive Glassmorphism UI
- ☁️ Render Deployment
- 🛡️ Helmet Security
- 🚦 Express Rate Limiting
- 🍪 Cookie Authentication
- 📱 Mobile Friendly

---

# 🛠️ Tech Stack

### Frontend

- HTML5
- CSS3
- EJS

### Backend

- Node.js
- Express.js

### Database

- MongoDB Atlas
- Mongoose

### Authentication

- JWT
- Cookie Parser

### Deployment

- Render


# 📁 Project Structure

 
URL-Shortener
│
├── controllers
│   ├── url.js
│   └── user.js
│
├── middlewares
│   └── auth.js
│
├── models
│   ├── url.js
│   └── user.js
│
├── routes
│   ├── url.js
│   ├── user.js
│   └── staticRouter.js
│
├── service
│   └── auth.js
│
├── public
│   └── css
│
├── views
│   ├── home.ejs
│   ├── login.ejs
│   ├── signup.ejs
│   └── error.ejs
│
├── .env
├── connect.js
├── index.js
├── package.json
└── README.md
```

---

# ⚙️ Installation

Clone the repository
bash
git clone https://github.com/Adityakirar04/url-shortner.git


Go to project folder

bash
cd url-shortner


Install dependencies

bash
npm install


Create a `.env` file

env
PORT=8001

MONGO_URL=Your_MongoDB_Connection_String

JWT_SECRET=YourSecretKey


Run the project

bash
npm start
 

or
 bash
npm run dev


# 📊 Workflow

```
User Signup
      │
      ▼
User Login
      │
      ▼
Generate Short URL
      │
      ▼
Store in MongoDB
      │
      ▼
User Shares Short URL
      │
      ▼
Visitor Opens URL
      │
      ▼
Redirect to Original URL
      │
      ▼
Click Stored in Analytics
```

---

# 🔒 Security Features

- JWT Authentication
- Cookie-based Sessions
- Helmet Middleware
- Express Rate Limiter
- Environment Variables
- MongoDB Atlas

# 🚀 Future Improvements

- QR Code Generation
- Copy URL Button
- Custom Short URL
- Password Hashing using bcrypt
- Forgot Password
- User Profile
- Delete URL
- Edit URL
- Charts & Analytics
- Dark / Light Mode

---

# 👨‍💻 Author

**Aditya Kirar**

GitHub

https://github.com/Adityakirar04
