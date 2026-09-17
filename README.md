# 🚀 Career Connect

<div align="center">

![Career Connect](https://img.shields.io/badge/Career-Connect-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-8.19.1-47A248?style=for-the-badge&logo=mongodb)

**A real-time collaborative coding interview platform with video calls, chat, and live code execution**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Project Structure](#-project-structure) • [API Documentation](#-api-documentation)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**Career Connect** is a full-stack web application designed to facilitate collaborative coding interviews and practice sessions. The platform enables users to create coding sessions, invite participants, and collaborate in real-time through integrated video calls, chat, and a shared code editor with live execution capabilities.

### Key Highlights

- 🎥 **Real-time Video Conferencing** - Powered by Stream.io for seamless video communication
- 💬 **Live Chat** - Integrated chat functionality for instant messaging during sessions
- 💻 **Collaborative Code Editor** - Monaco Editor with syntax highlighting and multi-language support
- ▶️ **Live Code Execution** - Execute code in multiple programming languages using Piston API
- 🔐 **Secure Authentication** - Clerk-based authentication with protected routes
- 📊 **Session Management** - Create, join, and manage coding sessions with problem tracking
- 📈 **Dashboard Analytics** - View active sessions, recent activity, and statistics

---

## ✨ Features

### 🏠 Dashboard

- **Welcome Section** - Personalized greeting with user information
- **Statistics Cards** - Overview of active sessions, completed sessions, and total problems solved
- **Active Sessions** - Browse and join available coding sessions
- **Recent Sessions** - View your recent session history
- **Create Session Modal** - Quick session creation with problem selection and difficulty levels

### 💻 Coding Session

- **Problem Selection** - Choose from curated coding problems (Easy, Medium, Hard)
- **Real-time Video Call** - Integrated video conferencing with Stream.io
- **Live Chat** - Communicate with session participants
- **Code Editor** - Feature-rich Monaco Editor with:
  - Syntax highlighting for multiple languages
  - Auto-completion and IntelliSense
  - Resizable panels for optimal workspace
- **Code Execution** - Run code in real-time with instant output
- **Session Management** - Host or join sessions, end sessions when complete

### 🔐 Authentication & Authorization

- **Clerk Integration** - Secure user authentication
- **Protected Routes** - Middleware-based route protection
- **User Profiles** - Profile management with Clerk

### 📱 Responsive Design

- **Modern UI** - Built with Tailwind CSS and DaisyUI
- **Mobile-Friendly** - Responsive design for all devices
- **Toast Notifications** - User-friendly feedback with react-hot-toast

---

## 🛠 Tech Stack

### Frontend

- **React 19.1.1** - Modern UI library
- **Vite 7.1.7** - Fast build tool and dev server
- **React Router 7.9.4** - Client-side routing
- **Tailwind CSS 4.1.14** - Utility-first CSS framework
- **DaisyUI 5.3.10** - Component library for Tailwind
- **Monaco Editor** - VS Code editor component
- **Stream.io SDK** - Video calling and chat
- **TanStack Query** - Data fetching and caching
- **Axios** - HTTP client
- **Lucide React** - Icon library
- **React Hot Toast** - Toast notifications
- **Canvas Confetti** - Celebration animations

### Backend

- **Node.js** - Runtime environment
- **Express 5.1.0** - Web framework
- **MongoDB** - Database (via Mongoose 8.19.1)
- **Clerk Express** - Authentication middleware
- **Stream.io Node SDK** - Backend video/chat integration
- **Inngest** - Background job processing
- **CORS** - Cross-origin resource sharing

### Infrastructure & Services

- **Clerk** - Authentication and user management
- **Stream.io** - Video calling and chat infrastructure
- **Piston API** - Code execution engine
- **MongoDB Atlas** - Cloud database (recommended)
- **Inngest** - Event-driven background jobs

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local or MongoDB Atlas)
- **Clerk Account** - [Sign up here](https://clerk.com)
- **Stream.io Account** - [Sign up here](https://getstream.io)
- **Piston API** - [Documentation](https://github.com/engineer-man/piston)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/devashishhaldar2006/career-connect.git
   cd career-connect
   ```

2. **Install dependencies**

   ```bash
   # Install root dependencies
   npm install

   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the `backend` directory:

   ```env
   PORT=5000
   NODE_ENV=development
   DB_URL=your_mongodb_connection_string
   CLIENT_URL=http://localhost:5173

   # Clerk Configuration
   CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key

   # Stream.io Configuration
   STREAM_API_KEY=your_stream_api_key
   STREAM_API_SECRET=your_stream_api_secret

   # Inngest Configuration (optional)
   INNGEST_EVENT_KEY=your_inngest_event_key
   INNGEST_SIGNING_KEY=your_inngest_signing_key
   ```

   Create a `.env` file in the `frontend` directory:

   ```env
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   VITE_STREAM_API_KEY=your_stream_api_key
   ```

4. **Start the development servers**

   **Backend:**

   ```bash
   cd backend
   npm run dev
   ```

   **Frontend:**

   ```bash
   cd frontend
   npm run dev
   ```

5. **Open your browser**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000`

---

## 📁 Project Structure

```
career-connect/
├── backend/
│   ├── src/
│   │   ├── controllers/        # Request handlers
│   │   │   ├── chatController.js
│   │   │   └── sessionController.js
│   │   ├── lib/                # Utility libraries
│   │   │   ├── db.js           # MongoDB connection
│   │   │   ├── env.js          # Environment variables
│   │   │   ├── inngest.js      # Inngest configuration
│   │   │   └── stream.js       # Stream.io client
│   │   ├── middlewares/        # Express middlewares
│   │   │   └── protectRoute.js # Authentication middleware
│   │   ├── models/             # Mongoose models
│   │   │   ├── Session.js
│   │   │   └── User.js
│   │   ├── routes/             # API routes
│   │   │   ├── chatRoutes.js
│   │   │   └── sessionRoutes.js
│   │   └── server.js           # Express app entry point
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── api/                # API client functions
│   │   │   └── sessions.js
│   │   ├── components/         # React components
│   │   │   ├── ActiveSessions.jsx
│   │   │   ├── CodeEditorPanel.jsx
│   │   │   ├── CreateSessionModal.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── OutputPanel.jsx
│   │   │   ├── ProblemDescription.jsx
│   │   │   ├── RecentSessions.jsx
│   │   │   ├── StatsCards.jsx
│   │   │   ├── VideoCallUI.jsx
│   │   │   └── WelcomeSection.jsx
│   │   ├── data/               # Static data
│   │   │   └── problems.js
│   │   ├── hooks/              # Custom React hooks
│   │   │   ├── useSessions.js
│   │   │   └── useStreamClient.js
│   │   ├── lib/                # Utility functions
│   │   │   ├── axios.js
│   │   │   ├── piston.js
│   │   │   ├── stream.js
│   │   │   └── utils.js
│   │   ├── pages/              # Page components
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── ProblemPage.jsx
│   │   │   ├── ProblemsPage.jsx
│   │   │   └── SessionPage.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
└── package.json                # Root package.json
```

---

## 📚 API Documentation

### Base URL

```
http://localhost:5000/api
```

### Authentication

All protected routes require authentication via Clerk. Include the authentication token in requests.

### Endpoints

#### Sessions

**Create Session**

```http
POST /api/sessions
Content-Type: application/json
Authorization: Bearer <token>

{
  "problem": "Two Sum",
  "difficulty": "easy"
}
```

**Get Active Sessions**

```http
GET /api/sessions/active
Authorization: Bearer <token>
```

**Get Session by ID**

```http
GET /api/sessions/:id
Authorization: Bearer <token>
```

**Join Session**

```http
POST /api/sessions/:id/join
Authorization: Bearer <token>
```

**End Session**

```http
POST /api/sessions/:id/end
Authorization: Bearer <token>
```

**Get My Recent Sessions**

```http
GET /api/sessions/my-recent
Authorization: Bearer <token>
```

#### Chat

**Get Chat Token**

```http
GET /api/chat/token
Authorization: Bearer <token>
```

### Response Format

**Success Response:**

```json
{
  "success": true,
  "session": { ... },
  "message": "Session created successfully"
}
```

**Error Response:**

```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error information"
}
```

---

## 🔐 Environment Variables

### Backend (.env)

| Variable              | Description                          | Required |
| --------------------- | ------------------------------------ | -------- |
| `PORT`                | Server port number                   | Yes      |
| `NODE_ENV`            | Environment (development/production) | Yes      |
| `DB_URL`              | MongoDB connection string            | Yes      |
| `CLIENT_URL`          | Frontend URL for CORS                | Yes      |
| `CLERK_SECRET_KEY`    | Clerk secret key                     | Yes      |
| `STREAM_API_KEY`      | Stream.io API key                    | Yes      |
| `STREAM_API_SECRET`   | Stream.io API secret                 | Yes      |
| `INNGEST_EVENT_KEY`   | Inngest event key                    | No       |
| `INNGEST_SIGNING_KEY` | Inngest signing key                  | No       |

### Frontend (.env)

| Variable                     | Description           | Required |
| ---------------------------- | --------------------- | -------- |
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk publishable key | Yes      |
| `VITE_STREAM_API_KEY`        | Stream.io API key     | Yes      |

---

## 🚢 Deployment

### Build for Production

```bash
# Build frontend
cd frontend
npm run build

# Start backend (production)
cd backend
npm start
```

### Deployment Platforms

**Recommended Platforms:**

- **Render** - Full-stack deployment
- **Vercel** - Frontend deployment
- **Railway** - Backend deployment
- **MongoDB Atlas** - Database hosting

### Build Script

The root `package.json` includes a build script:

```bash
npm run build
```

This will:

1. Install backend dependencies
2. Install frontend dependencies
3. Build the frontend for production

---

## 🧪 Development

### Running Tests

```bash
# Frontend linting
cd frontend
npm run lint

# Backend (add test scripts as needed)
cd backend
npm test
```

### Code Style

- ESLint configuration included
- Follow React best practices
- Use functional components with hooks
- Maintain consistent naming conventions

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Guidelines

- Write clear commit messages
- Add comments for complex logic
- Update documentation as needed
- Test your changes thoroughly

---

## 📝 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

**Devashish Haldar**

- GitHub: [@devashishhaldar2006](https://github.com/devashishhaldar2006)
- Live Link: [https://career-connect-4gbj.onrender.com/]

---

## 🙏 Acknowledgments

- [Stream.io](https://getstream.io) - Video calling and chat infrastructure
- [Clerk](https://clerk.com) - Authentication service
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - Code editor
- [Piston API](https://github.com/engineer-man/piston) - Code execution engine
- [Tailwind CSS](https://tailwindcss.com) - CSS framework
- [React](https://react.dev) - UI library

---

<div align="center">

**Made with ❤️ for collaborative coding**

⭐ Star this repo if you find it helpful!

</div>
