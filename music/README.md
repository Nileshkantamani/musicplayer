# Music Streaming Application

A full-stack music streaming application with Spring Boot backend, MySQL database, and React frontend with Tailwind CSS styling.

## Features

- User authentication with JWT (login, register, email verification)
- Role-based access control (Admin, User)
- Music management (upload, store, retrieve)
- Playlist creation and management
- Favorites/likes functionality
- Play history tracking
- Search functionality
- Music playback

## Tech Stack

- **Backend**: Spring Boot 3.x (Java 17+)
- **Database**: MySQL 8.x
- **Frontend**: React with TypeScript and Tailwind CSS
- **Authentication**: JWT (JSON Web Tokens)
- **Documentation**: Swagger/OpenAPI

## Prerequisites

- Java 17 or higher
- Maven
- MySQL 8.x
- Node.js (for separate frontend development)
- SMTP server access for email verification (optional)

## Setup & Installation

### Backend Setup

1. **Clone the repository**
   ```
   git clone <repository-url>
   cd music
   ```

2. **Configure Database**
   
   Edit `src/main/resources/application.properties` to update the database credentials:
   ```
   spring.datasource.url=jdbc:mysql://localhost:3306/music_db?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
   spring.datasource.username=your-username
   spring.datasource.password=your-password
   ```

3. **Configure Email** (optional)
   
   Update email settings in `application.properties`:
   ```
   spring.mail.host=your-smtp-server
   spring.mail.port=587
   spring.mail.username=your-email
   spring.mail.password=your-password
   ```

### Running the Application

#### Option 1: Integrated Build (Backend + Frontend)

This option builds the frontend and integrates it with the Spring Boot application.

```
mvn clean install
mvn spring-boot:run
```

The application will be accessible at http://localhost:8081

#### Option 2: Separate Development (Frontend + Backend)

This is useful for development purposes.

1. **Start the backend**
   ```
   mvn spring-boot:run
   ```
   The backend API will be accessible at http://localhost:8081

2. **Start the frontend (in a separate terminal)**
   ```
   cd frontend
   npm install
   npm start
   ```
   The frontend development server will be accessible at http://localhost:3000

## API Documentation

API documentation is available via Swagger UI:
- http://localhost:8081/swagger-ui.html

## Login Credentials

After running the application for the first time, you can use the following credentials:

- **Regular User**:
  - Username: user
  - Password: password

- **Admin**:
  - Username: admin
  - Password: admin

Or you can register a new user through the frontend or API.

## Features

### User Authentication
- Register with email verification
- Login with JWT authentication
- Role-based permissions

### Music Management
- Upload and manage music files
- Create and manage playlists
- Add songs to favorites
- Track recently played songs

### Admin Features
- User management
- Content moderation
- Analytics (coming soon)

## API Endpoints

The application provides the following main endpoints:

- **Authentication**: `/api/auth/**`
  - POST `/api/auth/signin` - Login
  - POST `/api/auth/signup` - Register
  - POST `/api/auth/refreshtoken` - Refresh JWT token
  - POST `/api/auth/signout` - Logout

- **Songs**: `/api/songs/**`
  - GET `/api/songs` - Get all songs
  - GET `/api/songs/{id}` - Get song by ID
  - POST `/api/songs` - Upload song (Admin)
  - PUT `/api/songs/{id}` - Update song (Admin)
  - DELETE `/api/songs/{id}` - Delete song (Admin)
  - GET `/api/songs/search` - Search songs
  - GET `/api/songs/{id}/stream` - Stream song

- **Playlists**: `/api/playlists/**`
  - GET `/api/playlists` - Get user playlists
  - GET `/api/playlists/{id}` - Get playlist by ID
  - POST `/api/playlists` - Create playlist
  - PUT `/api/playlists/{id}` - Update playlist
  - DELETE `/api/playlists/{id}` - Delete playlist
  - POST `/api/playlists/{playlistId}/songs/{songId}` - Add song to playlist
  - DELETE `/api/playlists/{playlistId}/songs/{songId}` - Remove song from playlist

- **Favorites**: `/api/favorites/**`
  - GET `/api/favorites` - Get user favorites
  - POST `/api/favorites/songs/{songId}` - Add to favorites
  - DELETE `/api/favorites/songs/{songId}` - Remove from favorites
  - GET `/api/favorites/songs/{songId}` - Check if song is favorite

## Database Schema

The application uses the following main entities:

- User
- Role
- Song
- Album
- Artist
- Playlist
- Favorite
- PlayHistory
- RefreshToken

## License

[MIT License](LICENSE)

## Future Enhancements

- Frontend implementation with React and Tailwind CSS
- Social features (follow users, share playlists)
- Lyrics display
- Podcast support
- Offline caching
- Dark/light mode toggle 