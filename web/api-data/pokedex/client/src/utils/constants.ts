export const pokemonAPI = "https://pokeapi.co/api/v2";
export const pokemonsRoute = `${pokemonAPI}/pokemon?limit=20`;
export const pokemonRoute = `${pokemonAPI}/pokemon`;
export const pokemonSpeciesRoute = `${pokemonAPI}/pokemon-species`;

export const pokemonTabs = {
  description: "description",
  evolution: "evolution",
  locations: "locations",
  moves: "moves",
};

export const routes = [
  {
    name: pokemonTabs.description,
    value: 'Description',
  },
  {
    name: pokemonTabs.evolution,
    value: 'Evolution',
  },
  {
    name: pokemonTabs.locations,
    value: 'Catching',
  },
  {
    name: pokemonTabs.moves,
    value: 'Capable Moves',
  },
];

export const navigationRoutes = [
  { name: 'Home', route: '/' },
  { name: 'Compare', route: '/compare' },
  { name: 'Profile', route: '/profile' },
];
