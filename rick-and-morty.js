const bodyTag = document.getElementById("body-tag");
const btnStar = document.getElementById("btn-star");
const navTag = document.querySelector(".nav-tag")
const search = document.querySelector(".search")
const txtCharacter = document.getElementById("txt-character");
const container = document.querySelector(".container");
const pagination = document.getElementById("pagination")
const btnFirstPage = document.getElementById("btn-first-page");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const btnLastPage = document.getElementById("btn-last-page");
const section = document.querySelector("section");

btnStar.addEventListener("click", () => {
  container.innerHTML = "";
  container.classList.add("cards");
  container.style.background = "section"
  getCharacters(pageNumber, "status", "")
  navTag.style.display = "block";
  pagination.style.display = "block";
});

let listCharacter = document.querySelectorAll(".valor-desplegable [val]");
for (let x = 0; x < listCharacter.length; x++) {
  listCharacter[x].addEventListener("click", () => {
    document.getElementById("miValorVisible").textContent = listCharacter[x].textContent;
    valueAttribute = listCharacter[x].getAttribute("val")
    typeAttribute = listCharacter[x].getAttribute("type")
    getCharacters(1, typeAttribute, valueAttribute)
});
}

let pageNumber = 1;
let totalPages = 0;
let typeAttribute = "status";
let valueAttribute = "";
const getCharacters = (pageNumber, typeAttribute, valueAttribute) => {
  container.innerHTML = "";
  fetch(`https://rickandmortyapi.com/api/character?page=${pageNumber}&${typeAttribute}=${valueAttribute}`)
    .then(res => res.json())
    .then((data) => {
      renderCards(data)
      totalPages = data.info.pages;
    });
};

const renderCards = (data) => {
  const rickAndMortyApiArray = data.results;
  navTag.style.display = "block";
  pagination.style.display = "block";
  container.classList.remove("dimension");
  container.style.background = "url(imagenes/fondo.jpg) center";
  container.innerHTML = "";
  rickAndMortyApiArray.forEach(character => {
    container.innerHTML +=
      `<div class="rickAndMorty-card">
    <h2>${character.name}</h2>
    <img class="img" src="${character.image}">
    <button class="viewDescription" onclick=viewDescription("${character.url}")> Ver Más </button>
    </div>`

  });
};

let backgrounds = ["imagenes/dimension-1.jpg", "imagenes/dimension-2.png", "imagenes/dimension-3.jpg", "imagenes/dimension-4.png", "imagenes/dimension-5.jpg", "imagenes/dimension-6.jpg", "imagenes/dimension-7.jpg", "imagenes/dimension-8.jpg", "imagenes/dimension-9.jpg"
]
const viewDescription = (characterUrl) => {
  container.classList.add("dimension");
  let setBackground = Math.floor(Math.random() * backgrounds.length);
  container.style.background = `url(${backgrounds[setBackground]}) center center no-repeat`;
  container.style.backgroundSize = "cover"
  navTag.style.display = "none";
  pagination.style.display = "none";
  container.innerHTML = "";
  fetch(characterUrl)
    .then(res => res.json())
    .then((character) => {
      container.innerHTML =
        `<div class="character-card">
    <h2>${character.name}</h2>
    <img src="${character.image}">
    <p class="status">Estado: ${character.status}</p>
    <p class="species">Especie: ${character.species}</p>
    <p class="gender">Genero: ${character.gender}</p>
    <p class="type">Tipo: ${character.type}</p>
    <p class="origin">Nombre de origen: ${character.origin.name}
    <button class="viewOrigin" onclick=viewOrigin("${character.origin.url}")> Ver Origen </button>
    </p>
    <div class= "origin-container";></div>
    <p class="location">Nombre de Locación: ${character.location.name}
    <button class="viewLocation" onclick=viewLocation("${character.location.url}")> Ver Locación</button>
    </p>
    <div class= "location-container"></div>
    <button class="return" onclick="getCharacters()"> Volver </button>
    </div>`
      const origin = document.querySelector(".origin");
      const location = document.querySelector(".location");
      const status = document.querySelector(".status");
      const species = document.querySelector(".species");
      const type = document.querySelector(".type");
      const gender = document.querySelector(".gender");
      const btnReturn = document.querySelector(".return")

      btnReturn.addEventListener("click", () => getCharacters(pageNumber, typeAttribute, valueAttribute))

      if (character.origin.name === "unknown") {
        origin.style.display = "none";
      }
      if (character.location.name === "unknown") {
        location.style.display = "none";
      }
      if (character.satus === "") {
        status.style.display = "none";
      }
      if (character.species === "") {
        species.style.display = "none";
      }
      if (character.type === "") {
        type.style.display = "none";
      }
      if (character.gender === "") {
        gender.style.display = "none";
      }
    });
};

const viewOrigin = (characterOrigenUrl) => {
  const originContainer = document.querySelector(".origin-container");
  const btnViewOrigin = document.querySelector(".viewOrigin");
  fetch(characterOrigenUrl)
    .then(res => res.json())
    .then((origin) => {
      originContainer.innerHTML =
        `<p>Tipo: ${origin.type}</p>
    <p>Dimensión: ${origin.dimension}</p>
    `
    });
  originContainer.classList.toggle('hide')

  if (originContainer.classList.contains('hide')) {
    btnViewOrigin.innerHTML = "Ver origen";
  } else {
    btnViewOrigin.innerHTML = "Ocultar Origen"
  }
};

const viewLocation = (characterLocationUrl) => {
  const locationContainer = document.querySelector(".location-container")
  const btnViewLocation = document.querySelector(".viewLocation");
  fetch(characterLocationUrl)
    .then(res => res.json())
    .then((location) => {
      locationContainer.innerHTML =
        `<p>Tipo: ${location.type}</p>
    <p>Dimensión: ${location.dimension}</p>
    `
    });
  locationContainer.classList.toggle('hide')

  if (locationContainer.classList.contains('hide')) {
    btnViewLocation.innerHTML = "Ver Locación";
  } else {
    btnViewLocation.innerHTML = "Ocultar Locación"
  }
};

btnFirstPage.addEventListener("click", () => {
  pageNumber = 1;
  if (pageNumber = 1) {
    btnPrev.setAttribute("disabled", true);
    getCharacters(1, typeAttribute, valueAttribute);
    btnNext.removeAttribute("disabled", true);
  };
});

btnPrev.addEventListener("click", () => {
  getCharacters(pageNumber, typeAttribute, valueAttribute);
  pageNumber -= 1;

  if (pageNumber === 1) {
    btnPrev.setAttribute("disabled", true);
    getCharacters(pageNumber, typeAttribute, valueAttribute);
  };
  if (pageNumber <= totalPages) {
    btnNext.removeAttribute("disabled", true);
    getCharacters(pageNumber, typeAttribute, valueAttribute);
  };
});
const pageResults =document.querySelector(".page-results")
btnNext.addEventListener("click", () => {
  pageNumber += 1;

  if (pageNumber >= 1) {
    btnPrev.removeAttribute("disabled", true);
    getCharacters(pageNumber, typeAttribute, valueAttribute);
  };
  if (pageNumber === totalPages) {
    btnNext.setAttribute("disabled", true);
    getCharacters(pageNumber, typeAttribute, valueAttribute);
  };
});

btnLastPage.addEventListener("click", () => {
  totalPages = totalPages
  if (pageNumber = totalPages) {
    btnNext.setAttribute("disabled", true);
    getCharacters(totalPages, typeAttribute, valueAttribute);
    btnPrev.removeAttribute("disabled", true);
  };
});

const filterByName = (pageNumber, typeAttribute, valueAttribute) => {
getCharacters(pageNumber, typeAttribute, valueAttribute) 
}

txtCharacter.addEventListener('keyup',() => {
 if( nameValue = txtCharacter.value){ 
  filterByName(pageNumber,"name", nameValue)
 }else{
  getCharacters(pageNumber, typeAttribute, valueAttribute) 
 }
})