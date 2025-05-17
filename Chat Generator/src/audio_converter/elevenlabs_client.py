import requests
import streamlit as st
from typing import Optional, Dict

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