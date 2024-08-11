# GalaxEye Assignment

Overview

A user comes to a console which has a base-map and an option to draw an AOI (Area of Interest). Upon selecting and area they will be presented with all the tiles (pre configured satellite image’s metadata) which are intersecting that AOI.

Prerequisites

- Docker
- Node 

Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/repository-name.git
cd yourproject
```

### 2. Environment Variables

   #### Backend -> 

   Create a .env file in the backend directory and add the following environment variables:

   DATABASE_URL="postgresql://user:password@host:port/database"

   Replace DATABASE_URL with your PostgreSQL database credentials.

   #### Frontend ->

   Create a .env file in the frontend directory and add the following environment variables:

   REACT_APP_API_URL=http://localhost:3000/

   Replace REACT_APP_API_URL with your backend API URL if different.

### 3. Install Dependencies & Run Server/Frontend (make sure 4th step should be completed)

   If you need to install dependencies manually:

   Backend ->

```bash
cd backend
npm install
npm run build
npm start
```
   

   Frontend ->

```bash
cd frontend
npm install
npm run dev
```
   

### 4. Setting Up the Database

   Prisma Setup

   Run the following commands in the backend directory to set up Prisma:

```bash
cd backend
npx prisma db push
```

### 5. Build and Run with Docker

   To build and start the services (both frontend and backend) using Docker, run the following command from the root directory of the project:

```bash
docker-compose up --build
```

   This command will:
   - Build the Docker images for both the frontend and backend.
   - Start the containers for both services.
   - Set up the database and apply migrations.

### 6. Access the Application

   Frontend: The frontend should be accessible at http://localhost:3000.
   Backend: The backend API should be accessible at http://localhost:5000/api.

### 7. Running Prisma Studio (Optional)

   If you want to manage your database visually, you can use Prisma Studio:

  
```bash
npx prisma studio
```


License

This project is licensed under the Koi nahi 
