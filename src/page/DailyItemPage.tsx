import { CircularProgress, Stack, Tooltip, Typography } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import BoxButton from "../component/BoxButton";
import ItemPokeBall from "../component/ItemPokeBall";
import { ReactComponent as EmptyPokeBall } from "../asset/pokeball-empty.svg";
import PageContainer from "../component/PageContainer";
import useDailyItem from "../hook/api/useDailyItem";
import CheckIcon from "@mui/icons-material/Check";
import { getItemSpriteUrl } from "../util/sprite";
import { SUBSTITUTE_DAILY_ITEM } from "../constant/items";
import { useState } from "react";
import { abtainDailyItem } from "../api/apis";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Loader from "../component/Loader";
import ErrorState from "../component/ErrorState";
import useAlert from "../hook/useAlert";

export default function DailyItemPage() {
  const { t } = useTranslation();
  const { dailyItemType, canClaim, fetchDailyItem, loading, error } =
    useDailyItem();
  const [replaced, setReplaced] = useState<boolean>(false);
  const [claiming, setClaiming] = useState<boolean>(false);
  const navigate = useNavigate();
  const alert = useAlert();

  const onReplaceItem = () => {
    setReplaced(true);
  };

  const onClaimItem = async () => {
    if (claiming) return;

    setClaiming(true);
    try {
      await abtainDailyItem(replaced);
      navigate("/pokemon");
    } catch {
      setClaiming(false);
      alert(t("error.generic"), "error");
    }
  };

  if (loading) {
    return (
      <PageContainer>
        <Loader />
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <ErrorState onRetry={fetchDailyItem} />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        height="100%"
        spacing={{ xs: 1, sm: 2, md: 4 }}
        paddingLeft={2}
        paddingRight={2}
      >
        {canClaim ? (
          <>
            <Typography textAlign="center" variant="h5">
              {t("daily-item.daily-item-aquired")}
            </Typography>
            <ItemPokeBall
              itemType={dailyItemType}
              secondItemType={SUBSTITUTE_DAILY_ITEM}
              isSelectSecond={replaced}
              style={{
                width: "300px",
                maxWidth: "70%",
              }}
            />
            <Stack direction="row" gap={1}>
              <Tooltip
                title={
                  <img
                    src={getItemSpriteUrl(SUBSTITUTE_DAILY_ITEM)}
                    alt="substitute item"
                  />
                }
              >
                <BoxButton
                  startIcon={<RefreshIcon />}
                  disabled={replaced || claiming}
                  onClick={onReplaceItem}
                >
                  <Typography>{t("daily-item.replace")}</Typography>
                </BoxButton>
              </Tooltip>
              <BoxButton
                startIcon={
                  claiming ? (
                    <CircularProgress size={16} color="inherit" />
                  ) : (
                    <CheckIcon />
                  )
                }
                disabled={claiming}
                aria-busy={claiming}
                onClick={onClaimItem}
              >
                <Typography>{t("daily-item.claim")}</Typography>
              </BoxButton>
            </Stack>
          </>
        ) : (
          <>
            <Typography textAlign="center" variant="h5">
              {t("daily-item.daily-item-already-aquired")}
            </Typography>
            <EmptyPokeBall
              style={{
                width: "300px",
                maxWidth: "70%",
              }}
            />
            <BoxButton onClick={() => navigate("/pokemon")}>
              <Typography>{t("daily-item.go-home")}</Typography>
            </BoxButton>
          </>
        )}
      </Stack>
    </PageContainer>
  );
}
