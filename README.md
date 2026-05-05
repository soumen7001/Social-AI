# SocialAI

An AI-powered Instagram management tool that helps you optimize your Instagram presence with advanced analytics, AI-generated captions, and intelligent content strategies.

## Features

- **Reels Architect**: Analyze and optimize Instagram Reels for maximum engagement
- **AI Captions**: Generate compelling captions using advanced AI models
- **Trend Analysis**: Stay ahead with data-driven insights
- **Firebase Integration**: Secure authentication and data storage
- **Local AI Processing**: On-device image classification with ResNet-50

## Tech Stack

- **Backend**: Flask (Python)
- **Frontend**: HTML, CSS, JavaScript
- **AI Models**: Gemini, Poe API, Hugging Face Transformers
- **Database**: Firebase
- **Styling**: Tailwind CSS

## Setup Instructions

### Prerequisites

- Python 3.8+
- Node.js (for any frontend dependencies, if needed)
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/socialai.git
   cd socialai
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your API keys:
   - Get Poe API keys from [Poe](https://poe.com/)
   - Get Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Get Hugging Face token from [Hugging Face](https://huggingface.co/settings/tokens)

5. Set up Firebase:
   - Download your Firebase Admin SDK JSON file
   - Rename it to `firebase-adminsdk.json` and place it in the root directory

### Running the Application

1. Start the Flask server:
   ```bash
   python app.py
   ```

2. Open your browser and navigate to `http://localhost:5000`

## Project Structure

```
socialai/
├── app.py                 # Flask backend server
├── index.html            # Main HTML page
├── style.css             # Custom styles
├── js/                   # JavaScript modules
│   ├── main.js
│   ├── auth.js
│   ├── firebase-config.js
│   ├── firebase-utils.js
│   ├── analysis.js
│   ├── history.js
│   └── ui.js
├── requirements.txt      # Python dependencies
├── firebase-adminsdk.json # Firebase config (not in repo)
├── .env                  # Environment variables (not in repo)
└── .env.example         # Environment template
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Disclaimer

This tool is for educational and personal use. Please comply with Instagram's terms of service and API usage policies.