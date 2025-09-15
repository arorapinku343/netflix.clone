# Netflix-clone (GitHub-ready)

This is a starter Netflix-style movie website (frontend + backend).  
The repo is prepared to be pushed to GitHub quickly.

## What's included
- `backend/` — Node.js + Express API (MongoDB, JWT auth, Stripe stub, file uploads)
- `frontend/` — React + Vite frontend (Tailwind-ready)
- `.gitignore` to ignore node_modules, .env and uploads
- `.env.example` files for backend & frontend

## Quick start (after you clone/unzip)

1. Open in VS Code.

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret (and Stripe key if used)
npm run dev
```
Backend will run on `http://localhost:4000` by default.

### Frontend
```bash
cd frontend
npm install
cp .env.example .env
# If using Tailwind, ensure tailwind is configured (tailwind.config.cjs + postcss.config.cjs)
npm run dev
```
Frontend will run on `http://localhost:5173` (Vite) or `http://localhost:3000` if configured.

## Making a user an admin
Connect to your MongoDB and run:
```js
db.users.updateOne({ email: 'you@example.com' }, { $set: { role: 'admin' } });
```

## Push to GitHub
1. Create a new GitHub repo (for example `netflix-clone`).
2. In project root:
```bash
git init
git add .
git commit -m "Initial commit - Netflix clone starter"
git branch -M main
git remote add origin https://github.com/<your-username>/netflix-clone.git
git push -u origin main
```

## Notes
- This is a starter project. For production you should:
  - Use a cloud storage (S3) for uploads
  - Secure Stripe webhooks and verify payments
  - Use HTTPS and proper secret management
  - Add rate limiting, input validation and testing

## Need help?
If you want, I can:
- Add `tailwind.config.cjs` and `postcss.config.cjs` so the frontend works out-of-the-box.
- Create the GitHub repo and provide a script you can run to `git push` (I cannot push to your account).
- Deploy backend to Render/Heroku with step-by-step commands.
