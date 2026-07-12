/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import { Skeleton } from "@mui/material";
import { getPokemonSpriteUrl } from "../util/sprite";
import PixelatedImage from "./PixelatedImage";
import { Pokemon } from "../type/pokemon";
import { useTranslation } from "react-i18next";
import useImagePreload from "../hook/useImagePreload";

interface PokemonAnimatedSpriteProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  pokemon: Pokemon;
  facing: "front" | "left" | "right" | "down";
}

const pokemonAnimatedSpriteStyling = (
  firstImage: string,
  secondImage: string
) => {
  const animatedSprite = keyframes({
    "0%": {
      content: `url(${firstImage})`,
    },
    "50%": {
      content: `url(${secondImage})`,
    },
  });

  return css({
    content: `url(${firstImage})`,
    animation: `0.5s linear infinite ${animatedSprite}`,
  });
};

export default function PokemonAnimatedSprite({
  pokemon,
  facing,
  ...attributes
}: PokemonAnimatedSpriteProps) {
  const { t } = useTranslation();

  const firstImage = getPokemonSpriteUrl(
    pokemon.id,
    facing,
    pokemon.isShiny,
    1,
    pokemon.gender,
    pokemon.form
  );
  const secondImage = getPokemonSpriteUrl(
    pokemon.id,
    facing,
    pokemon.isShiny,
    2,
    pokemon.gender,
    pokemon.form
  );
  const loaded = useImagePreload(firstImage, secondImage);

  if (!loaded) {
    return (
      <Skeleton
        variant="rectangular"
        sx={{
          width: "100%",
          height: attributes.height ?? "auto",
          aspectRatio: attributes.height ? undefined : "1 / 1",
          borderRadius: 2,
        }}
      />
    );
  }

  return (
    <PixelatedImage
      css={pokemonAnimatedSpriteStyling(firstImage, secondImage)}
      alt={t(`pokemon-name.${pokemon.id}`) + "'s sprite"}
      {...attributes}
    />
  );
}
