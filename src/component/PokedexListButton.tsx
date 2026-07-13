import { Button, ListItemText } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ReactComponent as Pokeball } from "../asset/pokeball.svg";
import { ReactComponent as DisablePokeball } from "../asset/pokeball-disable.svg";
import { PIXEL_ACCENT } from "../style/pixel";

const baseStyle = {
  boxShadow: "none",
  textTransform: "none" as const,
  fontSize: 16,
  color: "#000000",
  gap: 10,
  borderRadius: 0,
  "& .select-cursor": {
    visibility: "hidden" as const,
    fontSize: 14,
    lineHeight: 1,
  },
  "&:hover .select-cursor": {
    visibility: "visible" as const,
  },
};

const FoundPokedexListButton = styled(Button)({
  ...baseStyle,
  "&:hover": {
    color: PIXEL_ACCENT,
  },
  "&:active": {
    color: PIXEL_ACCENT,
  },
});

const NotFoundPokedexListButton = styled(Button)({
  ...baseStyle,
  "&:hover": {
    color: "#B9B9B9",
  },
  "&:active": {
    color: "#B9B9B9",
  },
});

interface PokedexListButtonProps {
  number: number;
  name: string;
  hasFound: boolean;
  onClick?: () => void;
}

export default function PokedexListButton({
  number,
  name,
  hasFound,
  onClick,
}: PokedexListButtonProps) {
  const numberPart = "#" + number.toString().padStart(3, "0");

  return (
    <>
      {hasFound ? (
        <FoundPokedexListButton fullWidth onClick={onClick}>
          <span className="select-cursor">▶</span>
          <Pokeball style={{ maxWidth: 32, minWidth: 24 }} />
          <ListItemText
            sx={{ textAlign: "left" }}
            primary={`${numberPart} ${name}`}
          />
        </FoundPokedexListButton>
      ) : (
        <NotFoundPokedexListButton fullWidth onClick={onClick}>
          <span className="select-cursor">▶</span>
          <DisablePokeball style={{ maxWidth: 32, minWidth: 24 }} />
          <ListItemText
            sx={{ textAlign: "left" }}
            primary={`${numberPart} ???`}
          />
        </NotFoundPokedexListButton>
      )}
    </>
  );
}
