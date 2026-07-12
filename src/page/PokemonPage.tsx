import { Box, Grid, Stack } from "@mui/material";
import PokemonSlot from "../component/PokemonSlot";
import PageContainer from "../component/PageContainer";
import usePokemons from "../hook/api/usePokemons";
import { useEffect, useState } from "react";
import { Pokemon } from "../type/pokemon";
import PokemonAnimatedSprite from "../component/PokemonAnimatedSprite";
import PokemonDetail from "../component/PokemonDetail";
import { pokemonBackgroundColors } from "../constant/pokemon";
import Loader from "../component/Loader";
import ErrorState from "../component/ErrorState";
import EmptyState from "../component/EmptyState";
import { useTranslation } from "react-i18next";

export default function PokemonPage() {
  const { t } = useTranslation();
  const { pokemons, loading, error, fetchPokemons } = usePokemons();
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    if (pokemons && pokemons.length > 0) setSelectedPokemon(pokemons[0]);
  }, [pokemons]);

  if (loading) {
    return (
      <PageContainer backgroundTheme="small">
        <Loader />
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer backgroundTheme="small">
        <ErrorState onRetry={fetchPokemons} />
      </PageContainer>
    );
  }

  if (!pokemons || pokemons.length === 0) {
    return (
      <PageContainer backgroundTheme="small">
        <EmptyState message={t("empty.no-pokemon")} />
      </PageContainer>
    );
  }

  if (!selectedPokemon) {
    return (
      <PageContainer backgroundTheme="small">
        <Loader />
      </PageContainer>
    );
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
              background: pokemonBackgroundColors[selectedPokemon.id],
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
            <Grid
              key={pokemon.internalId}
              item
              xs={3}
              sm={1.5}
              height="fit-content"
            >
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
