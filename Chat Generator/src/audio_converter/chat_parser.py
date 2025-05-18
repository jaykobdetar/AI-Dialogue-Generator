from bs4 import BeautifulSoup
from typing import List

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