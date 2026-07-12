import { useEffect, useState } from "react";
import { getPokedex } from "../../api/apis";
import { PokedexItem } from "../../type/pokedex";
import { pokemonIds } from "../../constant/pokemon";

export default function usePokedex() {
  const [pokedexItems, setPokedexItems] = useState<PokedexItem[]>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchPokedex = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await getPokedex();
      const pokedexItems_ = Object.values(pokemonIds).map((id) => ({
        id,
        isFound: false,
      }));

      res.items.forEach((item) => {
        pokedexItems_[item.pokemon_type - 1].isFound = true;
      });

      setPokedexItems(pokedexItems_);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokedex();
  }, []);

  return { pokedexItems, fetchPokedex, loading, error };
}
