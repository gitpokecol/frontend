import { Button, ListItemText } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ReactComponent as Pokeball } from "../asset/pokeball.svg";
import { ReactComponent as DisablePokeball } from "../asset/pokeball-disable.svg";

const FoundPokedexListButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  color: "#000000",
  "&:hover": {
    color: "#3D96FF",
  },
  "&:active": {
    color: "#3D96FF",
  },
  gap: 10,
});

const NotFoundPokedexListButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  color: "#000000",
  "&:hover": {
    color: "#B9B9B9",
  },
  "&:active": {
    color: "#B9B9B9",
  },
  gap: 10,
});

interface PokedexListButtonProps {
  number: number;
  name: string;
  hasFound: boolean;
}

export default function PokedexListButton({
  number,
  name,
  hasFound,
}: PokedexListButtonProps) {
  const numberPart = "#" + number.toString().padStart(3, "0");

  return (
    <>
      {hasFound ? (
        <FoundPokedexListButton fullWidth>
          <Pokeball style={{ maxWidth: 32, minWidth: 24 }} />
          <ListItemText
            sx={{ textAlign: "left" }}
            primary={`${numberPart} ${name}`}
          />
        </FoundPokedexListButton>
      ) : (
        <NotFoundPokedexListButton fullWidth>
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
