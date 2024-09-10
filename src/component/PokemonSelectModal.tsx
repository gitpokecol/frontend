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
import { useEffect, useRef } from "react";

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
  const { pokemons, fetchPokemons } = usePokemons();
  const pokemonSlotRefs = useRef<Record<number, any>>({});

  useEffect(() => {
    fetchPokemons();
  }, [open]);

  const handleSelect = async (pokemon: Pokemon) => {
    const isSuccess = await onSelect(pokemon);
    if (!isSuccess) {
      pokemonSlotRefs.current[pokemon.id].triggerFailed();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" scroll="paper">
      <DialogTitle>Select a Pokemon to use item on.</DialogTitle>
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
        <Grid
          container
          alignContent="flex-start"
          spacing={2}
          width={700}
          maxWidth="100%"
          overflow="auto"
          paddingX={1}
        >
          {pokemons.map((pokemon) => (
            <Grid key={pokemon.id} item xs={3} sm={1.5} height="fit-content">
              <PokemonSlot
                ref={(el) => (pokemonSlotRefs.current[pokemon.id] = el)}
                pokemon={pokemon}
                onSelect={() => handleSelect(pokemon)}
              />
            </Grid>
          ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
