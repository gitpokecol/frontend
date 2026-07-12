import { Box, Grid, Skeleton, Stack, Typography } from "@mui/material";
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
import { useTranslation } from "react-i18next";
import useAlert from "../hook/useAlert";
import ErrorState from "../component/ErrorState";
import SlotGridSkeleton from "../component/SlotGridSkeleton";
import { pixelCard } from "../style/pixel";

export default function BagPage() {
  const { t } = useTranslation();
  const { bagItems, fetchBagItems, loading, error } = useBagItems();
  const [selectedBagItem, setSelectedBagItem] = useState<BagItem | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const alert = useAlert();

  useEffect(() => {
    if (bagItems) setSelectedBagItem(bagItems[0]);
  }, [bagItems]);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSelectPokemon = async (pokemon: Pokemon) => {
    if (!selectedBagItem) return false;

    try {
      const res = await postUseItem(pokemon.internalId, selectedBagItem.item_type);

      if (res.is_used) {
        handleCloseModal();
        fetchBagItems();
      } else {
        alert(t("bag.use-item-failed"), "error");
      }

      return res.is_used;
    } catch {
      alert(t("bag.use-item-failed"), "error");
      return false;
    }
  };

  if (loading) {
    return (
      <PageContainer backgroundTheme="small">
        <Stack
          height="100%"
          alignItems="center"
          gap={10}
          justifyContent="stretch"
          aria-busy="true"
        >
          <Stack direction="row" gap={{ xs: 2, sm: 10 }} alignItems="center">
            <Skeleton
              variant="rectangular"
              sx={{
                width: { xs: 100, sm: 200 },
                height: { xs: 100, sm: 200 },
                borderRadius: 2,
              }}
            />
            <Stack width={{ xs: 200, sm: 300 }} gap={1}>
              <Skeleton sx={{ fontSize: { xs: 25, sm: 30 } }} />
              <Skeleton sx={{ fontSize: 20 }} />
              <Skeleton
                variant="rectangular"
                sx={{ height: 40, borderRadius: 1 }}
              />
            </Stack>
          </Stack>
          <Grid
            container
            alignContent="flex-start"
            spacing={2}
            width={700}
            maxWidth="100%"
            overflow="hidden"
            height={0}
            flexGrow={1}
          >
            <SlotGridSkeleton />
          </Grid>
        </Stack>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer backgroundTheme="small">
        <ErrorState onRetry={fetchBagItems} />
      </PageContainer>
    );
  }

  if (!bagItems) {
    return <PageContainer backgroundTheme="small"></PageContainer>;
  }

  if (bagItems.length === 0) {
    return (
      <PageContainer backgroundTheme="small">
        <Stack height="100%" alignItems="center" paddingTop={10}>
          <Typography>{t("bag.no-items")}</Typography>
        </Stack>
      </PageContainer>
    );
  }

  return (
    <PageContainer backgroundTheme="small">
      {!selectedBagItem ? (
        <></>
      ) : (
        <Stack
          height="100%"
          alignItems="center"
          gap={10}
          justifyContent="stretch"
        >
          <Stack direction="row" gap={{ xs: 2, sm: 10 }} alignItems="center">
            <Box
              sx={{ ...pixelCard, padding: 1 }}
              width={{ xs: 100, sm: 200 }}
              height={{ xs: 100, sm: 200 }}
            >
              <PixelatedImage
                width="100%"
                src={getItemSpriteUrl(selectedBagItem.item_type)}
                alt={t(`item-name.${selectedBagItem.item_type}`)}
              />
            </Box>
            <Stack justifyContent="center" width={{ xs: 200, sm: 300 }} gap={1}>
              <Typography fontSize={{ xs: 25, sm: 30 }}>
                {t(`item-name.${selectedBagItem.item_type}`)}
              </Typography>
              <Typography fontSize={{ xs: 20, sm: 20 }}>
                {t(`item-description.${selectedBagItem.item_type}`)}
              </Typography>
              <BoxButton onClick={() => setOpenModal(true)}>
                <Typography>{t("bag.use-item")}</Typography>
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
