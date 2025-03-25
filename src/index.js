//fetch characters from db.json
function fetchCharacters() {
  fetch("http://localhost:3000/characters")
    .then((response) => response.json())
    .then((characters) => {
      const characterBar = document.getElementById("character-bar");
      characterBar.innerHTML = "";
      //display the character names in the character bar
      characters.forEach((character) => {
        const span = document.createElement("span");
        span.textContent = character.name;
        span.style.cursor = "pointer";
        span.addEventListener("click", () => showCharacterDetails(character));
        characterBar.appendChild(span);
      });

      // display the first character's details
      if (characters.length > 0) {
        showCharacterDetails(characters[0]);
      }
    })
    .catch((error) => console.error("Error fetching characters:", error));
}
fetchCharacters();

//Show character details on click

function showCharacterDetails(character) {
  document.getElementById("name").textContent = character.name;
  document.getElementById("image").src = character.image;
  document.getElementById("image").alt = character.name;
  document.getElementById("vote-count").textContent = character.votes;

  // Store character ID in the form for updating votes later
  document.getElementById("votes-form").dataset.characterId = character.id;
}

//submit votes

document.getElementById("votes-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const voteInput = document.getElementById("votes");
  const newVotes = parseInt(voteInput.value, 10);

  if (isNaN(newVotes) || newVotes < 0) {
    alert("Please enter a valid number of votes.");
    return;
  }

  const characterId = event.target.dataset.characterId;
  const currentVotes = parseInt(
    document.getElementById("vote-count").textContent,
    10
  );
  const updatedVotes = currentVotes + newVotes;

  // Update votes in the DOM
  document.getElementById("vote-count").textContent = updatedVotes;
  voteInput.value = ""; // Clear input field

  // Persist votes in the JSON server
  fetch(`http://localhost:3000/characters/${characterId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ votes: updatedVotes }),
  }).catch((error) => console.error("Error updating votes:", error));
});

document.getElementById("reset-btn").addEventListener("click", () => {
  const characterId = document.getElementById("votes-form").dataset.characterId;

  document.getElementById("vote-count").textContent = "0";

  fetch(`http://localhost:3000/characters/${characterId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ votes: 0 }),
  }).catch((error) => console.error("Error resetting votes:", error));
});
