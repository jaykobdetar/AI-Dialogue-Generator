import streamlit as st
from datetime import datetime
from chat_parser import DiscordChatParser
from elevenlabs_client import ElevenLabsClient, DEFAULT_VOICES
from audio_processor import create_audio_transcript, combine_audio_segments

def main():
    st.set_page_config(
        page_title="Discord Chat to Audio Transcript",
        page_icon="🎤",
        layout="wide"
    )
    
    st.title("🎤 Discord Chat to Audio Transcript Generator")
    st.markdown("Upload a Discord-style HTML chat log and generate an audio transcript using ElevenLabs TTS!")
    
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
        help="Upload a Discord-style HTML chat log"
    )
    
    if uploaded_file is not None:
        # Read and parse the HTML file
        html_content = uploaded_file.read().decode('utf-8')
        parser = DiscordChatParser()
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
    2. Upload a Discord-style HTML chat log file
    3. Configure voice assignments for each participant
    4. Click "Generate Audio Transcript" to create the audio file
    5. Download and listen to your generated transcript!
    
    ### Supported HTML Format:
    The chat log should be in Discord-style HTML format with messages containing:
    - `.message` containers
    - `.message-username` for usernames
    - `.message-text` for message content
    - `.message-timestamp` for timestamps (optional)
    """)

if __name__ == "__main__":
    main()