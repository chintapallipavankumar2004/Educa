- **Frontend (React)**: SPA built with Create React App, uses `useState`, `useEffect`, and `fetch` with `credentials: 'include'`.  
- **Backend (Spring Boot)**: REST APIs, session handling with `spring-session-jdbc`, password hashing (BCrypt).  
- **Database (MySQL)**: Stores users, videos, images, contacts, and sessions.  

---

## 🚀 Tech Stack
- **Frontend**: React (CRA, JavaScript)  
- **Backend**: Spring Boot (Java 17, Maven)  
- **Database**: MySQL + JDBC (spring-session-jdbc)  
- **Auth**: Cookie-based sessions (HTTP-only)  

---

## ⚡ Quick Start

### Backend
```bash
# Requirements: Java 17, Maven, MySQL
cd server-java
mvn spring-boot:run


--------------------------CLEAR EXPLANATION-----------------------------------------------------------


# 🎓 Educa – E-Learning Platform with Stress Relief

Educa is an **e-learning platform specially designed for people with mental health challenges**.  
It not only provides **subject learning through video, audio, and images** but also integrates a **comfort room** for stress relief, where learners can play music and relax when they feel low.  

The project demonstrates a **full-stack application** using **React (frontend)**, **Spring Boot (backend)**, and **MySQL (database)** with **secure session management**.

---

## 📖 Table of Contents
1. [Features](#-features)  
2. [Architecture](#-architecture)  
3. [Tech Stack](#-tech-stack)  
4. [Project Setup](#-project-setup)  
   - [Backend Setup](#backend-setup)  
   - [Frontend Setup](#frontend-setup)  
   - [Database Setup](#database-setup)  
5. [API Endpoints](#-api-endpoints)  
6. [Database Schema](#-database-schema)  
7. [Session Management](#-session-management)  
8. [Security](#-security)  
9. [Future Enhancements](#-future-enhancements)  
10. [Author](#-author)  

---

## ✨ Features
- 📚 **Learning Modules**
  - Learn through **videos, audios, and images**.
  - Simple and user-friendly UI for students.

- 🎶 **Comfort Room**
  - Unique feature for stress relief.
  - Students can play relaxing music and calm down before continuing studies.

- 👥 **User Authentication**
  - Secure registration, login, logout, and session-based authentication.
  - Session cookies are HTTP-only for security.

- 🛠️ **Admin Panel**
  - Upload videos/images.
  - Promote users to admin using `ADMIN_SECRET`.

- 📩 **Contact Form**
  - Allows students to reach out to admins.
  - Submissions stored in database.

---

## 🏗️ Architecture

--->React Frontend (CRA) <--> Spring Boot Backend (REST APIs) <--> MySQL Database



- **Frontend (React)**  
  - Built with Create React App.  
  - Uses **React Hooks** (`useState`, `useEffect`) to manage UI state and fetch data.  
  - Communicates with backend via `fetch` API using `{ credentials: 'include' }` for session cookies.  

- **Backend (Spring Boot)**  
  - Exposes RESTful APIs for authentication, content management, and contacts.  
  - Uses **Spring Session JDBC** to store sessions in MySQL.  
  - Passwords hashed using **BCrypt**.  
  - Admin actions protected with `ADMIN_SECRET`.  

- **Database (MySQL)**  
  - Stores users, videos, images, contact messages, and sessions.  
  - JDBC ensures secure connectivity between Spring Boot and MySQL.  

---

## 🚀 Tech Stack
- **Frontend**: React, JavaScript, Create React App  
- **Backend**: Java 17, Spring Boot, Maven  
- **Database**: MySQL, JDBC, Spring Session JDBC  
- **Authentication**: Session cookies (HTTP-only)  
- **Build Tools**: Maven, npm  

---

## ⚡ Project Setup

### Backend Setup
1. **Requirements**: Java 17, Maven, MySQL.  
2. **Create database**:
   ```sql
   CREATE DATABASE educadb;



---->Environment variables (.env file at root):
DB_HOST=localhost
DB_PORT=3306
DB_NAME=educadb
DB_USER=root
DB_PASS=yourpassword
ADMIN_SECRET=some_secret




----> Run backend:
cd server-java
mvn spring-boot:run






---->Database connectivity check (optional):
mvn package
java -jar target/spring-db-check-0.0.1-SNAPSHOT.jar







----->Frontend Setup

Requirements: Node.js, npm.

Install dependencies:

cd client
npm install
Start app: npm start






------>Database Setup
Educa uses the following tables (see Database Schema
).
Additionally, Spring Session creates spring_session and spring_session_attributes.



----->🔑 API Endpoints
Auth

POST /api/auth/register → Register a user

POST /api/auth/login → Login (sets session cookie)

POST /api/auth/logout → Logout (invalidates session)

GET /api/auth/me → Get current logged-in user

Content

GET /api/videos → Fetch all videos

GET /api/images → Fetch all images

Contact

POST /api/contact → Submit contact form

Admin

POST /api/admin/videos → Upload new video

POST /api/admin/images → Upload new image

POST /api/admin/promote → Promote user to admin (requires ADMIN_SECRET)

GET /api/admin/me → Get current admin info






----->🗝️ Session Management

On login, backend creates a session and sets an HTTP-only cookie.

Session data is stored in MySQL (spring-session-jdbc).

Frontend sends requests with credentials: 'include' to include session cookie.

Sessions allow multiple backend instances to share authentication state.







----->🔐 Security

Passwords hashed with BCrypt.

HTTP-only cookies prevent client-side script access.

Sessions persisted in DB for scalability.

ADMIN_SECRET required to promote users.

CORS configured to allow frontend access securely.





----->🌱 Future Enhancements

🤖 AI-powered chatbot for student guidance.

📊 Progress tracking & learning analytics.

🎮 More comfort room mini-games.

📱 Mobile-responsive UI.




----->👨‍💻 Author
Chintapalli Pavan Kumar

Full Stack Developer

React ⚡ Spring Boot ⚡ MySQL

Project built for interview showcase & real-world use case.
