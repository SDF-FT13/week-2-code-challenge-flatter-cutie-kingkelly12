// Your code here

document.addEventListener("DOMContentLoaded", () => {
    const baseURL = "http://localhost:3000/characters";
    const characterBar = document.getElementById("character-bar");
    const detailedInfo = document.getElementById("detailed-info");
    const characterName = document.getElementById("name");
    const characterImage = document.getElementById("image");
    const characterVotes = document.getElementById("vote-count");
    const votesForm = document.getElementById("votes-form");
    const votesInput = document.getElementById("votes");

    let currentCharacter = null;

    function fetchCharacters() {
        fetch(baseURL)
            .then(response => response.json())
            .then(characters => {
                characters.forEach(character => displayCharacterInBar(character));
            });
    }

    function displayCharacterInBar(character) {
        const span = document.createElement("span");
        span.textContent = character.name;
        span.addEventListener("click", () => displayCharacterDetails(character));
        characterBar.appendChild(span);
    }

    function displayCharacterDetails(character) {
        currentCharacter = character;
        characterName.textContent = character.name;
        characterImage.src = character.image;
        characterVotes.textContent = character.votes;
    }

    votesForm.addEventListener("submit", (event) => {
        event.preventDefault();
        if (currentCharacter) {
            let newVotes = parseInt(votesInput.value) || 0;
            currentCharacter.votes += newVotes;
            characterVotes.textContent = currentCharacter.votes;
            votesInput.value = "";
        }
    });

    fetchCharacters();
});
