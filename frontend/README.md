# Inventory Management - Frontend

## Overview
The frontend of the Inventory Management system is a web application built using modern web development technologies. It provides an intuitive and user-friendly interface for managing inventory-related operations, including adding, updating, and viewing inventory items.

## Features
- **Inventory Management**: Add, update, and delete inventory items.
- **Real-time Updates**: Communicates with the backend for dynamic data updates.
- **Responsive Design**: Ensures a seamless experience across devices (mobile, tablet, and desktop).

## Technology Stack
- **Frontend Framework**: Vue.js with Vite
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Deployment**: Docker (NGINX server)

## Project Structure
```
frontend/
|-- src/
|   |-- assets/           # Static assets (images, fonts, etc.)
|   |-- components/       # Reusable Vue components
|   |-- views/            # Application views/pages
|   |-- App.vue           # Root Vue component
|   |-- main.js           # Entry point of the application
|-- public/               # Public static files
|-- .env                  # Environment variables (API endpoint, etc.)
|-- package.json          # Project metadata and dependencies
|-- tailwind.config.js    # Tailwind CSS configuration
|-- Dockerfile            # Docker configuration for deployment
```

## Prerequisites
- **Node.js**: Version 18+
- **npm** or **yarn**: For package management
- **Docker**: For containerized deployment

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/inventory-management.git
   cd inventory-management/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the `frontend` directory.
   - Add the following content:
     ```env
     VITE_API_URL=http://localhost:8080/api
     ```

## Running the Application
### Development Mode
To start the development server with hot-reloading:
```bash
npm run dev
```
The app will be accessible at `http://localhost:5173`.

### Production Build
To create a production-ready build:
```bash
npm run build
```
The build output will be located in the `dist` directory.

### Docker Deployment
1. Build the Docker image:
   ```bash
   docker build -t inventory-management-frontend .
   ```
2. Run the Docker container:
   ```bash
   docker run -p 80:80 inventory-management-frontend
   ```
The app will be accessible at `http://localhost`.

## Testing
Run unit tests using:
```bash
npm run test
```

## Contributing
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Make changes and commit:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push the changes:
   ```bash
   git push origin feature/your-feature
   ```
5. Create a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](../LICENSE) file for details.
---
