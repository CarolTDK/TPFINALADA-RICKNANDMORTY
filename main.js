const container = document.getElementById("container");
let currentPage = 1;
let totalPages = 0;
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

// Evento página siguiente     -- Prueba
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

// Evento página anterior    -- Prueba
previousBtnBtn.addEventListener("click", () => {
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

// Evento Primera y última página   --- Prueba

// Evento filtrar personajes
