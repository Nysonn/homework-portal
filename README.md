# Homework Portal

A comprehensive homework management system that enables teachers and students to efficiently manage, upload, and track homework assignments with AI-powered recommendations.

## Overview

Homework Portal is a full-stack web application designed to streamline homework management for educational institutions. The platform provides an intuitive interface for teachers to upload assignments and students to access them, enhanced with AI-driven content recommendations.

## Features

- **User Authentication** - Secure login and signup system with role-based access (Teacher/Student)
- **Homework Management** - Upload, view, download, and delete homework assignments
- **Class & Subject Organization** - Organized homework by class and subject categories
- **AI-Powered Recommendations** - Get intelligent suggestions for homework content
- **Cloud Storage** - Homework files stored securely on Cloudinary
- **Responsive Design** - Mobile-friendly interface built with modern UI/UX principles

## Tech Stack

### Frontend
- **React** - UI framework
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Vite** - Build tool and development server
- **Tailwind CSS** - Styling (inferred from project structure)

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **Sequelize** - ORM for database operations
- **PostgreSQL** - Database (Neon serverless)
- **Cloudinary** - File storage and management
- **Multer** - File upload handling
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **OpenAI/LlamaAI** - AI recommendations

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Firebase** - Frontend hosting
- **Render** - Backend hosting

## Prerequisites

Before running this project, ensure you have the following installed:

- Node.js (v18 or higher)
- npm or yarn
- Docker and Docker Compose (for containerized deployment)
- PostgreSQL (if running without Docker)

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd homework-portal
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend` directory.

### 3. Frontend Setup

```bash
cd Frontend
npm install
```

## Running the Application

### Development Mode

#### Backend (Traditional)
```bash
cd Backend
node index.js
```

#### Backend (Docker)
```bash
cd Backend
make dev
```

Available Docker commands:
- `make dev` - Start backend in development mode
- `make dev-detached` - Start in detached mode
- `make stop` - Stop all services
- `make down` - Stop and remove containers
- `make logs` - View logs
- `make help` - See all available commands

#### Frontend
```bash
cd Frontend
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3001

## Project Structure

```
homework-portal/
├── Backend/
│   ├── config/
│   │   ├── cloudinary.js      # Cloudinary configuration
│   │   ├── database.js         # Database connection
│   │   └── multer.js           # File upload configuration
│   ├── controllers/
│   │   ├── homeworkController.js
│   │   └── userController.js
│   ├── models/
│   │   ├── homework.js
│   │   └── User.js
│   ├── routes/
│   │   ├── aiRecommendation.js
│   │   ├── homeworkRoutes.js
│   │   └── userRoutes.js
│   ├── .dockerignore
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── Makefile
│   ├── index.js                # Entry point
│   └── package.json
│
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   └── homeworkAPI.js
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── ClassSubjects/
│   │   │   ├── Dashboard/
│   │   │   ├── HomeworkList/
│   │   │   ├── Login/
│   │   │   └── Signup/
│   │   ├── hooks/
│   │   │   ├── useAiRecommendation.js
│   │   │   └── useHomework.js
│   │   ├── slices/
│   │   │   └── authSlice.js
│   │   ├── Store/
│   │   │   └── store.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## Database

The application uses PostgreSQL hosted on Neon (serverless PostgreSQL). Sequelize ORM handles database operations and automatically syncs models on startup.

### Models
- **User** - Stores user authentication and role information
- **Homework** - Stores homework assignments with metadata

## API Endpoints

### Authentication
- `POST /api/signup` - Create a new user account
- `POST /api/login` - Authenticate user
- `GET /api/session` - Check current session

### Homework
- `GET /api/homework?class={class}&subject={subject}` - Fetch homework
- `POST /api/homework?class={class}&subject={subject}` - Upload homework
- `DELETE /api/homework/:id` - Delete homework

### AI Recommendations
- `POST /api/ai-recommendation` - Get AI-powered content recommendations

## Deployment

### Frontend (Firebase)
```bash
cd Frontend
npm run build
firebase deploy
```

### Backend (Render)
The backend is deployed on Render and accessible at:
```
https://homework-portal-71ei.onrender.com
```

### Backend (Docker)
For production deployment using Docker:
```bash
cd Backend
docker-compose up -d
```

## Environment Variables

Ensure all required environment variables are set in production:

**Backend:**
- `DATABASE_URL` - PostgreSQL connection string
- `SESSION_SECRET` - Secret key for session management
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret
- `OPENAI_API_KEY` or `LLAMA_API_KEY` - AI service API key
- `PORT` - Server port (default: 3001)

**Frontend:**
- Update API base URL in source files to point to production backend

## Security Considerations

- All passwords are hashed using bcrypt
- JWT tokens for authentication
- Session-based authentication with secure cookies
- Environment variables for sensitive data
- CORS configuration for allowed origins
- SQL injection protection via Sequelize ORM

## Support

For issues or questions, please contact the development team.

---

**Copyright © 2026. All rights reserved.**
