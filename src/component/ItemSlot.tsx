/** @jsxImportSource @emotion/react */
import { Box, Typography } from "@mui/material";
import { css } from "@emotion/react";
import PokemonAnimatedSprite from "./PokemonAnimatedSprite";
import { Pokemon } from "../type/pokemon";
import { BagItem } from "../type/item";
import PixelatedImage from "./PixelatedImage";
import { getItemSpriteUrl } from "../util/sprite";

const spriteStyling = css({});

interface ItemSlotProps {
  bagItem: BagItem;
  onSelect: () => void;
}

export default function ItemSlot({ bagItem, onSelect }: ItemSlotProps) {
  return (
    <Box
      position="relative"
      sx={{
        background: "#F5F5F5CA",
        borderRadius: 3,
        ":hover": {
          background: "#56AEFFCA",
        },
        padding: 1,

        ":active": {
          background: "#51A0E9CA",
        },
      }}
    >
      <Typography
        textAlign="center"
        position="absolute"
        right={1}
        bottom={1}
        fontSize={12}
      >
        {bagItem.count}
      </Typography>
      <PixelatedImage
        style={{ width: "100%" }}
        onClick={onSelect}
        src={getItemSpriteUrl(bagItem.item_type)}
        css={spriteStyling}
        alt={"item"}
      />
    </Box>
  );
}
