import {
  createTheme,
  GlobalStyles,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import { useMemo, useState } from "react";
import { ThemeModeContext } from "./providers/ThemeMode";
import IndexRoutes from "./routers/IndexRoutes";
import Header from "./components/Header";

function App() {
  const [mode, setMode] = useState<"light" | "dark" | "system">(
    ["dark", "light", "system"].indexOf(localStorage.getItem("theme") || "") >
      -1
      ? (localStorage.getItem("theme") as "light" | "dark" | "system")
      : "system"
  );
  const isPreferDarkMode = useMediaQuery("(prefers-color-scheme: dark)"); // system default

  const themeMode = useMemo(
    () => ({
      changeThemeMode: () => {
        setMode((prevMode) => {
          localStorage.setItem("theme", prevMode === "dark" ? "light" : "dark");
          return prevMode === "dark" ? "light" : "dark";
        });
      },
    }),
    []
  );

  const theme = useMemo(() => {
    const m = mode === "system" ? (isPreferDarkMode ? "dark" : "light") : mode;
    return createTheme({
      palette: {
        mode: m,
        ...(m === "light"
          ? {
              text: {
                primary: "hsl(200, 15%, 8%)",
                secondary: "hsl(0, 0%, 52%)",
              },
              background: {
                default: "hsl(0, 0%, 98%)",
                paper: "hsl(0, 0%, 100%)",
              },
            }
          : {
              text: {
                primary: "hsl(0, 0%, 100%)",
                secondary: "hsl(0, 0%, 100%)",
              },
              background: {
                default: "hsl(207, 26%, 17%)",
                paper: "hsl(209, 23%, 22%)",
              },
            }),
      },
      typography: {
        fontFamily: "Nunito",
        fontWeightRegular: 600,
      },
    });
  }, [mode, isPreferDarkMode]);

  return (
    <ThemeModeContext.Provider value={themeMode}>
      <ThemeProvider theme={theme}>
        <Header />
        <IndexRoutes />
        <GlobalStyles
          styles={(theme) => ({
            body: {
              backgroundColor: theme.palette.background.default,
            },
          })}
        ></GlobalStyles>
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}

export default App;
