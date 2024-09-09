import {
  styled,
  ToggleButton,
  ToggleButtonGroup,
  toggleButtonGroupClasses,
} from "@mui/material";
import abyssImage from "../asset/profile/background/abyss.png";
import badlandsImage from "../asset/profile/background/badlands.png";
import beachImage from "../asset/profile/background/beach.png";
import caveImage from "../asset/profile/background/cave.png";
import desertImage from "../asset/profile/background/desert.png";
import normalImage from "../asset/profile/background/normal.png";
import plainImage from "../asset/profile/background/plain.png";
import { useState } from "react";

const ToggleBackgroundButtonGroup = styled(ToggleButtonGroup)({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    padding: 0,
    border: 0,
    [`&.${toggleButtonGroupClasses.selected}`]: {
      img: {
        outline: "4px solid #56AEFF",
        outlineOffset: -1,
        zIndex: 1,
      },
    },
  },
});

interface BackgroundSelectorProp {
  onSelect: (value: string) => void;
}

export default function BackgroundSelector({
  onSelect,
}: BackgroundSelectorProp) {
  const [selected, setSelected] = useState<string | null>(null);

  const onSelect_ = (event: React.MouseEvent<HTMLElement>, value?: string) => {
    setSelected(value);
    onSelect(value ? value : "none");
  };

  return (
    <ToggleBackgroundButtonGroup
      value={selected}
      exclusive
      onChange={onSelect_}
      aria-label="back ground"
    >
      <ToggleButton value="abyss" aria-label="abyss">
        <img
          style={{ flexGrow: 1, maxWidth: 80 }}
          src={abyssImage}
          alt="abyss"
        />
      </ToggleButton>
      <ToggleButton value="badlands" aria-label="badlands">
        <img
          style={{ flexGrow: 1, maxWidth: 80 }}
          src={badlandsImage}
          alt="badlands"
        />
      </ToggleButton>
      <ToggleButton value="beach" aria-label="beach">
        <img
          style={{ flexGrow: 1, maxWidth: 80 }}
          src={beachImage}
          alt="beach"
        />
      </ToggleButton>
      <ToggleButton value="cave" aria-label="cave">
        <img style={{ flexGrow: 1, maxWidth: 80 }} src={caveImage} alt="cave" />
      </ToggleButton>
      <ToggleButton value="desert" aria-label="desert">
        <img
          style={{ flexGrow: 1, maxWidth: 80 }}
          src={desertImage}
          alt="desert"
        />
      </ToggleButton>
      <ToggleButton value="normal" aria-label="normal">
        <img
          style={{ flexGrow: 1, maxWidth: 80 }}
          src={normalImage}
          alt="normal"
        />
      </ToggleButton>
      <ToggleButton value="plain" aria-label="plain">
        <img
          style={{ flexGrow: 1, maxWidth: 80 }}
          src={plainImage}
          alt="plain"
        />
      </ToggleButton>
    </ToggleBackgroundButtonGroup>
  );
}
