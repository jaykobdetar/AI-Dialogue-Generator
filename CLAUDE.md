# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

The AI Dialogue Generator is a toolkit for creating realistic conversations between custom characters using AI models and converting them to audio:

1. **Chat Generator**: A web-based application allowing users to create characters and generate conversations
   - HTML/CSS/JavaScript (browser-local, no server dependencies)
   - Supports OpenAI, Grok/xAI, and Claude APIs
   - Character profiles with detailed personality traits 
   - Demo mode for using without API keys

2. **Audio Converter**: A Python Streamlit application that converts chat logs to audio
   - Parses HTML conversations
   - Integrates with ElevenLabs TTS API
   - Maps different characters to different voices

## Project Structure

```
AI-Dialogue-Generator/
├── Dialogue_Generator.html           # Main chat generator (standalone)
├── Dialogue_voice_generator.py       # Audio converter app
├── Chat Generator/                   # Development files
│   ├── main_index.html               # Landing page
│   ├── src/                         
│       ├── chat_generator/           # Web application
│       │   ├── index.html            # Application entry
│       │   ├── css/styles.css        # Styling
│       │   └── js/                   # JavaScript modules
│       │       ├── api.js            # API integration
│       │       ├── app.js            # Main application logic
│       │       ├── storage.js        # LocalStorage management
│       │       └── ui.js             # UI interactions
│       └── audio_converter/          # Python audio converter
│           ├── app.py                # Streamlit app
│           ├── chat_parser.py        # HTML parsing
│           ├── audio_processor.py    # Audio processing
│           └── elevenlabs_client.py  # TTS integration
```

## Development Commands

### Chat Generator

#### Running the Web Application
```bash
# View standalone version
# Just open Dialogue_Generator.html in any browser

# Or serve the development version
cd "Chat Generator"
python -m http.server 8000
# Then open http://localhost:8000/main_index.html in browser
```

### Audio Converter

#### Setup Environment
```bash
# Install dependencies
pip install -r "Chat Generator/requirements.txt"
```

#### Running the Audio Converter
```bash
# Run standalone converter
streamlit run Dialogue_voice_generator.py

# Or run development version
streamlit run "Chat Generator/src/audio_converter/app.py"
```

## Architecture

### Chat Generator (JavaScript)

The Chat Generator follows a modular architecture:

- **app.js**: Main application logic and initialization
- **api.js**: Handles API calls to OpenAI, Claude, and Grok
- **storage.js**: Manages character data and settings in LocalStorage
- **ui.js**: Handles UI events and DOM manipulation

The flow is:
1. User creates character profiles with personalities, backgrounds, etc.
2. User selects two characters and specifies conversation topic
3. API call is made to the selected AI provider
4. Generated conversation is displayed with timestamps
5. User can export conversation as HTML

### Audio Converter (Python)

The Audio Converter consists of:

- **app.py**: Streamlit interface and main workflow
- **chat_parser.py**: Extracts dialogue from HTML files
- **elevenlabs_client.py**: Integrates with ElevenLabs TTS API
- **audio_processor.py**: Handles audio processing and combination

The flow is:
1. User uploads HTML chat export 
2. Parser extracts usernames and message content
3. User assigns different voices to each character
4. TTS API generates audio for each message
5. Audio segments are combined into a single MP3

## Security Considerations

- API keys are stored locally and only sent to official endpoints
- No telemetry or usage tracking
- Input sanitization for HTML content
- URL validation to prevent injection attacks

## Contributing Guidelines

Follow these practices when contributing to this project:

1. Maintain the modular architecture of both components
2. Follow existing code style and patterns
3. Keep the standalone HTML file functional
4. Test changes in both standalone and development versions
5. Maintain browser compatibility for the web component
6. Preserve the serverless, client-side nature of the chat generator

## Testing

There are currently no formal testing frameworks. Test changes manually:

1. For Chat Generator: Test character creation, API calls, conversation generation
2. For Audio Converter: Test HTML parsing, voice mapping, and audio generation

## Limitations

- The Chat Generator is a client-side application with browser memory limits
- The Audio Converter requires an ElevenLabs API key and is subject to rate limits
- No server-side components or persistent database storage