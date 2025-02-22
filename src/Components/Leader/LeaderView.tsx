import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Box,
  Typography,
  CircularProgress,
  useTheme,
  IconButton,
} from "@mui/material";
import { useParams } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";

interface Player {
  id: string;
  name: string;
  score: number;
}

interface GameData {
  question: string;
  activePlayer: Player | null;
  queue: Player[];
  timer: number;
}

const LeaderPage: React.FC = () => {
  const navigate = useNavigate();
  

  const { roomCode } = useParams<{ roomCode: string }>();
  const theme = useTheme();

  const [leaderboard, setLeaderboard] = useState<Player[]>([
    { id: "1", name: "Alice", score: 30 },
    { id: "2", name: "Bob", score: 20 },
    { id: "3", name: "Charlie", score: 10 },
  ]);

  const [gameData, setGameData] = useState<GameData>({
    question:
      "What is the capital of FranceWhat is the capital of FranceWhat is the capital of FranceWhat is the capital of France?",
    activePlayer: { id: "2", name: "Bob", score: 20 },
    queue: [
      { id: "3", name: "Charlie", score: 10 },
      { id: "1", name: "Alice", score: 30 },
    ],
    timer: 10,
  });

  const [timeLeft, setTimeLeft] = useState<number>(10);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      skipPlayer();
    }
  }, [timeLeft]);

  const skipPlayer = () => {
    if (gameData.queue.length > 0) {
      const nextPlayer = gameData.queue[0];
      setGameData((prev) => ({
        ...prev,
        activePlayer: nextPlayer,
        queue: prev.queue.slice(1),
        timer: 10,
      }));
      setTimeLeft(10);
    }
  };

  const correctAnswer = () => {
    if (gameData.activePlayer) {
      setLeaderboard((prev) =>
        prev.map((p) =>
          p.id === gameData.activePlayer?.id ? { ...p, score: p.score + 10 } : p
        )
      );
      skipPlayer();
    }
  };

  const skipQuestion = () => {
    setGameData({
      question: "New Random Question?",
      activePlayer: null,
      queue: [],
      timer: 10,
    });
    setTimeLeft(10);
  };

  const handleSettingsOpen = () => {
    navigate(`/room/${roomCode}/LeaderSettings`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        backgroundColor: theme.palette.background.default,
      }}
    >
      {/* Leaderboard Panel */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          p: 3,
          borderRight: `1px solid ${theme.palette.divider}`,
          minWidth: 300,
        }}
      >
        <Typography
          variant="h5"
          sx={{ mb: 3, fontWeight: 700, textAlign: "center" }}
        >
          Leaderboard
        </Typography>
        <Box sx={{ flex: 1, overflow: "auto" }}>
          {leaderboard.map((player, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 1.5,
                mb: 1,
                borderRadius: 1,
                backgroundColor: theme.palette.grey[100],
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {player.name}
              </Typography>
              <Typography
                variant="body1"
                color="primary"
                sx={{ fontWeight: 700 }}
              >
                {player.score}
              </Typography>
            </Box>
          ))}
        </Box>
        <Button
          variant="contained"
          color="error"
          onClick={skipQuestion}
          sx={{ mt: 2, py: 1.5 }}
          fullWidth
        >
          Skip Question
        </Button>
      </Box>

      {/* Main Game Panel */}
      <Box
        sx={{
          flex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 4,
          borderRight: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
          {gameData.question}
        </Typography>

        <Box sx={{ position: "relative", display: "inline-flex", mb: 1 }}>
          <CircularProgress
            variant="determinate"
            value={(timeLeft / 10) * 100}
            size={60}
            thickness={2}
            sx={{ color: theme.palette.primary.main }}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h4" component="div">
              {timeLeft}
            </Typography>
          </Box>
        </Box>

        {gameData.activePlayer && (
          <Typography variant="h5" sx={{ mb: 4 }}>
            Now Answering:{" "}
            <Box component="span" color="primary.main">
              {gameData.activePlayer.name}
            </Box>
          </Typography>
        )}

        <Box sx={{ display: "flex", gap: 2, mt: "auto" }}>
          <Button
            variant="contained"
            color="warning"
            onClick={skipPlayer}
            sx={{ px: 4, py: 2, fontSize: "1.1rem" }}
          >
            Skip Player
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={correctAnswer}
            sx={{ px: 4, py: 2, fontSize: "1.1rem" }}
          >
            Correct Answer
          </Button>
        </Box>
      </Box>

      {/* Queue Panel */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          p: 3,
          minWidth: 300,
        }}
      >
        <Typography
          variant="h5"
          sx={{ mb: 3, fontWeight: 700, textAlign: "center" }}
        >
          Answer Queue
        </Typography>
        <Box sx={{ flex: 1, overflow: "auto" }}>
          {gameData.queue.length > 0 ? (
            gameData.queue.map((player, index) => (
              <Box
                key={index}
                sx={{
                  p: 1.5,
                  mb: 1,
                  borderRadius: 1,
                  backgroundColor: theme.palette.grey[100],
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 500, textAlign: "center" }}
                >
                  {player.name}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                fontStyle: "italic",
                textAlign: "center",
                mt: 2,
              }}
            >
              No players in queue
            </Typography>
          )}
        </Box>
        <Box
          sx={{ mt: "auto", display: "flex", justifyContent: "space-between" }}
        >
          <IconButton aria-label="Settings" onClick={handleSettingsOpen}>
            <SettingsIcon />
          </IconButton>
          <Typography
            variant="body1"
            sx={{ ml: 1, fontWeight: 500, alignContent: "center" }}
          >
            Room Code: {roomCode}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LeaderPage;
