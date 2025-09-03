AI-powered Live OCR & Text-to-Speech System

Problem it solves

Automates real-time understanding of visual information captured via webcam.

Helps users (especially visually impaired or in accessibility-focused use cases) to hear descriptions of objects/text instead of just seeing them.

Reduces dependency on manual reading/interpretation of live visual content.

What it does

Captures webcam frames on motion detection.

Uses BLIP (Salesforce/blip-image-captioning-base) to generate natural language captions for the scene.

Converts the caption into speech using Microsoft SpeechT5 (text-to-speech).

Provides multiple speaker voices (US male/female, Canadian male, Scottish male, Indian male, etc.) so the user can choose how they want to hear the output.

Delivers the text + real-time audio back to the frontend dynamically (without saving files).

Tech stack & tools

Frontend: React (Next.js), TailwindCSS – motion detection via webcam, real-time rendering, speaker selection dropdown.

Backend: FastAPI with CORS enabled.

ML Models:

BLIP for image-to-text (captioning).

Microsoft SpeechT5 for text-to-speech with speaker embeddings.

Python Libraries: Hugging Face Transformers, Torch, Datasets, Pillow, SoundFile, Uvicorn.

Data: Preloaded speaker embeddings stored in Parquet format.

Key Features / Highlights

Motion-triggered AI inference to avoid redundant processing.

Real-time dynamic audio generation (base64 audio stream, no file storage).

Customizable speaker voices for a personalized experience.

End-to-end system (Frontend + Backend + ML) integrated seamlessly.
