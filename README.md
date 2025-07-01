# ToEverything

A comprehensive todo application that helps you organize your tasks with projects, categories, and calendar integration. Built with modern web technologies and containerized for easy deployment.

## Features

### Core Functionality
- **Project Management**: Create and organize projects to group related tasks
- **Category System**: Categorize tasks for better organization and filtering
- **Task Management**: Create, edit, delete, and track task completion
- **Task Bundling**: Bundle related tasks together across projects and categories
- **Calendar Integration**: View and manage tasks with calendar functionality
- **Responsive Design**: Works seamlessly across desktop and mobile devices

### Authentication & Security
- **JWT Authentication**: Secure user authentication using JSON Web Tokens
- **Local Storage**: Client-side token storage for session persistence
- **User Management**: Individual user accounts with data isolation

### Tech Stack

### Frontend
- **Framework**: React
- **Styling**: Modern CSS/styled components

### Backend
- **Framework**: Django (Python)
- **Database**: PostgreSQL (SQLite3 for development)
- **Authentication**: JWT (JSON Web Tokens)
- **Web Server**: Nginx (reverse proxy)

### Deployment
- **Containerization**: Docker
- **Database**: PostgreSQL container

## Getting Started

### Prerequisites
- Docker and Docker Compose installed on your system
- Git for cloning the repository

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ToEverything
   ```

2. **Run the application**
   ```bash
   # Start all services (builds automatically on first run)
   docker-compose up

   # Run in detached mode (background)
   docker-compose up -d
   ```

3. **Access the application**
   Open your browser and navigate to `http://localhost:3000`

### Development Setup

For local development without Docker:

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start PostgreSQL database**
   Make sure PostgreSQL is running locally or use Docker for just the database:
   ```bash
   docker run --name toeverything-db -e POSTGRES_PASSWORD=yourpassword -p 5432:5432 -d postgres
   ```

3. **Run the application**
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

## Usage

### Getting Started
1. **Sign Up**: Create a new account or log in with existing credentials
2. **Create Projects**: Organize your work into projects
3. **Add Categories**: Create categories to classify your tasks
4. **Create Tasks**: Add tasks and assign them to projects and categories
5. **Bundle Tasks**: Group related tasks together for better organization
6. **Use Calendar**: View and manage tasks in calendar view

### Key Workflows
- **Project Organization**: Create projects for different areas of work or life
- **Task Categorization**: Use categories like "urgent", "work", "personal" for quick filtering
- **Calendar Planning**: Use the calendar view to schedule and visualize task deadlines
- **Task Bundling**: Bundle related tasks to tackle them as a group

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user info

### Projects
- `GET /api/projects` - Get all user projects
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Categories
- `GET /api/categories` - Get all user categories
- `POST /api/categories` - Create new category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Tasks
- `GET /api/tasks` - Get all user tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/tasks/calendar` - Get tasks for calendar view

## Docker Configuration

The application uses multi-container Docker setup:

### Services
- **App Container**: Runs the main application
- **Database Container**: PostgreSQL database
- **Volume Mounting**: Persistent data storage

### Docker Compose Structure
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - db
    environment:
      - NODE_ENV=production
  
  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=toeverything
    volumes:
      - postgres_data:/var/lib/postgresql/data
```

## Support

If you encounter any issues or have questions:
1. Check the existing issues in the repository
2. Create a new issue with detailed information about the problem
3. Include steps to reproduce and relevant system information

## Roadmap

- [ ] Team collaboration features
- [ ] Advanced reporting and analytics
- [ ] Integration with external calendar services

---

**ToEverything** - Organize everything, accomplish anything.
