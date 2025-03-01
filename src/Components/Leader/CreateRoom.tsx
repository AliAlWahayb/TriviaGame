/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Typography, Button, TextField, Switch } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React from "react";
import { CreateRoom } from "../../api/admin";

function CreateRoomPage() {
  const navigate = useNavigate();

  const [roomSettings, setRoomSettings] = React.useState({
    roomCode: generateRoomCode(),
    enableQuestions: false,
    numQuestions: 10,
    enableTimeLimit: false,
    gameTime: 30,
  });

  const handleSwitchChange = (event: {
    target: { name: any; checked: any };
  }) => {
    const { name, checked } = event.target;
    setRoomSettings({ ...roomSettings, [name]: checked });
  };

  const handleInputChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    const validatedValue =
      name === "numQuestions" || name === "gameTime"
        ? Math.max(1, parseInt(value, 10) || 1)
        : value;
    setRoomSettings({ ...roomSettings, [name]: validatedValue });
  };

  function generateRoomCode(length = 4) {
    const characters =
      "abcdefghijklmnopqrstuvwxyz";
    let roomCode = "";
    for (let i = 0; i < length; i++) {
      roomCode += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return roomCode;
  }

  const handleRoom = () => {
    CreateRoom(roomSettings.roomCode);
    navigate(`/room/${roomSettings.roomCode}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h2"
        sx={{ fontWeight: "bold", color: "primary.main" }}
      >
        Create Room
      </Typography>
      <Typography variant="h6" sx={{ color: "text.secondary" }}>
        Welcome to the Create Room page. Here you can create a new trivia room.
      </Typography>
      <Box
        sx={{ my: 2, display: "flex", flexDirection: "column", gap: 2 }}
        component="form"
        noValidate
        autoComplete="off"
      >
        <Typography variant="h6" sx={{ color: "error.main" }}>
          Room Code: {roomSettings.roomCode}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <TextField
            disabled={!roomSettings.enableQuestions}
            id="num-questions"
            label="Number of Questions"
            type="number"
            variant="standard"
            value={roomSettings.numQuestions}
            onChange={handleInputChange}
            name="numQuestions"
            sx={{ input: { color: 'black' } }}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <Switch
            checked={roomSettings.enableQuestions}
            onChange={handleSwitchChange}
            name="enableQuestions"
            inputProps={{ "aria-label": "controlled" }}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <TextField
            disabled={!roomSettings.enableTimeLimit}
            id="game-time"
            label="Game Time (minutes)"
            type="number"
            variant="standard"
            value={roomSettings.gameTime}
            onChange={handleInputChange}
            name="gameTime"
            sx={{ input: { color: 'black' } }}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <Switch
            checked={roomSettings.enableTimeLimit}
            onChange={handleSwitchChange}
            name="enableTimeLimit"
            inputProps={{ "aria-label": "controlled" }}
          />
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="outlined"
          color="secondary"
          size="large"
          sx={{ marginTop: 2 }}
          onClick={() => window.history.back()}
        >
          Back to Home
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ marginTop: 2 }}
          onClick={handleRoom}
        >
          Create Room
        </Button>
      </Box>
    </Box>
  );
}

export default CreateRoomPage;
