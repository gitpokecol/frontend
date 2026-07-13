import { Box, Typography } from "@mui/material";
import PokemonAnimatedSprite from "./PokemonAnimatedSprite";
import { Pokemon } from "../type/pokemon";
import { forwardRef, useImperativeHandle, useState } from "react";
import { horizontalShakeAnimation } from "../style/shake";
import { PIXEL_ACCENT, PIXEL_INK } from "../style/pixel";

interface PokemonSlotProps {
  pokemon: Pokemon;
  onSelect: () => void;
}

const pokemonSlotStyling = (isShaking: boolean) => {
  const style = {
    borderRadius: 0,
    background: "#F5F5F5CA",
    border: "2px solid rgba(51, 50, 60, 0.25)",
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
  ({ pokemon, onSelect }: PokemonSlotProps, ref) => {
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
      <Box position="relative" sx={pokemonSlotStyling(isShaking)}>
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
