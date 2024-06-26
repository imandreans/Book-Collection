import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      light: "#909090",
      main: "#757575",
      dark: "#515151",
      contrastText: "#fff",
    },
  },
});
export const outlinedTheme = createTheme({
  palette: {
    primary: {
      light: "#737373",
      main: "#515151",
      dark: "#383838",
      contrastText: "#fff",
    },
  },
});
export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
