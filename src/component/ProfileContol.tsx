import {
  FormControlLabel,
  Radio,
  RadioGroup,
  Slider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import BackgroundSelector from "./BackgroundSelector";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface ProfileControlProps {
  onChangeBackground: (value: string) => void;
  onChangeFacing: (value: "left" | "right") => void;
  onChangeWidth: (value: number) => void;
  onChangeHeight: (value: number) => void;
}

export default function ProfileControl({
  onChangeBackground,
  onChangeFacing,
  onChangeWidth,
  onChangeHeight,
}: ProfileControlProps) {
  const { t } = useTranslation();
  const [width, setWidth] = useState<number>(300);
  const [height, setHeight] = useState<number>(250);

  return (
    <Stack
      justifyContent="center"
      sx={{ background: "#FFFFFF" }}
      border={1}
      borderRadius={2}
      padding={{ xs: 2, sm: 3 }}
    >
      <Table padding="none">
        <TableBody>
          <TableRow>
            <TableCell sx={{ minWidth: { xs: 50, sm: 100 } }}>
              <Typography>{t("profile.background")}</Typography>
            </TableCell>
            <TableCell align="right" colSpan={2} sx={{ paddingLeft: 1 }}>
              <BackgroundSelector onSelect={onChangeBackground} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography>{t("profile.facing")}</Typography>
            </TableCell>
            <TableCell align="right" colSpan={2}>
              <RadioGroup
                row
                defaultValue={"left"}
                onChange={(event, newValue) => {
                  onChangeFacing(newValue as "left" | "right");
                }}
              >
                <FormControlLabel
                  value="left"
                  control={<Radio />}
                  label={t("profile.left")}
                />
                <FormControlLabel
                  value="right"
                  control={<Radio />}
                  label={t("profile.right")}
                />
              </RadioGroup>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell rowSpan={2}>
              <Typography>{t("profile.size")}</Typography>
            </TableCell>
            <TableCell sx={{ width: 70 }}>
              <Typography>{t("profile.width")}</Typography>
            </TableCell>
            <TableCell align="right">
              <span style={{ fontSize: 20, color: "#3D96FF", lineHeight: 0.5 }}>
                {width}
              </span>
              <Slider
                defaultValue={300}
                min={250}
                step={10}
                max={1000}
                value={width}
                onChange={(event, value) => {
                  setWidth(value as number);
                }}
                onChangeCommitted={(event, value) => {
                  onChangeWidth(value as number);
                }}
                valueLabelDisplay="auto"
                marks={[
                  { value: 250, label: "250" },
                  { value: 300 },
                  { value: 500, label: "500" },
                  { value: 1000, label: "1000" },
                ]}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography>{t("profile.height")}</Typography>
            </TableCell>
            <TableCell align="right">
              <span style={{ fontSize: 20, color: "#3D96FF", lineHeight: 0.5 }}>
                {height}
              </span>
              <Slider
                defaultValue={250}
                min={200}
                step={10}
                max={1000}
                value={height}
                onChange={(event, value) => {
                  setHeight(value as number);
                }}
                onChangeCommitted={(event, value) => {
                  onChangeHeight(value as number);
                }}
                valueLabelDisplay="auto"
                marks={[
                  { value: 200, label: "200" },
                  { value: 250 },
                  { value: 500, label: "500" },
                  { value: 1000, label: "1000" },
                ]}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Stack>
  );
}
