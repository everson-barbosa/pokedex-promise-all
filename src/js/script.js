const basePath = 'https://pokeapi.co/api/v2/pokemon'
const imgPath = 'https://img.pokemondb.net/sprites/black-white/anim/normal'
const pokemonIds = [ 503, 589, 617, 628, 626, 612 ]

const renderPokemons = (pokemonsData) => {
    const elementToAppend = document.querySelector('[data-js="team"]')

    console.log({pokemonsData})

    elementToAppend.innerHTML = 
        pokemonsData.reduce((acc, pokemonData) => 
            acc + `<div class="card">
                    <img src="${imgPath}/${pokemonData.name}.gif" alt="${pokemonData.name}" class="sprite" />
                   </div>`, '')
}

const getAllPromises = (pokemonIds) => 
    pokemonIds.map(pokemonId => 
        fetch(`${basePath}/${pokemonId}`).then(response => 
            response.json()))

const loadAllPromises = async () => {
    const promises = getAllPromises(pokemonIds)
    Promise.all(promises).then(response => {
        renderPokemons(response)
    })
}

loadAllPromises(pokemonIds)