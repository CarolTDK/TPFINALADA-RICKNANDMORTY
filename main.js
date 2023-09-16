const container = document.getElementById("container");
let currentPage = 1;
let totalPages = 0;
let currentFilter = "all"; // Variable para almacenar el filtro actual

// Botones filtro
const allBtn = document.querySelector(".all");
const femaleBtn = document.querySelector(".female");
const maleBtn = document.querySelector(".male");
const unknownBtn = document.querySelector(".unknown");

// Me trae los personajes
const getCharacters = (pageNumber, filter) => {
  container.innerHTML = "";
  const apiUrl =
    filter === "all"
      ? `https://rickandmortyapi.com/api/character?page=${pageNumber}`
      : `https://rickandmortyapi.com/api/character/?gender=${filter}&page=${pageNumber}`;

  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      renderCharacters(data);
      totalPages = data.info.pages;
    });
};

// Función para renderizar personajes
const renderCharacters = (data) => {
  container.innerHTML = "";
  data.results.forEach((character) => {
    container.innerHTML += `<div class="card">
      <h4>${character.name}</h4>
      <img src="${character.image}" alt="" />
      <button class="button" onclick=seeDetails("${character.url}")>Ver detalles</button>
    </div>`;
  });
};

// Ver detalles de cada personaje
const seeDetails = (characterUrl) => {
  container.innerHTML = "";
  fetch(characterUrl)
    .then((res) => res.json())
    .then((character) => {
      container.innerHTML = ` <div class="card-detail">
        <img src="${character.image}" alt="">
        <div class="card-info">
          <h3>${character.name}</h3>
          <p>${character.gender}</p>
          <p>${character.status}</p>
          <p>${character.species}</p>
          <p>${character.location.name}</p>
          <p>${character.origin.name}</p>
          <button onclick="BackToHome()">Volver</button>
        </div>
      </div>`;
    });
};

// Función para volver
const BackToHome = () => {
  window.history.back();
  location.reload();
};

// Función para manejar la paginación
const handlePagination = (pageNumber) => {
  if (pageNumber <= 1) {
    currentPage = 1;
  } else if (pageNumber >= totalPages) {
    currentPage = totalPages;
  } else {
    currentPage = pageNumber;
  }

  // Actualizar la página de acuerdo al filtro actual
  getCharacters(currentPage, currentFilter);
};

// Evento página siguiente
const nextBtn = document.getElementById("nextButton");
nextBtn.addEventListener("click", () => {
  handlePagination(currentPage + 1);
});

// Evento página anterior
const previousBtn = document.getElementById("previousButton");
previousBtn.addEventListener("click", () => {
  handlePagination(currentPage - 1);
});

// Evento Primera página
const firstButton = document.getElementById("firstBtn");
firstButton.addEventListener("click", () => {
  handlePagination(1);
});

// Evento Última página
const lastButton = document.getElementById("lastBtn");
lastButton.addEventListener("click", () => {
  handlePagination(totalPages);
});

// Función para aplicar el filtro por género
const applyFilter = (filter) => {
  currentFilter = filter;
  handlePagination(1); // Volver a la primera página al aplicar un filtro
};

// Evento para el filtro "Todos"
allBtn.addEventListener("click", () => applyFilter("all"));

// Evento para el filtro "Mujeres"
femaleBtn.addEventListener("click", () => applyFilter("Female"));

// Evento para el filtro "Hombres"
maleBtn.addEventListener("click", () => applyFilter("Male"));

// Evento para el filtro "Desconocidos"
unknownBtn.addEventListener("click", () => applyFilter("unknown"));

// Inicializar con el filtro "Todos"
applyFilter("all");
