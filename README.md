💰 FinanceControl (Monetric)

A full-stack financial management system to track income, expenses, and analytics with role-based access.

🚀 Tech Stack
🖥️ Backend
Spring Boot (Java)
Spring Security + JWT Authentication
MySQL Database
Cloudinary (Image Upload)
🎨 Frontend
React.js
Tailwind CSS
Bootstrap
🔗 API Documentation
Postman Collection:
https://www.postman.com/jatinchaurasiya/financecontrol-api/request/45012710-71993ce7-8adb-4d30-9d6d-f461dc4669c2?sideView=agentMode
👤 Default Admin Credentials
Email: admin@gmail.com
Password: admin123
✨ Features
🔑 Admin (Analyst Role)
Dashboard (Total Balance, Income, Expense)
Add / Update Categories
Add Income for any Analyst
Add Expense for any Analyst
Delete Income & Expense
Track all transactions
Advanced Filters (date, type, analyst, sorting)
Ban / Unban Analysts
Analytics

comment karke likho jaise readme likhte hai 

Samajh gaya — tu chah raha hai proper GitHub README style with comments + clean markdown (no code block mess) 👇
Ye final version hai — direct paste kar:

💰 FinanceControl (Monetric)

A full-stack financial management system to track income, expenses, and analytics with role-based access.

🚀 Tech Stack
🖥️ Backend
Spring Boot (Java)
Spring Security + JWT Authentication
MySQL Database
Cloudinary (Image Upload)
🎨 Frontend
React.js
Tailwind CSS
Bootstrap
🔗 API Documentation
Postman Collection:
https://www.postman.com/jatinchaurasiya/financecontrol-api/request/45012710-71993ce7-8adb-4d30-9d6d-f461dc4669c2?sideView=agentMode
👤 Default Admin Credentials
Email: admin@gmail.com
Password: admin123
✨ Features
🔑 Admin (Analyst Role)
Dashboard (Total Balance, Income, Expense)
Add / Update Categories
Add Income for any Analyst
Add Expense for any Analyst
Delete Income & Expense
Track all transactions
Advanced Filters (date, type, analyst, sorting)
Ban / Unban Analysts
Analytics Dashboard

📸 Admin Dashboard


👤 Analyst / User
View personal dashboard
Add Income
Add Expense
Filter transactions

📸 User Dashboard


🔍 Filters
Filter by Type (Income / Expense)
Date Range filter
Sort (Date, Amount)
Filter by Analyst

📸 Filters


⚙️ Project Setup
📥 Clone Repository

Clone the repository:

git clone https://github.com/Jatin-chaurasiya/FinanceControl.git

Move into project folder:

cd FinanceControl
🔧 Backend Setup (Spring Boot)
➤ Step 1: Navigate to backend
cd backend
➤ Step 2: Configure properties
Copy file:
application.properties.example → application.properties

Update required fields:

spring.datasource.username=your_db_username
spring.datasource.password=your_db_password
jwt.secret=your_secret_key
➤ Step 3: Run Backend

Using Maven:

mvn spring-boot:run
OR run MoneymanagerApplication.java from IDE
💻 Frontend Setup
➤ Step 1: Navigate to frontend
cd frontend
➤ Step 2: Install dependencies
npm install
➤ Step 3: Run project
npm run dev
🗄️ Database Setup

Create database:

CREATE DATABASE moneymanager;
Tables will be auto-created using Hibernate
⚡ Quick Setup (For Reviewer)

To run quickly, only update:

Database username & password
JWT secret (any random string)

Optional (can skip):

Mail configuration
Google OAuth
Cloudinary
⚠️ Important Notes
Backend is not deployed (free-tier limitation)
Project runs locally
APIs tested via Postman
🚀 Future Improvements
Deploy backend (Docker + Cloud)
Add activity logs
Pagination & analytics
Improve UI/UX
