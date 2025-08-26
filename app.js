const pets = [
    { name: "Dragonfly", image: "images/dragonfly.png" },
    { name: "Raccoon", image: "images/raccoon.png" },
    { name: "Queen Bee", image: "images/queenbee.png" },
    { name: "Mimic", image: "images/mimic.png" },
    { name: "Octopus", image: "images/octopus.png" },
    { name: "Kitsune", image: "images/kitsune.png" }
];

const checkUserBtn = document.getElementById("checkUser");
const generatePetBtn = document.getElementById("generatePet");
const userStatus = document.getElementById("userStatus");
const petSection = document.getElementById("petSection");
const petResult = document.getElementById("petResult");
const petImage = document.getElementById("petImage");
const serverLink = document.getElementById("serverLink");

checkUserBtn.addEventListener("click", async () => {
    const username = document.getElementById("username").value.trim();
    if(username === "") {
        userStatus.textContent = "❌ Please enter a username.";
        petSection.style.display = "none";
        return;
    }

    userStatus.textContent = "⏳ Checking username...";
    
    try {
        const response = await fetch(`https://api.roblox.com/users/get-by-username?username=${username}`);
        const data = await response.json();

        if(data && data.Id) {
            userStatus.textContent = "✅ Username found, you can now generate your pet!";
            petSection.style.display = "block";
        } else {
            userStatus.textContent = "❌ Username not found. Please check spelling.";
            petSection.style.display = "none";
        }
    } catch (error) {
        userStatus.textContent = "❌ Error checking username.";
        petSection.style.display = "none";
        console.error(error);
    }
});

generatePetBtn.addEventListener("click", () => {
    const randomPet = pets[Math.floor(Math.random() * pets.length)];
    petResult.textContent = `You generated ${randomPet.name}!`;
    petImage.src = randomPet.image;
    petImage.style.display = "block";

    // Replace this with your Roblox private server link
    serverLink.href = "https://www.roblox.com/games/YOUR_PRIVATE_SERVER_LINK";
});
