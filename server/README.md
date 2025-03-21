# NestJS Backend

This is the backend service built with **NestJS**, using **Prisma** as the ORM and **MongoDB** as the database. It includes authentication, request validation, security features, and a Docker setup for development.

## 🚀 Getting Started

### Setup & Installation

Since this backend is part of a **monorepo**, navigate to the backend directory first:

```bash
cd server
```

Then, install dependencies:

```bash
npm install
```

### Environment Variables

Create a `.env` file in the `server` directory with the following variables:

```env
PORT=3000
DATABASE_URL="mongodb://root:prisma@localhost:27017"
JWT_SECRET="your-secret-key"
```

Make sure to replace `your-secret-key` with a secure secret key.

### Running the Database (Docker)

This project uses MongoDB with a **replica set**, which is required for Prisma transactions.

Run the database using Docker:

```bash
docker-compose up -d
```

This starts a **MongoDB container** with authentication and a replica set.

### Running the Server

Run the server in **development mode**:

```bash
npm run start:dev
```

For production:

```bash
npm run build
npm run start
```

### Prisma Setup

After starting the MongoDB container, apply the Prisma schema:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

To open Prisma Studio (a GUI for the database):

```bash
npx prisma studio
```

## Security Features

- **Authentication** using JWT.
- **Password hashing** with bcrypt.
- **Validation Pipes** to validate request payloads.
- **Helmet.js** for securing HTTP headers.
- **Rate Limiting** to prevent abuse.
- **Global Exception Filters** for better error handling.

## API Endpoints

### Authentication

| Method | Endpoint          | Description               |
| ------ | ----------------- | ------------------------- |
| POST   | `/auth/register`  | Register a new user       |
| POST   | `/auth/login`     | Login and receive a token |
| POST   | `/auth/protected` | Access protected routes   |

Add the `Authorization: Bearer <token>` header for protected routes.
