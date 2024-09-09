import { Box, Grid, Stack, Typography } from "@mui/material";
import PokemonSlot from "../component/PokemonSlot";
import PageContainer from "../component/PageContainer";
import usePokemons from "../hook/api/usePokemons";
import { useEffect, useState } from "react";
import { Pokemon } from "../type/pokemon";
import PokemonAnimatedSprite from "../component/PokemonAnimatedSprite";
import { pokemonNames } from "../constant/pokemon";

export default function PokemonPage() {
  const { pokemons } = usePokemons();
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    setSelectedPokemon(pokemons[0]);
  }, [pokemons]);

  if (!selectedPokemon) {
    return <></>;
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
          // width={{ xs: "100%", sm: 700 }}
          direction={{ xs: "row", sm: "row" }}
          gap={{ xs: 2, sm: 10 }}
          alignItems="center"
        >
          <Box
            sx={{
              background: "#56AEFF",
              borderRadius: 2,
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
          <Stack justifyContent="center" width={{ xs: 200, sm: 300 }}>
            <Typography fontSize={{ xs: 12, sm: 18 }}>
              Id: {selectedPokemon.id}
            </Typography>
            <Typography fontSize={{ xs: 12, sm: 18 }}>
              Name: {pokemonNames[selectedPokemon.id]}
            </Typography>
            <Typography fontSize={{ xs: 12, sm: 18 }}>
              Level: {selectedPokemon.level}
            </Typography>
            {selectedPokemon.gender ? (
              <Typography fontSize={{ xs: 12, sm: 18 }}>
                Gender: {selectedPokemon.gender}
              </Typography>
            ) : (
              <></>
            )}
          </Stack>
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
