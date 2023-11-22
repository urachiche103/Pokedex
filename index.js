const pokemonList = document.querySelector('#pokemonList');
const btnHeader = document.querySelectorAll('.btn-header');
let url = 'https://pokeapi.co/api/v2/pokemon/';

for (let i = 1; i <= 151; i++) {
    fetch(url + i)
        .then((response) => response.json())
        .then(data => showPokemon(data))
}

function showPokemon(data) {

    let types = data.types.map((type) => `<p class="${type.type.name} type">${type.type.name}</p>`);
    types = types.join('');
    // console.log(types);

    let dataId = data.id.toString();
    // console.log(dataId);
        if(dataId.length === 1) {
            dataId = '00' + dataId;
        } else if (dataId.length === 2) {
            dataId = '0' + dataId;
        }

    const div = document.createElement('div');
    div.classList.add('pokemon');
    div.innerHTML = `
            <p class="pokemon-id-back">#${dataId}</p>
            <div class="pokemon-img">
                <img src="${data.sprites.other['official-artwork'].front_default}" alt="${data.name}">
            </div>
            <div class="pokemon-info">
                <div class="name-container">
                    <p class="pokemon-id">#${dataId}</p>
                        <h2 class="pokemon-name">${data.name}</h2>
                </div>
                <div class="pokemon-types">
                    ${types}
                </div>
                <div class="pokemon-stats">
                    <p class="stat">${data.height}m</p>
                    <p class="stat">${data.weight}kg</p>
                </div>
        </div>
    `;
    pokemonList.append(div);
}

btnHeader.forEach(btn => btn.addEventListener('click', (event) => {
    const btnId = event.currentTarget.id;

    pokemonList.innerHTML = '';

    for (let i = 1; i <= 151; i++) {
        fetch(url + i)
            .then((response) => response.json())
            .then(data => {
                // console.log(data.types.map(type => type.type.name));
                if(btnId === 'view-all') {
                    showPokemon(data);
                } else {
                const types = data.types.map(type => type.type.name);
                    if (types.some(type => type.includes(btnId))) {
                        showPokemon(data)
                    }
                }
            })
    }
}))



// const url = " https://pokeapi.co/api/v2/pokemon/";
// const card = document.getElementById("card");
// const btn = document.getElementById("btn");

// let getPokeData = () => {
// let id = Math.floor(Math.random() * 150) + 1;
// const finalUrl = url + id;
// fetch(finalUrl)
//     .then((response) => response.json())
//     .then((data) => {
//     generateCard(data);
// });
// };

// let generateCard = (data) => {
// console.log(data);

// const hp = data.stats[0].base_stat;
// const imgSrc = data.sprites.other.dream_world.front_default;
// const pokeName = data.name[0].toUpperCase() + data.name.slice(1);
// const statAttack = data.stats[1].base_stat;
// const statDefense = data.stats[2].base_stat;
// const statSpeed = data.stats[5].base_stat;

// const themeColor = typeColor[data.types[0].type.name];
// console.log(themeColor);

// card.innerHTML = `
//     <p class="hp">
//         <span>HP</span>
//             ${hp}
//     </p>
//     <img src=${imgSrc} />
//     <h2 class="poke-name">${pokeName}</h2>
//     <div class="types"></div>
//     <div class="stats">
//         <div>
//             <h3>${statAttack}</h3>
//             <p>Attack</p>
//         </div>
//         <div>
//             <h3>${statDefense}</h3>
//             <p>Defense</p>
//         </div>
//         <div>
//             <h3>${statSpeed}</h3>
//             <p>Speed</p>
//         </div>
//     </div>
// `;

// appendTypes(data.types);
// styleCard(themeColor);
// };

// let appendTypes = (types) => {
// types.forEach((item) => {
//     let span = document.createElement("SPAN");
//     span.textContent = item.type.name;
//     document.querySelector(".types").appendChild(span);
// });
// };

// let styleCard = (color) => {
// card.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #ffffff 36%)`;
// card.querySelectorAll(".types span").forEach((typeColor) => {
//     typeColor.style.backgroundColor = color;
// });
// };

// btn.addEventListener("click", getPokeData);
// window.addEventListener("load", getPokeData);