// Convert hex to vec3
function hexToVec3(hex) {
    let r = parseInt(hex.slice(1, 3), 16) / 255.0;
    let g = parseInt(hex.slice(3, 5), 16) / 255.0;
    let b = parseInt(hex.slice(5, 7), 16) / 255.0;
    return `vec3(${r.toFixed(3)}, ${g.toFixed(3)}, ${b.toFixed(3)})`;
}

// Update color picker display
function updateColor() {
    const colorPicker = document.getElementById('colorPicker');
    const colorDisplay = document.getElementById('colorDisplay');
    const vec3Display = document.getElementById('vec3Display');

    const hexColor = colorPicker.value;
    const vec3String = hexToVec3(hexColor);

    colorDisplay.style.backgroundColor = hexColor;
    vec3Display.textContent = vec3String;
}

// Generate JSON based on user inputs
function generateJSON() {
    const description = document.getElementById('description').value || 'Default description';
    const name = document.getElementById('name').value || 'Default name';
    const version = document.getElementById('version').value || '1.0.0';

    const uuid1 = generateUUID();
    const uuid2 = generateUUID();

    const jsonObject = {
        format_version: 2,
        header: {
            description: description,
            name: name,
            uuid: uuid1,
            version: version.split('.').map(Number),
            min_engine_version: [1, 19, 60]
        },
        modules: [
            {
                description: description,
                type: 'resources',
                uuid: uuid2,
                version: version.split('.').map(Number)
            }
        ],
        metadata: {
            authors: ["Your Name"],
            url: "https://your-url.com"
        }
    };

    document.getElementById('jsonOutput').value = JSON.stringify(jsonObject, null, 4);
}

// Generate a UUID
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = Math.random() * 16 | 0;
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

// Copy text to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Copied to clipboard!');
    }).catch(err => {
        alert('Failed to copy: ' + err);
    });
}

// Generate random Minecraft words for the animation
function generateMinecraftWords() {
    const words = ['Block', 'Creeper', 'Redstone', 'Diamond', 'Steve', 'Herobrine', 'Pickaxe', 'Enderman', 'Pig', 'Craft','Bees','infinite possibilities','Mine'];
    const minecraftWordsDiv = document.getElementById('minecraftWords');
    
    // Clear previous words
    minecraftWordsDiv.innerHTML = '';

    // Add a random word every 1 second
    setInterval(() => {
        const randomWord = words[Math.floor(Math.random() * words.length)];
        const wordElement = document.createElement('div');
        wordElement.classList.add('minecraft-word');
        wordElement.textContent = randomWord;
        minecraftWordsDiv.appendChild(wordElement);
    }, 1000);
}

// Event listeners
document.getElementById('colorPicker').addEventListener('input', updateColor);
document.getElementById('copyVec3').addEventListener('click', () => {
    const vec3Text = document.getElementById('vec3Display').textContent;
    copyToClipboard(vec3Text);
});
document.getElementById('copyJson').addEventListener('click', () => {
    const jsonText = document.getElementById('jsonOutput').value;
    copyToClipboard(jsonText);
});
document.getElementById('generateJson').addEventListener('click', generateJSON);

// Startup animation transition
setTimeout(() => {
    document.getElementById('startup').style.display = 'none';
    document.getElementById('mainContent').classList.remove('hidden');
}, 6000);

// Start Minecraft words animation
generateMinecraftWords();
