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
      sx={{ width: "100%" }}
    >
      <ToggleButton value="abyss" aria-label="abyss" sx={{ width: "14%" }}>
        <img src={abyssImage} alt="abyss" style={{ maxWidth: "100%" }} />
      </ToggleButton>
      <ToggleButton
        value="badlands"
        aria-label="badlands"
        sx={{ width: "14%" }}
      >
        <img src={badlandsImage} alt="badlands" style={{ maxWidth: "100%" }} />
      </ToggleButton>
      <ToggleButton value="beach" aria-label="beach" sx={{ width: "14%" }}>
        <img src={beachImage} alt="beach" style={{ maxWidth: "100%" }} />
      </ToggleButton>
      <ToggleButton value="cave" aria-label="cave" sx={{ width: "14%" }}>
        <img src={caveImage} alt="cave" style={{ maxWidth: "100%" }} />
      </ToggleButton>
      <ToggleButton value="desert" aria-label="desert" sx={{ width: "14%" }}>
        <img src={desertImage} alt="desert" style={{ maxWidth: "100%" }} />
      </ToggleButton>
      <ToggleButton value="normal" aria-label="normal" sx={{ width: "14%" }}>
        <img src={normalImage} alt="normal" style={{ maxWidth: "100%" }} />
      </ToggleButton>
      <ToggleButton value="plain" aria-label="plain" sx={{ width: "14%" }}>
        <img src={plainImage} alt="plain" style={{ maxWidth: "100%" }} />
      </ToggleButton>
    </ToggleBackgroundButtonGroup>
  );
}
