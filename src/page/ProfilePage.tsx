import { Box, Input, Stack, Typography } from "@mui/material";
import PixelatedImage from "../component/PixelatedImage";
import PageContainer from "../component/PageContainer";
import CodeBlock from "../component/CodeBlock";
import { useEffect, useState } from "react";
import useUsername from "../hook/useUsername";
import ProfileControl from "../component/ProfileContol";

export default function ProfilePage() {
  const username = useUsername();

  const [background, setBackground] = useState<string>("none");
  const [width, setWidth] = useState<number>(300);
  const [height, setHeight] = useState<number>(250);
  const [facing, setFacing] = useState<"left" | "right">("left");
  const [url, setUrl] = useState<string>();

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
    setUrl(
      `https://gitpokecol.org/pokemons/${username}?face=${facing}&width=${width}&height=${height}&background=${background}`
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
      >
        <Stack
          direction={{ xs: "column", md: width > 500 ? "column" : "row" }}
          alignItems="center"
          gap={5}
        >
          <PixelatedImage
            style={{
              maxWidth: "100%",
              objectFit: "contain",
              width,
              height,
              border: "1px solid black",
              borderRadius: 5,
            }}
            src={url}
            alt="github pokemon profile"
          />
          <ProfileControl
            onChangeBackground={handleBackgroundChange}
            onChangeFacing={setFacing}
            onChangeHeight={handleHeightChange}
            onChangeWidth={handleWidthChange}
          />
        </Stack>
        <Box maxWidth="100%">
          <Stack
            border={1}
            sx={{ background: "#FFFFFF" }}
            padding={3}
            gap={3}
            borderRadius={2}
          >
            <Typography>
              You can copy and paste the following text into your GitHub profile
              or anywhere on the internet to show off your Pokemon!
            </Typography>
            <Stack marginLeft={2}>
              <Typography>Markdown</Typography>
              <CodeBlock
                code={`![${username}'s Github Pokemon Collection](${url})`}
              />
            </Stack>
            <Stack marginLeft={2}>
              <Typography>Html</Typography>
              <CodeBlock
                code={`<a href="https://app.gitpokecol.org">
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
