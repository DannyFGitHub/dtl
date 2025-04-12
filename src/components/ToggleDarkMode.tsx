import IconButton from "@mui/material/IconButton";
import { useColorScheme } from "@mui/material/styles";

import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";

const MODES: ("system" | "light" | "dark" | undefined)[] = [
  "system",
  "light",
  "dark",
];

export function ToggleDarkMode() {
  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return null;
  }

  function toggleMode() {
    if (mode)
      setMode(
        MODES[(MODES.indexOf(mode) + 1) % MODES.length] as
          | "system"
          | "light"
          | "dark"
      );
  }

  return (
    <IconButton
      onClick={() => {
        toggleMode();
      }}
    >
      {mode === "dark" ? (
        <DarkModeIcon color="secondary" />
      ) : mode === "system" ? (
        <SettingsSuggestIcon />
      ) : (
        <LightModeIcon color="primary" />
      )}
    </IconButton>
  );
}
