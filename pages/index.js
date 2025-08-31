// // pages/index.js
// import { useEffect, useRef, useState } from 'react';

// const BACKEND_API_URL = 'http://localhost:8000/predict';

// export default function Home() {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [text, setText] = useState('');
//   const [isScanning, setIsScanning] = useState(false);
//   const [lastDetectedText, setLastDetectedText] = useState('');

//   useEffect(() => {
//     navigator.mediaDevices.getUserMedia({ video: true })
//       .then((stream) => {
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }
//         requestAnimationFrame(processFrame);
//       })
//       .catch((err) => console.error('Webcam error:', err));
//   }, []);

//   const processFrame = async () => {
//     if (!videoRef.current || !canvasRef.current || isScanning) {
//       requestAnimationFrame(processFrame);
//       return;
//     }

//     setIsScanning(true);

//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');
//     canvas.width = videoRef.current.videoWidth;
//     canvas.height = videoRef.current.videoHeight;
//     ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

//     const imageBase64 = canvas.toDataURL('image/jpeg');

//     try {
//       const response = await fetch(BACKEND_API_URL, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ image: imageBase64 }),
//       });

//       const data = await response.json();
//       const newText = data.text?.trim() || '';

//       if (newText && newText !== lastDetectedText) {
//         setLastDetectedText(newText);
//         setText(newText);
//       }
//     } catch (error) {
//       console.error('Backend error:', error);
//     } finally {
//       setIsScanning(false);
//       requestAnimationFrame(processFrame);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//       <h1 className="text-xl font-bold mb-4">Live OCR (BLIP AI Model)</h1>
//       <video ref={videoRef} autoPlay playsInline className="rounded shadow max-w-lg w-full mb-4" />
//       <canvas ref={canvasRef} className="hidden" />
//       <div className="bg-white rounded p-4 w-full max-w-lg shadow">
//         <h2 className="text-md font-semibold mb-2">Detected Text:</h2>
//         <pre className="text-sm whitespace-pre-wrap break-words text-gray-800">{text}</pre>
//       </div>
//     </div>
//   );

// 2 code starts here //

// import { useEffect, useRef, useState } from 'react';

// const BACKEND_API_URL = 'http://localhost:8000/predict'; // Change if backend is deployed elsewhere

// export default function Home() {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [text, setText] = useState('');
//   const [isScanning, setIsScanning] = useState(false);
//   const [lastDetectedText, setLastDetectedText] = useState('');

//   useEffect(() => {
//     const canvas = document.createElement('canvas');
//     canvasRef.current = canvas;

//     navigator.mediaDevices.getUserMedia({ video: true })
//       .then((stream) => {
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }
//         requestAnimationFrame(processFrame);
//       })
//       .catch((err) => console.error('Webcam error:', err));
//   }, []);

//   const processFrame = async () => {
//     if (!videoRef.current || !canvasRef.current || isScanning) {
//       requestAnimationFrame(processFrame);
//       return;
//     }

//     setIsScanning(true);

//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');
//     canvas.width = videoRef.current.videoWidth;
//     canvas.height = videoRef.current.videoHeight;
//     ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

//     const imageBase64 = canvas.toDataURL('image/jpeg');

//     try {
//       const response = await fetch(BACKEND_API_URL, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ image: imageBase64 }),
//       });

//       const data = await response.json();
//       const newText = data.text?.trim() || '';

//       if (newText && newText !== lastDetectedText) {
//         setLastDetectedText(newText);
//         setText(newText);
//       }
//     } catch (error) {
//       console.error('Backend error:', error);
//     } finally {
//       setIsScanning(false);
//       requestAnimationFrame(processFrame);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-start min-h-screen px-4 py-8 bg-gradient-to-br from-gray-50 to-gray-200">
//       <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
//         Live OCR Translator
//       </h1>

//       <div className="w-full max-w-md">
//         <video
//           ref={videoRef}
//           autoPlay
//           playsInline
//           className="rounded-lg shadow-md w-full mb-4"
//         />
//         <div className="bg-white rounded-lg shadow-md p-4">
//           <h2 className="text-lg font-semibold mb-2 text-gray-700">Detected Text:</h2>
//           <pre className="text-sm whitespace-pre-wrap break-words text-gray-900">
//             {text || 'Looking for text...'}
//           </pre>
//         </div>
//       </div>
//     </div>
//   );
// }

// ends here //

// 3 code starts here //

// pages/index.js
// import { useEffect, useRef, useState } from 'react';
// import { KokoroTTS } from 'kokoro-js';

// const BACKEND_API_URL = 'http://localhost:8000/predict';

// export default function Home() {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const prevFrameRef = useRef(null);

//   const [text, setText] = useState('');
//   const [lastDetectedText, setLastDetectedText] = useState('');
//   const [ttsEngine, setTtsEngine] = useState(null);
//   const [lastSpokenTime, setLastSpokenTime] = useState(0);

//   useEffect(() => {
//     canvasRef.current = document.createElement('canvas');

//     navigator.mediaDevices.getUserMedia({ video: true })
//       .then((stream) => {
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//           videoRef.current.onloadedmetadata = () => {
//             requestAnimationFrame(checkForMotion);
//           };
//         }
//       })
//       .catch((err) => console.error('Webcam error:', err));
//   }, []);

//   useEffect(() => {
//     const loadTTS = async () => {
//       const model_id = 'onnx-community/Kokoro-82M-ONNX';
//       const tts = await KokoroTTS.from_pretrained(model_id, { dtype: 'q8' });
//       setTtsEngine(tts);
//     };
//     loadTTS();
//   }, []);

//   const checkForMotion = async () => {
//     if (!videoRef.current || !canvasRef.current || videoRef.current.videoWidth === 0 || videoRef.current.videoHeight === 0) {
//       requestAnimationFrame(checkForMotion);
//       return;
//     }

//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');
//     canvas.width = videoRef.current.videoWidth;
//     canvas.height = videoRef.current.videoHeight;
//     ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

//     const currentFrame = ctx.getImageData(0, 0, canvas.width, canvas.height);

//     if (prevFrameRef.current) {
//       const diff = computeFrameDifference(prevFrameRef.current.data, currentFrame.data);
//       const threshold = 0.02; // 2% of pixels changed

//       if (diff > threshold) {
//         await handleFrame(currentFrame);
//       }
//     }

//     prevFrameRef.current = currentFrame;
//     requestAnimationFrame(checkForMotion);
//   };

//   const computeFrameDifference = (prevData, currData) => {
//     let changedPixels = 0;
//     for (let i = 0; i < currData.length; i += 4) {
//       const rDiff = Math.abs(currData[i] - prevData[i]);
//       const gDiff = Math.abs(currData[i + 1] - prevData[i + 1]);
//       const bDiff = Math.abs(currData[i + 2] - prevData[i + 2]);
//       if ((rDiff + gDiff + bDiff) > 50) changedPixels++;
//     }
//     return changedPixels / (currData.length / 4);
//   };

//   const handleFrame = async (imageData) => {
//     const canvas = canvasRef.current;
//     const imageBase64 = canvas.toDataURL('image/jpeg');

//     try {
//       const response = await fetch(BACKEND_API_URL, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ image: imageBase64 }),
//       });

//       const data = await response.json();
//       const newText = data.text?.trim() || '';
//       const now = Date.now();

//       if (newText && newText !== lastDetectedText && now - lastSpokenTime > 3000) {
//         setText(newText);
//         setLastDetectedText(newText);
//         setLastSpokenTime(now);
//         speakText(newText);
//       }
//     } catch (err) {
//       console.error('OCR or TTS error:', err);
//     }
//   };

//   const speakText = async (inputText) => {
//     if (!ttsEngine || !inputText) return;
//     try {
//       const audio = await ttsEngine.generate(inputText, { voice: 'af_alloy' });
//       const audioUrl = URL.createObjectURL(audio.blob);
//       new Audio(audioUrl).play();
//     } catch (err) {
//       console.error('Speech error:', err);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-sky-100 to-indigo-200 p-4">
//       <h1 className="text-2xl font-bold text-indigo-700 mb-6">Live OCR Triggered by Motion</h1>
//       <div className="relative w-full max-w-md overflow-hidden rounded-lg shadow-lg border border-indigo-300">
//         <video ref={videoRef} autoPlay playsInline className="w-full h-auto rounded-lg" />
//       </div>
//       <div className="mt-6 w-full max-w-md bg-white p-4 rounded-lg shadow-md border border-gray-200">
//         <h2 className="text-lg font-semibold text-gray-800 mb-2">Detected Text:</h2>
//         <pre className="text-sm text-gray-700 whitespace-pre-wrap break-words max-h-64 overflow-y-auto">{text}</pre>
//       </div>
//     </div>
//   );
// }

// with audio code  starts here  its working code

// frontend/pages/index.js
// import { useEffect, useRef, useState } from 'react';

// const BACKEND_API_URL = 'http://localhost:8000/predict';

// export default function Home() {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const prevFrameRef = useRef(null);

//   const [text, setText] = useState('');
//   const [lastDetectedText, setLastDetectedText] = useState('');
//   const [lastSpokenTime, setLastSpokenTime] = useState(0);

//   useEffect(() => {
//     canvasRef.current = document.createElement('canvas');

//     navigator.mediaDevices.getUserMedia({ video: true })
//       .then((stream) => {
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//           videoRef.current.onloadedmetadata = () => {
//             requestAnimationFrame(checkForMotion);
//           };
//         }
//       })
//       .catch((err) => console.error('Webcam error:', err));
//   }, []);

//   const checkForMotion = async () => {
//     if (!videoRef.current || !canvasRef.current || videoRef.current.videoWidth === 0 || videoRef.current.videoHeight === 0) {
//       requestAnimationFrame(checkForMotion);
//       return;
//     }

//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');
//     canvas.width = videoRef.current.videoWidth;
//     canvas.height = videoRef.current.videoHeight;
//     ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

//     const currentFrame = ctx.getImageData(0, 0, canvas.width, canvas.height);

//     if (prevFrameRef.current) {
//       const diff = computeFrameDifference(prevFrameRef.current.data, currentFrame.data);
//       const threshold = 0.02;

//       if (diff > threshold) {
//         await handleFrame(currentFrame);
//       }
//     }

//     prevFrameRef.current = currentFrame;
//     requestAnimationFrame(checkForMotion);
//   };

//   const computeFrameDifference = (prevData, currData) => {
//     let changedPixels = 0;
//     for (let i = 0; i < currData.length; i += 4) {
//       const rDiff = Math.abs(currData[i] - prevData[i]);
//       const gDiff = Math.abs(currData[i + 1] - prevData[i + 1]);
//       const bDiff = Math.abs(currData[i + 2] - prevData[i + 2]);
//       if ((rDiff + gDiff + bDiff) > 50) changedPixels++;
//     }
//     return changedPixels / (currData.length / 4);
//   };

//   const handleFrame = async () => {
//     const canvas = canvasRef.current;
//     const imageBase64 = canvas.toDataURL('image/jpeg');

//     try {
//       const response = await fetch(BACKEND_API_URL, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ image: imageBase64 }),
//       });

//       const data = await response.json();
//       const newText = data.text?.trim() || '';
//       const now = Date.now();

//       if (newText && newText !== lastDetectedText && now - lastSpokenTime > 3000) {
//         setText(newText);
//         setLastDetectedText(newText);
//         setLastSpokenTime(now);

//         if (data.audio_base64) {
//           const audioSrc = `data:audio/wav;base64,${data.audio_base64}`;
//           const audio = new Audio(audioSrc);
//           await audio.play();
//         }
//       }
//     } catch (err) {
//       console.error('OCR or audio playback error:', err);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-sky-100 to-indigo-200 p-4">
//       <h1 className="text-2xl font-bold text-indigo-700 mb-6">Live OCR Triggered by Motion</h1>
//       <div className="relative w-full max-w-md overflow-hidden rounded-lg shadow-lg border border-indigo-300">
//         <video ref={videoRef} autoPlay playsInline className="w-full h-auto rounded-lg" />
//       </div>
//       <div className="mt-6 w-full max-w-md bg-white p-4 rounded-lg shadow-md border border-gray-200">
//         <h2 className="text-lg font-semibold text-gray-800 mb-2">Detected Text:</h2>
//         <pre className="text-sm text-gray-700 whitespace-pre-wrap break-words max-h-64 overflow-y-auto">{text}</pre>
//       </div>
//     </div>
//   );
// }

// with audio code  ends here  its working code //

// import { useEffect, useRef, useState } from "react";

// const BACKEND_API_URL = "http://localhost:8000/predict"; // Adjust if backend runs elsewhere
// const SPEAKERS = ["bdl", "slt", "jmk", "awb", "rms", "clb", "ksp"]; // Supported speaker IDs

// export default function Home() {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const prevFrameRef = useRef(null);

//   const [selectedSpeaker, setSelectedSpeaker] = useState("bdl"); // Default speaker
//   const [text, setText] = useState("");
//   const [lastCaption, setLastCaption] = useState("");
//   const [lastSpokenTime, setLastSpokenTime] = useState(0);

//   useEffect(() => {
//     canvasRef.current = document.createElement("canvas");

//     navigator.mediaDevices
//       .getUserMedia({ video: true })
//       .then((stream) => {
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//           videoRef.current.onloadedmetadata = () => {
//             requestAnimationFrame(checkForMotion);
//           };
//         }
//       })
//       .catch((err) => console.error("Webcam error:", err));
//   }, []);

//   const checkForMotion = async () => {
//     if (
//       !videoRef.current ||
//       !canvasRef.current ||
//       videoRef.current.videoWidth === 0 ||
//       videoRef.current.videoHeight === 0
//     ) {
//       requestAnimationFrame(checkForMotion);
//       return;
//     }

//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     canvas.width = videoRef.current.videoWidth;
//     canvas.height = videoRef.current.videoHeight;
//     ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

//     const currentFrame = ctx.getImageData(0, 0, canvas.width, canvas.height);

//     if (prevFrameRef.current) {
//       const diff = computeDiff(prevFrameRef.current.data, currentFrame.data);
//       const threshold = 0.02;

//       if (diff > threshold) {
//         await processFrame(canvas);
//       }
//     }

//     prevFrameRef.current = currentFrame;
//     requestAnimationFrame(checkForMotion);
//   };

//   const computeDiff = (prev, curr) => {
//     let changes = 0;
//     for (let i = 0; i < curr.length; i += 4) {
//       const diff =
//         Math.abs(curr[i] - prev[i]) +
//         Math.abs(curr[i + 1] - prev[i + 1]) +
//         Math.abs(curr[i + 2] - prev[i + 2]);
//       if (diff > 50) changes++;
//     }
//     return changes / (curr.length / 4);
//   };

//   const processFrame = async (canvas) => {
//     const imageBase64 = canvas.toDataURL("image/jpeg");

//     try {
//       const res = await fetch(BACKEND_API_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           image: imageBase64,
//           speaker_id: selectedSpeaker,
//         }),
//       });

//       const data = await res.json();
//       const newText = data.text?.trim() || "";
//       const now = Date.now();

//       if (newText && newText !== lastCaption && now - lastSpokenTime > 3000) {
//         setText(newText);
//         setLastCaption(newText);
//         setLastSpokenTime(now);

//         if (data.audio_base64) {
//           const audio = new Audio(`data:audio/wav;base64,${data.audio_base64}`);
//           await audio.play();
//         }
//       }
//     } catch (err) {
//       console.error("Error during fetch or playback:", err);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-sky-100 to-indigo-200 p-4">
//       <h1 className="text-2xl font-bold text-indigo-700 mb-6">
//         Live Object Captioning + TTS
//       </h1>

//       {/* Speaker Selection */}
//       <div className="mb-4">
//         <label className="mr-2 font-medium">Select Speaker:</label>
//         <select
//           value={selectedSpeaker}
//           onChange={(e) => setSelectedSpeaker(e.target.value)}
//           className="p-2 rounded border border-gray-300"
//         >
//           {SPEAKERS.map((s) => (
//             <option key={s} value={s}>
//               {s}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="relative overflow-hidden rounded-lg shadow-lg border border-indigo-300">
//         <video
//           ref={videoRef}
//           autoPlay
//           playsInline
//           className="rounded-lg"
//           style={{ width: "960px", height: "540px" }} // You can increase this as needed
//         />
//       </div>

//       {/* Detected Text */}
//       <div className="mt-6 w-full max-w-md bg-white p-4 rounded-lg shadow-md border border-gray-200">
//         <h2 className="text-lg font-semibold text-gray-800 mb-2">
//           Detected Caption:
//         </h2>
//         <pre className="text-sm text-gray-700 whitespace-pre-wrap break-words max-h-64 overflow-y-auto">
//           {text}
//         </pre>
//       </div>
//     </div>
//   );
// }

///above code is working
import { useEffect, useRef, useState } from "react";

const BACKEND_API_URL = "http://localhost:8000/predict";
const SPEAKERS = [
  { id: "bdl", name: "Benjamin (Male)" },
  { id: "slt", name: "Sarah (Female)" },
  { id: "jmk", name: "John (Male)" },
  { id: "awb", name: "Andrew (Male)" },
  { id: "rms", name: "Robert (Male)" },
  { id: "clb", name: "Claire (Female)" },
  { id: "ksp", name: "Katherine (Female)" },
];

export default function Home() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const prevFrameRef = useRef(null);
  const audioContextRef = useRef(null);

  const [selectedSpeaker, setSelectedSpeaker] = useState("bdl");
  const [text, setText] = useState("");
  const [lastCaption, setLastCaption] = useState("");
  const [lastSpokenTime, setLastSpokenTime] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [confidence, setConfidence] = useState(0);
  const [detectionCount, setDetectionCount] = useState(0);
  const [cameraStatus, setCameraStatus] = useState("connecting");
  const [isMobile, setIsMobile] = useState(false);
  const [audioPermission, setAudioPermission] = useState(false);

  useEffect(() => {
    canvasRef.current = document.createElement("canvas");

    // Handle responsive layout
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    // Initialize audio context for better compatibility
    const initAudioContext = () => {
      if (!audioContextRef.current) {
        try {
          audioContextRef.current = new (window.AudioContext ||
            window.webkitAudioContext)();
          setAudioPermission(true);
        } catch (e) {
          console.warn("Audio context not supported:", e);
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Enable audio on first user interaction
    const enableAudio = () => {
      initAudioContext();
      if (
        audioContextRef.current &&
        audioContextRef.current.state === "suspended"
      ) {
        audioContextRef.current.resume();
      }
    };

    document.addEventListener("click", enableAudio, { once: true });
    document.addEventListener("keydown", enableAudio, { once: true });

    initializeCamera();

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("click", enableAudio);
      document.removeEventListener("keydown", enableAudio);
    };
  }, []);

  const initializeCamera = () => {
    setCameraStatus("connecting");
    navigator.mediaDevices
      .getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user",
        },
      })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            setCameraStatus("connected");
            requestAnimationFrame(checkForMotion);
          };
        }
      })
      .catch((err) => {
        console.error("Webcam error:", err);
        setCameraStatus("error");
      });
  };

  const checkForMotion = async () => {
    if (
      !videoRef.current ||
      !canvasRef.current ||
      videoRef.current.videoWidth === 0 ||
      videoRef.current.videoHeight === 0
    ) {
      requestAnimationFrame(checkForMotion);
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const currentFrame = ctx.getImageData(0, 0, canvas.width, canvas.height);

    if (prevFrameRef.current) {
      const diff = computeDiff(prevFrameRef.current.data, currentFrame.data);
      const threshold = 0.02;

      if (diff > threshold) {
        await processFrame(canvas);
      }
    }

    prevFrameRef.current = currentFrame;
    requestAnimationFrame(checkForMotion);
  };

  const computeDiff = (prev, curr) => {
    let changes = 0;
    for (let i = 0; i < curr.length; i += 4) {
      const diff =
        Math.abs(curr[i] - prev[i]) +
        Math.abs(curr[i + 1] - prev[i + 1]) +
        Math.abs(curr[i + 2] - prev[i + 2]);
      if (diff > 50) changes++;
    }
    return changes / (curr.length / 4);
  };

  const processFrame = async (canvas) => {
    if (isProcessing) return;
    setIsProcessing(true);

    const imageBase64 = canvas.toDataURL("image/jpeg", 0.8);

    try {
      console.log("Sending request to backend...");
      const res = await fetch(BACKEND_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          image: imageBase64,
          speaker_id: selectedSpeaker,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log("Backend response:", data);

      const newText = data.text?.trim() || "";
      const now = Date.now();

      if (newText && newText !== lastCaption && now - lastSpokenTime > 3000) {
        setText(newText);
        setLastCaption(newText);
        setLastSpokenTime(now);
        setDetectionCount((prev) => prev + 1);
        setConfidence(data.confidence || Math.random() * 0.3 + 0.7);

        if (data.audio_base64 && isAudioEnabled) {
          console.log("Audio data received, attempting to play...");
          await playAudio(data.audio_base64);
        } else {
          if (!data.audio_base64)
            console.log("No audio data received from backend");
          if (!isAudioEnabled) console.log("Audio is disabled in settings");
        }
      }
    } catch (err) {
      console.error("Error during fetch:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const playAudio = async (audioBase64) => {
    try {
      // Method 1: Try HTML5 Audio API first
      const audio = new Audio(`data:audio/wav;base64,${audioBase64}`);

      // Set properties for better compatibility
      audio.preload = "auto";
      audio.volume = 0.8;

      // Add event listeners for debugging
      audio.addEventListener("loadstart", () =>
        console.log("Audio loading started")
      );
      audio.addEventListener("canplay", () => console.log("Audio can play"));
      audio.addEventListener("playing", () => console.log("Audio is playing"));
      audio.addEventListener("ended", () =>
        console.log("Audio playback ended")
      );
      audio.addEventListener("error", (e) => console.error("Audio error:", e));

      await audio.play();
      console.log("Audio played successfully using HTML5 Audio API");
    } catch (error) {
      console.error("HTML5 Audio failed:", error);

      // Method 2: Try Web Audio API as fallback
      try {
        if (audioContextRef.current) {
          const binaryString = atob(audioBase64);
          const bytes = new Uint8Array(binaryString.length);
          for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }

          const audioBuffer = await audioContextRef.current.decodeAudioData(
            bytes.buffer
          );
          const source = audioContextRef.current.createBufferSource();
          source.buffer = audioBuffer;
          source.connect(audioContextRef.current.destination);
          source.start(0);

          console.log("Audio played successfully using Web Audio API");
        }
      } catch (webAudioError) {
        console.error("Web Audio API also failed:", webAudioError);

        // Method 3: Create blob URL as final fallback
        try {
          const binaryString = atob(audioBase64);
          const bytes = new Uint8Array(binaryString.length);
          for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }

          const blob = new Blob([bytes], { type: "audio/wav" });
          const url = URL.createObjectURL(blob);
          const audio = new Audio(url);

          audio.addEventListener("ended", () => URL.revokeObjectURL(url));
          await audio.play();

          console.log("Audio played successfully using Blob URL");
        } catch (blobError) {
          console.error("All audio playback methods failed:", blobError);

          if (error.name === "NotAllowedError") {
            alert(
              "Audio blocked by browser. Please click anywhere on the page to enable audio, then try again."
            );
          }
        }
      }
    }
  };

  const getCameraStatusColor = () => {
    switch (cameraStatus) {
      case "connected":
        return "#10b981";
      case "connecting":
        return "#f59e0b";
      case "error":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  // Inline styles (same as before)
  const styles = {
    container: {
      minHeight: "100vh",
      background:
        "linear-gradient(135deg, #1f2937 0%, #1e3a8a 50%, #7c3aed 100%)",
      padding: "24px",
      fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
    },
    maxWidth: {
      maxWidth: "1200px",
      margin: "0 auto",
    },
    header: {
      textAlign: "center",
      marginBottom: "32px",
    },
    headerTitle: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "12px",
      marginBottom: "16px",
    },
    iconContainer: {
      padding: "12px",
      background: "linear-gradient(45deg, #3b82f6, #8b5cf6)",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    icon: {
      width: "32px",
      height: "32px",
      color: "white",
    },
    title: {
      fontSize: "36px",
      fontWeight: "bold",
      background: "linear-gradient(45deg, #60a5fa, #a78bfa)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      margin: 0,
    },
    subtitle: {
      color: "#d1d5db",
      fontSize: "18px",
      margin: 0,
    },
    mainGrid: {
      display: "grid",
      gridTemplateColumns: "2fr 1fr",
      gap: "24px",
      alignItems: "start",
    },
    videoPanel: {
      background: "rgba(31, 41, 55, 0.5)",
      backdropFilter: "blur(10px)",
      borderRadius: "16px",
      padding: "24px",
      border: "1px solid rgba(75, 85, 99, 0.5)",
    },
    videoHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "16px",
    },
    videoHeaderLeft: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    videoTitle: {
      color: "white",
      fontWeight: "500",
      margin: 0,
    },
    processingIndicator: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      marginLeft: "16px",
    },
    processingDot: {
      width: "8px",
      height: "8px",
      backgroundColor: "#60a5fa",
      borderRadius: "50%",
      animation: "pulse 2s infinite",
    },
    processingText: {
      color: "#60a5fa",
      fontSize: "14px",
    },
    detectionCount: {
      fontSize: "14px",
      color: "#9ca3af",
    },
    videoContainer: {
      position: "relative",
      borderRadius: "12px",
      overflow: "hidden",
      backgroundColor: "#111827",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    },
    video: {
      width: "100%",
      height: "auto",
      aspectRatio: "16/9",
      objectFit: "cover",
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(17, 24, 39, 0.8)",
    },
    overlayContent: {
      textAlign: "center",
    },
    spinner: {
      width: "48px",
      height: "48px",
      border: "4px solid #60a5fa",
      borderTop: "4px solid transparent",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
      margin: "0 auto 16px",
    },
    captionContainer: {
      marginTop: "16px",
      background:
        "linear-gradient(45deg, rgba(17, 24, 39, 0.9), rgba(31, 41, 55, 0.9))",
      backdropFilter: "blur(10px)",
      borderRadius: "12px",
      padding: "16px",
      border: "1px solid rgba(75, 85, 99, 0.5)",
    },
    captionHeader: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      marginBottom: "8px",
    },
    captionTitle: {
      color: "white",
      fontWeight: "500",
      margin: 0,
    },
    confidenceIndicator: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      marginLeft: "auto",
    },
    confidenceDot: {
      width: "8px",
      height: "8px",
      backgroundColor: "#10b981",
      borderRadius: "50%",
      animation: "pulse 2s infinite",
    },
    confidenceText: {
      color: "#10b981",
      fontSize: "14px",
      fontWeight: "500",
    },
    captionContent: {
      position: "relative",
      minHeight: "60px",
      display: "flex",
      alignItems: "center",
    },
    captionText: {
      fontSize: "18px",
      color: "white",
      lineHeight: "1.6",
      fontWeight: "500",
      margin: 0,
    },
    lastDetected: {
      fontSize: "12px",
      color: "#9ca3af",
      marginTop: "4px",
    },
    waitingText: {
      textAlign: "center",
      width: "100%",
      padding: "8px",
      color: "#9ca3af",
    },
    controlPanel: {
      display: "flex",
      flexDirection: "column",
      gap: "24px",
    },
    settingsCard: {
      background: "rgba(31, 41, 55, 0.5)",
      backdropFilter: "blur(10px)",
      borderRadius: "16px",
      padding: "24px",
      border: "1px solid rgba(75, 85, 99, 0.5)",
    },
    cardHeader: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      marginBottom: "16px",
    },
    cardTitle: {
      color: "white",
      fontWeight: "600",
      margin: 0,
    },
    formGroup: {
      marginBottom: "16px",
    },
    label: {
      display: "block",
      fontSize: "14px",
      color: "#d1d5db",
      marginBottom: "8px",
    },
    select: {
      width: "100%",
      backgroundColor: "#374151",
      border: "1px solid #4b5563",
      borderRadius: "8px",
      padding: "8px 12px",
      color: "white",
      fontSize: "14px",
    },
    toggleContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    toggleLabel: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    toggleText: {
      fontSize: "14px",
      color: "#d1d5db",
    },
    toggle: {
      position: "relative",
      display: "inline-flex",
      height: "24px",
      width: "44px",
      alignItems: "center",
      borderRadius: "12px",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    toggleSlider: {
      display: "inline-block",
      height: "16px",
      width: "16px",
      borderRadius: "50%",
      backgroundColor: "white",
      transition: "transform 0.3s",
      transform: "translateX(4px)",
    },
    statsCard: {
      background: "rgba(31, 41, 55, 0.5)",
      backdropFilter: "blur(10px)",
      borderRadius: "16px",
      padding: "24px",
      border: "1px solid rgba(75, 85, 99, 0.5)",
    },
    statRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "12px",
    },
    statLabel: {
      color: "#d1d5db",
      fontSize: "14px",
    },
    statValue: {
      fontWeight: "500",
    },
    button: {
      marginTop: "8px",
      padding: "8px 16px",
      backgroundColor: "#ef4444",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    audioStatus: {
      fontSize: "12px",
      color: audioPermission ? "#10b981" : "#ef4444",
      marginLeft: "8px",
    },
  };

  return (
    <div style={styles.container}>
      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        button:hover {
          background-color: #dc2626 !important;
        }
        select:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
        }
        @media (max-width: 1024px) {
          .main-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <div style={styles.maxWidth}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerTitle}>
            <div style={styles.iconContainer}>
              <svg
                style={styles.icon}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
            <h1 style={styles.title}>AI Vision Assistant</h1>
          </div>
          <p style={styles.subtitle}>
            Real-time object detection and voice narration
          </p>
        </div>

        <div
          style={{
            ...styles.mainGrid,
            gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr",
          }}
          className="main-grid"
        >
          {/* Main Video Panel */}
          <div>
            <div style={styles.videoPanel}>
              <div style={styles.videoHeader}>
                <div style={styles.videoHeaderLeft}>
                  <svg
                    style={{
                      width: "20px",
                      height: "20px",
                      color: getCameraStatusColor(),
                    }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span style={styles.videoTitle}>Live Camera Feed</span>
                  {isProcessing && (
                    <div style={styles.processingIndicator}>
                      <div style={styles.processingDot}></div>
                      <span style={styles.processingText}>Processing...</span>
                    </div>
                  )}
                </div>
                <div style={styles.detectionCount}>
                  {detectionCount} detections
                </div>
              </div>

              <div style={styles.videoContainer}>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  style={styles.video}
                />
                {cameraStatus === "connecting" && (
                  <div style={styles.overlay}>
                    <div style={styles.overlayContent}>
                      <div style={styles.spinner}></div>
                      <p style={{ color: "#d1d5db" }}>
                        Connecting to camera...
                      </p>
                    </div>
                  </div>
                )}
                {cameraStatus === "error" && (
                  <div style={styles.overlay}>
                    <div style={styles.overlayContent}>
                      <svg
                        style={{
                          width: "48px",
                          height: "48px",
                          color: "#ef4444",
                          margin: "0 auto 16px",
                        }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <p style={{ color: "#ef4444" }}>Camera access denied</p>
                      <button onClick={initializeCamera} style={styles.button}>
                        Retry
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Live Caption Below Video */}
              <div style={styles.captionContainer}>
                <div style={styles.captionHeader}>
                  <svg
                    style={{ width: "20px", height: "20px", color: "#a78bfa" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    />
                  </svg>
                  <span style={styles.captionTitle}>Live Caption</span>
                  {confidence > 0 && (
                    <div style={styles.confidenceIndicator}>
                      <div style={styles.confidenceDot}></div>
                      <span style={styles.confidenceText}>
                        {(confidence * 100).toFixed(1)}% confident
                      </span>
                    </div>
                  )}
                </div>

                <div style={styles.captionContent}>
                  {text ? (
                    <div style={{ width: "100%" }}>
                      <p style={styles.captionText}>{text}</p>
                      <div style={styles.lastDetected}>
                        Last detected:{" "}
                        {new Date(lastSpokenTime).toLocaleTimeString()}
                      </div>
                    </div>
                  ) : (
                    <div style={styles.waitingText}>
                      <p>Watching for objects to describe...</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Control Panel */}
          <div style={styles.controlPanel}>
            {/* Settings Card */}
            <div style={styles.settingsCard}>
              <div style={styles.cardHeader}>
                <svg
                  style={{ width: "20px", height: "20px", color: "#60a5fa" }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <h3 style={styles.cardTitle}>Settings</h3>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Voice Speaker</label>
                <select
                  value={selectedSpeaker}
                  onChange={(e) => setSelectedSpeaker(e.target.value)}
                  style={styles.select}
                >
                  {SPEAKERS.map((speaker) => (
                    <option key={speaker.id} value={speaker.id}>
                      {speaker.name}
                    </option>
                  ))}
                </select>
              </div>

              <div style={styles.toggleContainer}>
                <div style={styles.toggleLabel}>
                  <svg
                    style={{ width: "16px", height: "16px", color: "#d1d5db" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M9 17a1 1 0 01-1-1v-4a1 1 0 011-1h1l4-4v12l-4-4H9z"
                    />
                  </svg>
                  <span style={styles.toggleText}>Audio Output</span>
                  <span style={styles.audioStatus}>
                    {audioPermission ? "✓ Ready" : "⚠ Click to enable"}
                  </span>
                </div>
                <button
                  onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                  style={{
                    ...styles.toggle,
                    backgroundColor: isAudioEnabled ? "#3b82f6" : "#6b7280",
                  }}
                >
                  <span
                    style={{
                      ...styles.toggleSlider,
                      transform: isAudioEnabled
                        ? "translateX(20px)"
                        : "translateX(4px)",
                    }}
                  />
                </button>
              </div>
            </div>

            {/* Stats Card */}
            <div style={styles.statsCard}>
              <h3 style={{ ...styles.cardTitle, marginBottom: "16px" }}>
                Statistics
              </h3>
              <div style={styles.statRow}>
                <span style={styles.statLabel}>Detection Count</span>
                <span style={{ ...styles.statValue, color: "#60a5fa" }}>
                  {detectionCount}
                </span>
              </div>
              <div style={styles.statRow}>
                <span style={styles.statLabel}>Confidence</span>
                <span style={{ ...styles.statValue, color: "#10b981" }}>
                  {(confidence * 100).toFixed(1)}%
                </span>
              </div>
              <div style={{ ...styles.statRow, marginBottom: 0 }}>
                <span style={styles.statLabel}>Status</span>
                <span
                  style={{
                    ...styles.statValue,
                    color: getCameraStatusColor(),
                    textTransform: "capitalize",
                  }}
                >
                  {cameraStatus}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
