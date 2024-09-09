/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import { getPokemonSpriteUrl } from "../util/sprite";
import { pokemonNames } from "../constant/pokemon";
import PixelatedImage from "./PixelatedImage";
import { Pokemon } from "../type/pokemon";

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
  return (
    <>
      <PixelatedImage
        css={pokemonAnimatedSpriteStyling(
          getPokemonSpriteUrl(
            pokemon.id,
            facing,
            pokemon.isShiny,
            1,
            pokemon.gender,
            pokemon.form
          ),
          getPokemonSpriteUrl(
            pokemon.id,
            facing,
            pokemon.isShiny,
            2,
            pokemon.gender,
            pokemon.form
          )
        )}
        alt={pokemonNames[pokemon.id] + "'s sprite"}
        {...attributes}
      />
    </>
  );
}
