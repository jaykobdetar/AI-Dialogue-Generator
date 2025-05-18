import streamlit as st
import requests
import io
from bs4 import BeautifulSoup
import re
from typing import List, Dict, Optional
import tempfile
import os
from datetime import datetime

# ElevenLabs API configuration
ELEVENLABS_API_URL = "https://api.elevenlabs.io/v1/text-to-speech"

# Default voice IDs (you can customize these)
DEFAULT_VOICES = {
    "Rachel": "21m00Tcm4TlvDq8ikWAM",  # Rachel - friendly female voice
    "Drew": "29vD33N1CtxCmqQRPOHJ",    # Drew - casual male voice
    "Bella": "EXAVITQu4vr4xnSDxMaL",   # Bella - young female voice
    "Antoni": "ErXwobaYiN019PkySvjV",   # Antoni - mature male voice
    "Elli": "MF3mGyEYCl7XYWbV9V6O",    # Elli - emotional female voice
    "Josh": "TxGEqnHWrfWFTfGW9XjX",    # Josh - deep male voice
    "Arnold": "VR6AewLTigWG4xSOukaG",  # Arnold - older male voice
    "Sam": "yoZ06aMxZJJ28mfd3POQ"      # Sam - neutral voice
}

class ChatMessage:
    def __init__(self, username: str, content: str, timestamp: str):
        self.username = username.lower()
        self.content = content
        self.timestamp = timestamp

class ChatParser:
    def __init__(self):
        pass
    
    def parse_html(self, html_content: str) -> List[ChatMessage]:
        """Parse HTML chat log and extract messages."""
        soup = BeautifulSoup(html_content, 'html.parser')
        messages = []
        
        # Find all message containers
        message_elements = soup.find_all('div', class_='message')
        
        for msg_elem in message_elements:
            # Extract username
            username_elem = msg_elem.find('div', class_='message-username')
            if not username_elem:
                continue
            username = username_elem.get_text(strip=True)
            
            # Extract message content
            content_elem = msg_elem.find('div', class_='message-text')
            if not content_elem:
                continue
            content = content_elem.get_text(strip=True)
            
            # Extract timestamp
            timestamp_elem = msg_elem.find('div', class_='message-timestamp')
            timestamp = timestamp_elem.get_text(strip=True) if timestamp_elem else ""
            
            messages.append(ChatMessage(username, content, timestamp))
        
        return messages

class ElevenLabsClient:
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.headers = {
            "Accept": "audio/mpeg",
            "Content-Type": "application/json",
            "xi-api-key": api_key
        }
    
    def generate_speech(self, text: str, voice_id: str) -> Optional[bytes]:
        """Generate speech audio from text using ElevenLabs API."""
        url = f"{ELEVENLABS_API_URL}/{voice_id}"
        
        data = {
            "text": text,
            "model_id": "eleven_turbo_v2_5",  # Best model for conversational speech
            "voice_settings": {
                "stability": 0.4,
                "similarity_boost": 0.8,
                "style": 0.2,
                "use_speaker_boost": True
            }
        }
        
        try:
            response = requests.post(url, json=data, headers=self.headers)
            if response.status_code == 200:
                return response.content
            else:
                st.error(f"ElevenLabs API error: {response.status_code} - {response.text}")
                return None
        except Exception as e:
            st.error(f"Error calling ElevenLabs API: {str(e)}")
            return None
    
    def get_available_voices(self) -> Dict[str, str]:
        """Get list of available voices from ElevenLabs."""
        try:
            response = requests.get(
                "https://api.elevenlabs.io/v1/voices",
                headers={"xi-api-key": self.api_key}
            )
            if response.status_code == 200:
                voices = response.json()["voices"]
                return {voice["name"]: voice["voice_id"] for voice in voices}
            else:
                return DEFAULT_VOICES
        except:
            return DEFAULT_VOICES

def create_audio_transcript(messages: List[ChatMessage], elevenlabs_client: ElevenLabsClient, voice_mapping: Dict[str, str]) -> List[bytes]:
    """Generate audio files for each message in the chat."""
    audio_segments = []
    
    progress_bar = st.progress(0)
    status_text = st.empty()
    
    for i, message in enumerate(messages):
        status_text.text(f"Generating audio for {message.username}: {message.content[:50]}...")
        
        # Get voice ID for this user
        voice_id = voice_mapping.get(message.username, voice_mapping.get("default_female"))
        
        # Use just the message content - no username prefix
        speech_text = message.content
        
        # Generate audio
        audio_data = elevenlabs_client.generate_speech(speech_text, voice_id)
        if audio_data:
            audio_segments.append(audio_data)
        
        # Update progress
        progress_bar.progress((i + 1) / len(messages))
    
    status_text.text("Audio generation complete!")
    return audio_segments

def combine_audio_segments(audio_segments: List[bytes], add_pauses: bool = True) -> bytes:
    """Combine individual audio segments into one file with optional pauses."""
    if not add_pauses:
        # Simple concatenation
        combined_audio = b"".join(audio_segments)
        return combined_audio
    
    # For this demo, we'll concatenate the audio files
    # In a production environment, you might want to use pydub to add actual silence
    combined_audio = b"".join(audio_segments)
    return combined_audio

def main():
    st.set_page_config(
        page_title="Chat to Audio Transcript",
        page_icon="🎤",
        layout="wide"
    )
    
    st.title("🎤 Chat to Audio Transcript Generator")
    st.markdown("Upload an HTML chat log and generate an audio transcript using ElevenLabs TTS!")
    
    # Sidebar for configuration
    st.sidebar.header("Configuration")
    
    # API Key input
    api_key = st.sidebar.text_input(
        "ElevenLabs API Key",
        type="password",
        help="Enter your ElevenLabs API key"
    )
    
    if not api_key:
        st.warning("Please enter your ElevenLabs API key in the sidebar to continue.")
        st.stop()
    
    # Initialize ElevenLabs client
    elevenlabs_client = ElevenLabsClient(api_key)
    
    # Get available voices
    available_voices = elevenlabs_client.get_available_voices()
    
    # File upload
    uploaded_file = st.file_uploader(
        "Choose an HTML chat log file",
        type=['html', 'htm'],
        help="Upload an HTML chat log"
    )
    
    if uploaded_file is not None:
        # Read and parse the HTML file
        html_content = uploaded_file.read().decode('utf-8')
        parser = ChatParser()
        messages = parser.parse_html(html_content)
        
        if not messages:
            st.error("No messages found in the uploaded file. Please check the HTML format.")
            st.stop()
        
        st.success(f"Found {len(messages)} messages in the chat log!")
        
        # Preview messages
        st.subheader("Chat Preview")
        with st.expander("Show first 5 messages"):
            for i, msg in enumerate(messages[:5]):
                st.write(f"**{msg.username}**: {msg.content}")
        
        # Voice mapping configuration
        st.subheader("Voice Configuration")
        st.write("Assign voices to each participant:")
        
        # Get unique usernames from messages
        unique_users = list(set([msg.username for msg in messages]))
        
        # Create voice mapping interface
        voice_mapping = {}
        col1, col2 = st.columns(2)
        
        for i, user in enumerate(unique_users):
            with col1 if i % 2 == 0 else col2:
                voice_mapping[user] = st.selectbox(
                    f"Voice for {user}:",
                    options=list(available_voices.keys()),
                    key=f"voice_{user}"
                )
        
        # Convert to voice IDs
        voice_id_mapping = {user: available_voices[voice_name] for user, voice_name in voice_mapping.items()}
        
        # Add default voices for fallback
        voice_id_mapping["default_female"] = available_voices.get("Rachel", DEFAULT_VOICES["Rachel"])
        voice_id_mapping["default_male"] = available_voices.get("Drew", DEFAULT_VOICES["Drew"])
        
        # Advanced options
        st.sidebar.subheader("Advanced Options")
        add_pauses = st.sidebar.checkbox(
            "Add pauses between messages",
            value=True,
            help="Add brief pauses between different speakers"
        )
        
        # Generate audio button
        if st.button("Generate Audio Transcript", type="primary"):
            with st.spinner("Generating audio transcript..."):
                # Generate audio for each message
                audio_segments = create_audio_transcript(messages, elevenlabs_client, voice_id_mapping)
                
                if audio_segments:
                    # Combine audio segments
                    combined_audio = combine_audio_segments(audio_segments, add_pauses)
                    
                    # Create download link
                    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                    filename = f"chat_transcript_{timestamp}.mp3"
                    
                    st.success("Audio transcript generated successfully!")
                    st.download_button(
                        label="Download Audio Transcript",
                        data=combined_audio,
                        file_name=filename,
                        mime="audio/mpeg"
                    )
                    
                    # Display audio player
                    st.audio(combined_audio, format='audio/mp3')
                else:
                    st.error("Failed to generate audio transcript. Please check your API key and try again.")
    
    # Additional information
    st.markdown("---")
    st.markdown("""
    ### How to use:
    1. Enter your ElevenLabs API key in the sidebar
    2. Upload an HTML chat log file
    3. Configure voice assignments for each participant
    4. Click "Generate Audio Transcript" to create the audio file
    5. Download and listen to your generated transcript!
    
    ### Supported HTML Format:
    The chat log should be in HTML format with messages containing:
    - `.message` containers
    - `.message-username` for usernames
    - `.message-text` for message content
    - `.message-timestamp` for timestamps (optional)
    """)

if __name__ == "__main__":
    main()


