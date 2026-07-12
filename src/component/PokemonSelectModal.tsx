import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
} from "@mui/material";
import usePokemons from "../hook/api/usePokemons";
import PokemonSlot from "./PokemonSlot";
import CloseIcon from "@mui/icons-material/Close";
import { Pokemon } from "../type/pokemon";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Loader from "./Loader";

interface PokemonSelectModalProps {
  open?: boolean;
  onClose: () => void;
  onSelect: (pokemon: Pokemon) => Promise<boolean>;
}

export function PokemonSelectModal({
  open = false,
  onClose,
  onSelect,
}: PokemonSelectModalProps) {
  const { t } = useTranslation();
  const { pokemons, fetchPokemons, loading } = usePokemons();
  const pokemonSlotRefs = useRef<Record<number, any>>({});
  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (open) fetchPokemons();
  }, [open]);

  const handleSelect = async (pokemon: Pokemon) => {
    if (submitting) return;

    setSubmitting(true);
    try {
      const isSuccess = await onSelect(pokemon);
      if (!isSuccess) {
        pokemonSlotRefs.current[pokemon.internalId]?.triggerFailed();
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" scroll="paper">
      <DialogTitle>{t("pokemon-select.title")}</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        {loading || !pokemons ? (
          <Grid container width={700} maxWidth="100%" minHeight={120}>
            <Loader />
          </Grid>
        ) : (
          <Grid
            container
            alignContent="flex-start"
            spacing={2}
            width={700}
            maxWidth="100%"
            overflow="auto"
            paddingX={1}
            sx={{ opacity: submitting ? 0.6 : 1, pointerEvents: submitting ? "none" : "auto" }}
            aria-busy={submitting}
          >
            {pokemons.map((pokemon) => (
              <Grid
                key={pokemon.internalId}
                item
                xs={3}
                sm={1.5}
                height="fit-content"
              >
                <PokemonSlot
                  ref={(el) => (pokemonSlotRefs.current[pokemon.internalId] = el)}
                  pokemon={pokemon}
                  onSelect={() => handleSelect(pokemon)}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </DialogContent>
    </Dialog>
  );
}
