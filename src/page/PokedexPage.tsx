import { List, ListItem, Stack } from "@mui/material";
import PokedexListButton from "../component/PokedexListButton";
import PageContainer from "../component/PageContainer";
import usePokedex from "../hook/api/usePokedex";

import { useState } from "react";
import { PokedexItem } from "../type/pokedex";
import PokedexPreview from "../component/PokedexPreview";
import { useTranslation } from "react-i18next";

export default function PokedexPage() {
  const { t } = useTranslation();
  const pokedexItems = usePokedex();
  const [selectedPokedexItem, setSelectedPokedexItem] =
    useState<PokedexItem | null>(null);

  const onSelectPokedexItem = (pokedexItem: PokedexItem) => {
    setSelectedPokedexItem(pokedexItem);
  };

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
            width: 300,
            maxWidth: "100%",
            maxHeight: 400,
            overflow: "auto",
            background: "#FFFFFF",
            border: "1px solid gray",
            borderRadius: 2,
            padding: 2,
          }}
        >
          {pokedexItems.map((pokedexItem) => (
            <ListItem
              sx={{ width: "100%" }}
              disablePadding
              key={pokedexItem.id}
              onClick={() => onSelectPokedexItem(pokedexItem)}
            >
              <PokedexListButton
                number={pokedexItem.id}
                name={t(`pokemon-name.${pokedexItem.id}`)}
                hasFound={pokedexItem.isFound}
              />
            </ListItem>
          ))}
        </List>
      </Stack>
    </PageContainer>
  );
}
