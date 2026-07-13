import {
  Box,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pokemon } from "../type/pokemon";
import PokemonSlot from "./PokemonSlot";
import { PIXEL_FRAME_LINE, PIXEL_INK, pixelCard } from "../style/pixel";

const BOX_ROWS = 5;

const wallpaperStyle = {
  backgroundImage: `conic-gradient(#EAF2FC 90deg, #DFEAF8 90deg 180deg, #EAF2FC 180deg 270deg, #DFEAF8 270deg)`,
  backgroundSize: "24px 24px",
};

interface PokemonBoxProps {
  pokemons: Pokemon[];
  selectedId?: number;
  onSelect: (pokemon: Pokemon) => void;
}

export default function PokemonBox({
  pokemons,
  selectedId,
  onSelect,
}: PokemonBoxProps) {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [boxIndex, setBoxIndex] = useState<number>(0);

  const boxColumns = isMobile ? 4 : 6;
  const boxSize = boxColumns * BOX_ROWS;
  const boxCount = Math.max(1, Math.ceil(pokemons.length / boxSize));
  const currentBox = Math.min(boxIndex, boxCount - 1);
  const boxPokemons = pokemons.slice(
    currentBox * boxSize,
    (currentBox + 1) * boxSize
  );

  const goPrevBox = () => {
    setBoxIndex((currentBox - 1 + boxCount) % boxCount);
  };

  const goNextBox = () => {
    setBoxIndex((currentBox + 1) % boxCount);
  };

  return (
    <Stack sx={pixelCard} width={560} maxWidth="100%">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          background: PIXEL_FRAME_LINE,
          borderBottom: `2px solid ${PIXEL_INK}`,
        }}
        paddingX={0.5}
      >
        <IconButton
          aria-label="previous box"
          onClick={goPrevBox}
          disabled={boxCount === 1}
        >
          <ChevronLeftIcon />
        </IconButton>
        <Typography fontSize={{ xs: 20, sm: 25 }}>
          {t("pokemon-box.title", { n: currentBox + 1 })}
        </Typography>
        <IconButton
          aria-label="next box"
          onClick={goNextBox}
          disabled={boxCount === 1}
        >
          <ChevronRightIcon />
        </IconButton>
      </Stack>
      <Box
        sx={{
          ...wallpaperStyle,
          display: "grid",
          gridTemplateColumns: `repeat(${boxColumns}, minmax(0, 1fr))`,
          gap: 1,
          padding: 1.5,
        }}
      >
        {Array.from({ length: boxSize }).map((_, i) => {
          const pokemon = boxPokemons[i];

          if (!pokemon) {
            return (
              <Box
                key={`empty-${i}`}
                sx={{
                  aspectRatio: "1 / 1",
                  background: "rgba(51, 50, 60, 0.07)",
                  border: "2px solid rgba(51, 50, 60, 0.12)",
                }}
              />
            );
          }

          return (
            <PokemonSlot
              key={pokemon.internalId}
              pokemon={pokemon}
              selected={pokemon.internalId === selectedId}
              onSelect={() => onSelect(pokemon)}
            />
          );
        })}
      </Box>
    </Stack>
  );
}
