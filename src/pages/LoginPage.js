import React, { useState } from "react";
import { loginUser, registerUser } from "../api";
import { useNavigate, Link } from "react-router-dom";
import {
  Button,
  TextField,
  Typography,
  Box,
  Paper,
  Grow,
} from "@mui/material";
import { styled } from "@mui/system";
import CarIcon from '@mui/icons-material/DirectionsCar';
import "./LoginPage.scss"; // For additional desktop-specific animations if needed.

// Full-screen desktop-only background
const DesktopBackground = styled(Box)({
  background: "linear-gradient(90deg, #1DB954 0%, #121212 100%)",
  width: "100vw",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
  fontFamily: '"Circular", "Helvetica Neue", Arial, sans-serif',
  position: "relative",
});

// Animated overlay
const AnimatedOverlay = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "radial-gradient(circle, rgba(0,0,0,0.6), rgba(0,0,0,0.9))",
  zIndex: 0,
});

// Glassmorphic Card for Desktop
const StyledPaper = styled(Paper)(({ theme }) => ({
  position: "relative",
  zIndex: 1,
  background: "rgba(40, 40, 40, 0.95)",
  backdropFilter: "blur(12px)",
  width: "500px",
  padding: theme.spacing(6),
  borderRadius: "16px",
  boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.4)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  animation: "fadeIn 1s ease-in-out",
  "@keyframes fadeIn": {
    "0%": { opacity: 0, transform: "translateY(-20px)" },
    "100%": { opacity: 1, transform: "translateY(0)" },
  },
}));

const Header = styled(Typography)({
  color: "#fff",
  fontWeight: 700,
  fontSize: "2rem",
  marginBottom: "1.5rem",
  textAlign: "center",
});

const BodyText = styled(Typography)({
  color: "#b3b3b3",
  fontSize: "1rem",
  textAlign: "center",
  marginBottom: "1.5rem",
});

const StyledButton = styled(Button)({
  borderRadius: "50px",
  backgroundColor: "#1DB954",
  color: "#fff",
  fontWeight: 700,
  padding: "12px 24px",
  width: "100%",
  "&:hover": {
    backgroundColor: "#1ed760",
  },
});

const FormContainer = styled(Box)({
  width: "100%",
});

// Add Logo container styling
const LogoContainer = styled(Link)({
  position: "absolute",
  top: "20px",
  left: "20px",
  zIndex: 2,
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  textDecoration: 'none',
  '& .car-icon': {
    fontSize: '2.5rem',
    color: '#1DB954',
  },
});

const LogoText = styled(Typography)({
  fontSize: '2rem',
  fontWeight: 'bold',
  background: 'linear-gradient(45deg, #1DB954, #fff)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
});

function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        if (password !== confirmPassword) {
          setMessage("Passwords do not match");
          return;
        }
        await registerUser(email, password);
        setMessage("Account created successfully! You can now sign in.");
      } else {
        const response = await loginUser(email, password);
        localStorage.setItem("userEmail", email);
        setMessage(`Welcome, ${response.data.email}!`);
        navigate("/ads");
      }
    } catch (error) {
      console.error(error);
      setMessage(
        error.response?.status === 401
          ? "Invalid email or password."
          : "An error occurred. Please try again."
      );
    }
  };

  return (
    <DesktopBackground>
      <LogoContainer to="/">
        <CarIcon className="car-icon" />
        <LogoText>DriftRent</LogoText>
      </LogoContainer>
      <AnimatedOverlay />
      <Grow in>
        <StyledPaper>
          <Header>{isSignUp ? "Create an Account" : "Sign In"}</Header>
          <BodyText>
            {isSignUp
              ? "Already have an account?"
              : "Don't have an account yet?"}{" "}
            <Button
              onClick={() => setIsSignUp(!isSignUp)}
              sx={{ color: "#1DB954", textTransform: "none", fontWeight: 700 }}
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </Button>
          </BodyText>
          <FormContainer>
            <form onSubmit={handleFormSubmit}>
              <TextField
                type="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                margin="normal"
                InputLabelProps={{ style: { color: "#b3b3b3" } }}
                InputProps={{ style: { color: "#fff" } }}
              />
              <TextField
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
                margin="normal"
                InputLabelProps={{ style: { color: "#b3b3b3" } }}
                InputProps={{ style: { color: "#fff" } }}
              />
              {isSignUp && (
                <TextField
                  type="password"
                  label="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ style: { color: "#b3b3b3" } }}
                  InputProps={{ style: { color: "#fff" } }}
                />
              )}
              <StyledButton type="submit">
                {isSignUp ? "Sign Up" : "Sign In"}
              </StyledButton>
            </form>
            {message && (
              <BodyText sx={{ mt: 2, color: "#f00" }}>{message}</BodyText>
            )}
          </FormContainer>
        </StyledPaper>
      </Grow>
    </DesktopBackground>
  );
}

export default LoginPage;
