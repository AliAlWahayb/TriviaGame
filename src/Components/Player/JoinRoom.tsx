import { Box, Typography, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React from "react";

function JoinRoom() {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    roomCode: "",
    name: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "roomCode" ? value : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.roomCode && formData.name) {
      navigate(`/player/${formData.roomCode}`);
    }
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
        px: 2
      }}
    >
      <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2 }}>
        Join Room
      </Typography>
      
      <Typography variant="h6" sx={{ mb: 4, color: "text.secondary" }}>
        Enter your name and room code to join the game
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ 
          width: '100%',
          maxWidth: 400,
          display: "flex",
          flexDirection: "column",
          gap: 3
        }}
      >
        <TextField
          required
          fullWidth
          name="name"
          label="Player Name"
          variant="outlined"
          value={formData.name}
          onChange={handleInputChange}
          inputProps={{ maxLength: 20 }}
        />

        <TextField
          required
          fullWidth
          name="roomCode"
          label="Room Code"
          variant="outlined"
          value={formData.roomCode}
          onChange={handleInputChange}
          inputProps={{ 
            maxLength: 4,
            style: { textTransform: "uppercase" }
          }}
        />

        <Box sx={{ 
          display: "flex", 
          gap: 2, 
          justifyContent: "center",
          mt: 3
        }}>
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
          
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={!formData.name || !formData.roomCode}
          >
            Join Room
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default JoinRoom;