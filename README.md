Project Name

Overview

This project is a full-stack application that includes a React frontend, an Express backend, and Prisma as an ORM for database management. Docker is used to containerize both the frontend and backend services for easy setup and deployment.

Prerequisites

- Docker: Make sure Docker is installed on your machine. You can download it from here: https://www.docker.com/get-started.
- Docker Compose: Docker Compose should be installed along with Docker.

Setup Instructions

1. Clone the Repository

   git clone https://github.com/yourusername/yourrepository.git
   cd yourrepository

2. Environment Variables

   Backend

   .env file in the backend directory and add the following environment variables:

   DATABASE_URL="postgresql://user:password@host:port/database"

   Replace DATABASE_URL with your PostgreSQL database credentials.

   Frontend

   .env file in the frontend directory and add the following environment variables:

   REACT_APP_API_URL=http://localhost:3000/

   Replace REACT_APP_API_URL with your backend API URL if different.

3. Install Dependencies (Optional)

   If you need to install dependencies manually:

   Backend

   cd backend
   npm install

   npx prisma migrate dev

   Frontend

   cd frontend
   npm install

4. Setting Up the Database

   Prisma Setup

   Run the following commands in the backend directory to set up Prisma:

   cd backend
   npx prisma migrate deploy
   npx prisma db seed

5. Build and Run with Docker

   To build and start the services (both frontend and backend) using Docker, run the following command from the root directory of the project:

   docker-compose up --build

   This command will:
   - Build the Docker images for both the frontend and backend.
   - Start the containers for both services.
   - Set up the database and apply migrations.

6. Access the Application

   Frontend: The frontend should be accessible at http://localhost:3000.
   Backend: The backend API should be accessible at http://localhost:5000/api.

7. Running Prisma Studio (Optional)

   If you want to manage your database visually, you can use Prisma Studio:

   npx prisma studio




