# Stone Paper Scissors Multiplayer

A complete full-stack Stone Paper Scissors (Rock Paper Scissors) game built with React, Node.js, and MongoDB.

## Features
- **Simultaneous Gameplay**: 2 players choose concurrently; choices are hidden until both are made.
- **Tournament Mode**: 6 rounds per game with running scores.
- **Game History**: Persistent storage of match results with round-by-round breakdown.
- **Minimalist Design**: Clean, indigo-accented UI following strict design rules.
- **Mobile Responsive**: Fully adaptive layout for all screen sizes.

## Tech Stack
- **Frontend**: React, TypeScript, Vite, TailwindCSS, Lucide Icons, React Router v6.
- **Backend**: Node.js, Express, TypeScript.
- **Database**: MongoDB (Mongoose).
- **DevOps**: Docker, Docker Compose.

## Local Setup

### Prerequisites
- Node.js (v20+)
- MongoDB (Running locally or via Docker)

### 1. Backend Setup
```bash
cd server
npm install
# Create .env file based on .env.example
npm run dev
```

### 2. Frontend Setup
```bash
cd client
npm install
# Create .env file with VITE_API_URL=http://localhost:4000/api
npm run dev
```

## Docker Deployment

To run the entire stack using Docker Compose:

```bash
docker-compose up --build
```

The app will be available at:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:4000

## API Documentation

### `POST /api/games`
Saves a completed game to the database.
**Body:**
```json
{
  "player1_name": "Alice",
  "player2_name": "Bob",
  "winner": "Alice",
  "player1_score": 4,
  "player2_score": 2,
  "rounds": [
    { "p1_choice": "Stone", "p2_choice": "Scissors", "result": "P1 Wins" },
    ...
  ]
}
```

### `GET /api/games`
Returns all games, sorted by newest first.

## Deployment Steps (AWS EC2 / GCP)

1. **Provision Instance**: Launch an Ubuntu instance (t3.small or similar).
2. **Install Docker**: Install Docker and Docker Compose on the instance.
3. **Clone Repo**: Clone this repository to the instance.
4. **Configure Env**: Create a `.env` file in the root.
5. **Run Stack**:
   ```bash
   sudo docker-compose up -d
   ```
6. **Reverse Proxy (Optional)**: Use Nginx as a reverse proxy if you want to use domain names and SSL (Certbot).
