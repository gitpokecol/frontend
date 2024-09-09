import { useEffect, useState } from "react";
import { Pokemon } from "../../type/pokemon";
import { getPokemons } from "../../api/apis";

export default function usePokemons() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  const fetchPokemons = async () => {
    const res = await getPokemons();
    const pokemons_ = res.pokemons.map((poke) => ({
      internalId: poke.id,
      id: poke.pokemon_type,
      level: poke.level,
      isShiny: poke.is_shiny,
      form: poke.form,
      gender: poke.gender,
    }));

    setPokemons(pokemons_);
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  return { pokemons, fetchPokemons };
}
