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
import { PIXEL_INK, pixelCard } from "../style/pixel";

const BOX_ROWS = 5;

const BOX_THEMES = [
  { header: "#BFD3EE", wallpaper: ["#EAF2FC", "#DFEAF8"] },
  { header: "#BFE3C0", wallpaper: ["#EAF8EB", "#DFF0E0"] },
  { header: "#F2CFAF", wallpaper: ["#FCF2E6", "#F8EAD8"] },
  { header: "#D8C6EE", wallpaper: ["#F2EAFC", "#EAE0F8"] },
  { header: "#F2C0CE", wallpaper: ["#FCEAF0", "#F8DEE8"] },
  { header: "#B8E0DC", wallpaper: ["#E8F8F6", "#DCF0ED"] },
  { header: "#E8D9A8", wallpaper: ["#FAF4DE", "#F4ECCC"] },
  { header: "#F0BFBF", wallpaper: ["#FCEAEA", "#F8DEDE"] },
];

const wallpaperStyle = (colors: string[]) => ({
  backgroundImage: `conic-gradient(${colors[0]} 90deg, ${colors[1]} 90deg 180deg, ${colors[0]} 180deg 270deg, ${colors[1]} 270deg)`,
  backgroundSize: "24px 24px",
});

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

  const theme_ = BOX_THEMES[currentBox % BOX_THEMES.length];

  return (
    <Stack sx={pixelCard} width={560} maxWidth="100%">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          background: theme_.header,
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
          ...wallpaperStyle(theme_.wallpaper),
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
