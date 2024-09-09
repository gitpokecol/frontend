import { Box, Container, ContainerProps } from "@mui/material";
import { BackgroundTheme } from "../type/background";
import { useSetRecoilState } from "recoil";
import { backgroundThemeState } from "../store/background";
import { useEffect } from "react";

interface PageContainerProps extends ContainerProps {
  backgroundTheme?: BackgroundTheme;
}

export default function PageContainer({
  children,
  backgroundTheme,
  ...attributes
}: PageContainerProps) {
  const setBackgroundTheme = useSetRecoilState(backgroundThemeState);

  useEffect(() => {
    setBackgroundTheme(backgroundTheme);
  }, []);

  return (
    <Box
      sx={{
        flexGrow: 1,
        paddingY: 5,
        overflow: "auto",
        width: "100%",
      }}
    >
      <Container maxWidth="xl" sx={{ height: "100%" }} {...attributes}>
        {children}
      </Container>
    </Box>
  );
}
