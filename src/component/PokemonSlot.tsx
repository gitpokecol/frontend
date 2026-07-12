import { Box, Typography } from "@mui/material";
import PokemonAnimatedSprite from "./PokemonAnimatedSprite";
import { Pokemon } from "../type/pokemon";
import { forwardRef, useImperativeHandle, useState } from "react";
import { horizontalShakeAnimation } from "../style/shake";
import { PIXEL_ACCENT_COLOR, PIXEL_BORDER_COLOR } from "../style/pixel";

interface PokemonSlotProps {
  pokemon: Pokemon;
  onSelect: () => void;
}

const pokemonSlotStyling = (isShaking: boolean) => {
  const style = {
    borderRadius: 2,
    background: "#F5F5F5CA",
    border: "2px solid rgba(43, 43, 43, 0.25)",
    ":hover": {
      background: "#56AEFFCA",
      borderColor: PIXEL_ACCENT_COLOR,
    },
  };

  if (isShaking) {
    return {
      ...style,
      background: "#ef5350",
      borderColor: PIXEL_BORDER_COLOR,
      ":hover": {
        background: "#ef5350",
        borderColor: PIXEL_BORDER_COLOR,
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
