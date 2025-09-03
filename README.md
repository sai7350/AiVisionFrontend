AI-powered Live OCR & Text-to-Speech System
🚀 Overview

This project implements an AI-powered real-time vision-to-speech system that captures webcam input, detects motion, generates natural language captions for scenes, and converts them into speech using multiple speaker voices.

It is designed for accessibility-focused use cases (e.g., visually impaired users) and real-time assistance scenarios where visual information needs to be understood dynamically through audio.

🛠 Problem It Solves

Automates real-time understanding of visual information captured via webcam.

Helps users (especially visually impaired) to hear descriptions of objects/scenes/text instead of just seeing them.

Reduces dependency on manual reading or interpretation of live visual content.

🔑 What It Does

Captures webcam frames on motion detection.

Uses BLIP (Salesforce/blip-image-captioning-base) to generate natural language captions for the scene.

Converts captions into speech using Microsoft SpeechT5 (text-to-speech).

Provides multiple speaker voices (US male/female, Canadian male, Scottish male, Indian male, etc.).

Delivers text + real-time audio dynamically to the frontend (no file storage needed).

🏗 Tech Stack & Tools

Frontend

React (Next.js)

TailwindCSS

Webcam-based motion detection

Real-time rendering

Speaker selection dropdown

Backend

FastAPI (with CORS enabled)

ML Models

BLIP → Image-to-text (scene captioning)

SpeechT5 → Text-to-speech (with speaker embeddings)

Python Libraries

Hugging Face Transformers

Torch

Datasets

Pillow

SoundFile

Uvicorn

Data

Preloaded speaker embeddings stored in Parquet format

🌟 Key Features / Highlights

🎥 Motion-triggered AI inference → avoids redundant processing

🔊 Real-time dynamic audio generation → Base64 audio stream (no file storage)

🗣 Customizable speaker voices → multiple accents & genders

🔄 End-to-end integration → React frontend + FastAPI backend + ML models

📌 How It Works

User opens the frontend → webcam feed starts.

Motion detection triggers a frame capture.

Frame sent to backend → BLIP generates a caption.

Caption passed to SpeechT5 → audio generated with chosen speaker.

Backend returns { text + base64 audio } to frontend.

Frontend displays text + plays audio instantly.

💡 Potential Use Cases

Accessibility for visually impaired users

Real-time assistance in monitoring environments

AI-based smart narrators for education or security systems