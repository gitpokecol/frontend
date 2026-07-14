import { Box, Skeleton, Stack } from "@mui/material";
import PageContainer from "../component/PageContainer";
import usePokemons from "../hook/api/usePokemons";
import { useEffect, useState } from "react";
import { Pokemon } from "../type/pokemon";
import PokemonAnimatedSprite from "../component/PokemonAnimatedSprite";
import PokemonDetail from "../component/PokemonDetail";
import PokemonBox from "../component/PokemonBox";
import { pokemonBackgroundColors } from "../constant/pokemon";
import ErrorState from "../component/ErrorState";
import EmptyState from "../component/EmptyState";
import SquareSkeleton from "../component/SquareSkeleton";
import { useTranslation } from "react-i18next";
import { pixelFramed } from "../style/pixel";

export default function PokemonPage() {
  const { t } = useTranslation();
  const { pokemons, loading, error, fetchPokemons } = usePokemons();
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    if (pokemons && pokemons.length > 0) setSelectedPokemon(pokemons[0]);
  }, [pokemons]);

  if (loading || (pokemons && pokemons.length > 0 && !selectedPokemon)) {
    return (
      <PageContainer backgroundTheme="small">
        <Stack
          height="100%"
          alignItems="center"
          gap={5}
          justifyContent="stretch"
          aria-busy="true"
        >
          <Stack
            direction="row"
            gap={2}
            alignItems="stretch"
            width={560}
            maxWidth="100%"
          >
            <Skeleton
              variant="rectangular"
              sx={{
                width: { xs: 130, sm: 200 },
                height: { xs: 180, sm: 230 },
                flexShrink: 0,
              }}
            />
            <Stack flexGrow={1} gap={1} justifyContent="center">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} sx={{ fontSize: { xs: 20, sm: 30 } }} />
              ))}
            </Stack>
          </Stack>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(4, minmax(0, 1fr))",
                sm: "repeat(6, minmax(0, 1fr))",
              },
              gap: 1,
            }}
            width={560}
            maxWidth="100%"
          >
            {Array.from({ length: 30 }).map((_, i) => (
              <SquareSkeleton key={i} />
            ))}
          </Box>
        </Stack>
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
    return <PageContainer backgroundTheme="small"></PageContainer>;
  }

  return (
    <PageContainer backgroundTheme="small">
      <Stack
        height="100%"
        alignItems="center"
        gap={5}
        justifyContent="stretch"
      >
        <Stack
          direction="row"
          gap={2}
          alignItems="stretch"
          width={560}
          maxWidth="100%"
        >
          <Box
            sx={{
              ...pixelFramed(pokemonBackgroundColors[selectedPokemon.id]),
              padding: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            width={{ xs: 130, sm: 200 }}
            flexShrink={0}
          >
            <PokemonAnimatedSprite
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
              pokemon={selectedPokemon}
              facing="front"
            />
          </Box>
          <PokemonDetail pokemon={selectedPokemon} />
        </Stack>

        <PokemonBox
          pokemons={pokemons}
          selectedId={selectedPokemon.internalId}
          onSelect={setSelectedPokemon}
        />
      </Stack>
    </PageContainer>
  );
}
