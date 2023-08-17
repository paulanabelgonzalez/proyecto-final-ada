
fetch("https://rickandmortyapi.com/api/character")
.then(res => res.json())
.then((data) => cards(data));

const cards = (apiResponse) => {
    const rickAndMortyApiArray = apiResponse.results;
    container.innerHTML = "";
    rickAndMortyApiArray.forEach((character) => {
    container.innerHTML +=  
    `<div class="rick&morty-card">
    <h2>${character.name}</h2>,
    <img src="${character.image}">,
    <button onclick = description("")
      </div>`
  });
 };
    