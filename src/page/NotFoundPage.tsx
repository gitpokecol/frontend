import { Stack, Typography } from "@mui/material";
import BoxButton from "../component/BoxButton";
import PageContainer from "../component/PageContainer";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ItemAquiredPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <PageContainer backgroundTheme="grey">
      <Stack justifyContent="center" alignItems="center" height="100%" gap={10}>
        <Typography>{t("notfound.detail-1")}</Typography>
        <BoxButton onClick={() => navigate("/")}>
          <Typography>{t("notfound.go-main")}</Typography>
        </BoxButton>
      </Stack>
    </PageContainer>
  );
}
