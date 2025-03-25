// Your code here
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

function showCharacterDetails(character) {
  document.getElementById("name").textContent = character.name;
  document.getElementById("image").src = character.image;
  document.getElementById("vote-count").textContent = character.votes;
  document.getElementById("image").dataset.id = character.id; // Store character ID
}



