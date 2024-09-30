import { Box, IconButton, Stack, Typography } from "@mui/material";
import { pokemonBackgroundColors, pokemonForms } from "../constant/pokemon";
import PokemonAnimatedSprite from "./PokemonAnimatedSprite";
import { PokedexItem } from "../type/pokedex";
import { GENDER_DIFFERENCE_ID_ON_FRONT } from "../util/sprite";
import MissingImage from "../asset/missing.png";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface PokedexPreviewProps {
  pokedexItem?: PokedexItem;
}

export default function PokedexPreview({ pokedexItem }: PokedexPreviewProps) {
  const { t } = useTranslation();

  const forms =
    pokedexItem && pokemonForms[pokedexItem.id]
      ? pokemonForms[pokedexItem.id]
      : null;
  const [formIdx, setFormIdx] = useState<number>(0);
  const [gender, setGender] = useState<"female" | "male">("male");

  const handleNextForm = () => {
    if (formIdx === forms.length - 1) setFormIdx(0);
    else setFormIdx(formIdx + 1);
  };

  const handleBeforeForm = () => {
    if (formIdx === 0) setFormIdx(forms.length - 1);
    else setFormIdx(formIdx - 1);
  };

  useEffect(() => {
    setFormIdx(0);
    setGender("male");
  }, [pokedexItem]);

  return (
    <Box
      sx={{
        width: 300,
        maxWidth: "100%",
      }}
    >
      {pokedexItem && pokedexItem.isFound ? (
        <>
          <Typography textAlign="center" variant="h5">
            {t(`pokemon-name.${pokedexItem.id}`)}
          </Typography>
          <Stack
            position="relative"
            alignItems="center"
            sx={{
              background: pokemonBackgroundColors[pokedexItem.id],
              border: "1px solid gray",
              borderRadius: 2,
            }}
          >
            <PokemonAnimatedSprite
              style={{
                minWidth: "100%",
              }}
              pokemon={{
                internalId: 0,
                level: 0,
                id: pokedexItem.id,
                isShiny: false,
                gender: gender,
                form: forms ? forms[formIdx] : null,
              }}
              facing="front"
            />

            {forms ? (
              <Stack
                position="absolute"
                bottom={0}
                direction="row"
                justifyContent="center"
                sx={{ background: "#FFFFFF70", borderRadius: 2 }}
              >
                <IconButton onClick={handleBeforeForm}>
                  <ChevronLeftIcon />
                </IconButton>
                <Typography marginY="auto">
                  {forms[formIdx]
                    ? t(`pokemon-form.${forms[formIdx]}`)
                    : t("pokemon-form.default")}
                </Typography>
                <IconButton onClick={handleNextForm}>
                  <ChevronRightIcon />
                </IconButton>
              </Stack>
            ) : (
              <></>
            )}

            {GENDER_DIFFERENCE_ID_ON_FRONT.includes(pokedexItem.id) ? (
              <Stack
                position="absolute"
                right={0}
                top={0}
                sx={{
                  background: "#FFFFFF70",
                  borderRadius: 2,
                }}
              >
                <IconButton onClick={() => setGender("male")}>
                  <MaleIcon sx={{ fill: "#42a5f5" }} />
                </IconButton>
                <IconButton onClick={() => setGender("female")}>
                  <FemaleIcon sx={{ fill: "red" }} />
                </IconButton>
              </Stack>
            ) : (
              <></>
            )}
          </Stack>
        </>
      ) : (
        <>
          <Typography textAlign="center" variant="h5">
            ???
          </Typography>
          <Stack
            position="relative"
            alignItems="center"
            sx={{
              background: "#c7c7c7",
              border: "1px solid gray",
              borderRadius: 2,
            }}
          >
            <img
              style={{ width: "100%", imageRendering: "pixelated" }}
              src={MissingImage}
              alt="pokemon sprite"
            />
          </Stack>
        </>
      )}
    </Box>
  );
}
