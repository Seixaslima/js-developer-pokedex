const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail, full) {
  const pokemon = full ? new FullPokemon() : new Pokemon();

  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;

  const types = pokeDetail.types.map(typeSlot => typeSlot.type.name);
  const [type] = types;

  pokemon.types = types;
  pokemon.type = type;

  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

  if (full) {
    pokemon.species = pokeDetail.species.name;
    pokemon.height = pokeDetail.height;
    pokemon.weight = pokeDetail.weight;
    pokemon.abilities = pokeDetail.abilities.map(
      pokeAbility => pokeAbility.ability.name
    );
  }

  return pokemon;
}

pokeApi.getPokemonDetail = (pokemon, full = false) => {
  return fetch(pokemon.url)
    .then(response => response.json())
    .then(pokemonDetail => convertPokeApiDetailToPokemon(pokemonDetail, full));
};

pokeApi.getPokemons = (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return fetch(url)
    .then(response => response.json())
    .then(jsonBody => jsonBody.results)
    .then(pokemons => pokemons.map(pokeApi.getPokemonDetail))
    .then(detailRequests => Promise.all(detailRequests))
    .then(pokemonsDetails => pokemonsDetails);
};

pokeApi.getPokemonData = pokemonName => {
  const pokemon = {
    name: pokemonName,
    url: `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
  };
  return pokeApi.getPokemonDetail(pokemon, true);
};
