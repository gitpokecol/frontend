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
import { pixelFrame } from "../style/pixel";

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
            direction={{ xs: "row", sm: "row" }}
            gap={{ xs: 2, sm: 5 }}
            alignItems="center"
          >
            <Skeleton
              variant="rectangular"
              sx={{
                width: { xs: 100, sm: 200 },
                height: { xs: 100, sm: 200 },
                borderRadius: 2,
              }}
            />
            <Stack width={{ xs: 150, sm: 300 }} gap={1}>
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} sx={{ fontSize: { xs: 20, sm: 30 } }} />
              ))}
            </Stack>
          </Stack>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(6, 1fr)",
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
          direction={{ xs: "row", sm: "row" }}
          gap={{ xs: 2, sm: 5 }}
          alignItems="center"
        >
          <Box
            sx={{
              ...pixelFrame,
              background: pokemonBackgroundColors[selectedPokemon.id],
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

        <PokemonBox
          pokemons={pokemons}
          selectedId={selectedPokemon.internalId}
          onSelect={setSelectedPokemon}
        />
      </Stack>
    </PageContainer>
  );
}
