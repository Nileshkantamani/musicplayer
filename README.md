# Music Streaming App

This project consists of a React.js frontend and a Spring Boot backend for a music streaming application.

## Project Structure

- **Frontend**: Located in `player/player` directory
- **Backend**: Located in `music` directory

## Prerequisites

- Node.js and npm (for frontend)
- Java 17 or later (for backend)
- Maven (for backend)
- MySQL (for database)

## Setup and Running

### Database Setup

1. Make sure MySQL server is running
2. The application will automatically create a database named `music_db` if it doesn't exist
3. You may need to update the database credentials in `music/src/main/resources/application.properties`

### Backend (Spring Boot)

1. Navigate to the backend directory:
   ```
   cd music
   ```

2. Build and run the application:
   ```
   mvn spring-boot:run
   ```

3. The backend API will be available at: http://localhost:8080/api

### Frontend (React)

1. Navigate to the frontend directory:
   ```
   cd player/player
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. The frontend application will be available at: http://localhost:3000

## Features

- User authentication (login/signup)
- Browse music library
- Create and manage playlists
- Play music tracks
- Like/favorite songs
- User profile management

## API Documentation

The backend includes Swagger UI for API documentation, available at:
http://localhost:8080/swagger-ui.html

## Authentication

The application uses JWT (JSON Web Token) for authentication:

1. Users can register with username, email, and password
2. Upon login, the server provides an access token and refresh token
3. The access token must be included in the Authorization header for protected endpoints
4. When the access token expires, the refresh token can be used to obtain a new one

## Troubleshooting

- If you encounter CORS issues, make sure both frontend and backend are running on the expected ports
- Check the console for error messages in both frontend and backend
- Verify database connection settings in application.properties 