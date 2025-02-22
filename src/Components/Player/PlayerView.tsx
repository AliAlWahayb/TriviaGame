import {
  Box,
  Typography,
  Button,
  IconButton,
  useTheme,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PlayerView: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [playerState, setPlayerState] = React.useState({
    name: "John Doe",
    score: 0,
    isInQueue: false,
    queuePosition: 0,
  });

  const [openLeaveDialog, setOpenLeaveDialog] = useState(false);

  const handleQueueToggle = () => {
    setPlayerState((prev) => ({ ...prev, isInQueue: true }));
  };

  const handleLeave = () => {
    navigate("/");
    setOpenLeaveDialog(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "95vh",
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <Box sx={{ p: 2, display: "flex", gap: 5 }}>
        <Typography
          sx={{ alignContent: "center" }}
          align="center"
          variant="h6"
          color="primary"
        >
          {playerState.name}
        </Typography>
        <Typography
          sx={{ alignContent: "center" }}
          align="center"
          variant="h6"
          color="primary"
        >
          Score: {playerState.score}
        </Typography>
        <Typography
          sx={{ alignContent: "center" }}
          align="center"
          variant="h6"
          color="primary"
        >
          Queue Position: {playerState.queuePosition}
        </Typography>
        <IconButton color="primary" onClick={() => setOpenLeaveDialog(true)}>
          <ExitToAppIcon />
        </IconButton>
      </Box>

      <Button
        variant="contained"
        color={playerState.isInQueue ? "warning" : "primary"}
        size="large"
        onClick={handleQueueToggle}
        sx={{ flexGrow: 2, width: "90%", height: "90%" }}
      >
        {playerState.isInQueue ? "Wait" : "Answer"}
      </Button>

      {/* Leave Dialog */}
      <Dialog open={openLeaveDialog} onClose={() => setOpenLeaveDialog(false)}>
        <DialogTitle color="primary">
          Are you sure you want to leave?
        </DialogTitle>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setOpenLeaveDialog(false)}
          >
            Cancel
          </Button>{" "}
          <Button variant="contained" color="primary" onClick={handleLeave}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PlayerView;
