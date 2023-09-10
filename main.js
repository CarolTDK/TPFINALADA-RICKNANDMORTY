const container = document.getElementById("container");
const getCharacters = () => {
  fetch("https://rickandmortyapi.com/api/character")
    .then((res) => res.json())
    .then((data) => renderCharacters(data));
};

getCharacters();

const renderCharacters = (data) => {
  data.results.forEach((character) => {
    console.log(character);
    container.innerHTML += `<div class="card">
    <h4>${character.name}</h4>
        <img src="${character.image}" alt="" />
        <button class="button" onclick=seeDetails("${character.url}")>Ver detalles</button>
      </div>
    </div>`;
  });
};

// Ver detalles de cada uno
const seeDetails = (characterUrl) => {
  container.innerHTML = "";
  fetch(characterUrl)
    .then((res) => res.json())
    .then((character) => {
      container.innerHTML = `<div class="card">
    <h4>${character.name}</h4>
        <img src="${character.image}" alt="" />
        <p>${character.status}</p>
        <button class="button" onclick=seeDetails()>Volver</button>
      </div>
    </div>`;
    });
};

// Hacer card detail para tener info completa
