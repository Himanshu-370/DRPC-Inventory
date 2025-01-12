# Inventory Management System

## Overview
The **Inventory Management System** is a full-stack application designed to streamline inventory tracking and management. The system comprises a **frontend** for user interaction, a **backend** for handling business logic and database operations, and **MongoDB** as the database for data persistence. The project is containerized using Docker and orchestrated with Docker Compose.

---

## Features
- Add, update, and delete inventory items.
- View real-time inventory data.
- Responsive UI built with modern web technologies.
- Scalable backend with RESTful APIs.

---

## Technologies Used
### Frontend
- **Framework:** Vite (with React/Angular/Vue)
- **CSS Framework:** TailwindCSS/Bootstrap (if applicable)
- **State Management:** Redux/Context API (optional)

### Backend
- **Framework:** Spring Boot (Java)
- **Database:** MongoDB (NoSQL)
- **Dependency Management:** Gradle

### DevOps
- **Containerization:** Docker
- **Orchestration:** Docker Compose
- **Environment Variables:** `.env` file

---

## Folder Structure
```
Inventory Management/
├── backend/                        # Backend service
│   ├── build/                      # Gradle build files
│   ├── src/                        # Java source code
│   │   ├── main/
│   │   │   ├── java/               # Java backend code
│   │   │   └── resources/          # Configuration files (application.properties)
│   ├── Dockerfile                  # Dockerfile for backend
│   ├── build.gradle                # Gradle build file
│   └── settings.gradle             # Gradle settings
│
├── frontend/                       # Frontend service
│   ├── public/                     # Static files
│   ├── src/                        # Frontend source code
│   ├── Dockerfile                  # Dockerfile for frontend
│   ├── package.json                # Node.js dependencies
│   ├── vite.config.js              # Vite configuration
│
├── .env                            # Environment variables (not pushed to GitHub)
├── .gitignore                      # Ignore sensitive files and unnecessary build artifacts
├── docker-compose.yml              # Docker Compose configuration
└── mongo-data/                     # MongoDB persistent storage (optional)
```

---

## Prerequisites
### Software Requirements
- Docker and Docker Compose
- Node.js and npm (for local frontend development)
- Java 17 (for local backend development)

---

## Setup Instructions
### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/inventory-management.git
cd inventory-management
```

### Step 2: Create a `.env` File
Create a `.env` file in the root directory and add the following:
```plaintext
# MongoDB configuration
MONGO_DB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/?retryWrites=true&w=majority

# Frontend configuration
VITE_API_URL=http://localhost:8080/api
```

### Step 3: Build and Run the Application
Build and start the application with Docker Compose:
```bash
docker-compose up --build
```
This will start the following services:
- **Frontend:** Accessible at [http://localhost](http://localhost)
- **Backend:** Accessible at [http://localhost:8080](http://localhost:8080)
- **MongoDB:** Accessible on port `27017`

---

## Development Workflow
### Frontend Development
For local development, navigate to the `frontend` folder and start the development server:
```bash
cd frontend
npm install
npm run dev
```

### Backend Development
For local backend development, navigate to the `backend` folder and start the application:
```bash
cd backend
./gradlew clean bootRun
```

---

## Deployment
To deploy the application, build the Docker images and push them to a container registry. Update the `docker-compose.yml` file with the production configurations and deploy on a server.

---

## Contributing
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push them to your branch.
4. Create a pull request for review.

---

## License
This project is licensed under the [MIT License](LICENSE).

---


