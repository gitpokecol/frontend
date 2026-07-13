import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { Pokemon } from "../type/pokemon";
import { useTranslation } from "react-i18next";

interface PokemonDetailProps {
  pokemon: Pokemon;
}

export default function PokemonDetail({ pokemon }: PokemonDetailProps) {
  const { t } = useTranslation();

  return (
    <Stack
      justifyContent="center"
      width={{ xs: 150, sm: 300 }}
      sx={{
        background: "white",
        border: "1px solid gray",
        borderRadius: 2,
        padding: 2,
        "& .MuiTypography-root": {
          xs: { fontSize: 20 },
          sm: { fontSize: 30 },
        },
      }}
    >
      <Table padding="none">
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography>{t("pokemon-detail.dex-id")}</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography color="#3D96FF">{pokemon.id}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography>{t("pokemon-detail.name")}</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography color="#3D96FF">
                {t(`pokemon-name.${pokemon.id}`)}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography>{t("pokemon-detail.level")}</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography>
                Lv.<span style={{ color: "#3D96FF" }}>{pokemon.level}</span>
              </Typography>
            </TableCell>
          </TableRow>
          {pokemon.gender ? (
            <TableRow>
              <TableCell>
                <Typography>{t("pokemon-detail.gender")}</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography color="#3D96FF">
                  {t(`pokemon-detail.${pokemon.gender}`)}
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            <></>
          )}
        </TableBody>
      </Table>
    </Stack>
  );
}
