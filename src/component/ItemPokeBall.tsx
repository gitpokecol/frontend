/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ReactComponent as ItemPokeball } from "../asset/pokeball-item.svg";
import { getItemSpriteUrl } from "../util/sprite";

const ItemImageStyling = (isSelectSecond: boolean) =>
  css({
    imageRendering: "pixelated",
    transition: "all 0.3s",
    transformOrigin: "50% 50%",
    transform: `scaleX(${isSelectSecond ? -1 : 1}) rotateY(${
      isSelectSecond ? "180deg" : "0deg"
    })`,
  });

interface ItemPokeballProps extends React.SVGProps<SVGSVGElement> {
  itemType: number;
  secondItemType: number;
  isSelectSecond: boolean;
}

export default function ItemPokeBall({
  itemType,
  secondItemType,
  isSelectSecond,
  ...attributes
}: ItemPokeballProps) {
  return (
    <svg viewBox="0 0 347 451" {...attributes}>
      <ItemPokeball />
      <svg x="114" y="156" width="120">
        <image
          css={ItemImageStyling(isSelectSecond)}
          width="100%"
          href={getItemSpriteUrl(isSelectSecond ? secondItemType : itemType)}
          preserveAspectRatio="none"
        />
      </svg>
    </svg>
  );
}
