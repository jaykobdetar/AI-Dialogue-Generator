// api.js - API handling functions
const api = {
    async generateConversation(prompt, settings) {
        const { apiKey, endpoint, model, systemPrompt } = settings;
        
        // Check if demo mode is selected
        if (endpoint === 'test-mode') {
            console.log("Using demo mode with local fallback data");
            return new Promise((resolve) => {
                setTimeout(() => {
                    const mockConversation = this.generateMockConversation(
                        settings.char1Name, 
                        settings.char2Name, 
                        settings.topic, 
                        settings.messageCount
                    );
                    resolve(mockConversation);
                }, 1500);
            });
        }
        
        // Determine API endpoint
        let apiEndpoint = endpoint;
        if (endpoint === 'custom') {
            apiEndpoint = document.getElementById('customEndpoint').value;
            if (!apiEndpoint) {
                throw new Error('Please enter a custom API endpoint URL');
            }
        }
        
        if (!model) {
            throw new Error('Please select a model');
        }
        
        // Display API request info
        console.log('Sending request to: ' + apiEndpoint);
        console.log('Using model: ' + model);
        console.log('System prompt: ' + systemPrompt);
        
        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + apiKey,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: model,
                    messages: [
                        {
                            role: 'system',
                            content: systemPrompt
                        },
                        {
                            role: 'user',
                            content: prompt
                        }
                    ],
                    temperature: 0.7,
                    max_tokens: 4000
                })
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error("API Response:", errorText);
                throw new Error('API request failed with status: ' + response.status + '. Check your API key and endpoint.');
            }
            
            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            // Handle network errors specifically
            if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
                throw new Error('Network error when connecting to ' + apiEndpoint + '. This could be due to CORS restrictions, an invalid domain, or the API being down.');
            } else {
                throw error; // Re-throw other errors
            }
        }
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
        
        // Try to find a template that matches the topic
        const topicLower = topic.toLowerCase();
        
        if (topicLower.includes('work') || topicLower.includes('job') || topicLower.includes('project')) {
            return conversationTemplates.work.slice(0, Math.min(count, 6)).join('\n');
        } else if (topicLower.includes('friend') || topicLower.includes('hang') || topicLower.includes('movie')) {
            return conversationTemplates.friendship.slice(0, Math.min(count, 6)).join('\n');
        } else if (topicLower.includes('family') || topicLower.includes('dinner') || topicLower.includes('home')) {
            return conversationTemplates.family.slice(0, Math.min(count, 6)).join('\n');
        }
        
        // Fallback to original generation method
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
        
        let currentHour = 10; // Start at 10 AM
        let currentMinute = 0;
        let conversation = "";
        
        for (let i = 0; i < count; i++) {
            const isFirst = i % 2 === 0;
            const name = isFirst ? char1Name : char2Name;
            
            // Generate realistic timestamps (progress 1-5 minutes between messages)
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
                // Template with topic
                let template = templates[Math.floor(Math.random() * templates.length)];
                message = template.replace("{topic}", topic);
            } else {
                // Response
                message = responses[Math.floor(Math.random() * responses.length)];
            }
            
            conversation += createMessage(name, timestamp, message) + '\n';
        }
        
        return conversation;
    }
};