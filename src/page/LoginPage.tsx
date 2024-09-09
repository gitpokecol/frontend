import { Stack, Typography } from "@mui/material";
import { ReactComponent as ClosePokeball } from "../asset/pokeball-close.svg";
import { ReactComponent as Github } from "../asset/github.svg";
import BoxButton from "../component/BoxButton";
import PageContainer from "../component/PageContainer";
import useGithubLogin from "../hook/api/useGithubAuth";

export default function LoginPage() {
  const { loginUrl } = useGithubLogin();

  const redirectToGithubLoginPage = () => {
    if (loginUrl) window.location.href = loginUrl;
  };

  return (
    <PageContainer>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        height="100%"
        spacing={{ xs: 2, sm: 4, md: 6 }}
        paddingLeft={2}
        paddingRight={2}
      >
        <Typography textAlign="center" variant="h5">
          GITHUB POKEMON COLLECTION
        </Typography>
        <ClosePokeball style={{ width: "345px", maxWidth: "70%" }} />
        <BoxButton sx={{ gap: 2 }} onClick={redirectToGithubLoginPage}>
          <Github />
          CONTINUE WITH GITHUB!
        </BoxButton>
      </Stack>
    </PageContainer>
  );
}
