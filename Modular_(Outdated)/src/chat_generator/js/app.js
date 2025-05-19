// app.js - Diagnostic version
console.log('📄 app.js loaded');

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM loaded, starting diagnostics...');
    
    // Check each module individually
    setTimeout(() => {
        console.log('📊 Module check:');
        console.log('  storage:', typeof storage, storage);
        console.log('  api:', typeof api, api);
        console.log('  ui:', typeof ui, ui);
        
        // Check if all are loaded
        if (typeof storage !== 'undefined' && typeof api !== 'undefined' && typeof ui !== 'undefined') {
            console.log('✅ All modules loaded - initializing app');
            initApp();
        } else {
            console.log('❌ Some modules missing - check individual files');
            showDiagnostic();
        }
    }, 200);
});

function initApp() {
    try {
        console.log('🔧 Loading API settings...');
        storage.loadApiSettings();
        
        console.log('🎭 Loading characters...');
        storage.renderCharacterList();
        storage.updateCharacterSelectors();
        
        console.log('🖱️ Initializing UI...');
        ui.init();
        
        console.log('👻 Setting up hidden elements...');
        setupHiddenElements();
        
        console.log('🎉 App initialized successfully!');
        
        // Test the generate button
        const generateBtn = document.getElementById('generateBtn');
        if (generateBtn) {
            console.log('🔘 Generate button found');
            generateBtn.onclick = function() {
                console.log('🖱️ Generate button clicked!');
                if (typeof ui.handleGenerateConversation === 'function') {
                    ui.handleGenerateConversation();
                } else {
                    console.error('❌ handleGenerateConversation not found');
                }
            };
        } else {
            console.error('❌ Generate button not found');
        }
        
    } catch (error) {
        console.error('💥 Error during initialization:', error);
    }
}

function showDiagnostic() {
    const chatMessages = document.getElementById('chatMessages');
    if (chatMessages) {
        let missingModules = [];
        if (typeof storage === 'undefined') missingModules.push('storage.js');
        if (typeof api === 'undefined') missingModules.push('api.js');
        if (typeof ui === 'undefined') missingModules.push('ui.js');
        
        chatMessages.textContent = '';

        const welcomeMessage = document.createElement('div');
        welcomeMessage.className = 'welcome-message';

        const welcomeTitle = document.createElement('h2');
        welcomeTitle.textContent = 'Welcome to the Chat Generator!';

        const welcomeText1 = document.createElement('p');
        welcomeText1.textContent = 'This tool allows you to create realistic chat conversations between characters.';

        const welcomeText2 = document.createElement('p');
        welcomeText2.textContent = 'Get started by creating characters and setting up a conversation topic.';

        welcomeMessage.appendChild(welcomeTitle);
        welcomeMessage.appendChild(welcomeText1);
        welcomeMessage.appendChild(welcomeText2);
        chatMessages.appendChild(welcomeMessage);
    }
}

function setupHiddenElements() {
    if (!document.getElementById('char1Name')) {
        const hiddenElements = document.createElement('div');
        hiddenElements.style.display = 'none';
        hiddenElements.textContent = '';

        const char1NameInput = document.createElement('input');
        char1NameInput.type = 'text';
        char1NameInput.id = 'char1Name';

        const char2NameInput = document.createElement('input');
        char2NameInput.type = 'text';
        char2NameInput.id = 'char2Name';

        const char1Preview = document.createElement('div');
        char1Preview.id = 'char1Preview';

        const char2Preview = document.createElement('div');
        char2Preview.id = 'char2Preview';

        hiddenElements.appendChild(char1NameInput);
        hiddenElements.appendChild(char2NameInput);
        hiddenElements.appendChild(char1Preview);
        hiddenElements.appendChild(char2Preview);
        document.body.appendChild(hiddenElements);
        console.log('👻 Hidden elements added');
    }
}