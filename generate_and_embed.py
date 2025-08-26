// A simple debouncing function to limit API calls as the user types
function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

// --- DOM Elements ---
const usernameInput = document.getElementById('usernameInput');
const validationMessage = document.getElementById('validationMessage');
const generatePetBtn = document.getElementById('generatePetBtn');
const resultArea = document.getElementById('resultArea');
const resultText = document.getElementById('resultText');
const claimLink = document.getElementById('claimLink');

// --- Pet Data ---
const pets = [
    "Dragonfly",
    "Raccoon",
    "Queen Bee",
    "Mimic Octopus",
    "Kitsune"
];

// --- Roblox API Check ---
// The main function that now also fetches user details
async function checkUsername(username) {
    if (username.length === 0) {
        validationMessage.textContent = '';
        generatePetBtn.disabled = true;
        return;
    }

    // Show a loading indicator
    validationMessage.textContent = 'Checking...';
    validationMessage.className = 'message';
    generatePetBtn.disabled = true;

    try {
        // Use the new API endpoint to get user details by username
        const response = await fetch('https://users.roblox.com/v1/usernames/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usernames: [username] })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const user = data.data && data.data.length > 0 ? data.data[0] : null;

        if (user) {
            // Display the user's name and ID once found
            validationMessage.innerHTML = `✅ Username found: **${user.name}**<br>User ID: **${user.id}**<br>You can now generate your pet!`;
            validationMessage.className = 'message success';
            generatePetBtn.disabled = false;
        } else {
            validationMessage.textContent = '❌ Username not found. Please try again.';
            validationMessage.className = 'message error';
            generatePetBtn.disabled = true;
        }

    } catch (error) {
        console.error('Failed to validate username:', error);
        validationMessage.textContent = '⚠️ Could not validate username. Try again later.';
        validationMessage.className = 'message error';
        generatePetBtn.disabled = true;
    }
}

// Add an input event listener with a debounce to the username field
usernameInput.addEventListener('input', debounce((e) => {
    checkUsername(e.target.value);
}, 500));

// --- Pet Generation Logic ---
function generatePet() {
    // Clear previous results
    resultText.textContent = '';
    claimLink.classList.add('hidden');
    resultArea.style.opacity = '0';

    // Get a random pet from the array
    const randomIndex = Math.floor(Math.random() * pets.length);
    const generatedPet = pets[randomIndex];

    // Display the result
    setTimeout(() => {
        resultText.textContent = `You generated a ${generatedPet}!`;
        claimLink.classList.remove('hidden');
        resultArea.style.opacity = '1';
        generatePetBtn.disabled = true; // Disable the button after generation
        validationMessage.textContent = ''; // Hide validation message
        validationMessage.className = 'message';
    }, 500);
}

// Add event listener to the generate button
generatePetBtn.addEventListener('click', generatePet);

