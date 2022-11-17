import { ThemeProvider } from "@mui/material/styles";
import "react-h5-audio-player/lib/styles.css";
import Player from "./container/AudioPlayer";
import { theme } from "./theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Player />
    </ThemeProvider>
  );
}
