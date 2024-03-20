let currentPokemon;
let currentPokemonSpecies;
let currentEvolutionChain;

async function init() {
    await loadPokemon();
    await loadPokemonSpecies();
    await loadPokemonEvolutionChain();
    renderPokemon();
}

async function loadPokemon() {
    let url = 'https://pokeapi.co/api/v2/pokemon/4';
    let response = await fetch(url);
    currentPokemon = await response.json();
    console.log('loadet pokemon', currentPokemon);
}

async function loadPokemonSpecies() {
    let url = 'https://pokeapi.co/api/v2/pokemon-species/4';
    let response = await fetch(url);
    currentPokemonSpecies = await response.json();
    console.log('loadet pokemon species', currentPokemonSpecies);
}

async function loadPokemonEvolutionChain() {
    let url = currentPokemonSpecies['evolution_chain']['url'];
    let response = await fetch(url);
    currentEvolutionChain = await response.json();
    console.log('loadet pokemon evolution chain' , currentEvolutionChain);
}

function renderPokemon() {
    nameAndImg();
    types();
    idAndSpecies();
    pokedexBgrColor();
    renderPokemonAboutContainer();
}

function renderPokemonAboutContainer() {
    description();
    heightAndWeight();
    signatureAbilities();
    eggGroupsAndHatchCounter();

    evolutionChain();
}

function renderPokemonBaseStatsContainer() {
    beseStats();
}

function renderPokemonEvolutionChainContainer() {
    evolutionChain();
}

function renderPokemonMovesContainer() {

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
    let formattedWeight = (currentPokemon['weight'] / 10).toFixed(1);
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

function beseStats() {
    let baseStats = currentPokemon['stats']; //load base stats
    let baseStatIds = ['baseHp', 'baseAtk', 'baseDef', 'baseSpeed', 'baseSpAtk', 'baseSpDef'];
    let totalBaseStats = 0;
    for (let i = 0; i < baseStats.length; i++) {
        const baseStat = baseStats[i]['base_stat'];
        const baseStatId = baseStatIds[i];
        totalBaseStats += baseStat;
        document.getElementById(baseStatId).innerHTML = baseStat; 
    }
    document.getElementById('totalBaseStats').innerHTML = totalBaseStats;
}

function evolutionChain() {
    let pokemonNameStage1 = currentEvolutionChain['chain']['species']['name'];
    let pokemonNameStage2 = currentEvolutionChain['chain']['evolves_to'][0]['species']['name'];
    let pokemonNameStage3 = currentEvolutionChain['chain']['evolves_to'][0]['evolves_to'][0]['species']['name'];

    let pokemonLvlforStage2 = currentEvolutionChain['chain']['evolves_to'][0]['evolution_details'][0]['min_level'];
    let pokemonLvlforStage3 = currentEvolutionChain['chain']['evolves_to'][0]['evolves_to'][0]['evolution_details'][0]['min_level'];
    console.log(pokemonNameStage1,pokemonNameStage2,pokemonNameStage3);
    console.log('stage 2 at lvl ' + pokemonLvlforStage2)
    console.log('stage 3 at lvl ' + pokemonLvlforStage3)
}

function pokemonInfoNav(buttonId) {
    let buttons = document.querySelectorAll('.info-nav-btn');
    buttons.forEach(function(button, index) {
        if (button.id === buttonId) {
            button.classList.add('clicked-info-nav-btn');
            selectSection(index);
        } else {
            button.classList.remove('clicked-info-nav-btn');
        }
    });
    document.getElementById('pokemonAboutBtn').classList.remove('pokemon-about-btn');
}

function selectSection(buttonIndex) {
    let sections = document.querySelectorAll('.info-container-bottom section');

    sections.forEach(function(section, index) {
    if (index === buttonIndex) {
            section.classList.remove('d-none');
        } else {
            section.classList.add('d-none');
        }
    });
}