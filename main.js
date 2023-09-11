const container = document.getElementById("container");
let currentPage = 1;
let totalPages = 0;

// Evento filtrar personajes
const allBtn = document.getElementById("all");
const femaleBtn = document.getElementById("Female");
const maleBtn = document.getElementById("Male");
const unknownBtn = document.getElementById("unknown");

const getCharacters = (pageNumber) => {
  container.innerHTML = "";
  fetch(`https://rickandmortyapi.com/api/character?page=${pageNumber}`)
    .then((res) => res.json())
    .then((data) => {
      renderCharacters(data);
      totalPages = data.info.pages;
    });
};

// getCharacters();

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
          <button onclick="BackToHome()">Volver</button>
        </div>`;
    });
};

// Pruebo agregar esto para volver
const BackToHome = () => {
  window.history.back();
  location.reload();
};

getCharacters(currentPage);

// Evento página siguiente
const nextBtn = document.getElementById("nextButton");
const previousBtn = document.getElementById("previousButton");
nextBtn.addEventListener("click", () => {
  if (currentPage <= 1) {
    currentPage++;
  } else if (currentPage > 1 && currentPage < totalPages) {
    previousBtn.removeAttribute("disabled", false);
    currentPage++;
  } else {
    nextBtn.setAttribute("disabled", true);
  }
  getCharacters(currentPage);
});

// Evento página anterior
previousBtn.addEventListener("click", () => {
  if (currentPage <= 1) {
    previousBtn.setAttribute("disabled", true);
  } else if (currentPage > 1 && currentPage <= totalPages) {
    currentPage--;
    nextBtn.removeAttribute("disabled", true);
  } else {
    nextBtn.setAttribute("disabled", true);
    currentPage--;
  }
  getCharacters(currentPage);
});

// Evento Primera y última página   --- Hacer disabled
const firstButton = document.getElementById("firstBtn");
const lastButton = document.getElementById("lastBtn");
firstButton.addEventListener("click", () => {
  currentPage = 1;
  getCharacters(currentPage);
});
lastButton.addEventListener("click", () => {
  currentPage = totalPages;
  getCharacters(currentPage);
});
