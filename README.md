# MockMate - AI-Powered Mock Interviews & Resume Intelligence

MockMate is a cutting-edge platform designed to prepare candidates for modern job interviews. It utilizes advanced AI models to analyze both written materials (resumes) and live interview performance (video and audio), providing actionable feedback to master your communication skills.

## Features

- **Live Emotion & Confidence Analysis:** Uses Computer Vision (EfficientNet-B0) to analyze facial expressions and sentiment in real-time.
- **Vocal Prosody & Confidence Scoring:** Analyzes 13 vocal features (using Praat/Parselmouth) via a custom CNN+BiLSTM model, outputting an overarching confidence metric.
- **Resume Intelligence:** Groq-exclusive AI pipeline (Llama 3.3 70B) for parsing resumes, checking ATS signals, performing X-Ray section audits, and providing live market meta-intelligence for your target role and company.
- **Seamless Integrations:** Video and audio blobs securely managed with Supabase; rich metadata and analytics stored dynamically in MongoDB.

## Tech Stack
- **Frontend:** Next.js (React), Tailwind CSS, Framer Motion
- **Backend:** FastAPI (Python), WebSockets
- **Databases:** MongoDB, Supabase Storage
- **Machine Learning:** PyTorch, TorchAudio, Transformers, Groq API
