# ZegoCloud Video Chat App

A **video chat** web app powered by [ZEGOCLOUD](https://www.zegocloud.com). Start or join a video call, share the room link, and invite others. Built with React, Vite, Tailwind, and an Express backend for secure token generation.

## Features

- **Start / Join video call** – Enter your name and optional Room ID (or leave blank to create a new room).
- **Group video calls** – Multiple participants in one room using Zego UIKit (Group Call).
- **Share room link** – Copy the call link from inside the room to invite others.
- **Server-side tokens** – Backend generates Zego Token04 so your Server Secret never goes to the client.

## Quick start

### 1. Install dependencies

From the project root:

```bash
npm run install:all
```

Or install in each folder:

```bash
npm install
cd server && npm install
cd ../client && npm install
```

### 2. Configure Zego (required for video calls)

1. Sign up at [ZEGOCLOUD Console](https://console.zegocloud.com) and create a project.
2. Copy your **App ID** (number) and **Server Secret** (must be exactly 32 characters).
3. In the **server** folder, copy `.env.example` to `.env`:

```bash
cd server
copy .env.example .env
```

4. Edit `server/.env` and set:

```env
ZEGO_APP_ID=your_app_id_number
ZEGO_SERVER_SECRET=your_32_character_server_secret
```

Without these, the app still runs but the Call page will show a message asking you to configure Zego.

### 3. Run the app

From the project root:

```bash
npm run dev
```

This starts:

- **Backend** at `http://localhost:5001` (serves `/api/zego-token` and optional `/api/products`).
- **Frontend** at `http://localhost:5173` (or the next free port). Vite proxies `/api` to the backend.

Open the frontend URL in your browser. Click **Start Video Call** or **Join Call**, enter your name (and optional Room ID), then **Join Video Call** to enter the room.

## App flow

1. **Home** – Hero and “Start Video Call” CTA.
2. **Join** (`/join`) – Form: your name, optional Room ID. Submit → creates or joins a room.
3. **Call** (`/call?roomID=xxx&userName=yyy`) – Zego video room. Use the in-call option to copy the room link and share it.

## Scripts

| Command               | Description                              |
|-----------------------|------------------------------------------|
| `npm run dev`         | Run backend + frontend (development)     |
| `npm run dev:server`  | Backend only (port 5001)                 |
| `npm run dev:client`  | Frontend only (Vite)                     |
| `npm run build`       | Build client to `client/dist`            |
| `npm run start`       | Run server only (dev mode)               |
| `npm run start:prod`  | Run server in production (serves client) |

## Production deployment

1. **Build the client**
   ```bash
   npm run build
   ```

2. **Set server environment variables** (in `server/.env` or your host’s env):
   - `NODE_ENV=production`
   - `PORT=5000` (or your port)
   - `ZEGO_APP_ID` and `ZEGO_SERVER_SECRET` (required for video)
   - `ALLOWED_ORIGINS` – comma-separated list of frontend origins if the app is served from another domain (e.g. `https://myapp.com`). Omit if the same server serves the static files.

3. **Run the server from the project root**
   ```bash
   npm run start:prod
   ```
   The server will serve the built client from `client/dist` and handle `/api/*`. Open `http://localhost:5000` (or your `PORT`).

4. **If the frontend is hosted elsewhere** (e.g. Vercel/Netlify), set in the frontend build env:
   - `VITE_API_URL=https://your-api-domain.com`
   Then set on the API server:
   - `ALLOWED_ORIGINS=https://your-frontend-domain.com`

## Optional: client-side token (dev only)

If you don’t run the backend but still want to test video:

1. In **client**, create `.env` with:
   - `VITE_ZEGO_APP_ID=your_app_id`
   - `VITE_ZEGO_SERVER_SECRET=your_32_char_secret`
2. The Call page will use `generateKitTokenForTest` when the server token endpoint is not available.

**Do not expose Server Secret in production.** Use the backend token endpoint for real use.

## Tech stack

- **Frontend:** React 18, Vite, Tailwind CSS, React Router, Zego UIKit Prebuilt (`@zegocloud/zego-uikit-prebuilt`).
- **Backend:** Node.js, Express, CORS. Zego Token04 generated in `server/zegoToken.js`.
