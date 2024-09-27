import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { ReactComponent as Logo } from "../asset/logo.svg";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import { useNavigate } from "react-router-dom";
import { GitHub } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import NaviLanguageSelector from "./NaviLanguageSelector";

export default function NaviBar() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleSelectPage = (page: string) => {
    navigate(`/${page}`);
    handleCloseNavMenu();
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: "#FFFFFF",
        boxShadow: "none",
        borderBottom: "1px solid #CCCCCC",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              width: "100%",
              display: { xs: "flex", sm: "none" },
              alignItems: "center",
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <IconButton
                size="large"
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", sm: "none" },
                }}
              >
                <MenuItem onClick={() => handleSelectPage("profile")}>
                  <Typography textAlign="center">{t("nav.profile")}</Typography>
                </MenuItem>
                <MenuItem onClick={() => handleSelectPage("pokemon")}>
                  <Typography textAlign="center">{t("nav.pokemon")}</Typography>
                </MenuItem>
                <MenuItem onClick={() => handleSelectPage("pokedex")}>
                  <Typography textAlign="center">{t("nav.pokedex")}</Typography>
                </MenuItem>
                <MenuItem onClick={() => handleSelectPage("bag")}>
                  <Typography textAlign="center">{t("nav.bag")}</Typography>
                </MenuItem>
              </Menu>
            </Box>
            <NaviLanguageSelector />
          </Box>
          <Box
            sx={{
              width: "100%",
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
            }}
          >
            <IconButton onClick={() => navigate("/")}>
              <Logo />
            </IconButton>
            <Stack sx={{ flexGrow: 1 }} direction="row">
              <Button
                color="secondary"
                key={t("nav.profile")}
                onClick={() => handleSelectPage("profile")}
                sx={{ mx: 1, my: 1, color: "black", display: "block" }}
              >
                <Typography>{t("nav.profile")}</Typography>
              </Button>
              <Button
                color="secondary"
                key={t("nav.pokemon")}
                onClick={() => handleSelectPage("pokemon")}
                sx={{ mx: 1, my: 1, color: "black", display: "block" }}
              >
                <Typography>{t("nav.pokemon")}</Typography>
              </Button>

              <Button
                color="secondary"
                key={t("nav.pokedex")}
                onClick={() => handleSelectPage("pokedex")}
                sx={{ mx: 1, my: 1, color: "black", display: "block" }}
              >
                <Typography>{t("nav.pokedex")}</Typography>
              </Button>
              <Button
                color="secondary"
                key={t("nav.bag")}
                onClick={() => handleSelectPage("bag")}
                sx={{ mx: 1, my: 1, color: "black", display: "block" }}
              >
                <Typography>{t("nav.bag")}</Typography>
              </Button>
            </Stack>
            <NaviLanguageSelector />
            <IconButton href="https://github.com/gitpokecol/github-pokemon-collection">
              <GitHub />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
