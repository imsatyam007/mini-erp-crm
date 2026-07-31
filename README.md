# 🚀 Mini ERP + CRM

A full-stack **Enterprise Resource Planning (ERP)** and **Customer Relationship Management (CRM)** application built with modern web technologies. This project provides secure role-based authentication and comprehensive modules for customer management, product management, inventory tracking, and sales challan management.

---

## 📌 Overview

Mini ERP + CRM is designed to streamline business operations by providing a centralized platform for managing customers, products, inventory, and sales. The application follows a clean architecture with separate frontend and backend services and implements secure authentication with role-based access control.

---

## ✨ Features

### 🔐 Authentication & Authorization

- JWT Authentication
- Secure Login & Logout
- Password Hashing using bcrypt
- Protected Routes
- Role-Based Access Control (RBAC)

### 👥 User Roles

- 👑 Admin
- 💼 Sales
- 📦 Warehouse
- 💰 Accounts

### 📊 Dashboard

- Responsive Dashboard
- Fixed Sidebar
- Fixed Header
- Role-Based Navigation

### 👤 Customer Management

- Add Customer
- View Customer Details
- Update Customer
- Delete Customer
- Search Customers

### 📦 Product Management

- Add Product
- View Products
- Update Product
- Delete Product

### 📦 Inventory Management

- Stock In
- Stock Out
- Inventory Movement History
- Stock Validation
- Prevent Negative Stock

### 📄 Sales Challan

- Create Sales Challans
- Multiple Products per Challan
- Auto Challan Number Generation
- Draft & Confirm Status
- Product Snapshot

---

# 🛠 Tech Stack

## Frontend

- React
- TypeScript
- Vite
- React Router DOM
- React Query
- Axios
- React Hook Form
- Zod
- Tailwind CSS

## Backend

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- JWT Authentication
- bcrypt

## Database

- PostgreSQL

---

# 📂 Project Structure

```text
mini-erp-crm/
│
├── 📂 frontend/
│   ├── 📂 src/
│   │   ├── 📂 api
│   │   ├── 📂 components
│   │   │   ├── common
│   │   │   ├── forms
│   │   │   ├── layout
│   │   │   ├── tables
│   │   │   └── ui
│   │   ├── 📂 constants
│   │   ├── 📂 context
│   │   ├── 📂 hooks
│   │   ├── 📂 layouts
│   │   ├── 📂 lib
│   │   ├── 📂 pages
│   │   │   ├── auth
│   │   │   ├── customers
│   │   │   ├── products
│   │   │   ├── inventory
│   │   │   ├── challans
│   │   │   ├── dashboard
│   │   │   └── not-found
│   │   ├── 📂 routes
│   │   ├── 📂 schemas
│   │   ├── 📂 services
│   │   ├── 📂 styles
│   │   ├── 📂 types
│   │   ├── 📂 utils
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── package.json
│   └── vite.config.ts
│
├── 📂 server/
│   ├── 📂 prisma
│   ├── 📂 src/
│   │   ├── 📂 config
│   │   ├── 📂 lib
│   │   ├── 📂 middleware
│   │   ├── 📂 modules
│   │   │   ├── auth
│   │   │   ├── customers
│   │   │   ├── products
│   │   │   ├── inventory
│   │   │   ├── stockMovements
│   │   │   └── challans
│   │   ├── 📂 routes
│   │   ├── 📂 types
│   │   ├── 📂 utils
│   │   ├── app.ts
│   │   └── server.ts
│   │
│   ├── package.json
│   └── tsconfig.json
│
├── README.md
└── package.json
```

---

# ⚙️ Installation

## Clone the Repository

```bash
git clone https://github.com/imsatyam007/mini-erp-crm.git

cd mini-erp-crm
```

---

## Backend Setup

```bash
cd server

npm install
```

Create a `.env` file:

```env
PORT=5000

DATABASE_URL=your_postgresql_database_url

JWT_SECRET=your_secret_key
```

Generate Prisma Client

```bash
npx prisma generate
```

Run Database Migrations

```bash
npx prisma migrate dev
```

Start the Backend Server

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd frontend

npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the Frontend

```bash
npm run dev
```

---

# 🔑 Default User Roles

| Role | Access |
|------|--------|
| 👑 Admin | Full System Access |
| 💼 Sales | Customers, Sales Challans |
| 📦 Warehouse | Products, Inventory |
| 💰 Accounts | Accounts Module |

---

# 📡 API Modules

- Authentication
- Customers
- Products
- Inventory
- Stock Movements
- Sales Challans

---

# 📸 Screenshots

> Screenshots will be added after deployment.

Suggested screenshots:

- Login Page
- Dashboard
- Customer Management
- Product Management
- Inventory Management
- Sales Challans

---

# 🚀 Future Enhancements

- Dashboard Analytics
- Reports & Charts
- Export to Excel
- PDF Challan Generation
- Email Notifications
- Audit Logs
- Dark Mode
- Responsive Mobile Layout

---

# 👨‍💻 Author

**Satyam Choudhary**

- GitHub: https://github.com/imsatyam007

---

# ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub.

---

# 📄 License

This project was developed for learning and portfolio purposes.