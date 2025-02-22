import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Home from "./Components/Main/Home";
import CreateRoom from "./Components/Leader/CreateRoom";
import LeaderView from "./Components/Leader/LeaderView";
import LeaderSettings from "./Components/Leader/LeaderSettings";
import JoinRoom from "./Components/Player/JoinRoom";
import PlayerView from "./Components/Player/PlayerView";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4ca6ff",
    },
    secondary: {
      main: "#1976D2",
    },
    text: {
      primary: "#ffffff",
      secondary: "#94a0b8",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-room" element={<CreateRoom />} />
          <Route path="/room/:roomCode" element={<LeaderView />} />
          <Route
            path="/room/:roomCode/LeaderSettings"
            element={<LeaderSettings />}
          />
          <Route path="/join-room" element={<JoinRoom />} />
          <Route path="/player/:roomCode" element={<PlayerView />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
