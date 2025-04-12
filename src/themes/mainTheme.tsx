import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const theme = responsiveFontSizes(
  createTheme({
    colorSchemes: {
      dark: true,
    },
    shape: {
      borderRadius: 16,
    },
  })
);

export { theme };
