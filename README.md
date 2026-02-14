# Video Chat App

A full-featured **video chat** web app with HD video, in-call text chat, screen sharing, and invite links. Powered by [ZEGOCLOUD](https://www.zegocloud.com).


## Features

- **Video & audio** – HD video and audio with camera/mic toggle
- **In-call text chat** – Send messages to everyone in the room
- **Screen sharing** – Share your screen during the call
- **Participant list** – See who’s in the call
- **Invite by link** – Copy a link and share it so others can join
- **Create or join** – Create a new room or join with a room ID

## Prerequisites

- **Node.js** 18+ and npm
- **ZEGOCLOUD** account (free): [console.zegocloud.com](https://console.zegocloud.com) – for video calls

## Upload to GitHub

1. Create a **new repository** on [GitHub](https://github.com/new) (do not add a README or .gitignore).
2. In this project folder:

```bash
git remote add origin https://github.com/YOUR_USERNAME/ZegoCloud-Video-Chat-App.git
git branch -M main
git add .
git commit -m "Initial commit: Video Chat App"
git push -u origin main
```

Replace `YOUR_USERNAME` and the repo name with your GitHub username and repository name. Update the `repository.url` in `package.json` to match.

## Clone and run

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/ZegoCloud-Video-Chat-App.git
cd ZegoCloud-Video-Chat-App

# Install dependencies (root + server + client)
npm run install:all

# Configure Zego (see below), then run
npm run dev
```

Open the URL shown in the terminal (e.g. `http://localhost:5173`). Use **Start Video Call** or **Join Call** to create or join a room.

## Configure Zego (required for video)

1. Sign up at [ZEGOCLOUD Console](https://console.zegocloud.com) and create a project.
2. Copy your **App ID** (number) and **Server Secret** (32 characters).
3. In the project root:

```bash
cd server
cp .env.example .env
```

4. Edit `server/.env` and set:

```env
ZEGO_APP_ID=your_app_id_number
ZEGO_SERVER_SECRET=your_32_character_server_secret
```

Without these, the app runs but the call page will ask you to configure Zego.

**On Windows** use `copy .env.example .env` instead of `cp`.

## Project structure

```
├── client/                 # React (Vite + Tailwind) frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── api.js          # API client
│   │   └── ...
│   └── .env.example
├── server/                 # Express backend
│   ├── index.js            # API + Zego token
│   ├── zegoToken.js        # Token generation
│   ├── data/
│   └── .env.example
├── package.json            # Root scripts
└── README.md
```

## Scripts

| Command | Description |
|--------|-------------|
| `npm run install:all` | Install dependencies in root, server, and client |
| `npm run dev` | Run backend + frontend (dev) |
| `npm run dev:server` | Backend only (port 5001) |
| `npm run dev:client` | Frontend only (Vite) |
| `npm run build` | Build client to `client/dist` |
| `npm run start` | Run server only (dev) |
| `npm run start:prod` | Run server in production (serves built client) |

## Production deployment

1. **Build:** `npm run build`
2. **Set env** in `server/.env` or your host:
   - `NODE_ENV=production`
   - `PORT=5000`
   - `ZEGO_APP_ID` and `ZEGO_SERVER_SECRET`
   - `ALLOWED_ORIGINS` (if frontend is on another domain)
3. **Run:** `npm run start:prod` from the project root.

The server serves the built client from `client/dist` and handles `/api/*`.

## Tech stack

- **Frontend:** React 18, Vite, Tailwind CSS, React Router, Zego UIKit Prebuilt
- **Backend:** Node.js, Express, CORS, Zego Token04 (server-side)

## License

MIT – see [LICENSE](LICENSE).
