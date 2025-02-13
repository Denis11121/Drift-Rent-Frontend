import React, { useState } from 'react';
import { styled } from '@mui/system';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Container,
  Link,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api';

const PageContainer = styled(Box)({
  background: 'linear-gradient(135deg, #1DB954 0%, #121212 100%)',
  minHeight: '100vh',
  minWidth: '100vw',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
});

const SignUpForm = styled(Paper)({
  padding: '40px',
  borderRadius: '15px',
  backgroundColor: 'rgba(18, 18, 18, 0.95)',
  backdropFilter: 'blur(10px)',
  maxWidth: '400px',
  width: '100%',
});

const StyledTextField = styled(TextField)({
  marginBottom: '20px',
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.23)',
    },
    '&:hover fieldset': {
      borderColor: '#1DB954',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#1DB954',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#ccc',
  },
  '& .MuiInputBase-input': {
    color: '#fff',
  },
});

const SubmitButton = styled(Button)({
  backgroundColor: '#1DB954',
  padding: '12px',
  marginTop: '20px',
  '&:hover': {
    backgroundColor: '#1ed760',
  },
});

function SignUpPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await registerUser(
        formData.email,
        formData.password,
        formData.firstName,
        formData.lastName,
        formData.phoneNumber
      );
      
      localStorage.setItem("userEmail", formData.email);
      
      setMessage("Account created successfully!");
      setTimeout(() => {
        navigate('/ads');
      }, 1000);
    } catch (error) {
      console.error('Registration error:', error);
      setMessage(error.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <PageContainer>
      <Container maxWidth="sm">
        <SignUpForm elevation={3}>
          <Typography variant="h4" color="#fff" gutterBottom align="center">
            Create Account
          </Typography>
          <Typography variant="body2" color="#ccc" align="center" sx={{ mb: 4 }}>
            Join DriftRent and start your journey
          </Typography>

          <form onSubmit={handleSubmit}>
            <StyledTextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <StyledTextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <StyledTextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <StyledTextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <StyledTextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <StyledTextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              placeholder="+1234567890"
              helperText="Include country code (e.g., +1 for USA)"
              sx={{ mb: 2 }}
            />

            {message && (
              <Typography 
                color={message.includes("successfully") ? "#1DB954" : "error"} 
                align="center" 
                sx={{ mt: 2 }}
              >
                {message}
              </Typography>
            )}

            <SubmitButton
              type="submit"
              variant="contained"
              fullWidth
              size="large"
            >
              Sign Up
            </SubmitButton>
          </form>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="#ccc">
              Already have an account?{' '}
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate('/login')}
                sx={{
                  color: '#1DB954',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Login here
              </Link>
            </Typography>
          </Box>
        </SignUpForm>
      </Container>
    </PageContainer>
  );
}

export default SignUpPage; 