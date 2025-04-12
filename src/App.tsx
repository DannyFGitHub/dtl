import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./themes/mainTheme";
import Box from "@mui/material/Box";
import { ID3Page } from "./pages/ID3Page";

function App() {
  return (
    <Box width="100vw" height="100vh">
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <ID3Page />
      </ThemeProvider>
    </Box>
  );
}

export default App;
