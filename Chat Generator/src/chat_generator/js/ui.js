// ui.js - UI interaction handlers (Clean Version)
const ui = {
    init() {
        console.log('UI init called');
        this.initEventListeners();
        this.initEndpointDisplay();
    },
    
    initEventListeners() {
        console.log('Initializing event listeners...');
        
        const generateBtn = document.getElementById('generateBtn');
        if (!generateBtn) {
            console.error('Generate button not found!');
            return;
        }
        console.log('Generate button found:', generateBtn);
        
        // API endpoint change handler
        document.getElementById('apiEndpoint').addEventListener('change', ui.handleEndpointChange);
        document.getElementById('customEndpoint').addEventListener('input', ui.handleCustomEndpointInput);
        document.getElementById('model').addEventListener('change', ui.handleModelChange);
        
        // Advanced mode toggle
        document.getElementById('advancedMode').addEventListener('change', ui.handleAdvancedModeToggle);
        
        // Character form handlers
        document.getElementById('charEditAvatar').addEventListener('change', ui.handleAvatarUpload);
        document.getElementById('saveCharBtn').addEventListener('click', ui.handleSaveCharacter);
        document.getElementById('clearFormBtn').addEventListener('click', ui.handleClearForm);
        
        // Character import/export
        document.getElementById('exportCharsBtn').addEventListener('click', ui.handleExportCharacters);
        document.getElementById('importCharsBtn').addEventListener('click', ui.handleImportCharacters);
        document.getElementById('importCharsFile').addEventListener('change', ui.handleImportFile);
        
        // Character selection handlers
        document.getElementById('char1Selector').addEventListener('change', ui.handleCharacterSelection);
        document.getElementById('char2Selector').addEventListener('change', ui.handleCharacterSelection);
        
        // Generate conversation button
        generateBtn.addEventListener('click', function() {
            console.log('Button click detected!');
            ui.handleGenerateConversation();
        });
        console.log('Generate button event listener attached');
        
        // Save API settings
        document.getElementById('saveApiSettings').addEventListener('click', ui.handleSaveApiSettings);
        
        // Export buttons
        document.getElementById('downloadFullBtn').addEventListener('click', ui.handleDownloadFull);
        document.getElementById('downloadChatOnlyBtn').addEventListener('click', ui.handleDownloadChatOnly);
    },
    
    initEndpointDisplay() {
        const endpointSelect = document.getElementById('apiEndpoint');
        const endpointDisplay = document.getElementById('endpointDisplay');
        if (endpointSelect.value !== 'custom') {
            endpointDisplay.textContent = endpointSelect.value;
        } else {
            endpointDisplay.textContent = 'Select an endpoint above';
            endpointDisplay.style.color = '#72767d';
            endpointDisplay.style.fontStyle = 'italic';
        }
    },
    
    handleEndpointChange() {
        const customEndpointField = document.getElementById('customEndpoint');
        const endpointDisplay = document.getElementById('endpointDisplay');
        const apiKeyField = document.getElementById('apiKey');
        
        if (this.value === 'custom') {
            customEndpointField.style.display = 'block';
            endpointDisplay.textContent = 'Enter custom URL below';
            endpointDisplay.style.color = '#72767d';
            endpointDisplay.style.fontStyle = 'italic';
            apiKeyField.disabled = false;
        } else if (this.value === 'test-mode') {
            customEndpointField.style.display = 'none';
            endpointDisplay.textContent = 'Demo mode - generates sample conversations locally';
            endpointDisplay.style.color = '#57f287';
            endpointDisplay.style.fontStyle = 'italic';
            apiKeyField.disabled = true;
            apiKeyField.value = '';
        } else {
            customEndpointField.style.display = 'none';
            endpointDisplay.textContent = this.value;
            endpointDisplay.style.color = '#b9bbbe';
            endpointDisplay.style.fontStyle = 'normal';
            apiKeyField.disabled = false;
        }
    },
    
    handleCustomEndpointInput() {
        const endpointDisplay = document.getElementById('endpointDisplay');
        if (this.value.trim()) {
            endpointDisplay.textContent = this.value;
            endpointDisplay.style.color = '#b9bbbe';
            endpointDisplay.style.fontStyle = 'normal';
        } else {
            endpointDisplay.textContent = 'Enter custom URL below';
            endpointDisplay.style.color = '#72767d';
            endpointDisplay.style.fontStyle = 'italic';
        }
    },
    
    handleModelChange() {
        const customModelField = document.getElementById('customModel');
        if (this.value === 'custom') {
            customModelField.style.display = 'block';
        } else {
            customModelField.style.display = 'none';
        }
    },
    
    handleAdvancedModeToggle() {
        const advancedPanel = document.getElementById('advancedPanel');
        if (this.checked) {
            advancedPanel.style.display = 'block';
        } else {
            advancedPanel.style.display = 'none';
        }
    },
    
    handleAvatarUpload(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const preview = document.getElementById('charEditPreview');
                preview.textContent = '';
                const img = document.createElement('img');
                img.src = event.target.result;
                img.alt = 'Character Preview';
                preview.appendChild(img);
            };
            reader.readAsDataURL(file);
        }
    },
    
    handleSaveCharacter() {
        const nameInput = document.getElementById('charEditName');
        const ageInput = document.getElementById('charEditAge');
        const personalityInput = document.getElementById('charEditPersonality');
        const backgroundInput = document.getElementById('charEditBackground');
        const relationshipInput = document.getElementById('charEditRelationship');
        const textingStyleInput = document.getElementById('charEditTextingStyle');
        const preview = document.getElementById('charEditPreview');
        const avatarImg = preview.querySelector('img');
        
        if (!nameInput.value.trim()) {
            alert('Please enter a character name');
            return;
        }
        
        const charId = preview.dataset.charId || 'char_' + Date.now();
        
        const character = {
            id: charId,
            name: nameInput.value.trim(),
            age: ageInput.value ? parseInt(ageInput.value) : null,
            personality: personalityInput.value.trim(),
            background: backgroundInput.value.trim(),
            relationship: relationshipInput.value,
            textingStyle: textingStyleInput.value,
            avatar: avatarImg ? avatarImg.src : null
        };
        
        storage.saveCharacter(character);
        
        const successMsg = document.getElementById('charSuccessMsg');
        successMsg.style.display = 'block';
        setTimeout(() => {
            successMsg.style.display = 'none';
        }, 3000);
        
        ui.handleClearForm();
    },
    
    handleClearForm() {
        document.getElementById('charEditName').value = '';
        document.getElementById('charEditAge').value = '';
        document.getElementById('charEditPersonality').value = '';
        document.getElementById('charEditBackground').value = '';
        document.getElementById('charEditRelationship').value = '';
        document.getElementById('charEditTextingStyle').value = '';
        document.getElementById('charEditPreview').textContent = '';
        document.getElementById('charEditPreview').dataset.charId = '';
        document.getElementById('charEditAvatar').value = '';
    },
    
    handleExportCharacters() {
        storage.exportCharacters();
    },
    
    handleImportCharacters() {
        const confirmation = confirm(
            "⚠️ SECURITY WARNING - Import Characters\n\n" +
            "DANGER: Only import character files from sources you completely trust!\n\n" +
            "Are you absolutely sure this file is from a trusted source and safe to import?"
        );
        
        if (confirmation) {
            document.getElementById('importCharsFile').click();
        }
    },
    
    handleImportFile(e) {
        const file = e.target.files[0];
        if (file) {
            storage.importCharacters(file);
            e.target.value = '';
        }
    },
    
    handleCharacterSelection() {
        const characters = storage.getCharacters();
        const selectorId = this.id;
        const charNum = selectorId.includes('char1') ? '1' : '2';
        const selectedChar = characters.find(c => c.id === this.value);
        
        if (selectedChar) {
            const charPreviewElement = document.getElementById(`char${charNum}Preview`);
            charPreviewElement.textContent = '';
            const charImg = document.createElement('img');
            charImg.src = selectedChar.avatar || '/api/placeholder/40/40';
            charImg.alt = selectedChar.name;
            charPreviewElement.appendChild(charImg);
            document.getElementById(`char${charNum}Name`).value = selectedChar.name;
        } else {
            const charPreviewElement = document.getElementById(`char${charNum}Preview`);
            charPreviewElement.textContent = '';
            document.getElementById(`char${charNum}Name`).value = '';
        }
    },
    
    async handleGenerateConversation() {
        console.log('Generate button clicked!');
        
        if (typeof api === 'undefined') {
            console.error('API module not loaded');
            const errorMsg = document.getElementById('errorMsg');
            errorMsg.textContent = 'Error: Application not fully loaded. Please refresh the page.';
            errorMsg.style.display = 'block';
            return;
        }
        
        const apiKey = document.getElementById('apiKey').value;
        const char1Selector = document.getElementById('char1Selector');
        const char2Selector = document.getElementById('char2Selector');
        
        let char1Name = 'Character 1';
        let char2Name = 'Character 2';
        
        if (char1Selector.value) {
            const characters = storage.getCharacters();
            const char1 = characters.find(c => c.id === char1Selector.value);
            if (char1) char1Name = char1.name;
        }
        
        if (char2Selector.value) {
            const characters = storage.getCharacters();
            const char2 = characters.find(c => c.id === char2Selector.value);
            if (char2) char2Name = char2.name;
        }
        
        document.getElementById('char1Name').value = char1Name;
        document.getElementById('char2Name').value = char2Name;
        
        const topic = document.getElementById('topic').value;
        const messageCount = document.getElementById('messageCount').value || 10;
        
        const errorMsg = document.getElementById('errorMsg');
        errorMsg.style.display = 'none';
        
        const isTestMode = document.getElementById('apiEndpoint').value === 'test-mode';
        
        if (!isTestMode && !apiKey) {
            errorMsg.textContent = 'Please enter your API key or select Demo Mode';
            errorMsg.style.display = 'block';
            return;
        }
        
        if (!topic) {
            errorMsg.textContent = 'Please enter a conversation topic';
            errorMsg.style.display = 'block';
            return;
        }
        
        const loadingIndicator = document.getElementById('loadingIndicator');
        loadingIndicator.style.display = 'block';
        
        try {
            const characters = storage.getCharacters();
            const char1 = characters.find(c => c.id === char1Selector.value);
            const char2 = characters.find(c => c.id === char2Selector.value);
            
            let characterDetails = '';
            
            if (char1 || char2) {
                characterDetails += '\n\nCharacter Details:\n';
                
                if (char1) {
                    characterDetails += `${char1Name}: `;
                    if (char1.age) characterDetails += `Age ${char1.age}, `;
                    if (char1.personality) characterDetails += `Personality: ${char1.personality}, `;
                    if (char1.background) characterDetails += `Background: ${char1.background}, `;
                    if (char1.textingStyle) characterDetails += `Texting style: ${char1.textingStyle}, `;
                    if (char1.relationship) characterDetails += `Relationship to other character: ${char1.relationship}`;
                    characterDetails = characterDetails.replace(/, $/, '') + '\n';
                }
                
                if (char2) {
                    characterDetails += `${char2Name}: `;
                    if (char2.age) characterDetails += `Age ${char2.age}, `;
                    if (char2.personality) characterDetails += `Personality: ${char2.personality}, `;
                    if (char2.background) characterDetails += `Background: ${char2.background}, `;
                    if (char2.textingStyle) characterDetails += `Texting style: ${char2.textingStyle}, `;
                    if (char2.relationship) characterDetails += `Relationship to other character: ${char2.relationship}`;
                    characterDetails = characterDetails.replace(/, $/, '') + '\n';
                }
            }
            
            const prompt = `Generate a conversation between ${char1Name} and ${char2Name} about ${topic}. 
            Create exactly ${messageCount} messages total, alternating between the two characters.
            Format each message as: "CHARACTER_NAME | TIMESTAMP | message content"
            Where TIMESTAMP should be in format "12:34 PM" and progress realistically throughout the conversation (messages should be a few minutes apart).${characterDetails}
            
            Not all replies need to be short - sometimes the context implies a longer message is appropriate, use judgment.`;
            
            const modelSelect = document.getElementById('model');
            const customModelField = document.getElementById('customModel');
            const model = modelSelect.value === 'custom' ? customModelField.value : modelSelect.value;
            
            const advancedMode = document.getElementById('advancedMode').checked;
            const systemPrompt = advancedMode && document.getElementById('systemPrompt').value 
                ? document.getElementById('systemPrompt').value 
                : 'You are an AI that generates realistic text message conversations between two characters. Create natural, casual, and authentic conversations like real text messages. Use any provided character details to influence their personality, communication style, and relationship dynamic. Keep all content appropriate and respectful.';
            
            const apiSettings = {
                apiKey,
                endpoint: document.getElementById('apiEndpoint').value,
                model,
                systemPrompt,
                char1Name,
                char2Name,
                topic,
                messageCount
            };
            
            let generatedConversation;
            if (apiSettings.endpoint === 'test-mode') {
                generatedConversation = ui.generateMockConversation(char1Name, char2Name, topic, messageCount);
            } else {
                generatedConversation = await api.generateConversation(prompt, apiSettings);
            }
            
            ui.displayConversation(generatedConversation, char1Name, char2Name);
            
        } catch (error) {
            console.error('Error:', error);
            errorMsg.textContent = `Error: ${error.message || 'Failed to generate conversation'}`;
            errorMsg.style.display = 'block';
        } finally {
            loadingIndicator.style.display = 'none';
        }
    },
    
    displayConversation(conversationText, char1Name, char2Name) {
        const messages = conversationText.split('\n')
            .filter(line => line.trim().length > 0)
            .map(line => {
                const match = line.match(/^(.+?)\s*\|\s*(.+?)\s*\|\s*(.+)$/);
                if (match) {
                    return {
                        character: match[1].trim(),
                        timestamp: match[2].trim(),
                        content: match[3].trim()
                    };
                } else {
                    const oldMatch = line.match(/^(.+?):\s*(.+)$/);
                    if (oldMatch) {
                        const hour = Math.floor(Math.random() * 12) + 1;
                        const minute = String(Math.floor(Math.random() * 60)).padStart(2, '0');
                        const ampm = Math.random() > 0.5 ? 'AM' : 'PM';
                        return {
                            character: oldMatch[1].trim(),
                            timestamp: `${hour}:${minute} ${ampm}`,
                            content: oldMatch[2].trim()
                        };
                    } else {
                        const hour = Math.floor(Math.random() * 12) + 1;
                        const minute = String(Math.floor(Math.random() * 60)).padStart(2, '0');
                        const ampm = Math.random() > 0.5 ? 'AM' : 'PM';
                        return {
                            character: char1Name,
                            timestamp: `${hour}:${minute} ${ampm}`,
                            content: line.trim()
                        };
                    }
                }
            });
        
        const chatMessages = document.getElementById('chatMessages');
        chatMessages.textContent = '';
        
        messages.forEach((msg, index) => {
            const isChar1 = msg.character.toLowerCase().includes(char1Name.toLowerCase());
            const charName = isChar1 ? char1Name : char2Name;
            const charPreviewId = isChar1 ? 'char1Preview' : 'char2Preview';
            
            const avatarPreview = document.getElementById(charPreviewId);
            const avatarSrc = avatarPreview.querySelector('img') ? 
                avatarPreview.querySelector('img').src : 
                '/api/placeholder/40/40';
            
            const displayTimestamp = `Today at ${msg.timestamp}`;
            
            const messageElement = document.createElement('div');
            messageElement.className = 'message';
            
            const avatar = document.createElement('div');
            avatar.className = 'message-avatar';

            const avatarImg = document.createElement('img');
            avatarImg.src = avatarSrc;
            avatarImg.alt = charName;
            avatar.appendChild(avatarImg);

            const messageContent = document.createElement('div');
            messageContent.className = 'message-content';

            const messageHeader = document.createElement('div');
            messageHeader.className = 'message-header';

            const username = document.createElement('div');
            username.className = 'message-username';
            username.textContent = charName;

            const timestamp = document.createElement('div');
            timestamp.className = 'message-timestamp';
            timestamp.textContent = displayTimestamp;

            const messageText = document.createElement('div');
            messageText.className = 'message-text';
            messageText.textContent = msg.content;

            messageHeader.appendChild(username);
            messageHeader.appendChild(timestamp);
            messageContent.appendChild(messageHeader);
            messageContent.appendChild(messageText);

            messageElement.appendChild(avatar);
            messageElement.appendChild(messageContent);
            
            chatMessages.appendChild(messageElement);
        });
    },
    
    generateMockConversation(char1Name, char2Name, topic, count) {
        const conversationTemplates = {
            "work": [
                `${char1Name} | 9:15 AM | Hey, did you see the email about the new project deadline?`,
                `${char2Name} | 9:18 AM | Yeah, it's pretty tight. We'll need to prioritize the main features first`,
                `${char1Name} | 9:22 AM | Agreed. Should we schedule a quick call to discuss?`,
                `${char2Name} | 9:25 AM | Good idea! How about 2pm today?`,
                `${char1Name} | 9:27 AM | Perfect, I'll send the calendar invite`,
                `${char2Name} | 9:30 AM | Thanks! I'll prep some notes beforehand`
            ],
            "friendship": [
                `${char1Name} | 7:30 PM | What are you up to tonight?`,
                `${char2Name} | 7:33 PM | Just watching Netflix lol. You?`,
                `${char1Name} | 7:35 PM | Same! Have you seen that new series everyone's talking about?`,
                `${char2Name} | 7:38 PM | Which one? There are like 5 new shows this week 😅`,
                `${char1Name} | 7:40 PM | The sci-fi one with the time travel plot`,
                `${char2Name} | 7:42 PM | Oh that one! Yeah it's actually really good. Want to watch together?`
            ],
            "family": [
                `${char1Name} | 6:45 PM | Dinner's ready! Come downstairs`,
                `${char2Name} | 6:48 PM | Coming! Just finishing up this assignment`,
                `${char1Name} | 6:50 PM | Okay but don't let it get cold`,
                `${char2Name} | 6:52 PM | I'll be down in 2 minutes, promise`,
                `${char1Name} | 6:55 PM | Alright, I'll keep your plate warm`,
                `${char2Name} | 6:57 PM | You're the best, thanks!`
            ]
        };
        
        const topicLower = topic.toLowerCase();
        
        if (topicLower.includes('work') || topicLower.includes('job') || topicLower.includes('project')) {
            return conversationTemplates.work.slice(0, Math.min(count, 6)).join('\n');
        } else if (topicLower.includes('friend') || topicLower.includes('hang') || topicLower.includes('movie')) {
            return conversationTemplates.friendship.slice(0, Math.min(count, 6)).join('\n');
        } else if (topicLower.includes('family') || topicLower.includes('dinner') || topicLower.includes('home')) {
            return conversationTemplates.family.slice(0, Math.min(count, 6)).join('\n');
        }
        
        const templates = [
            "Hey, what do you think about {topic}?",
            "I've been thinking about {topic} lately. It's interesting!",
            "Have you heard the latest about {topic}?",
            "I'm not sure how I feel about {topic}, to be honest.",
            "Let me tell you what happened with {topic} yesterday!",
            "Do you want to discuss {topic} more?",
            "I can't believe what's going on with {topic}!",
            "What's your take on {topic}?",
            "I read an article about {topic} the other day.",
            "My friend was just telling me about {topic}."
        ];
        
        const responses = [
            "Oh really? Tell me more!",
            "That's interesting. I've been wondering about that too.",
            "No way! What happened?",
            "I had no idea about that!",
            "Yeah, I've been following that for a while.",
            "That's crazy! What do you think about it?",
            "I'm not surprised, to be honest.",
            "Wow, that's news to me!",
            "I've been thinking the same thing!",
            "Let's talk more about this later."
        ];
        
        let currentHour = 10;
        let currentMinute = 0;
        let conversation = "";
        
        for (let i = 0; i < count; i++) {
            const isFirst = i % 2 === 0;
            const name = isFirst ? char1Name : char2Name;
            
            currentMinute += Math.floor(Math.random() * 5) + 1;
            if (currentMinute >= 60) {
                currentHour++;
                currentMinute = currentMinute - 60;
            }
            
            const displayHour = currentHour > 12 ? currentHour - 12 : (currentHour === 0 ? 12 : currentHour);
            const ampm = currentHour >= 12 ? 'PM' : 'AM';
            const timestamp = `${displayHour}:${String(currentMinute).padStart(2, '0')} ${ampm}`;
            
            let message;
            if (isFirst) {
                let template = templates[Math.floor(Math.random() * templates.length)];
                message = template.replace("{topic}", topic);
            } else {
                message = responses[Math.floor(Math.random() * responses.length)];
            }
            
            conversation += `${name} | ${timestamp} | ${message}\n`;
        }
        
        return conversation;
    },
    
    handleSaveApiSettings() {
        storage.saveApiSettings();
    },
    
    handleDownloadFull() {
        const htmlContent = document.documentElement.outerHTML;
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'ai-dialogue-generator.html';
        document.body.appendChild(a);
        a.click();
        
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 0);
    },
    
    handleDownloadChatOnly() {
        const chatOnlyHTML = ui.generateChatOnlyHTML();
        const blob = new Blob([chatOnlyHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        
        const char1Name = document.getElementById('char1Name').value || 'Character1';
        const char2Name = document.getElementById('char2Name').value || 'Character2';
        const topic = document.getElementById('topic').value || 'Chat';
        
        const filename = `${char1Name}_${char2Name}_${topic}`.replace(/[^a-zA-Z0-9_-]/g, '_') + '_chat.html';
        
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 0);
    },
    
    generateChatOnlyHTML() {
        const chatMessages = document.getElementById('chatMessages');
        const char1Name = document.getElementById('char1Name').value || 'Character 1';
        const char2Name = document.getElementById('char2Name').value || 'Character 2';
        const topic = document.getElementById('topic').value || 'Conversation';
        
        const characters = storage.getCharacters();
        const char1Selector = document.getElementById('char1Selector');
        const char2Selector = document.getElementById('char2Selector');
        const char1 = characters.find(c => c.id === char1Selector.value);
        const char2 = characters.find(c => c.id === char2Selector.value);
        
        let chatOnlyHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${char1Name} & ${char2Name} - ${topic}</title>
            <style>
                body { 
                    font-family: 'Whitney', 'Helvetica Neue', Helvetica, Arial, sans-serif;
                    background-color: #36393f;
                    color: #dcddde;
                    margin: 0;
                    padding: 20px;
                }
                .container {
                    max-width: 800px;
                    margin: 0 auto;
                    background: #2f3136;
                    border-radius: 16px;
                    overflow: hidden;
                }
                .chat-header {
                    background: linear-gradient(135deg, #5865f2 0%, #4752c4 100%);
                    padding: 24px;
                    text-align: center;
                }
                .chat-title {
                    color: white;
                    font-size: 28px;
                    font-weight: 700;
                    margin-bottom: 8px;
                }
                .chat-subtitle {
                    color: rgba(255,255,255,0.9);
                    font-size: 16px;
                }
                .chat-messages {
                    padding: 32px;
                }
                .message {
                    display: flex;
                    margin-bottom: 24px;
                    padding: 16px 20px;
                    border-radius: 12px;
                }
                .message-avatar {
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    margin-right: 16px;
                    overflow: hidden;
                }
                .message-avatar img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .message-username {
                    font-weight: 600;
                    font-size: 16px;
                    margin-bottom: 6px;
                }
                .message-timestamp {
                    color: #72767d;
                    font-size: 12px;
                    font-weight: 500;
                }
                .message-text {
                    color: #dcddde;
                    font-size: 15px;
                    line-height: 1.6;
                    margin-top: 2px;
                }
                .chat-footer {
                    padding: 20px;
                    text-align: center;
                    border-top: 1px solid #4f545c;
                    font-size: 12px;
                    color: #72767d;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="chat-header">
                    <h1 class="chat-title">${char1Name} & ${char2Name}</h1>
                    <p class="chat-subtitle">Conversation about ${topic}</p>
                </div>
                
                <div class="chat-messages">
                    ${chatMessages.textContent}
                </div>
                
                <div class="chat-footer">
                    <div>Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</div>
                    <div>Created with AI Dialogue Generator • Made with Claude AI</div>
                </div>
            </div>
        </body>
        </html>
        `;
        
        return chatOnlyHTML;
    }
};