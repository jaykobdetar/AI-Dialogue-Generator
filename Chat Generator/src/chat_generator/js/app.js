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
        
        chatMessages.innerHTML = `
            <div class="message">
                <div class="message-content" style="padding: 20px; background: rgba(237, 66, 69, 0.1); border-radius: 8px;">
                    <h3 style="color: #ed4245; margin-bottom: 10px;">⚠️ Module Loading Error</h3>
                    <p><strong>Missing modules:</strong> ${missingModules.join(', ')}</p>
                    <p style="margin-top: 10px;"><strong>Solutions:</strong></p>
                    <ul style="margin-left: 20px; margin-top: 5px;">
                        <li>Check browser console (F12) for syntax errors</li>
                        <li>Verify all .js files exist in the js/ folder</li>
                        <li>Make sure you're serving files (not file:// protocol)</li>
                    </ul>
                </div>
            </div>
        `;
    }
}

function setupHiddenElements() {
    if (!document.getElementById('char1Name')) {
        const hiddenElements = document.createElement('div');
        hiddenElements.style.display = 'none';
        hiddenElements.innerHTML = `
            <input type="text" id="char1Name">
            <input type="text" id="char2Name">
            <div id="char1Preview"></div>
            <div id="char2Preview"></div>
        `;
        document.body.appendChild(hiddenElements);
        console.log('👻 Hidden elements added');
    }
}