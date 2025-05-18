# AI Dialogue Generator

> Create realistic Discord-style conversations between custom characters and convert them to audio using AI

![Demo](https://img.shields.io/badge/Demo-Available-green) ![License](https://img.shields.io/badge/License-MIT-blue) ![AI-Powered](https://img.shields.io/badge/AI-Powered-purple) ![Audio](https://img.shields.io/badge/Audio-Supported-orange)

## 🚀 Overview

The AI Dialogue Generator is a comprehensive toolkit for creating realistic conversations between custom characters. It features a Discord-style chat interface powered by leading AI APIs, plus an audio converter that transforms text conversations into natural speech using ElevenLabs TTS.

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
- **Texting Styles**: Choose communication patterns (formal, casual, emoji-heavy, etc.)
- **Import/Export**: Share character collections via JSON files
- **Local Storage**: All data stays on your device

### 🎵 Audio Conversion
- **Text-to-Speech**: Convert conversations to realistic audio using ElevenLabs
- **Voice Mapping**: Assign different voices to each character
- **Natural Flow**: Optional pauses between speakers
- **High Quality**: Professional TTS with emotional intonation
- **Easy Export**: Download conversations as MP3 files

### 🎨 Discord-Style Interface
- **Authentic Design**: Pixel-perfect Discord styling with hover effects
- **Responsive Layout**: Works seamlessly on desktop and mobile
- **Dark Theme**: Easy on the eyes with Discord's signature colors
- **Smooth Animations**: Polished interactions and transitions

## 🛠️ Getting Started

### Chat Generator (Web Interface)
1. **Download**: Get `Dialogue_Generator.html` from the repository
2. **Open**: Launch in any modern web browser (Chrome recommended)
3. **Demo Mode**: Select "Demo Mode" for instant use without API keys
4. **Full Mode**: Add your AI API key for unlimited generation

### Audio Converter (Python App)
1. **Install**: `pip install streamlit requests beautifulsoup4`
2. **Run**: `streamlit run Dialogue_voice_generator.py`
3. **Upload**: Load Discord-style HTML chat logs
4. **Convert**: Generate audio with customizable voice mapping

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
5. **Texting Style**: Choose how they communicate (grammar, emojis, etc.)
6. **Save**: Characters are stored locally for reuse

### Generating Dialogues
1. **Select Characters**: Choose two characters from your collection
2. **Set Topic**: Describe the conversation subject
3. **Configure**: Set message count and optional advanced settings
4. **Generate**: AI creates the conversation maintaining character consistency
5. **Export**: Download as HTML or convert to audio

### Converting to Audio
1. **Export HTML**: Save conversation from the chat generator
2. **Launch Audio App**: Run the Streamlit audio converter
3. **Upload File**: Load the HTML chat log
4. **Assign Voices**: Map characters to ElevenLabs voices
5. **Generate**: Create and download MP3 audio file

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
dialogue-generator/
├── Dialogue_Generator.html           # Main chat generator (standalone)
├── Dialogue_voice_generator.py       # Audio converter app
├── README.md                          # This documentation
├── Audio_converter_readme.md          # Detailed audio converter guide
├── LICENSE                            # MIT License
├── SECURITY.md                        # Security policy
├── Chat Generator/                    # Development files
│   ├── src/                          # Source code (modular version)
│   ├── css/styles.css                # Styling
│   └── js/                           # JavaScript modules
└── examples/                          # Sample files
    ├── example-characters.json
    └── sample-conversation.html
```

## 🔒 Privacy & Security

- **Local-First**: All data stored in browser only, no external tracking
- **API Security**: Keys stored locally, transmitted only to chosen endpoints
- **No Data Collection**: Zero telemetry or analytics
- **Safe Imports**: Warning prompts for character file imports
- **HTTPS Only**: Secure connections for all API calls

## 🛠️ Technical Details

### Chat Generator
- **Technology**: Pure HTML5, CSS3, JavaScript (ES6+)
- **Storage**: Browser LocalStorage
- **Architecture**: Single-file application with modular design
- **Compatibility**: All modern browsers, mobile-friendly

### Audio Converter
- **Technology**: Python 3.7+, Streamlit, BeautifulSoup4
- **APIs**: ElevenLabs text-to-speech
- **Input**: Discord-style HTML chat logs
- **Output**: High-quality MP3 audio files

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
- **Discord**: UI design inspiration
- **AI Providers**: OpenAI, xAI, Anthropic for API access
- **ElevenLabs**: High-quality voice synthesis
- **Community**: User feedback and suggestions

## 📞 Support

For questions, issues, or feature requests:
- **GitHub Issues**: Report bugs and request features
- **Email**: simyc4982@gmail.com for security concerns
- **Documentation**: Check `Audio_converter_readme.md` for detailed guides

---

*Made with ❤️ using Claude AI. Perfect for writers, game developers, and anyone who loves creating engaging conversations.*
