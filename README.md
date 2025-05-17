# Discord-Style AI Chat Generator

> Generate realistic Discord-style text conversations between custom characters using AI APIs

![Demo](https://img.shields.io/badge/Demo-Available-green) ![License](https://img.shields.io/badge/License-MIT-blue) ![AI-Powered](https://img.shields.io/badge/AI-Powered-purple)

## 🚀 Overview

The Discord-Style AI Chat Generator is a powerful web application that creates realistic text message conversations between custom characters. Built with modern web technologies and powered by leading AI APIs (OpenAI, Grok, Claude), it offers an intuitive interface for character creation, conversation generation, and beautiful Discord-style output.

## ✨ Features

### 🎭 Advanced Character Creation
- **Detailed Profiles**: Name, age, personality, background, occupation
- **Custom Avatars**: Upload profile pictures for visual authenticity
- **Relationship Dynamics**: Define relationships between characters
- **Texting Styles**: Choose from various communication patterns (formal, casual, emoji-heavy, etc.)
- **Import/Export**: Backup and share character collections via JSON files

### 💬 Smart Conversation Generation
- **AI-Powered**: Supports multiple AI providers (OpenAI, Grok/xAI, Claude)
- **Realistic Timestamps**: AI generates progressive, realistic time stamps
- **Character Consistency**: AI maintains personality and speech patterns
- **Topic Flexibility**: Generate conversations about any subject
- **Variable Length**: Control conversation length (2-50 messages)

### 🎨 Beautiful Discord UI
- **Authentic Design**: Pixel-perfect Discord styling with hover effects
- **Responsive Layout**: Works seamlessly on desktop and mobile
- **Dark Theme**: Easy on the eyes with Discord's signature dark mode
- **Smooth Animations**: Polished interactions and transitions

### 🔧 Developer-Friendly
- **No Installation**: Single HTML file, runs in any browser
- **Local Storage**: All data stays on your device
- **API Agnostic**: Easy to extend with new AI providers
- **Export Options**: Download conversations as clean HTML files

## 🎯 Use Cases

- **Creative Writing**: Develop character dialogues and relationships
- **Game Development**: Prototype NPC conversations and storylines
- **Screenwriting**: Test dialogue flow and character voice
- **Social Media**: Create engaging fictional conversations for content
- **Education**: Demonstrate conversation patterns and communication styles
- **Role-Playing**: Generate D&D/RPG character interactions

## 🛠️ Quick Start

### Option 1: Demo Mode (No API Key Required)
1. Download the `discord-chat-generator.html` file
2. Open it in any modern web browser
3. Select "Demo Mode" from the API Provider dropdown
4. Create characters and generate sample conversations instantly

### Option 2: Full AI Mode
1. Download the HTML file and open in your browser
2. Choose your preferred AI provider:
   - **OpenAI**: Get API key from [platform.openai.com](https://platform.openai.com)
   - **Grok (xAI)**: Get API key from [x.ai](https://x.ai)
   - **Claude**: Get API key from [console.anthropic.com](https://console.anthropic.com)
3. Enter your API key and select a model
4. Create detailed characters with personalities and relationships
5. Generate unlimited realistic conversations

## 📖 User Guide

### Creating Characters
1. **Basic Info**: Add name and upload avatar image
2. **Demographics**: Set age and background information
3. **Personality**: Describe traits, quirks, and communication style
4. **Relationships**: Define how characters relate to each other
5. **Texting Style**: Choose communication patterns
6. **Save & Reuse**: Characters are saved locally for future conversations

### Generating Conversations
1. **Select Characters**: Choose two saved characters from dropdowns
2. **Set Topic**: Describe what the conversation should be about
3. **Choose Length**: Set number of messages (2-50)
4. **Generate**: Click generate and watch the conversation unfold
5. **Export**: Download as standalone HTML file for sharing

### Advanced Features
- **Custom System Prompts**: Fine-tune AI behavior in Advanced Mode
- **Character Import/Export**: Share character collections with others
- **API Flexibility**: Switch between different AI providers seamlessly

## 🔌 Supported AI Providers

| Provider | Models Available | Features |
|----------|------------------|----------|
| **OpenAI** | GPT-4, GPT-4o, GPT-4o Mini, GPT-3.5 Turbo | High quality, reliable |
| **Grok (xAI)** | Grok-3, Grok Beta | Creative, personality-rich |
| **Claude (Anthropic)** | Claude 3.5 Sonnet, Haiku, Opus | Context-aware, nuanced |
| **Custom** | Any OpenAI-compatible API | Maximum flexibility |

## 🏗️ Technical Details

### Architecture
- **Frontend**: Pure HTML5, CSS3, JavaScript (ES6+)
- **Storage**: Browser LocalStorage for persistence
- **APIs**: OpenAI-compatible REST endpoints
- **UI Framework**: Custom Discord-inspired design system

### Browser Compatibility
- ✅ Chrome/Chromium (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

### File Structure
```
├── discord-chat-generator.html     # Main application (single file)
├── README.md                       # This documentation
├── screenshots/                    # UI screenshots
│   ├── character-creation.png
│   ├── conversation-view.png
│   └── export-options.png
├── examples/                       # Sample files
│   ├── example-characters.json
│   └── sample-conversation.html
└── docs/                          # Additional documentation
    ├── api-setup-guide.md
    ├── character-creation-tips.md
    └── troubleshooting.md
```

## 🔒 Privacy & Security

- **Local-First**: All characters and settings stored in browser only
- **No Telemetry**: No usage tracking or data collection
- **API Security**: Keys stored locally, transmitted only to chosen endpoints
- **HTTPS Required**: Secure connections for all API calls

## 🤝 Contributing

While this is primarily a single-file application, contributions are welcome:

1. **Bug Reports**: Open issues for any bugs or problems
2. **Feature Requests**: Suggest new capabilities or improvements
3. **Documentation**: Help improve guides and examples
4. **Testing**: Try with different APIs and report compatibility
5. **Examples**: Share interesting character sets or conversations

## 📜 License

MIT License - feel free to use, modify, and distribute.

## 🙏 Acknowledgments

- **Built with Claude AI**: This project was developed collaboratively with Anthropic's Claude
- **Discord**: UI inspiration from Discord's excellent design
- **AI Providers**: Thanks to OpenAI, xAI, and Anthropic for their APIs
- **Community**: Feedback and suggestions from users

## 📞 Support

- **Issues**: Report bugs via GitHub Issues
- **Questions**: Ask on relevant Reddit communities (r/ChatGPT, r/webdev)
- **Documentation**: Check the `/docs` folder for detailed guides

---

*Made with ❤️ using Claude AI. Perfect for writers, developers, and anyone who loves good conversation.*