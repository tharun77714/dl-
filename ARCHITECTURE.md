# MockMate Architecture

## System Diagram
The MockMate platform uses a bifurcated stack: a frontend Next.js interface communicating with a highly-efficient Python FastAPI backend handling machine learning inference.

### 1. Data Layer
- **MongoDB:** Stores user profiles, historical interview sessions, transcript histories, and resume metadata.
- **Supabase Storage:** Handles secure, scalable blob storage for user-uploaded resumes (`.pdf`), captured interview video frames, and audio recordings.

### 2. Frontend Layer (Next.js)
- Responsive UI built with React, Tailwind CSS, and Framer Motion.
- **Smart Resume Analyzer:** Directly hits FastAPI endpoints to generate Gamified Action Plans and ATS Scores.
- **Interactive Interview:** Captures webcam and microphone via WebRTC APIs. Audio is streamed and analyzed asynchronously. 

### 3. Backend AI Layer (FastAPI)
- **Visual Emotion Analysis (`EfficientNet-B0`):** Frames are processed in real-time to detect fundamental emotional states (Happy, Neutral, Anxious, etc.). Uses `mockmate_efficientnet_b0.pt`.
- **Vocal Confidence (`CNN+BiLSTM`):** Audio chunks are isolated and run through Praat (via Parselmouth) to extract 13 acoustic features (pitch jitter, shimmer, HNR, speech rate). These are fed into an ensemble MLP using `best_model_new.pth` to assess candidate assertiveness.
- **Transcripts & Coaching:** Audio transcripts (via Speech-to-Text) are analyzed using Groq (Llama 3.3 70B) to provide actionable conversational coaching.
- **Resume Intelligence:** Parsing PDFs and extracting targeted resume performance metrics using Groq API.
