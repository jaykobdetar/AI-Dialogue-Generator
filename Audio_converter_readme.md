# AI Dialogue to Audio Converter

🎤 Transform your AI-generated dialogues into realistic audio transcripts using ElevenLabs voice synthesis!

## Overview

This Streamlit application converts HTML chat logs into immersive audio transcripts using ElevenLabs' text-to-speech API. Perfect for bringing your AI-generated conversations to life with unique voices for each character.

## Features

- 📁 Upload HTML dialogue files from the AI Dialogue Generator
- 🎭 Assign different ElevenLabs voices to each character
- 🔊 Generate high-quality audio with natural speech patterns
- 🎵 Combine all messages into a single seamless audio file
- ⚙️ Customizable voice settings and flow options
- 📲 Download complete audio transcripts as MP3 files

## Prerequisites

### Required Accounts & API Keys

1. **ElevenLabs Account**: Sign up at [elevenlabs.io](https://elevenlabs.io)
   - Get your API key from your ElevenLabs dashboard
   - Note: Free tier provides 10,000 characters/month

### System Requirements

- Python 3.7 or higher
- Internet connection for ElevenLabs API calls
- Web browser for Streamlit interface

## Installation

### Quick Setup

1. **Download the converter**: Get `Dialogue_voice_generator.py` from the repository
2. **Install dependencies**:
   ```bash
   pip install streamlit requests beautifulsoup4
   ```
3. **Run the application**:
   ```bash
   streamlit run Dialogue_voice_generator.py
   ```

### Alternative Installation (Full Repository)

```bash
# Clone the repository
git clone https://github.com/yourusername/AI-Dialogue-Generator.git
cd AI-Dialogue-Generator

# Install requirements
pip install -r "Chat Generator/requirements.txt"

# Launch the audio converter
streamlit run Dialogue_voice_generator.py
```

## How to Use

### Step 1: Generate Your Dialogue

1. Use the AI Dialogue Generator (`Dialogue_Generator.html`) to create conversations
2. Export your conversation as HTML using the "Download Chat" option
3. Save the HTML file to your computer

### Step 2: Prepare the HTML File

The converter expects HTML structure with the following elements:

```html
<div class="message">
    <div class="message-username">Alex</div>
    <div class="message-text">Hey, how's your day going?</div>
    <div class="message-timestamp">Today at 2:30 PM</div>
</div>
<div class="message">
    <div class="message-username">Jordan</div>
    <div class="message-text">Pretty good! Just finished that project.</div>
    <div class="message-timestamp">Today at 2:32 PM</div>
</div>
```

### Step 3: Launch the Converter

1. Run the Streamlit app:
   ```bash
   streamlit run Dialogue_voice_generator.py
   ```
2. Open your browser to `http://localhost:8501`

### Step 4: Configure Settings

1. **Enter API Key**: Paste your ElevenLabs API key in the sidebar
2. **Upload Dialogue**: Select your exported HTML chat file
3. **Preview**: Review the parsed messages to verify correct formatting

### Step 5: Voice Assignment

The app automatically detects all characters in your dialogue. Assign voices:

- **Rachel**: Friendly, warm female voice
- **Drew**: Casual, relaxed male voice  
- **Bella**: Young, energetic female voice
- **Antoni**: Mature, sophisticated male voice
- **Elli**: Emotional, expressive female voice
- **Josh**: Deep, confident male voice
- **Arnold**: Older, distinguished male voice
- **Sam**: Neutral, versatile voice

### Step 6: Generate Audio

1. Review your voice assignments
2. Optionally enable "Add pauses between messages" for natural conversation flow
3. Click "Generate Audio Transcript"
4. Wait for processing (time varies based on dialogue length)
5. Download and enjoy your audio dialogue!

## Advanced Configuration

### Voice Customization

Modify the voice settings in the code for fine-tuned control:

```python
DEFAULT_VOICES = {
    "Your_Character": "your_elevenlabs_voice_id",
    # Add custom voices from your ElevenLabs library
}
```

### Audio Settings

The converter uses optimized settings for conversational speech:
- **Model**: `eleven_turbo_v2_5` (fastest, best for dialogue)
- **Stability**: 0.4 (balanced consistency)
- **Similarity Boost**: 0.8 (maintains character voice)
- **Style**: 0.2 (natural conversation style)

## Troubleshooting

### Common Issues

**"No messages found in uploaded file"**
- Verify the HTML was exported correctly from the Dialogue Generator
- Check that CSS classes match: `.message`, `.message-username`, `.message-text`
- Try re-exporting the conversation with a fresh download

**"ElevenLabs API error"**
- Confirm your API key is active and properly copied
- Check your ElevenLabs account usage/quota
- Ensure stable internet connection
- Verify you haven't exceeded rate limits

**Audio quality concerns**
- Try different voice combinations for your characters
- Adjust voice settings in the code if needed
- Check that input text doesn't contain formatting artifacts

**Processing long dialogues**
- Monitor your ElevenLabs character usage
- Consider breaking very long conversations into segments
- Use the message preview to verify content before generating

### Performance Tips

- **Start small**: Test with short conversations first
- **Voice matching**: Choose voices that fit your characters' personalities
- **Character efficiency**: Longer conversations consume more API credits
- **Batch processing**: Generate multiple short dialogues rather than one very long one

## API Usage & Costs

### ElevenLabs Pricing (2024)
- **Free**: 10,000 characters/month
- **Starter**: $5/month for 30,000 characters
- **Creator**: $22/month for 100,000 characters
- **Pro**: $99/month for 500,000 characters

### Usage Calculation
Each message consumes characters equal to its text length:
- Short message: ~25-50 characters
- Typical message: ~75-150 characters
- Long message: ~200+ characters

**Example**: A 20-message conversation might use 1,500-3,000 characters.

## Integration Workflow

### Complete Dialogue-to-Audio Pipeline

1. **Create Characters** in the AI Dialogue Generator
2. **Generate Conversation** using your preferred AI provider
3. **Export as HTML** using the "Download Chat" option
4. **Convert to Audio** using this Streamlit application
5. **Share & Enjoy** your audio dialogue

### Best Practices

- **Character Voices**: Match voice gender/age to your created characters
- **Conversation Flow**: Enable pauses for more natural audio pacing
- **Quality Control**: Preview messages before audio generation
- **Voice Consistency**: Use the same voice assignments across related dialogues

## Limitations

- Requires HTML input in standard message format
- Limited by ElevenLabs API quotas and rate limits
- Static voice assignment (no mid-conversation voice changes)
- No support for text formatting or rich content
- Output is MP3 format only

## Privacy & Security

- **Local Processing**: Chat logs are processed locally, not stored remotely
- **API Transparency**: Only your text and voice selections are sent to ElevenLabs
- **Session Security**: API keys are handled securely within Streamlit sessions
- **Content Responsibility**: Ensure you have rights to convert and share audio

## Future Enhancements

Potential improvements for community contribution:
- Support for other TTS providers (Azure, Google, AWS)
- Voice emotion detection based on dialogue context
- Background music and ambient sound integration
- Batch processing for multiple conversations
- Voice training integration for custom character voices
- Export to different audio formats (WAV, FLAC)

## License

MIT License - free to use, modify, and distribute.

## Support

For assistance with the audio converter:

1. **Check this guide**: Review troubleshooting and setup instructions
2. **Verify setup**: Confirm HTML format and API credentials
3. **ElevenLabs docs**: Consult [ElevenLabs documentation](https://elevenlabs.io/docs) for API issues
4. **Repository issues**: Report bugs or request features via GitHub issues
5. **Email support**: simyc4982@gmail.com for critical issues

---

**Note**: This tool is designed for personal and educational use. Always respect privacy, obtain consent for shared conversations, and comply with platform terms of service.
