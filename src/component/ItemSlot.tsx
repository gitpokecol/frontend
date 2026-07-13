/** @jsxImportSource @emotion/react */
import { Box, Typography } from "@mui/material";
import { css } from "@emotion/react";
import { BagItem } from "../type/item";
import PixelatedImage from "./PixelatedImage";
import { getItemSpriteUrl } from "../util/sprite";
import useImagePreload from "../hook/useImagePreload";
import SquareSkeleton from "./SquareSkeleton";
import { PIXEL_ACCENT } from "../style/pixel";

const spriteStyling = css({});

interface ItemSlotProps {
  bagItem: BagItem;
  onSelect: () => void;
}

export default function ItemSlot({ bagItem, onSelect }: ItemSlotProps) {
  const spriteUrl = getItemSpriteUrl(bagItem.item_type);
  const loaded = useImagePreload(spriteUrl);

  if (!loaded) {
    return <SquareSkeleton />;
  }

  return (
    <Box
      position="relative"
      sx={{
        background: "#F5F5F5CA",
        borderRadius: 0,
        border: "2px solid rgba(51, 50, 60, 0.25)",
        ":hover": {
          background: "#56AEFFCA",
          borderColor: PIXEL_ACCENT,
        },
        padding: 1,

        ":active": {
          background: "#51A0E9CA",
          borderColor: PIXEL_ACCENT,
        },
      }}
    >
      <Typography
        textAlign="center"
        position="absolute"
        right={2}
        bottom={1}
        fontSize={20}
      >
        {bagItem.count}
      </Typography>
      <PixelatedImage
        style={{ width: "100%" }}
        onClick={onSelect}
        src={spriteUrl}
        css={spriteStyling}
        alt={"item"}
      />
    </Box>
  );
}
