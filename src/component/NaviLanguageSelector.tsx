import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import React from "react";
import i18n from "../locales/i18n";
import LanguageIcon from "@mui/icons-material/Language";
import { LANGUAGE_KEY } from "../constant/common";

export default function NaviLanguageSelector() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLanguage = (language: string) => {
    localStorage.setItem(LANGUAGE_KEY, language);
    i18n.changeLanguage(language);
  };

  return (
    <Box>
      <IconButton
        aria-label="language"
        aria-controls="language"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
      >
        <LanguageIcon />
      </IconButton>
      <Menu
        id="language"
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
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
      >
        <MenuItem onClick={() => handleLanguage("en")}>
          <Typography textAlign="center">English</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleLanguage("ko")}>
          <Typography textAlign="center">한국어</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}
