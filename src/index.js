// Your code here
//fetch characters from db.json

function fetchCharacters() {
  fetch("http://localhost:3000/characters")
    .then((response) => response.json()) 
    .then((characters) => {
      const characterBar = document.getElementById("character-bar");
      characterBar.innerHTML = "";})}; 