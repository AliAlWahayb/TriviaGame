import { Typography, Button, Container } from "@mui/material";
import Box from "@mui/material/Box";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import DoorFrontIcon from "@mui/icons-material/DoorFront";
import { useNavigate } from "react-router-dom";



function App() {
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    navigate("/create-room");
  };
  const handleJoinRoom = () => {
    navigate("/join-room");
  };
  return (
      <Container
        sx={{
          maxWidth: "100%",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "90vh",
            textAlign: "center",
            "& > *": {
              m: 1,
            },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              color: "text.primary",
              textAlign: "center",
            }}
            gutterBottom
          >
            Trivia{" "}
            <Typography
              variant="h2"
              sx={{
                fontWeight: "bold",
                color: "primary.main",
                textAlign: "center",
              }}
              gutterBottom
            >
              Game
            </Typography>
          </Typography>

          <Typography
            variant="h6"
            sx={{ color: "text.secondary", textAlign: "center" }}
            gutterBottom
          >
            A side project to learn React
          </Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<DoorFrontIcon />}
              color="primary"
              size="large"
              onClick={handleCreateRoom}
            >
              Create Room
            </Button>
            <Button
              variant="contained"
              startIcon={<MeetingRoomIcon />}
              color="secondary"
              size="large"
              onClick={handleJoinRoom}
            >
              Join Room
            </Button>
          </Box>
        </Box>
      </Container>
  );
}

export default App;
