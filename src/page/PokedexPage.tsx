import { List, ListItem, Skeleton, Stack } from "@mui/material";
import PokedexListButton from "../component/PokedexListButton";
import PageContainer from "../component/PageContainer";
import usePokedex from "../hook/api/usePokedex";

import { useState } from "react";
import { PokedexItem } from "../type/pokedex";
import PokedexPreview from "../component/PokedexPreview";
import { useTranslation } from "react-i18next";
import ErrorState from "../component/ErrorState";
import SquareSkeleton from "../component/SquareSkeleton";
import { pixelCard } from "../style/pixel";

export default function PokedexPage() {
  const { t } = useTranslation();
  const { pokedexItems, fetchPokedex, loading, error } = usePokedex();
  const [selectedPokedexItem, setSelectedPokedexItem] =
    useState<PokedexItem | null>(null);

  const onSelectPokedexItem = (pokedexItem: PokedexItem) => {
    setSelectedPokedexItem(pokedexItem);
  };

  if (loading) {
    return (
      <PageContainer backgroundTheme="small">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="center"
          alignItems="center"
          height="100%"
          maxWidth="100%"
          spacing={{ xs: 1, sm: 2, md: 4 }}
          paddingTop={{ sm: 2, md: 0 }}
          paddingLeft={2}
          paddingRight={2}
          aria-busy="true"
        >
          <Stack width={300} maxWidth="100%" gap={1}>
            <Skeleton sx={{ fontSize: 30, width: "60%", marginX: "auto" }} />
            <SquareSkeleton />
          </Stack>
          <Stack
            width={300}
            maxWidth="100%"
            maxHeight={400}
            gap={2}
            sx={{ ...pixelCard, padding: 2 }}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <Stack key={i} direction="row" gap={2} alignItems="center">
                <Skeleton variant="circular" width={28} height={28} />
                <Skeleton sx={{ fontSize: 20, flexGrow: 1 }} />
              </Stack>
            ))}
          </Stack>
        </Stack>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer backgroundTheme="small">
        <ErrorState onRetry={fetchPokedex} />
      </PageContainer>
    );
  }

  if (!pokedexItems) {
    return <PageContainer backgroundTheme="small"></PageContainer>;
  }

  return (
    <PageContainer backgroundTheme="small">
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="center"
        alignItems="center"
        height="100%"
        maxWidth="100%"
        spacing={{ xs: 1, sm: 2, md: 4 }}
        paddingTop={{ sm: 2, md: 0 }}
        paddingLeft={2}
        paddingRight={2}
      >
        <PokedexPreview pokedexItem={selectedPokedexItem} />
        <List
          sx={{
            ...pixelCard,
            width: 300,
            maxWidth: "100%",
            maxHeight: 400,
            overflow: "auto",
            padding: 2,
          }}
        >
          {pokedexItems.map((pokedexItem) => (
            <ListItem sx={{ width: "100%" }} disablePadding key={pokedexItem.id}>
              <PokedexListButton
                number={pokedexItem.id}
                name={t(`pokemon-name.${pokedexItem.id}`)}
                hasFound={pokedexItem.isFound}
                onClick={() => onSelectPokedexItem(pokedexItem)}
              />
            </ListItem>
          ))}
        </List>
      </Stack>
    </PageContainer>
  );
}
