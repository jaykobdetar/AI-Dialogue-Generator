# Discord Chat to Audio Transcript Generator

🎤 Transform your Discord chat logs into realistic audio transcripts using AI voice synthesis!

## Overview

This Streamlit application converts Discord chat logs (in HTML format) into audio transcripts using ElevenLabs' text-to-speech API. Each participant gets their own unique voice, creating an immersive audio experience of your conversations.

## Features

- 📁 Upload Discord HTML chat logs
- 🎭 Assign different voices to each chat participant
- 🔊 Generate high-quality audio using ElevenLabs TTS
- 🎵 Combine messages into a single audio file
- ⚙️ Customizable voice settings and options
- 📲 Download generated audio transcripts

## Prerequisites

### Required Accounts & API Keys

1. **ElevenLabs Account**: Sign up at [elevenlabs.io](https://elevenlabs.io)
   - Get your API key from your ElevenLabs dashboard
   - Note: Free tier has limited characters/month

### System Requirements

- Python 3.7 or higher
- Internet connection for API calls
- Web browser for running Streamlit app

## Installation

### Option 1: Using pip

```bash
# Clone the repository (if you have the source code)
git clone <repository-url>
cd discord-chat-to-audio

# Install required packages
pip install streamlit requests beautifulsoup4

# Run the application
streamlit run app.py
```

### Option 2: Direct Installation

1. Download the Python script
2. Install dependencies:
```bash
pip install streamlit requests beautifulsoup4
```
3. Run the app:
```bash
streamlit run discord_chat_to_audio.py
```

## How to Use

### Step 1: Prepare Your Chat Log

You need a Discord chat log in HTML format. The HTML should have this structure:

```html
<div class="message">
    <div class="message-username">John</div>
    <div class="message-text">Hello everyone!</div>
    <div class="message-timestamp">Today at 2:30 PM</div>
</div>
<div class="message">
    <div class="message-username">Sarah</div>
    <div class="message-text">Hey John! How's it going?</div>
    <div class="message-timestamp">Today at 2:31 PM</div>
</div>
```

**Getting Discord Chat Logs:**
- Use browser developer tools to copy HTML from Discord web
- Use Discord chat export tools/bots
- Manually create HTML following the format above

### Step 2: Run the Application

1. Start the Streamlit app:
```bash
streamlit run app.py
```

2. Open your browser and navigate to the provided URL (usually `http://localhost:8501`)

### Step 3: Configure Settings

1. **Enter API Key**: In the sidebar, paste your ElevenLabs API key
2. **Upload Chat Log**: Click "Choose an HTML chat log file" and select your file
3. **Preview Messages**: Review the parsed messages to ensure correct formatting

### Step 4: Assign Voices

1. The app will detect all unique usernames from your chat
2. For each participant, select a voice from the dropdown menu
3. Available voices include:
   - **Rachel**: Friendly female voice
   - **Drew**: Casual male voice  
   - **Bella**: Young female voice
   - **Antoni**: Mature male voice
   - **Elli**: Emotional female voice
   - **Josh**: Deep male voice
   - **Arnold**: Older male voice
   - **Sam**: Neutral voice

### Step 5: Generate Audio

1. Review your voice assignments
2. Optionally enable "Add pauses between messages" for natural flow
3. Click "Generate Audio Transcript"
4. Wait for processing (time depends on chat length and API speed)
5. Download your audio file and listen!

## Configuration Options

### Advanced Settings

- **Add pauses between messages**: Adds natural breaks between different speakers
- **Voice stability**: Controls consistency vs. expressiveness (configured in code)
- **Similarity boost**: Controls voice similarity to original (configured in code)

### Customizing Voices

You can modify the `DEFAULT_VOICES` dictionary in the code to use different ElevenLabs voice IDs:

```python
DEFAULT_VOICES = {
    "Custom_Voice_Name": "your_voice_id_here",
    # Add more custom voices...
}
```

## Troubleshooting

### Common Issues

**"No messages found in the uploaded file"**
- Check your HTML format matches the expected structure
- Ensure CSS classes are correct: `.message`, `.message-username`, `.message-text`

**"ElevenLabs API error"**
- Verify your API key is correct
- Check your ElevenLabs account quota/credits
- Ensure stable internet connection

**Audio quality issues**
- Try different voice models in ElevenLabs dashboard
- Adjust voice settings in the code
- Check input text for special characters

**Large file processing**
- For very long chats, consider splitting into smaller segments
- Monitor your ElevenLabs API usage limits

### Performance Tips

- **Optimize chat length**: Longer chats take more time and API credits
- **Use appropriate voices**: Match voice gender/age to participants for realism
- **Test with small files**: Start with short conversations to verify setup

## API Costs

ElevenLabs pricing (as of 2024):
- **Free tier**: 10,000 characters/month
- **Starter**: $5/month for 30,000 characters
- **Creator**: $22/month for 100,000 characters
- **Pro**: $99/month for 500,000 characters

**Tip**: Each message consumes characters equal to its text length. A typical Discord message might be 50-100 characters.

## Limitations

- Requires properly formatted HTML input
- Limited by ElevenLabs API quotas and rate limits
- Voice assignment is static (can't change mid-conversation)
- No support for Discord-specific formatting (embeds, reactions, etc.)
- Audio output is MP3 format only

## Privacy & Security

- API keys are handled securely within the Streamlit session
- Chat logs are processed locally and not stored
- Audio generation happens via ElevenLabs API calls
- Ensure you have permission to convert shared conversations

## Contributing

Want to improve this tool? Consider adding:
- Support for other chat platforms (Slack, Teams, etc.)
- Voice emotion detection based on message content
- Background music or sound effects
- Video generation with avatar animations
- Support for different audio formats

## License

[Specify your license here - MIT, Apache, etc.]

## Support

For issues and questions:
1. Check this README and troubleshooting section
2. Verify your HTML format and API credentials
3. Consult ElevenLabs documentation for API-related issues
4. Open an issue in the repository (if applicable)

---

**Disclaimer**: This tool is for educational and personal use. Ensure you have proper consent before converting conversations to audio, and respect privacy and terms of service of all platforms involved.