import { useEffect, useState } from "react";
import { getPokedex } from "../../api/apis";
import { PokedexItem } from "../../type/pokedex";
import { pokemonIds } from "../../constant/pokemon";

export default function usePokedex(): PokedexItem[] {
  const [pokedexItems, setPokedexItems] = useState<PokedexItem[]>([]);

  useEffect(() => {
    getPokedex().then((res) => {
      const pokedexItems_ = Object.values(pokemonIds).map((id) => ({
        id,
        isFound: false,
      }));

      res.items.forEach((item) => {
        pokedexItems_[item.pokemon_type - 1].isFound = true;
      });

      setPokedexItems(pokedexItems_);
    });
  }, []);

  return pokedexItems;
}
