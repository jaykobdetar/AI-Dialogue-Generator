import streamlit as st
from typing import List, Dict
from chat_parser import ChatMessage
from elevenlabs_client import ElevenLabsClient

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