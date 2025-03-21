# Full-Stack Authentication Boilerplate

A full-stack authentication template using **NestJS** (server) and **React** (client). This project provides a solid foundation for handling user authentication with JWT, Prisma ORM, and Zod validation.

## Features

- **Backend**: NestJS, Prisma ORM, Passport.js for authentication, MongoDB with Docker
- **Frontend**: React with Vite, TypeScript, Zod form validation, Shadcn/ui Tailwind CSS
- **Security**: JWT authentication, CORS enabled, Helmet, Rate limiting
- **Docker Support**: Pre-configured `docker-compose.yml` for MongoDB
- **Developer Experience**: Pre-configured ESLint, Prettier, and environment variables

## Tech Stack

### Backend

- **NestJS** - Scalable and modular Node.js framework
- **Prisma ORM** - Type-safe database interactions with MongoDB
- **Passport.js** - Authentication with JWT
- **Docker** - Containerized database setup
- **Zod** - Validation for request data

### Frontend

- **React** - Component-based UI
- **Vite** - Fast development server
- **Zod** - Form validation
- **Tailwind CSS** - Utility-first styling
- **TypeScript** - Strongly-typed JavaScript
- **Shadcn/ui** - Pre-built UI components

## Installation & Setup

### Prerequisites

Ensure you have the following installed:

- **Node.js** (>= 16)
- **Docker & Docker Compose**
- **npm / pnpm / yarn**

### 1️ Clone the Repository

```sh
# Navigate to your desired directory and run:
git clone https://github.com/mahmoud-bebars/fullstack-auth-template
cd fullstack-auth-template
```

### 2️ Install Dependencies

```sh
npm install # or  pnpm install / yarn install
```

### 3️ Run the Backend

Run the MongoDB container Using Docker Compose

```sh
docker-compose up -d
```

setup env variables

```sh
cp .env.example .env
```

Start the NestJS server:

```sh
cd server
npm start:dev # or pnpm run start / yarn start
```

### 4️ Run the Frontend

In a new terminal, navigate to the **client** directory and run:

setup env variables

```sh
cp .env.example .env
```

Start the React app:

```sh
cd client
npm run dev # or pnpm run dev / yarn dev
```

## Environment Variables

Create `.env` files in the **server** and **client** directories:

### Server `.env`

```
DATABASE_URL="mongodb://root:prisma@localhost:27017/authdb?authSource=admin&retryWrites=true&w=majority"
CORS_ORIGIN=http://localhost:5173
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=1h
PORT=5000
```

### Client `.env`

```
VITE_APP_URL="http://localhost:5000"
VITE_APP_TITLE="My App"
```

## Folder Structure

```
fullstack-auth-template/
├── client/   # React frontend
├── server/   # NestJS backend
├── package.json # Global package manager file
├── .gitignore # Global ignore rules
└── README.md  # This file
```

## License

MIT License
