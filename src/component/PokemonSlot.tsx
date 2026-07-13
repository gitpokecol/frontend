import { Box, Typography } from "@mui/material";
import PokemonAnimatedSprite from "./PokemonAnimatedSprite";
import { Pokemon } from "../type/pokemon";
import { forwardRef, useImperativeHandle, useState } from "react";
import { horizontalShakeAnimation } from "../style/shake";
import { PIXEL_ACCENT, PIXEL_INK } from "../style/pixel";

interface PokemonSlotProps {
  pokemon: Pokemon;
  onSelect: () => void;
  selected?: boolean;
}

const pokemonSlotStyling = (isShaking: boolean, selected: boolean) => {
  const style = {
    borderRadius: 0,
    background: selected ? "#D6E9FFCA" : "#F5F5F5CA",
    border: selected
      ? `2px solid ${PIXEL_ACCENT}`
      : "2px solid rgba(51, 50, 60, 0.25)",
    ":hover": {
      background: "#56AEFFCA",
      borderColor: PIXEL_ACCENT,
    },
  };

  if (isShaking) {
    return {
      ...style,
      background: "#ef5350",
      borderColor: PIXEL_INK,
      ":hover": {
        background: "#ef5350",
        borderColor: PIXEL_INK,
      },
      animation: `${horizontalShakeAnimation} 100ms ease-in-out 2`,
    };
  }
  return style;
};

const PokemonSlot = forwardRef(
  ({ pokemon, onSelect, selected = false }: PokemonSlotProps, ref) => {
    const [isShaking, setIsShaking] = useState<boolean>(false);

    useImperativeHandle(ref, () => ({
      triggerFailed() {
        setIsShaking(true);
        setTimeout(() => {
          setIsShaking(false);
        }, 1000);
      },
    }));

    return (
      <Box position="relative" sx={pokemonSlotStyling(isShaking, selected)}>
        <Typography
          textAlign="center"
          position="absolute"
          width="100%"
          marginTop={-1}
          fontSize={20}
        >
          Lv {pokemon.level}
        </Typography>
        <PokemonAnimatedSprite
          onClick={onSelect}
          pokemon={pokemon}
          facing="down"
          style={{ minWidth: "100%" }}
        />
      </Box>
    );
  }
);

export default PokemonSlot;
