# 🚀 SocialAI: The Ultimate Instagram Growth Engine

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.8+](https://img.shields.io/badge/python-3.8+-blue.svg)](https://www.python.org/downloads/)
[![Flask](https://img.shields.io/badge/Flask-3.0+-green.svg)](https://flask.palletsprojects.com/)

**SocialAI** is a cutting-edge, AI-powered Instagram management platform designed to help creators and brands dominate their niche. By combining local machine learning (ResNet-50) with industry-leading LLMs like Gemini 2.0 and Claude 3, SocialAI provides unprecedented insights into content performance.

---

## ✨ Key Features

- **🧠 Reels Architect**: Analyze Reels drafts with computer vision to predict engagement and optimize for the "Explore" page.
- **✍️ AI-Powered Captions**: Generate viral, context-aware captions using Gemini 2.0 Flash and Claude 3 Haiku fallbacks.
- **📸 Intelligent Visual Check**: On-device image classification using ResNet-50 for instant, privacy-first object detection.
- **📈 Trend Intelligence**: Data-driven strategies based on AI analysis of visual elements and sentiment.
- **🔐 Secure Infrastructure**: Robust authentication and data persistence powered by Firebase.

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Backend** | Python (Flask), HTTPX, Dotenv |
| **Frontend** | Vanilla JS, Tailwind CSS, Lucide Icons |
| **AI Models** | Google Gemini 2.0, Poe API (Claude 3), Hugging Face (ResNet-50) |
| **Database/Auth** | Firebase Admin SDK, Firebase Web SDK |
| **ML Frameworks** | Transformers (Hugging Face), PyTorch |

---

## 🚀 Getting Started

### 📋 Prerequisites

- Python 3.8 or higher
- A Firebase Project (for Authentication and Firestore)
- API Keys for Gemini, Poe, or Hugging Face

### ⚙️ Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/soumen7001/Social-AI.git
   cd Social-AI
   ```

2. **Set Up Virtual Environment**
   ```bash
   python -m venv venv
   # On Windows
   venv\Scripts\activate
   # On macOS/Linux
   source venv/bin/activate
   ```

3. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Environment Configuration**
   ```bash
   # Windows
   copy .env.example .env
   # macOS/Linux
   cp .env.example .env
   ```
   Edit `.env` and provide your API keys:
   - `GEMINI_API_KEY`: Get from [Google AI Studio](https://aistudio.google.com/)
   - `HF_TOKEN`: Get from [Hugging Face Settings](https://huggingface.co/settings/tokens)
   - `POE_API_KEY`: (Optional) For fallback caption generation
   
   > Keep `.env` private and do not commit it to version control.

5. **Firebase Setup**
   - Place your `firebase-adminsdk.json` in the project root.
   - Update `js/firebase-config.js` with your Firebase Web configuration.
   - Keep `firebase-adminsdk.json` private and do not publish it publicly.

---

## 🏃 Running the App

1. **Start the Backend Server**
   ```bash
   python app.py
   ```
2. **Access the Interface**
   Open your browser and navigate to `http://localhost:5000`.

> [!NOTE]
> On the first run, the app will download the ResNet-50 model (~100MB) from Hugging Face for local image classification.

---

## 📂 Project Structure

```text
socialai/
├── app.py                 # Flask server & AI Routing logic
├── index.html             # Premium glassmorphic UI
├── style.css              # Custom animations & global styles
├── js/                    # Modular JavaScript
│   ├── main.js            # App initialization
│   ├── auth.js            # Firebase Auth handlers
│   ├── analysis.js        # AI Analysis orchestration
│   └── ...
├── requirements.txt       # Python package list
├── .env.example           # Environment template
└── firebase-adminsdk.json # Firebase credentials (IGNORED BY GIT)
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## ⚖️ License

Distributed under the MIT License. See `LICENSE` for more information.

## ⚠️ Disclaimer

This tool is for educational and personal use only. Ensure compliance with Instagram's [Terms of Service](https://help.instagram.com/581066165581870) and [Community Guidelines](https://help.instagram.com/477434105621119).
