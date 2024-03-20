let typeColors = {
    normal: 'rgb(196, 152, 108)',
    fire: 'rgb(251, 108, 108)',
    water: 'rgb(108, 160, 251)',
    electric: 'rgb(251, 234, 108)',
    grass: 'rgb(108, 251, 152)',
    ice: 'rgb(108, 239, 251)',
    fighting: 'rgb(196, 176, 108)',
    poison: 'rgb(180, 108, 251)',
    ground: 'rgb(196, 176, 152)',
    flying: 'rgb(152, 214, 251)',
    psychic: 'rgb(251, 152, 239)',
    bug: 'rgb(152, 251, 108)',
    rock: 'rgb(196, 152, 108)',
    ghost: 'rgb(152, 108, 251)',
    dragon: 'rgb(176, 152, 251)',
    dark: 'rgb(108, 132, 151)',
    steel: 'rgb(196, 206, 214)',
    fairy: 'rgb(251, 152, 182)'
};

function pokedexBgrColor() {
    let primaryType = currentPokemon['types'][0]['type']['name'];
    let secondaryType = currentPokemon['types'][1] ? currentPokemon['types'][1]['type']['name'] : null;

    let divToBeColored = document.getElementById('pokedexBgr');
    
    let color1 = typeColors[primaryType];
    let color2 = secondaryType ? typeColors[secondaryType] : color1;

    divToBeColored.style.background = `linear-gradient(to right, ${color1} 35%, ${color2} 65%)`;
    pokemonType1.style.background = `${color1}`
    pokemonType2.style.background = `${color2}`
}
