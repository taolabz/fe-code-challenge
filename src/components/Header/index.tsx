import { Box, useTheme } from "@mui/material";
import ThemeSwitch from "../ThemeSwitch";
import { ThemeModeContext } from "../../providers/ThemeMode";
import { useContext } from "react";
import { Link } from "react-router-dom";
function Header() {
  const theme = useTheme();
  const themeMode = useContext(ThemeModeContext);

  const onThemeChange = () => {
    themeMode.changeThemeMode();
  };

  return (
    <Box
      component="header"
      sx={{
        width: 1,
        height: "70px",
        boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box
        sx={{
          width: 1,
          height: 1,
          bgcolor: "background.paper",
          color: "text.primary",
          transition: "background-color ease-in-out 0.2s",
        }}
      >
        <Box
          component="nav"
          sx={{
            m: "0 auto",
            p: { xs: "0 20px", md: "0 60px" },
            maxWidth: "1440px",
            height: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ fontSize: "18px", fontWeight: 800 }}>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              Where in the world?
            </Link>
          </Box>
          <Box sx={{ fontSize: 14 }}>
            <ThemeSwitch
              onChange={onThemeChange}
              checked={theme.palette.mode === "dark"}
            />
            <Box
              component="span"
              sx={{
                ml: "4px",
                fontWeight: 600,
              }}
            >
              {theme.palette.mode === "dark" ? "Dark Mode" : "Light Mode"}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
export default Header;
