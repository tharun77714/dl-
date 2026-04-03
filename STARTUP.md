# MockMate Startup Guide

Follow these steps to configure your local development environment.

## 1. Prerequisites
- **Node.js:** v18+ (for Next.js frontend)
- **Python:** 3.10+ (for FastAPI backend)
- **FFmpeg:** Required for audio processing/extraction. Ensure `ffmpeg` is added to your system's PATH.

## 2. API / Backend Configuration
Navigate to the `api` directory:
```bash
cd api
python -m venv venv
```
Activate environment (Windows):
```bash
.\venv\Scripts\activate
```
Install requirements:
```bash
pip install -r requirements.txt
```
Set up Environment Variables (Create `api/.env`):
```
GROQ_API_KEY="your_groq_api_key_here"
SUPABASE_URL="your_supabase_url_here"
SUPABASE_KEY="your_supabase_anon_key_here"
MONGODB_URI="your_mongodb_connection_string"
```
Start the server:
```bash
python -m uvicorn main:app --reload --port 8000
```
*Note: Make sure your ML models (`mockmate_efficientnet_b0.pt`, `best_model_new.pth`) are placed in their respective directories.*

## 3. Web / Frontend Configuration
Navigate to the `web` directory:
```bash
cd web
npm install
```
Configure `.env.local`:
Create a `.env.local` based on your authentication needs (e.g. NextAuth credentials, Supabase vars, GitHub OAuth).

Start the development server:
```bash
npm run dev
```
MockMate will now be running on [http://localhost:3000](http://localhost:3000).
