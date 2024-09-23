import { Box, Grid, Stack } from "@mui/material";
import PokemonSlot from "../component/PokemonSlot";
import PageContainer from "../component/PageContainer";
import usePokemons from "../hook/api/usePokemons";
import { useEffect, useState } from "react";
import { Pokemon } from "../type/pokemon";
import PokemonAnimatedSprite from "../component/PokemonAnimatedSprite";
import PokemonDetail from "../component/PokemonDetail";

export default function PokemonPage() {
  const { pokemons } = usePokemons();
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    if (pokemons) setSelectedPokemon(pokemons[0]);
  }, [pokemons]);

  if (!pokemons || !selectedPokemon) {
    return <PageContainer backgroundTheme="small"></PageContainer>;
  }

  return (
    <PageContainer backgroundTheme="small">
      <Stack
        height="100%"
        alignItems="center"
        gap={10}
        justifyContent="stretch"
      >
        <Stack
          direction={{ xs: "row", sm: "row" }}
          gap={{ xs: 2, sm: 10 }}
          alignItems="center"
        >
          <Box
            sx={{
              background: "white",
              border: "1px solid gray",
              borderRadius: 2,
              padding: 1,
            }}
            width={{ xs: 100, sm: 200 }}
            height={{ xs: 100, sm: 200 }}
          >
            <PokemonAnimatedSprite
              style={{
                minWidth: "100%",
              }}
              height="100%"
              pokemon={selectedPokemon}
              facing="front"
            />
          </Box>
          <PokemonDetail pokemon={selectedPokemon} />
        </Stack>

        <Grid
          container
          alignContent="flex-start"
          spacing={2}
          width={700}
          maxWidth="100%"
          overflow="auto"
          height={0}
          flexGrow={1}
        >
          {pokemons.map((pokemon) => (
            <Grid key={pokemon.id} item xs={3} sm={1.5} height="fit-content">
              <PokemonSlot
                pokemon={pokemon}
                onSelect={() => setSelectedPokemon(pokemon)}
              />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </PageContainer>
  );
}
