# Discord-Style AI Chat Generator

> Generate realistic Discord-style text conversations between custom characters using AI APIs

![Demo](https://img.shields.io/badge/Demo-Available-green) ![License](https://img.shields.io/badge/License-MIT-blue) ![AI-Powered](https://img.shields.io/badge/AI-Powered-purple)

## 🚀 Quick Start

### Option 1: Download Single File (Easiest)
1. Download `discord-chat-generator.html` from the [releases](https://github.com/yourusername/discord-chat-generator/releases)
2. Open the file in any modern web browser
3. Select "Demo Mode" to try without an API key, or add your OpenAI/Grok/Claude API key for full functionality

### Option 2: Run from Source
```bash
# Clone the repository
git clone https://github.com/yourusername/discord-chat-generator.git
cd discord-chat-generator

# Open in browser
open index.html
# or serve locally
python -m http.server 8000
```

### Option 3: Audio Converter
```bash
# Install Python dependencies
pip install -r requirements.txt

# Run the audio converter
streamlit run src/audio_converter/app.py
```

## ✨ Features

### 🎭 Advanced Character Creation
- **Detailed Profiles**: Name, age, personality, background, occupation
- **Custom Avatars**: Upload profile pictures for visual authenticity
- **Relationship Dynamics**: Define relationships between characters
- **Texting Styles**: Choose from various communication patterns
- **Import/Export**: Backup and share character collections via JSON

### 💬 Smart Conversation Generation
- **AI-Powered**: Supports OpenAI, Grok (xAI), Claude APIs
- **Demo Mode**: Try without API keys using built-in sample conversations
- **Realistic Timestamps**: AI generates progressive, authentic timestamps
- **Character Consistency**: Maintains personality and speech patterns
- **Topic Flexibility**: Generate conversations about any subject

### 🎨 Beautiful Discord UI
- **Authentic Design**: Pixel-perfect Discord styling with hover effects
- **Responsive Layout**: Works seamlessly on desktop and mobile
- **Dark Theme**: Easy on the eyes with Discord's signature dark mode
- **Smooth Animations**: Polished interactions and transitions

### 🎵 Audio Export (Bonus Feature)
- **Text-to-Speech**: Convert conversations to audio using ElevenLabs
- **Voice Assignment**: Different voices for each character
- **High Quality**: Professional TTS with natural intonation

## 🔧 Development

### Project Structure
```
discord-chat-generator/
├── src/
│   ├── chat_generator/           # Main web application
│   │   ├── css/styles.css       # Styling
│   │   ├── js/                  # JavaScript modules
│   │   └── index.html           # Application entry
│   └── audio_converter/         # Python audio converter
│       ├── app.py              # Streamlit app
│       ├── chat_parser.py      # HTML parsing
│       └── elevenlabs_client.py # TTS integration
├── scripts/build.py            # Build automation
├── dist/                       # Built files
├── docs/                       # Documentation
└── examples/                   # Sample files
```

### Building
```bash
# Build single HTML file
python scripts/build.py combined

# Build deployment package
python scripts/build.py package

# Build chat template only
python scripts/build.py template
```

### Extending
The modular architecture makes it easy to:
- Add new AI provider APIs
- Customize the Discord UI theme
- Add new export formats
- Integrate with other chat platforms

## 🔌 Supported AI Providers

| Provider | Models | Setup |
|----------|--------|-------|
| **OpenAI** | GPT-4, GPT-4o, GPT-3.5 | [Get API Key](https://platform.openai.com) |
| **Grok (xAI)** | Grok-3, Grok Beta | [Get API Key](https://x.ai) |
| **Claude** | 3.5 Sonnet, Haiku, Opus | [Get API Key](https://console.anthropic.com) |
| **Custom** | Any OpenAI-compatible | Use custom endpoint URL |

## 🎯 Use Cases

- **Creative Writing**: Develop character dialogues and relationships
- **Game Development**: Prototype NPC conversations and storylines  
- **Screenwriting**: Test dialogue flow and character voice
- **Education**: Demonstrate conversation patterns and communication styles
- **Social Media**: Create engaging fictional conversations for content
- **Role-Playing**: Generate D&D/RPG character interactions

## 🔒 Privacy & Security

- **Local-First**: All data stored in browser only
- **No Telemetry**: No usage tracking or analytics
- **API Security**: Keys stored locally, only sent to chosen endpoints
- **Open Source**: Full transparency in code and functionality

## 📖 Documentation

- [API Setup Guide](docs/api-setup-guide.md)
- [Character Creation Tips](docs/character-creation-tips.md) 
- [Troubleshooting](docs/troubleshooting.md)
- [Audio Converter Guide](docs/audio-converter-readme.md)

## 🤝 Contributing

Contributions welcome! See our [contribution guidelines](CONTRIBUTING.md).

### Development Setup
```bash
# Fork and clone the repo
git clone https://github.com/yourusername/discord-chat-generator.git

# Make changes to src/ files
# Test locally by opening index.html

# Build for distribution
python scripts/build.py package

# Submit pull request
```

## 📜 License

[MIT License](LICENSE) - feel free to use, modify, and distribute.

## 🙏 Acknowledgments

- **Built with Claude AI**: Collaborative development with Anthropic's Claude
- **Discord Design**: UI inspiration from Discord's excellent interface
- **Community**: Feedback and contributions from users and developers

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/discord-chat-generator/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/discord-chat-generator/discussions)
- **Documentation**: Check the `docs/` folder for detailed guides

---

*Made with ❤️ using Claude AI. Perfect for writers, developers, and anyone who loves great conversation.*