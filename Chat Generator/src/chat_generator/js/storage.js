// storage.js - Local storage management
const storage = {
    saveApiSettings: function() {
        const modelSelect = document.getElementById('model');
        const customModelField = document.getElementById('customModel');
        
        // Get the actual model name
        let modelValue;
        if (modelSelect.value === 'custom') {
            modelValue = customModelField.value;
        } else {
            modelValue = modelSelect.value;
        }
        
        const settings = {
            apiKey: document.getElementById('apiKey').value,
            endpoint: document.getElementById('apiEndpoint').value,
            customEndpoint: document.getElementById('customEndpoint').value,
            model: modelValue
        };
        localStorage.setItem('grokApiSettings', JSON.stringify(settings));
        
        // Show success message
        const successMsg = document.getElementById('apiSuccessMsg');
        successMsg.style.display = 'block';
        setTimeout(() => {
            successMsg.style.display = 'none';
        }, 3000);
    },
    
    loadApiSettings: function() {
        const settings = JSON.parse(localStorage.getItem('grokApiSettings') || '{}');
        if (settings.apiKey) document.getElementById('apiKey').value = settings.apiKey;
        if (settings.endpoint) {
            document.getElementById('apiEndpoint').value = settings.endpoint;
            document.getElementById('apiEndpoint').dispatchEvent(new Event('change'));
        }
        if (settings.customEndpoint) document.getElementById('customEndpoint').value = settings.customEndpoint;
        if (settings.model) {
            const modelSelect = document.getElementById('model');
            const customModelField = document.getElementById('customModel');
            
            const modelExists = Array.from(modelSelect.options).some(option => option.value === settings.model);
            
            if (modelExists) {
                modelSelect.value = settings.model;
            } else {
                modelSelect.value = 'custom';
                customModelField.value = settings.model;
                customModelField.style.display = 'block';
            }
        }
        
        if (settings.endpoint === 'custom') {
            document.getElementById('customEndpoint').style.display = 'block';
        }
    },
    
    getCharacters: function() {
        return JSON.parse(localStorage.getItem('grokCharacters') || '[]');
    },
    
    saveCharacter: function(character) {
        const characters = this.getCharacters();
        const index = characters.findIndex(c => c.id === character.id);
        
        if (index !== -1) {
            characters[index] = character;
        } else {
            characters.push(character);
        }
        
        localStorage.setItem('grokCharacters', JSON.stringify(characters));
        this.updateCharacterSelectors();
        this.renderCharacterList();
    },
    
    deleteCharacter: function(id) {
        let characters = this.getCharacters();
        characters = characters.filter(c => c.id !== id);
        localStorage.setItem('grokCharacters', JSON.stringify(characters));
        this.updateCharacterSelectors();
        this.renderCharacterList();
    },
    
    renderCharacterList: function() {
        const characters = this.getCharacters();
        const listElement = document.getElementById('savedCharacters');
        listElement.innerHTML = '';
        
        if (characters.length === 0) {
            listElement.innerHTML = '<div style="padding: 10px; color: #72767d;">No saved characters</div>';
            return;
        }
        
        characters.forEach(char => {
            const charItem = document.createElement('div');
            charItem.className = 'character-item';
            charItem.dataset.id = char.id;
            
            charItem.innerHTML = `
                <div class="character-item-avatar">
                    <img src="${char.avatar || '/api/placeholder/30/30'}" alt="${char.name}">
                </div>
                <div class="character-item-name">${char.name}</div>
                <div class="character-item-delete">×</div>
            `;
            
            charItem.addEventListener('click', function(e) {
                if (e.target.classList.contains('character-item-delete')) {
                    if (confirm(`Delete character "${char.name}"?`)) {
                        storage.deleteCharacter(char.id);
                    }
                    return;
                }
                
                // Load character data into form
                document.getElementById('charEditName').value = char.name;
                document.getElementById('charEditAge').value = char.age || '';
                document.getElementById('charEditPersonality').value = char.personality || '';
                document.getElementById('charEditBackground').value = char.background || '';
                document.getElementById('charEditRelationship').value = char.relationship || '';
                document.getElementById('charEditTextingStyle').value = char.textingStyle || '';
                document.getElementById('charEditPreview').innerHTML = `<img src="${char.avatar || '/api/placeholder/40/40'}" alt="${char.name}">`;
                document.getElementById('charEditPreview').dataset.charId = char.id;
            });
            
            listElement.appendChild(charItem);
        });
    },
    
    updateCharacterSelectors: function() {
        const characters = this.getCharacters();
        const selector1 = document.getElementById('char1Selector');
        const selector2 = document.getElementById('char2Selector');
        
        const selectedChar1 = selector1.value;
        const selectedChar2 = selector2.value;
        
        selector1.innerHTML = '<option value="">Select a character</option>';
        selector2.innerHTML = '<option value="">Select a character</option>';
        
        characters.forEach(char => {
            const option1 = document.createElement('option');
            option1.value = char.id;
            option1.textContent = char.name;
            selector1.appendChild(option1);
            
            const option2 = document.createElement('option');
            option2.value = char.id;
            option2.textContent = char.name;
            selector2.appendChild(option2);
        });
        
        if (selectedChar1 && characters.some(c => c.id === selectedChar1)) {
            selector1.value = selectedChar1;
        }
        
        if (selectedChar2 && characters.some(c => c.id === selectedChar2)) {
            selector2.value = selectedChar2;
        }
    },
    
    exportCharacters: function() {
        const characters = this.getCharacters();
        if (characters.length === 0) {
            alert('No characters to export');
            return;
        }
        
        const dataStr = JSON.stringify(characters, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `dialogue-characters-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 0);
    },
    
    importCharacters: function(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedChars = JSON.parse(e.target.result);
                
                if (!Array.isArray(importedChars)) {
                    throw new Error('Invalid file format');
                }
                
                const validChars = importedChars.filter(char => 
                    char.id && char.name && typeof char.name === 'string'
                );
                
                if (validChars.length === 0) {
                    throw new Error('No valid characters found in file');
                }
                
                const existingChars = this.getCharacters();
                const mergedChars = [...existingChars];
                
                validChars.forEach(importedChar => {
                    const existingIndex = mergedChars.findIndex(c => c.id === importedChar.id);
                    if (existingIndex !== -1) {
                        mergedChars[existingIndex] = importedChar;
                    } else {
                        mergedChars.push(importedChar);
                    }
                });
                
                localStorage.setItem('grokCharacters', JSON.stringify(mergedChars));
                this.updateCharacterSelectors();
                this.renderCharacterList();
                
                const successMsg = document.getElementById('importSuccessMsg');
                successMsg.style.display = 'block';
                setTimeout(() => {
                    successMsg.style.display = 'none';
                }, 3000);
                
            } catch (error) {
                console.error('Import error:', error);
                const errorMsg = document.getElementById('importErrorMsg');
                errorMsg.textContent = `Error importing characters: ${error.message}`;
                errorMsg.style.display = 'block';
                setTimeout(() => {
                    errorMsg.style.display = 'none';
                }, 5000);
            }
        };
        reader.readAsText(file);
    }
};