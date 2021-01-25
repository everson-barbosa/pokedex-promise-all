let pokemonsData;
const qtdPokemons = 150;
const author = "Everson"

// Prrenche o elemento Pokedex com os pokemons da fetch
const fillPokedex = pokemons => {
    pokemonsData = pokemons
    pokedexEl = document.querySelector('[data-js="pokedex"]')
    pokemons.forEach(pokemon => {
        pokemonName = firstLetterUpper(pokemon.name);
        pokemonId = threeDigits(pokemon.id);

        stats = getStats(pokemon)

        card = document.createElement('div');
        card.classList.add('pokemon-card');
        card.classList.add(pokemon.types[0].type.name);
        card.setAttribute('name',pokemonName)
        card.innerHTML = 
        `
        <div class="inner-card">
                <div class="front">
                    <div class="art">
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iv/heartgold-soulsilver/${pokemon.id}.png" alt="${pokemonName}">
                    </div>
                    <span class="name">${pokemonName}</span>
                    <span class="number">${pokemonId}</span>
                    <div class="types">
                        ${getTypesEls(pokemon)}
                    </div>
                </div>
                <div class="back">
                    <span class="number">${pokemonId}</span>
                    <img src="https://www.serebii.net/pokedex-swsh/icon/${pokemonId}.png" alt="${pokemonName}" class="mini-sprite">
                    <div class="stats">
                        <div class="hp stat">
                            <span class="name">HP</span>
                            <div class="value">${stats.hp}</div>
                        </div>
                        <div class="attack stat">
                            <span class="name">Attack</span>
                            <div class="value">${stats.attack}</div>
                        </div>
                        <div class="defense stat">
                            <span class="name">Defense</span>
                            <div class="value">${stats.defense}</div>
                        </div>
                        <div class="special-attack stat">
                            <span class="name">S. Attack</span>
                            <div class="value">${stats.special_attack}</div>
                        </div>
                        <div class="special-defense stat">
                            <span class="name">S. Defense</span>
                            <div class="value">${stats.speacial_defense}</div>
                        </div>
                        <div class="speed stat">
                            <span class="name">Speed</span>
                            <div class="value">${stats.speed}</div>
                        </div>
                    </div>
                    <div class="created">
                        Criado por ${author}
                    </div>
                </div>
            </div>
        `
        pokedexEl.append(card);
    })
}

// Faz a primeira letra da string tornar em caixa alta, (ex: everson se torna Everson)
const firstLetterUpper = string => {
    if (typeof string !== 'string') return ''
    return string.charAt(0).toUpperCase() + string.slice(1)
}

// Faz um digito se tornar 3, (ex: 1 se torna 001)
const threeDigits = number => {
    if(typeof(number) != 'number') return ''
    return number > 99 ? number : number > 9 ? '0' + number : '00' + number
}

// Retorna os status do Pokemon em um objeto
const getStats = pokemon => {
    return {
    hp: pokemon.stats[0].base_stat,
    attack: pokemon.stats[1].base_stat,
    defense: pokemon.stats[2].base_stat,
    special_attack: pokemon.stats[3].base_stat,
    speacial_defense: pokemon.stats[4].base_stat,
    speed: pokemon.stats[5].base_stat
    }
}

// Retorna os elementos com as classes de acordo com tipo do pokemon
const getTypesEls = pokemon => {
    return pokemon.types.reduce((acc, item) => {
        return acc + `<span class='type ${item.type.name}'>${firstLetterUpper(item.type.name)}</span>`
    },'')
}

// Retorna todas as promises da API pokeapi em um vetor
const loadPromises = () => {
    promises = []
    for(i = 0; i < qtdPokemons; i++){
        promises.push(
            fetch(`https://pokeapi.co/api/v2/pokemon/${i+1}`)
                .then(response => response.json()))
    }
    return promises
}

// Execução de todas as requisições do vetor da função (loadPromises)
const loadPokemons = async () => {
    promises = await loadPromises()
    Promise.all(promises)
        .then(fillPokedex)
}

const loadAuthor = () => {
    el = document.querySelector('[data-js="author"]')
    el.innerHTML = `Criador por ${author}`
}


window.onload = () => {
    loadPokemons()
    loadAuthor()
}
