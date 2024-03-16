let currentPokemon;
let currentPokemonSpecies;

function init() {

}

async function loadPokemon() {
    let url = 'https://pokeapi.co/api/v2/pokemon/4';
    let response = await fetch(url);
    currentPokemon = await response.json();
    console.log('loadet pokemon', currentPokemon);
    await loadPokemonSpecies();
    renderPokemon();
}

async function loadPokemonSpecies() {
    let url = 'https://pokeapi.co/api/v2/pokemon-species/4/';
    let response = await fetch(url);
    currentPokemonSpecies = await response.json();
    console.log('loadet pokemon species', currentPokemonSpecies);
}

function renderPokemon() {
    nameAndImg();
    types();
    idAndSpecies();
    heightAndWeight();
    description();
    eggGroupsAndHatchCounter();
    signatureAbilities();
    let baseStats = currentPokemon['stats']; //load base stats
    for (let i = 0; i < baseStats.length; i++) {
        const baseStat = baseStats[i];
    } 
}

function nameAndImg() {
    let formattedName = currentPokemon['name'].charAt(0).toUpperCase() + currentPokemon['name'].slice(1);
    document.getElementById('pokemonName').innerHTML = formattedName; 
    
    document.getElementById('pokemonImg').src = currentPokemon['sprites']['other']['official-artwork']['front_default'];
}

function types() {
    let formattedType1 = currentPokemon['types']['0']['type']['name'].charAt(0).toUpperCase() + currentPokemon['types']['0']['type']['name'].slice(1);
    document.getElementById('pokemonType1').innerHTML = formattedType1;

    if (currentPokemon['types']['1']) {
        document.getElementById('pokemonType2').classList.remove('d-none');
        let formattedType2 = currentPokemon['types']['1']['type']['name'].charAt(0).toUpperCase() + currentPokemon['types']['1']['type']['name'].slice(1);
        document.getElementById('pokemonType2').innerHTML = formattedType2;  
    }
}

function idAndSpecies() {
    let formattedId = currentPokemon['id'].toString().padStart(4, '0');
    document.getElementById('pokemonId').innerHTML = '#' + formattedId;

    document.getElementById('pokemonSpecies').innerHTML = currentPokemonSpecies['genera']['7']['genus'];
}

function description() {
    let description = currentPokemonSpecies['flavor_text_entries'][8]['flavor_text'];
    document.getElementById('pokemonDescription').innerHTML = description; 
}

function heightAndWeight() {
    let formattedWeight = (currentPokemon['weight'] / 10).toFixed(2);
    document.getElementById('pokemoneWeight').innerHTML = formattedWeight + ' kg';  
    
    let formattedHeight = (currentPokemon['height'] / 10).toFixed(2);
    document.getElementById('pokemonHeight').innerHTML = formattedHeight + ' m'; 
}

function signatureAbilities() {
    let formattedAability1 = currentPokemon['abilities']['0']['ability']['name'].charAt(0).toUpperCase() + currentPokemon['abilities']['0']['ability']['name'].slice(1);
    document.getElementById('pokemonAbilities').innerHTML += formattedAability1 + '<br>';

    if (currentPokemon['abilities']['1']) {
        let formattedAability2 = currentPokemon['abilities']['1']['ability']['name'].charAt(0).toUpperCase() + currentPokemon['abilities']['1']['ability']['name'].slice(1);
        document.getElementById('pokemonAbilities').innerHTML += formattedAability2;
    }
}

function eggGroupsAndHatchCounter() {
    let eggGroups = currentPokemonSpecies['egg_groups'];
    for (let i = 0; i < eggGroups.length; i++) {
        const formattedEggGroup = eggGroups[i]['name'].charAt(0).toUpperCase() + eggGroups[i]['name'].slice(1);
        document.getElementById('pokemonEggGroups').innerHTML += formattedEggGroup + '<br>';
    }

    document.getElementById('pokemonHatchCounter').innerHTML = currentPokemonSpecies['hatch_counter'] + ` steps`;
}
