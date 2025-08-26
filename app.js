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

let petGenerated = false; // Track if a pet has been generated

// Always "find" the username
checkUserBtn.addEventListener("click", () => {
    const username = document.getElementById("username").value.trim();
    if(username === "") {
        userStatus.textContent = "❌ Please enter a username.";
        petSection.style.display = "none";
        return;
    }
    userStatus.textContent = "✅ Username found! You can now generate your pet.";
    petSection.style.display = "block";
});

// Generate pet and show Join Private Server button
generatePetBtn.addEventListener("click", () => {
    if (petGenerated) {
        petResult.textContent = "❌ You can't generate any pets anymore!";
        return;
    }

    const randomPet = pets[Math.floor(Math.random() * pets.length)];
    petResult.textContent = `You generated ${randomPet.name}!`;
    petImage.src = randomPet.image;
    petImage.style.display = "block";

    serverLink.style.display = "inline-block"; // Show the private server button
    petGenerated = true; // Mark that a pet has been generated
});
