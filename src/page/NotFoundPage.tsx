import { Stack, Typography } from "@mui/material";
import BoxButton from "../component/BoxButton";
import PageContainer from "../component/PageContainer";
import { useNavigate } from "react-router-dom";

export default function ItemAquiredPage() {
  const navigate = useNavigate();

  return (
    <PageContainer backgroundTheme="grey">
      <Stack justifyContent="center" alignItems="center" height="100%" gap={10}>
        <Typography>THIS IS NOT THE PAGE YOU'RE LOOKING FOR.</Typography>
        <BoxButton onClick={() => navigate("/")}>GO TO MAIN PAGE</BoxButton>
      </Stack>
    </PageContainer>
  );
}
