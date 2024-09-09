export interface GithubAuthCallbackResponse {
  access_token: string;
}

export interface DailyItemResponse {
  type: number;
  can_abtain: boolean;
}

export interface BagItemsResponse {
  items: { item_type: number; count: number }[];
}

export interface UseItemResponse {
  is_used: boolean;
}

export interface PokemomsResponse {
  pokemons: {
    id: number;
    level: number;
    is_shiny: boolean;
    pokemon_type: number;
    gender: "female" | "male" | "genderless";
    form?: string;
  }[];
}

export interface PokedexResponse {
  items: {
    pokemon_type: number;
  }[];
}
