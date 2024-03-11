let currentPokemon;

function init() {

}

async function loadPokemon() {
    let url = 'https://pokeapi.co/api/v2/pokemon/charmander';
    let response = await fetch(url);
    currentPokemon = await response.json();
    console.log('loadet pokemon', currentPokemon);

    renderPokemonInfo();
}

function renderPokemonInfo() {
    let formattedName = currentPokemon['name'].charAt(0).toUpperCase() + currentPokemon['name'].slice(1);
    document.getElementById('pokemonName').innerHTML = formattedName; 
    
    document.getElementById('pokemonImg').src = currentPokemon['sprites']['other']['official-artwork']['front_default'];

    let formattedType1 = currentPokemon['types']['0']['type']['name'].charAt(0).toUpperCase() + currentPokemon['types']['0']['type']['name'].slice(1);
    document.getElementById('pokemonType1').innerHTML = formattedType1;

    let formattedId = currentPokemon['id'].toString().padStart(3, '0');
    document.getElementById('pokemonId').innerHTML = '#' + formattedId;
}