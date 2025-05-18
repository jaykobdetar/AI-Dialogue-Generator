// Security Utility Functions
const securityUtils = {
    // Safely validate and sanitize URLs to prevent XSS
    // Returns sanitized URL or default placeholder if URL is invalid
    sanitizeUrl: function(url, defaultUrl) {
        // If no URL or empty string, return default
        if (!url || typeof url !== 'string') {
            return defaultUrl || '';
        }
        
        try {
            // Parse URL to validate it
            const parsedUrl = new URL(url, window.location.origin);
            
            // Only allow safe protocols and data URLs for images
            if (parsedUrl.protocol === 'http:' || 
                parsedUrl.protocol === 'https:' || 
                (url.startsWith('data:image/') && !url.includes('script'))) {
                
                // Further sanitize the URL by removing any potentially dangerous characters
                const sanitized = url.replace(/['"<>]/g, '');
                
                // If sanitization removed characters (potential attack attempt),
                // log and return default URL
                if (sanitized !== url) {
                    console.warn('Potentially dangerous URL was sanitized:', url);
                    return defaultUrl || '';
                }
                
                return sanitized;
            }
        } catch (e) {
            // URL parsing failed, return default
            console.warn('Invalid URL:', url);
        }
        
        return defaultUrl || '';
    },
    
    // Generic text sanitizer for display in HTML contexts
    sanitizeText: function(text) {
        if (!text || typeof text !== 'string') {
            return '';
        }
        
        // Convert special characters to HTML entities
        return text.replace(/[&<>"']/g, function(m) {
            return {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;'
            }[m];
        });
    }
};

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
                // Create a function to generate a thumbnail
                const createThumbnail = (imgDataUrl, maxWidth, maxHeight, callback) => {
                    const img = new Image();
                    img.onload = function() {
                        let width = img.width;
                        let height = img.height;
                        
                        // Calculate the new dimensions to maintain aspect ratio
                        if (width > height) {
                            if (width > maxWidth) {
                                height *= maxWidth / width;
                                width = maxWidth;
                            }
                        } else {
                            if (height > maxHeight) {
                                width *= maxHeight / height;
                                height = maxHeight;
                            }
                        }
                        
                        // Create a canvas element to resize the image
                        const canvas = document.createElement('canvas');
                        canvas.width = width;
                        canvas.height = height;
                        
                        // Draw the resized image on the canvas
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0, width, height);
                        
                        // Convert canvas to data URL (with compression)
                        const thumbDataUrl = canvas.toDataURL('image/jpeg', 0.85);
                        callback(thumbDataUrl);
                    };
                    img.src = imgDataUrl;
                };
                
                // Generate thumbnail for the uploaded image
                createThumbnail(event.target.result, 150, 150, (thumbnailDataUrl) => {
                    const preview = document.getElementById('charEditPreview');
                    preview.textContent = '';
                    const img = document.createElement('img');
                    img.src = thumbnailDataUrl;
                    img.alt = 'Character Preview';
                    preview.appendChild(img);
                });
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
            const charPreviewElement = document.getElementById('char' + charNum + 'Preview');
            charPreviewElement.textContent = '';
            const charImg = document.createElement('img');
            charImg.src = selectedChar.avatar || '/api/placeholder/40/40';
            charImg.alt = selectedChar.name;
            charPreviewElement.appendChild(charImg);
            document.getElementById('char' + charNum + 'Name').value = selectedChar.name;
        } else {
            const charPreviewElement = document.getElementById('char' + charNum + 'Preview');
            charPreviewElement.textContent = '';
            document.getElementById('char' + charNum + 'Name').value = '';
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
                    characterDetails += char1Name + ': ';
                    if (char1.age) characterDetails += 'Age ' + char1.age + ', ';
                    if (char1.personality) characterDetails += 'Personality: ' + char1.personality + ', ';
                    if (char1.background) characterDetails += 'Background: ' + char1.background + ', ';
                    if (char1.textingStyle) characterDetails += 'Texting style: ' + char1.textingStyle + ', ';
                    if (char1.relationship) characterDetails += 'Relationship to other character: ' + char1.relationship;
                    characterDetails = characterDetails.replace(/, $/, '') + '\n';
                }
                
                if (char2) {
                    characterDetails += char2Name + ': ';
                    if (char2.age) characterDetails += 'Age ' + char2.age + ', ';
                    if (char2.personality) characterDetails += 'Personality: ' + char2.personality + ', ';
                    if (char2.background) characterDetails += 'Background: ' + char2.background + ', ';
                    if (char2.textingStyle) characterDetails += 'Texting style: ' + char2.textingStyle + ', ';
                    if (char2.relationship) characterDetails += 'Relationship to other character: ' + char2.relationship;
                    characterDetails = characterDetails.replace(/, $/, '') + '\n';
                }
            }
            
            const prompt = 'Generate a conversation between ' + char1Name + ' and ' + char2Name + ' about ' + topic + '.\n' +
            'Create exactly ' + messageCount + ' messages total, alternating between the two characters.\n' +
            'Format each message as: "CHARACTER_NAME | TIMESTAMP | message content"\n' +
            'Where TIMESTAMP should be in format "12:34 PM" and progress realistically throughout the conversation (messages should be a few minutes apart).' + characterDetails + '\n' +
            '\nNot all replies need to be short - sometimes the context implies a longer message is appropriate, use judgment.';
            
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
            errorMsg.textContent = 'Error: ' + (error.message || 'Failed to generate conversation');
            errorMsg.style.display = 'block';
        } finally {
            loadingIndicator.style.display = 'none';
        }
    },
    
    displayConversation(conversationText, char1Name, char2Name) {
        // Process the generated conversation
        const messages = conversationText.split('\n')
            .filter(line => line.trim().length > 0)
            .map(line => {
                // Extract character name, timestamp, and message content
                const match = line.match(/^(.+?)\s*\|\s*(.+?)\s*\|\s*(.+)$/);
                if (match) {
                    return {
                        character: match[1].trim(),
                        timestamp: match[2].trim(),
                        content: match[3].trim()
                    };
                } else {
                    return null;
                }
            })
            .filter(Boolean);
        
        // Clear previous messages
        const chatMessages = document.getElementById('chatMessages');
        chatMessages.textContent = '';
        
        messages.forEach((msg, index) => {
            const isChar1 = msg.character.toLowerCase().includes(char1Name.toLowerCase());
            const charName = isChar1 ? char1Name : char2Name;
            const charPreviewId = isChar1 ? 'char1Preview' : 'char2Preview';
            
            const avatarPreview = document.getElementById(charPreviewId);
            let avatarSrc = '/api/placeholder/40/40';
            
            // Safely get avatar source with validation
            if (avatarPreview.querySelector('img')) {
                const previewSrc = avatarPreview.querySelector('img').src;
                avatarSrc = securityUtils.sanitizeUrl(previewSrc, '/api/placeholder/40/40');
            }
            
            const displayTimestamp = 'Today at ' + msg.timestamp;
            
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
        // Helper function to create message strings safely
        function createMessage(name, time, content) {
            return name + ' | ' + time + ' | ' + content;
        }
        
        const conversationTemplates = {
            "work": [
                createMessage(char1Name, '9:15 AM', 'Hey, did you see the email about the new project deadline?'),
                createMessage(char2Name, '9:18 AM', 'Yeah, it\'s pretty tight. We\'ll need to prioritize the main features first'),
                createMessage(char1Name, '9:22 AM', 'Agreed. Should we schedule a quick call to discuss?'),
                createMessage(char2Name, '9:25 AM', 'Good idea! How about 2pm today?'),
                createMessage(char1Name, '9:27 AM', 'Perfect, I\'ll send the calendar invite'),
                createMessage(char2Name, '9:30 AM', 'Thanks! I\'ll prep some notes beforehand')
            ],
            "friendship": [
                createMessage(char1Name, '7:30 PM', 'What are you up to tonight?'),
                createMessage(char2Name, '7:33 PM', 'Just watching Netflix lol. You?'),
                createMessage(char1Name, '7:35 PM', 'Same! Have you seen that new series everyone\'s talking about?'),
                createMessage(char2Name, '7:38 PM', 'Which one? There are like 5 new shows this week 😅'),
                createMessage(char1Name, '7:40 PM', 'The sci-fi one with the time travel plot'),
                createMessage(char2Name, '7:42 PM', 'Oh that one! Yeah it\'s actually really good. Want to watch together?')
            ],
            "family": [
                createMessage(char1Name, '6:45 PM', 'Dinner\'s ready! Come downstairs'),
                createMessage(char2Name, '6:48 PM', 'Coming! Just finishing up this assignment'),
                createMessage(char1Name, '6:50 PM', 'Okay but don\'t let it get cold'),
                createMessage(char2Name, '6:52 PM', 'I\'ll be down in 2 minutes, promise'),
                createMessage(char1Name, '6:55 PM', 'Alright, I\'ll keep your plate warm'),
                createMessage(char2Name, '6:57 PM', 'You\'re the best, thanks!')
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
            const timestamp = displayHour + ':' + String(currentMinute).padStart(2, '0') + ' ' + ampm;
            
            let message;
            if (isFirst) {
                let template = templates[Math.floor(Math.random() * templates.length)];
                message = template.replace("{topic}", topic);
            } else {
                message = responses[Math.floor(Math.random() * responses.length)];
            }
            
            conversation += name + ' | ' + timestamp + ' | ' + message + '\n';
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
        
        // Create safe filename with string concatenation
        const safeChar1 = char1Name.replace(/[^a-zA-Z0-9_-]/g, '_');
        const safeChar2 = char2Name.replace(/[^a-zA-Z0-9_-]/g, '_');
        const safeTopic = topic.replace(/[^a-zA-Z0-9_-]/g, '_');
        const filename = safeChar1 + '_' + safeChar2 + '_' + safeTopic + '_chat.html';
        
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
        
        // Create HTML content with string concatenation
        let chatOnlyHTML = 
        '<!DOCTYPE html>\n' +
        '<html lang="en">\n' +
        '<head>\n' +
        '    <meta charset="UTF-8">\n' +
        '    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
        '    <title>' + char1Name + ' & ' + char2Name + ' - ' + topic + '</title>\n' +
        '    <style>\n' +
        '        body { \n' +
        '            font-family: \'Whitney\', \'Helvetica Neue\', Helvetica, Arial, sans-serif;\n' +
        '            background-color: #36393f;\n' +
        '            color: #dcddde;\n' +
        '            margin: 0;\n' +
        '            padding: 20px;\n' +
        '        }\n' +
        '        .container {\n' +
        '            max-width: 800px;\n' +
        '            margin: 0 auto;\n' +
        '            background: #2f3136;\n' +
        '            border-radius: 16px;\n' +
        '            overflow: hidden;\n' +
        '        }\n' +
        '        .chat-header {\n' +
        '            background: linear-gradient(135deg, #5865f2 0%, #4752c4 100%);\n' +
        '            padding: 24px;\n' +
        '            text-align: center;\n' +
        '        }\n' +
        '        .chat-title {\n' +
        '            color: white;\n' +
        '            font-size: 28px;\n' +
        '            font-weight: 700;\n' +
        '            margin-bottom: 8px;\n' +
        '        }\n' +
        '        .chat-subtitle {\n' +
        '            color: rgba(255,255,255,0.9);\n' +
        '            font-size: 16px;\n' +
        '        }\n' +
        '        .chat-messages {\n' +
        '            padding: 32px;\n' +
        '        }\n' +
        '        .message {\n' +
        '            display: flex;\n' +
        '            margin-bottom: 24px;\n' +
        '            padding: 16px 20px;\n' +
        '            border-radius: 12px;\n' +
        '        }\n' +
        '        .message-avatar {\n' +
        '            width: 48px;\n' +
        '            height: 48px;\n' +
        '            border-radius: 50%;\n' +
        '            margin-right: 16px;\n' +
        '            overflow: hidden;\n' +
        '        }\n' +
        '        .message-avatar img {\n' +
        '            width: 100%;\n' +
        '            height: 100%;\n' +
        '            object-fit: cover;\n' +
        '        }\n' +
        '        .message-username {\n' +
        '            font-weight: 600;\n' +
        '            font-size: 16px;\n' +
        '            margin-bottom: 6px;\n' +
        '        }\n' +
        '        .message-timestamp {\n' +
        '            color: #72767d;\n' +
        '            font-size: 12px;\n' +
        '            font-weight: 500;\n' +
        '        }\n' +
        '        .message-text {\n' +
        '            color: #dcddde;\n' +
        '            font-size: 15px;\n' +
        '            line-height: 1.6;\n' +
        '            margin-top: 2px;\n' +
        '        }\n' +
        '        .chat-footer {\n' +
        '            padding: 20px;\n' +
        '            text-align: center;\n' +
        '            border-top: 1px solid #4f545c;\n' +
        '            font-size: 12px;\n' +
        '            color: #72767d;\n' +
        '        }\n' +
        '    </style>\n' +
        '</head>\n' +
        '<body>\n' +
        '    <div class="container">\n' +
        '        <div class="chat-header">\n' +
        '            <h1 class="chat-title">' + char1Name + ' & ' + char2Name + '</h1>\n' +
        '            <p class="chat-subtitle">Conversation about ' + topic + '</p>\n' +
        '        </div>\n' +
        '        \n' +
        '        <div class="chat-messages">\n' +
        '            ' + chatMessages.textContent + '\n' +
        '        </div>\n' +
        '        \n' +
        '        <div class="chat-footer">\n' +
        '            <div>Generated on ' + new Date().toLocaleDateString() + ' at ' + new Date().toLocaleTimeString() + '</div>\n' +
        '            <div>Created with AI Dialogue Generator • Made with Claude AI</div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</body>\n' +
        '</html>\n';
        
        return chatOnlyHTML;
    }
};