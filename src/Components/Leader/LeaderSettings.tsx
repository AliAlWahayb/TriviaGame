import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
  IconButton,
  Alert,
} from "@mui/material";
import { Delete, Edit, ExitToApp, ArrowBack } from "@mui/icons-material";

interface Player {
  id: string;
  name: string;
  score: number;
}

const LeaderSettingsPage: React.FC = () => {
  const navigate = useNavigate();

  const [players, setPlayers] = useState<Player[]>([
    { id: "1", name: "Alice", score: 45 },
    { id: "2", name: "Bob", score: 30 },
    { id: "3", name: "Charlie", score: 25 },
  ]);

  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [newScore, setNewScore] = useState("");
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openEndDialog, setOpenEndDialog] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleKickPlayer = (playerId: string) => {
    setPlayers((prev) => prev.filter((p) => p.id !== playerId));
    setFeedback("Player kicked successfully");
  };

  const handleEditScore = () => {
    if (!selectedPlayer || !newScore) return;

    setPlayers((prev) =>
      prev.map((p) =>
        p.id === selectedPlayer.id ? { ...p, score: Number(newScore) } : p
      )
    );

    setOpenEditDialog(false);
    setNewScore("");
    setFeedback("Score updated successfully");
  };

  const handleFinishGame = () => {
    setOpenEndDialog(true);
  };

  const handleBack = () => {
    navigate(-1);
  };
  const handleHome = () => {
    navigate("/");
    setOpenEndDialog(false);
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, margin: "0 auto", pt: 0 }}>
      <Typography variant="h4" gutterBottom>
        Game Settings
      </Typography>

      {feedback && (
        <Alert severity="info" sx={{ mb: 2 }} onClose={() => setFeedback(null)}>
          {feedback}
        </Alert>
      )}

      {/* Player List */}
      <List sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Players ({players.length})
        </Typography>
        {players.map((player) => (
          <ListItem
            key={player.id}
            secondaryAction={
              <>
                <IconButton
                  edge="end"
                  onClick={() => {
                    setSelectedPlayer(player);
                    setOpenEditDialog(true);
                  }}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  edge="end"
                  onClick={() => handleKickPlayer(player.id)}
                  sx={{ ml: 1 }}
                >
                  <Delete color="error" />
                </IconButton>
              </>
            }
          >
            <ListItemText
              primary={player.name}
              secondary={`Score: ${player.score}`}
            />
          </ListItem>
        ))}
      </List>

      {/* Game Controls */}
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        <Button
          variant="contained"
          color="error"
          startIcon={<ExitToApp />}
          onClick={handleFinishGame}
        >
          End Game
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<ArrowBack />}
          onClick={handleBack}
        >
          Back
        </Button>
      </Box>

      {/* Edit Score Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>
          {selectedPlayer
            ? `Edit ${selectedPlayer.name}'s Score`
            : "Set Max Score"}
        </DialogTitle>
        <DialogContent sx={{ minWidth: 300 }}>
          <TextField
            autoFocus
            margin="dense"
            label={selectedPlayer ? "New Score" : "Maximum Score"}
            type="number"
            fullWidth
            variant="standard"
            sx={{ input: { color: 'black' } }}
            value={newScore}
            onChange={(e) => setNewScore(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button onClick={handleEditScore}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* End Room Dialog */}
      <Dialog open={openEndDialog} onClose={() => setOpenEndDialog(false)} maxWidth="sm">
        <DialogTitle color="error">Game Ended</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }} color="primary" align="center">
            The Winner is:
            <br />
            {players.find((p) => p.score === Math.max(...players.map((p) => p.score)))?.name}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button color="primary" variant="contained" onClick={handleHome}>Home Page</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LeaderSettingsPage;
