const API_HOST = process.env.REACT_APP_API_HOST;

export const API_ENDPOINTS = {
  GITHUB_AUTH: `${API_HOST}/api/oauth/authorize-github`,
  GITHUB_AUTH_CALLBACK: (code: string) =>
    `${API_HOST}/api/oauth/callback-github?code=${code}`,
  DAILY_ITEM: `${API_HOST}/api/item/daily`,
  DAILY_ITEM_ABTAIN: (getSubstitute: boolean) =>
    `${API_HOST}/api/item/daily/abtain?get-substitute=${getSubstitute}`,
  BAG_ITEMS: `${API_HOST}/api/item/bag-items`,
  POKEMONS: `${API_HOST}/api/pokemons`,
  POKEDEX: `${API_HOST}/api/pokedex`,
  USE_ITEM: (internalPokemonId: number, itemType: number) =>
    `${API_HOST}/api/pokemon/${internalPokemonId}/use-item?item-type=${itemType}`,
};
