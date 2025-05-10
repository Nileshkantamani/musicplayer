# Luister - Music Streaming Platform

A modern, responsive music streaming platform built with React.js and Tailwind CSS.

## Features

- **Real-time Music Playback**: Play, pause, skip tracks, and control playback
- **User Authentication**: Sign up/in with email or OAuth providers (Google, Apple, Spotify)
- **Music Discovery**: Explore new releases, genres, and personalized recommendations
- **Playlist Management**: Create, edit, and manage your playlists
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## Tech Stack

- React.js with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Context API for state management
- Web Audio API for audio playback

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/luister.git
cd luister
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

4. Open your browser and navigate to `http://localhost:3000`

## Usage

### Authentication

- Use the login page to sign in with email/password or OAuth providers
- Demo credentials: `user@example.com` / `password123`

### Playing Music

- Click on any track to play it
- Use the player controls at the bottom to manage playback
- Create playlists and add tracks to your library

### Exploring Content

- Browse genres, new releases, and trending tracks
- Search for specific artists, albums, or tracks
- Discover new music through personalized recommendations

## Project Structure

```
src/
├── components/       # UI components
│   ├── auth/         # Authentication components
│   ├── player/       # Music player components
│   ├── ui/           # Common UI elements
│   ├── cards/        # Content cards
│   └── sections/     # Page sections
├── context/          # React Context providers
│   ├── AuthContext.tsx    # Authentication state
│   └── PlayerContext.tsx  # Music player state
├── hooks/            # Custom React hooks
├── pages/            # App pages/routes
├── utils/            # Utility functions
├── assets/           # Static assets
└── App.tsx           # Main component
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspiration from Spotify and Apple Music
- Sample audio files from [SampleLib](https://samplelib.com/)
- Icons from Heroicons
