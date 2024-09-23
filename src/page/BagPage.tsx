import { Box, Grid, Stack, Typography } from "@mui/material";
import PageContainer from "../component/PageContainer";
import useBagItems from "../hook/api/useBagItems";
import ItemSlot from "../component/ItemSlot";
import PixelatedImage from "../component/PixelatedImage";
import { BagItem } from "../type/item";
import { useEffect, useState } from "react";
import { getItemSpriteUrl } from "../util/sprite";
import BoxButton from "../component/BoxButton";
import { PokemonSelectModal } from "../component/PokemonSelectModal";
import { Pokemon } from "../type/pokemon";
import { postUseItem } from "../api/apis";
import { useSnackbar } from "notistack";

export default function BagPage() {
  const { bagItems, fetchBagItems } = useBagItems();
  const [selectedBagItem, setSelectedBagItem] = useState<BagItem | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (bagItems) setSelectedBagItem(bagItems[0]);
  }, [bagItems]);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSelectPokemon = async (pokemon: Pokemon) => {
    const res = await postUseItem(
      pokemon.internalId,
      selectedBagItem.item_type
    );

    if (res.is_used) {
      handleCloseModal();
      fetchBagItems();
    } else {
      enqueueSnackbar("Can not use item.", { variant: "error" });
    }

    return res.is_used;
  };

  if (!bagItems || !selectedBagItem) {
    return <PageContainer backgroundTheme="small"></PageContainer>;
  }
  return (
    <PageContainer backgroundTheme="small">
      {bagItems.length === 0 ? (
        <Stack height="100%" alignItems="center" paddingTop={10}>
          <Typography>You doesn't have any items</Typography>
        </Stack>
      ) : (
        <Stack
          height="100%"
          alignItems="center"
          gap={10}
          justifyContent="stretch"
        >
          <Stack direction="row" gap={{ xs: 2, sm: 10 }} alignItems="center">
            <Box
              sx={{
                background: "white",
                border: "1px solid gray",
                borderRadius: 2,
                padding: 1,
              }}
              width={{ xs: 100, sm: 200 }}
              height={{ xs: 100, sm: 200 }}
            >
              <PixelatedImage
                width="100%"
                src={getItemSpriteUrl(selectedBagItem.item_type)}
                alt={selectedBagItem.name}
              />
            </Box>
            <Stack justifyContent="center" width={{ xs: 200, sm: 300 }} gap={1}>
              <Typography fontSize={{ xs: 25, sm: 30 }}>
                {selectedBagItem.name}
              </Typography>
              <Typography fontSize={{ xs: 20, sm: 20 }}>
                {selectedBagItem.description}
              </Typography>
              <BoxButton onClick={() => setOpenModal(true)}>
                <Typography>Use Item</Typography>
              </BoxButton>
            </Stack>
          </Stack>
          <Grid
            container
            alignContent="flex-start"
            spacing={2}
            width={700}
            maxWidth="100%"
            overflow="auto"
            height={0}
            flexGrow={1}
          >
            {bagItems.map((bagItem) => (
              <Grid
                key={bagItem.item_type}
                item
                xs={3}
                sm={1.5}
                height="fit-content"
              >
                <ItemSlot
                  bagItem={bagItem}
                  onSelect={() => {
                    setSelectedBagItem(bagItem);
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Stack>
      )}
      <PokemonSelectModal
        open={openModal}
        onClose={handleCloseModal}
        onSelect={handleSelectPokemon}
      />
    </PageContainer>
  );
}
