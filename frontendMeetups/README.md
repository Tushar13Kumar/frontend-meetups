# 🚀 Frontend Meetups

![React](https://img.shields.io/badge/Frontend-React-blue)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![Express](https://img.shields.io/badge/API-Express-black)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![Status](https://img.shields.io/badge/Project-Active-success)

---

A **full-stack meetup platform** to explore, view, and manage tech meetups with detailed event information.

---

## 🌐 Live Demo

🔗 https://frontend-meetups.vercel.app/

---

## ⚡ Quick Start

```bash
git clone https://github.com/Tushar13Kumar/frontend-meetups.git
cd frontend-meetups/frontendMeetups
npm install
npm run dev
```

---

## ⚙️ Environment Setup

### 📁 Backend Setup

1. Clone backend project:

```bash
git clone https://github.com/Tushar13Kumar/backend-meetup.git
cd backend-meetup
```

2. Install dependencies:

```bash
npm install
```

---

## 🔐 .env Configuration (IMPORTANT)

Create a `.env` file in backend root:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

---

3. Add dotenv in entry file:

```js
require("dotenv").config();
```

---

4. Run backend:

```bash
node index.js
```

---

### 🌐 Frontend Setup

```bash
cd frontendMeetups
npm install
npm run dev
```

---

### 🔗 Connecting Frontend & Backend

Backend runs on:

```
http://localhost:5000
```

Set API URL in frontend:

```js
const BASE_URL = "http://localhost:5000";
```

---

## 🛠️ Tech Stack

### Frontend
- React JS
- Vite

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

---

## ✨ Features

### 🏠 Homepage

- Displays all meetup events
- Shows event title, type, and thumbnail
- Supports both online and offline events

---

### 📄 Event Details Page

- Shows complete event information
- Includes description, speakers, tags, and pricing
- Displays host and event duration

---

### 🔄 Dynamic Data Fetching

- Fetches meetups from backend API
- Loads event details dynamically based on selection

---

### ✏️ Update Functionality

- Allows updating meetup data via API
- Supports updating both event listing and details

---

## 🔗 API Reference

### 📌 Get All Meetups

```
GET /meetups
```

#### ✅ Sample Response

```json
[
  {
    "_id": "1",
    "title": "AI & Machine Learning Summit 2025",
    "eventType": "Online",
    "thumbnail": "https://picsum.photos/id/1/300"
  }
]
```

---

### 📌 Get Meetup Details

```
GET /meetups/:title
```

#### ✅ Sample Response

```json
{
  "title": "AI & Machine Learning Summit 2025",
  "host": "Tech Innovators Inc.",
  "details": "In-depth AI event",
  "price": "₹999",
  "speakers": [
    {
      "name": "Dr. Ayesha Kumar",
      "position": "AI Scientist"
    }
  ]
}
```

---

### 📌 Update Meetup

```
POST /meetups/:meetupId
```

---

### 📌 Update Meetup Details

```
POST /meetups/details/:title
```

---

## 📂 Folder Structure

```
frontendMeetups/
│── public/
│── src/
│── components/
│── pages/
│── services/
│── App.jsx
```

---

## 📬 Contact

📧 [tusharkumar74761@gmail.com](mailto:tusharkumar74761@gmail.com)

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!