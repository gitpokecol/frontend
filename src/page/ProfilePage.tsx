import { Box, Skeleton, Stack, Typography } from "@mui/material";
import PixelatedImage from "../component/PixelatedImage";
import PageContainer from "../component/PageContainer";
import CodeBlock from "../component/CodeBlock";
import { useEffect, useState } from "react";
import useUsername from "../hook/useUsername";
import ProfileControl from "../component/ProfileContol";
import { useTranslation } from "react-i18next";
import { pixelCard, pixelFrame } from "../style/pixel";

export default function ProfilePage() {
  const { t } = useTranslation();
  const username = useUsername();

  const [background, setBackground] = useState<string>("none");
  const [width, setWidth] = useState<number>(300);
  const [height, setHeight] = useState<number>(250);
  const [facing, setFacing] = useState<"left" | "right">("left");
  const [url, setUrl] = useState<string>();
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  const handleWidthChange = (newValue: number) => {
    setWidth(newValue);
  };

  const handleHeightChange = (newValue: number) => {
    setHeight(newValue);
  };

  const handleBackgroundChange = (newValue: string) => {
    setBackground(newValue);
  };

  useEffect(() => {
    setImageLoaded(false);
    setUrl(
      `${process.env.REACT_APP_API_HOST}/pokemons/${username}?face=${facing}&width=${width}&height=${height}&background=${background}`
    );
  }, [width, height, facing, background, username]);

  return (
    <PageContainer backgroundTheme="small">
      <Stack
        width={900}
        maxWidth={"100%"}
        marginX={"auto"}
        alignItems="center"
        gap={5}
        sx={{
          "& .MuiTypography-root, span": {
            xs: { fontSize: 20 },
            sm: { fontSize: 30 },
          },
        }}
      >
        <Stack
          direction={{ xs: "column", md: width > 500 ? "column" : "row" }}
          alignItems="center"
          gap={5}
        >
          <Box
            position="relative"
            maxWidth="100%"
            sx={{ ...pixelFrame, overflow: "hidden", lineHeight: 0 }}
          >
            {!imageLoaded && (
              <Skeleton
                variant="rectangular"
                aria-busy="true"
                sx={{
                  maxWidth: "100%",
                  minWidth: width,
                  width,
                  height,
                }}
              />
            )}
            <PixelatedImage
              style={{
                maxWidth: "100%",
                objectFit: "contain",
                minWidth: width,
                width,
                height,
                display: imageLoaded ? undefined : "none",
              }}
              src={url}
              onLoad={() => setImageLoaded(true)}
              alt="github pokemon profile"
            />
          </Box>
          <ProfileControl
            onChangeBackground={handleBackgroundChange}
            onChangeFacing={setFacing}
            onChangeHeight={handleHeightChange}
            onChangeWidth={handleWidthChange}
          />
        </Stack>
        <Box maxWidth="100%">
          <Stack sx={pixelCard} padding={3} gap={3}>
            <Typography>{t("profile.detail-1")}</Typography>
            <Stack marginLeft={2}>
              <Typography>Markdown</Typography>
              <CodeBlock
                code={`![${username}'s Github Pokemon Collection](${url})`}
              />
            </Stack>
            <Stack marginLeft={2}>
              <Typography>Html</Typography>
              <CodeBlock
                code={`<a href="${process.env.REACT_APP_FRONTEND_HOST}">
    <img src="${url}" alt="${username}'s GitHub Pokemon Collection"/>
</a>`}
              />
            </Stack>
            <Stack marginLeft={2}>
              <Typography>Url</Typography>
              <CodeBlock code={url} />
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </PageContainer>
  );
}
