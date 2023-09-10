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
      </div>`;
  });
};

// Ver detalles de cada uno
// Al presionar Volver me deja la card-detail y me suma la ppágina completa duplicando a Ricky
const seeDetails = (characterUrl) => {
  container.innerHTML = "";
  fetch(characterUrl)
    .then((res) => res.json())
    .then((character) => {
      container.innerHTML = "";
      container.innerHTML = ` <div class="card-detail">
          <img src="${character.image}" alt="">
          <h3>${character.name}</h3>
          <p>${character.gender}</p>
          <p>${character.status}</p>
          <p>${character.species}</p>
          <p>${character.location.name}</p>
          <p>${character.origin.name}</p>
          <button onclick="getCharacters()">Volver</button>
        </div>`;
    });
};
