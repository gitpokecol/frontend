import {
  Box,
  FormControlLabel,
  Grid,
  Input,
  Radio,
  RadioGroup,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import PixelatedImage from "../component/PixelatedImage";
import PageContainer from "../component/PageContainer";
import CodeBlock from "../component/CodeBlock";
import { useEffect, useState } from "react";
import BackgroundSelector from "../component/BackgroundSelector";
import useUsername from "../hook/useUsername";

export default function ProfilePage() {
  const username = useUsername();

  const [background, setBackground] = useState<string>("none");
  const [width, setWidth] = useState<number>(300);
  const [height, setHeight] = useState<number>(250);
  const [face, setFace] = useState<"left" | "right">("left");
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
      `https://gitpokecol.org/pokemons/${username}?face=${face}&width=${width}&height=${height}&background=${background}`
    );
  }, [width, height, face, background, username]);

  return (
    <PageContainer backgroundTheme="small">
      <Stack
        width={900}
        maxWidth={"100%"}
        marginX={"auto"}
        alignItems="center"
        gap={5}
      >
        <Stack direction={{ xs: "column", md: "row" }} gap={5}>
          <PixelatedImage
            style={{
              width,
              height,
              border: "1px solid black",
              borderRadius: 5,
            }}
            src={url}
            alt="github pokemon profile"
          />
          <Stack justifyContent="center">
            <Stack>
              <Typography>Background</Typography>
              <BackgroundSelector onSelect={handleBackgroundChange} />
            </Stack>
            <Stack>
              <Typography>Moving</Typography>
              <RadioGroup
                row
                defaultValue={face}
                value={face}
                onChange={(event, newValue) => {
                  setFace(newValue as "left" | "right");
                }}
              >
                <FormControlLabel
                  value="left"
                  control={<Radio />}
                  label="left"
                />
                <FormControlLabel
                  value="right"
                  control={<Radio />}
                  label="right"
                />
              </RadioGroup>
            </Stack>
            <Stack>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography>Size</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>width</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Slider
                    min={250}
                    max={1000}
                    valueLabelDisplay="auto"
                    value={width}
                    onChange={(event, newValue) =>
                      handleWidthChange(newValue as number)
                    }
                  />
                </Grid>
                <Grid item xs={2}>
                  <Input
                    value={width}
                    size="small"
                    onChange={(event) => {
                      handleWidthChange(
                        event.target.value === ""
                          ? 250
                          : Number(event.target.value)
                      );
                    }}
                    inputProps={{
                      min: 250,
                      max: 1000,
                      type: "number",
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography>height</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Slider
                    min={200}
                    max={1000}
                    valueLabelDisplay="auto"
                    value={height}
                    onChange={(event, newValue) =>
                      handleHeightChange(newValue as number)
                    }
                  />
                </Grid>
                <Grid item xs={2}>
                  <Input
                    value={height}
                    size="small"
                    onChange={(event) => {
                      handleHeightChange(
                        event.target.value === ""
                          ? 200
                          : Number(event.target.value)
                      );
                    }}
                    inputProps={{
                      min: 200,
                      max: 1000,
                      type: "number",
                    }}
                  />
                </Grid>
              </Grid>
            </Stack>
          </Stack>
        </Stack>
        <Box maxWidth="100%">
          <Stack border={1} sx={{ background: "#FFFFFF" }} padding={3} gap={3}>
            <Typography>
              You can copy and paste the following text into your GitHub profile
              or anywhere on the internet to show off your Pokemon!
            </Typography>
            <Stack marginLeft={2}>
              <Typography fontSize={12}>Markdown</Typography>
              <CodeBlock
                code={`![${username}'s Github Pokemon Collection](${url})`}
              />
            </Stack>
            <Stack marginLeft={2}>
              <Typography fontSize={12}>Html</Typography>
              <CodeBlock
                code={`<a href="https://app.gitpokecol.org">
    <img src="${url}" alt="${username}'s GitHub Pokemon Collection"/>
</a>`}
              />
            </Stack>
            <Stack marginLeft={2}>
              <Typography fontSize={12}>Url</Typography>
              <CodeBlock code={url} />
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </PageContainer>
  );
}
