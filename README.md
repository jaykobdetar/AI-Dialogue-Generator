
# Ai Dialogue Generator

> Create realistic conversations between custom characters and convert them to audio using AI

![Demo](https://img.shields.io/badge/Demo-Available-green) ![License](https://img.shields.io/badge/License-MIT-blue) ![AI-Powered](https://img.shields.io/badge/AI-Powered-purple) ![Audio](https://img.shields.io/badge/Audio-Supported-orange)

## 🚀 Overview

The AI Dialogue Generator is a comprehensive toolkit for creating realistic conversations between custom characters. It features a modern chat interface powered by leading AI APIs, plus integrated audio conversion that transforms text conversations into natural speech using ElevenLabs TTS - all within a single HTML file.

## ✨ Features

### 💬 Dialogue Generation
- **AI-Powered Conversations**: Support for OpenAI, Grok/xAI, and Claude APIs
- **Demo Mode**: Try without API keys using built-in conversation templates
- **Character Consistency**: AI maintains personality traits and speech patterns
- **Realistic Timestamps**: Progressive, authentic time progression
- **Topic Flexibility**: Generate conversations about any subject
- **Variable Length**: Control conversation length (2-50 messages)

### 🎭 Advanced Character System
- **Rich Profiles**: Name, age, personality, background, occupation
- **Custom Avatars**: Upload profile pictures for visual authenticity
- **Relationship Dynamics**: Define how characters relate to each other
- **Communication Styles**: Choose communication patterns (formal, casual, emoji-heavy, etc.)
- **Import/Export**: Share character collections via JSON files
- **Local Storage**: All data stays on your device

### 🎵 Audio Conversion
- **Text-to-Speech**: Convert conversations to realistic audio using ElevenLabs
- **Voice Mapping**: Assign different voices to each character
- **Natural Flow**: Optional pauses between speakers
- **High Quality**: Professional TTS with emotional intonation
- **Easy Export**: Download conversations as MP3 files

### 🎨 Modern Interface
- **Clean Design**: Modern styling with hover effects
- **Responsive Layout**: Works seamlessly on desktop and mobile
- **Dark Theme**: Easy on the eyes with a professional color scheme
- **Smooth Animations**: Polished interactions and transitions

## 🛠️ Getting Started

### Using the All-in-One HTML App
1. **Quick Start**: Open `Dialogue_Generator.html` in any modern web browser
2. **Demo Mode**: Select "Demo Mode" for instant use without API keys
3. **Full Mode**: Add your AI API key for unlimited dialogue generation
4. **Character Setup**: Create profiles with personalities and avatars
5. **Generate**: Choose two characters and a topic to start conversations
6. **Audio Conversion**: Use the integrated audio feature with your ElevenLabs API key
7. **Assign Voices**: Map characters to different voice options
8. **Generate Audio**: Create and download MP3 audio file

### Development Version
1. **Clone Repository**: `git clone https://github.com/yourusername/AI-Dialogue-Generator.git`
2. **Navigate**: `cd AI-Dialogue-Generator/Chat Generator`
3. **Open Main Page**: Open `main_index.html` in your browser
4. **Launch Chat Generator**: Click "Start Chat Generator"

## 🎯 Use Cases

- **Creative Writing**: Develop character dialogues and test relationships
- **Game Development**: Prototype NPC conversations and quest dialogues
- **Screenwriting**: Test dialogue flow and character voice consistency
- **Content Creation**: Generate engaging conversations for social media
- **Education**: Demonstrate communication patterns and styles
- **Role-Playing Games**: Create D&D/RPG character interactions
- **Voice Acting**: Practice with different character voices
- **Accessibility**: Convert text conversations to audio format

## 📖 User Guide

### Creating Characters
1. **Basic Info**: Add name and upload avatar image
2. **Demographics**: Set age and background details
3. **Personality**: Describe traits, quirks, and communication style
4. **Relationships**: Define character connections and dynamics
5. **Communication Style**: Choose how they communicate (grammar, emojis, etc.)
6. **Save**: Characters are stored locally for reuse

### Generating Dialogues
1. **Select Characters**: Choose two characters from your collection
2. **Set Topic**: Describe the conversation subject
3. **Configure**: Set message count and optional advanced settings
4. **Generate**: AI creates the conversation maintaining character consistency
5. **Export**: Download as HTML or convert to audio directly

### Converting to Audio
1. **Access Audio Feature**: Available directly in the main interface
2. **Enter API Key**: Add your ElevenLabs API key in the designated section
3. **Assign Voices**: Map characters to ElevenLabs voices
4. **Generate**: Create and download MP3 audio file

## 🔌 Supported Services

### AI Providers
| Provider | Models | Features |
|----------|--------|----------|
| **OpenAI** | GPT-4, GPT-4o, GPT-3.5 | Reliable, high-quality conversations |
| **Grok (xAI)** | Grok-3, Grok Beta | Creative, personality-rich dialogues |
| **Claude** | 3.5 Sonnet, Haiku, Opus | Context-aware, nuanced responses |
| **Custom** | Any OpenAI-compatible | Maximum flexibility |

### Voice Synthesis
- **ElevenLabs TTS**: Premium quality with multiple voice options
- **Character Voices**: Rachel, Drew, Bella, Antoni, Elli, Josh, Arnold, Sam
- **Custom Voices**: Support for user's ElevenLabs voice library

## 🏗️ Project Structure

```
AI-Dialogue-Generator/
├── Dialogue_Generator.html           # Main all-in-one application (standalone)
├── README.md                          # This documentation
├── LICENSE                            # MIT License
├── Chat Generator/                    # Development files
│   ├── main_index.html               # Landing page
│   ├── README.md                     # Chat generator readme
│   ├── requirements.txt              # Python dependencies
│   ├── project_structure.json        # Project metadata
│   └── src/                          # Source code (modular version)
│       ├── chat_generator/           # Web application
│       │   ├── index.html            # Application entry
│       │   ├── css/styles.css        # Styling
│       │   └── js/                   # JavaScript modules
│       └── audio_converter/          # Previous audio converter code (now integrated)
│           ├── app.py                # Former Streamlit app
│           ├── chat_parser.py        # HTML parsing
│           └── elevenlabs_client.py  # TTS integration
└── example chat.html                  # Sample conversation
```

## 🔒 Privacy & Security

- **Local-First**: All data stored in browser only, no external tracking
- **API Security**: Keys stored locally, transmitted only to chosen endpoints
- **No Data Collection**: Zero telemetry or analytics
- **Safe Imports**: Warning prompts for character file imports
- **HTTPS Only**: Secure connections for all API calls

## 🛠️ Technical Details

### All-in-One Application
- **Technology**: Pure HTML5, CSS3, JavaScript (ES6+)
- **Storage**: Browser LocalStorage
- **Architecture**: Single-file application with integrated audio conversion
- **APIs**: OpenAI/Grok/Claude for dialogue, ElevenLabs for TTS
- **Compatibility**: All modern browsers, mobile-friendly
- **Output**: Chat HTML and high-quality MP3 audio files

## 🤝 Contributing

Contributions welcome! Here's how to help:

1. **Bug Reports**: Open issues for problems or unexpected behavior
2. **Feature Requests**: Suggest new capabilities
3. **Documentation**: Improve guides and examples
4. **Testing**: Try different AI providers and voice combinations
5. **Examples**: Share interesting character sets or use cases

## 📜 License

MIT License - free to use, modify, and distribute.

## 🙏 Acknowledgments

- **Claude AI**: Collaborative development partner
- **AI Providers**: OpenAI, xAI, Anthropic for API access
- **ElevenLabs**: High-quality voice synthesis
- **Community**: User feedback and suggestions

## 📞 Support

For questions, issues, or feature requests:
- **GitHub Issues**: Report bugs and request features
- **Email**: simyc4982@gmail.com for security concerns
- **Documentation**: Check the project wiki for detailed guides

---

*Made with ❤️ using Claude AI. Perfect for writers, game developers, and anyone who loves creating engaging conversations.*
