import React, { useEffect } from 'react';
import { styled, keyframes } from '@mui/system';
import { Typography, Box, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CarIcon from '@mui/icons-material/DirectionsCar';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import SupportIcon from '@mui/icons-material/Support';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const slideIn = keyframes`
  from { transform: translateX(-100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const HeroSection = styled(Box)({
  minHeight: '100vh',
  minWidth: '100vw',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
  background: '#0a0a0a',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 20% 30%, rgba(29, 185, 84, 0.15) 0%, transparent 40%),
      radial-gradient(circle at 80% 70%, rgba(29, 185, 84, 0.1) 0%, transparent 30%)
    `,
    zIndex: 1,
  },
});

const BackgroundCars = styled(Box)({
  position: 'absolute',
  width: '100%',
  height: '100%',
  opacity: 0.1,
  background: 'url("/car-pattern.png")', // You'll need to add this image
  animation: `${float} 20s ease-in-out infinite`,
});

const Logo = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  marginBottom: '2rem',
  animation: `${slideIn} 1s ease-out`,
  '& .car-icon': {
    fontSize: '4rem',
    color: '#1DB954',
    animation: `${float} 3s ease-in-out infinite`,
  },
});

const ContentWrapper = styled(Container)({
  textAlign: 'center',
  marginTop: '10vh',
  position: 'relative',
  zIndex: 2,
});

const ActionButton = styled(Button)(({ delay = 0 }) => ({
  backgroundColor: '#1DB954',
  color: '#fff',
  padding: '15px 40px',
  borderRadius: '30px',
  fontSize: '1.1rem',
  margin: '10px',
  textTransform: 'none',
  animation: `${fadeIn} 1s ease-out forwards`,
  animationDelay: `${delay}ms`,
  opacity: 0,
  '&:hover': {
    backgroundColor: '#1ed760',
    transform: 'translateY(-3px)',
    boxShadow: '0 7px 14px rgba(29, 185, 84, 0.2)',
    transition: 'all 0.3s ease',
  },
}));

const FeatureCard = styled(Box)(({ delay = 0 }) => ({
  padding: '20px',
  borderRadius: '15px',
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  margin: '10px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  animation: `${fadeIn} 1s ease-out forwards`,
  animationDelay: `${delay}ms`,
  opacity: 0,
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
}));

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Add any initialization logic here
  }, []);

  return (
    <HeroSection>
      <BackgroundCars />
      <ContentWrapper maxWidth="lg">
        <Logo>
          <CarIcon className="car-icon" sx={{ fontSize: '4rem' }} />
          <Typography 
            variant="h2" 
            component="h1" 
            color="#fff" 
            fontWeight="bold"
            sx={{ 
              background: 'linear-gradient(45deg, #1DB954, #fff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            DriftRent
          </Typography>
        </Logo>
        
        <Typography 
          variant="h3" 
          color="#fff" 
          sx={{ 
            mb: 4,
            animation: `${fadeIn} 1s ease-out`,
            animationDelay: '300ms',
            opacity: 0,
            animationFillMode: 'forwards',
          }}
        >
          Drive Your Dreams
        </Typography>
        
        <Typography 
          variant="h6" 
          color="#ccc" 
          sx={{ 
            mb: 6,
            animation: `${fadeIn} 1s ease-out`,
            animationDelay: '600ms',
            opacity: 0,
            animationFillMode: 'forwards',
          }}
        >
          Experience luxury and performance with our premium car rental service
        </Typography>

        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: 3, 
            flexWrap: 'wrap',
            mb: 6 
          }}
        >
          <ActionButton delay={900} onClick={() => navigate('/login')}>
            Start Your Journey
          </ActionButton>
          <ActionButton 
            delay={1200}
            onClick={() => navigate('/signup')}
            sx={{ 
              backgroundColor: 'transparent',
              border: '2px solid #1DB954',
              '&:hover': {
                backgroundColor: 'rgba(29, 185, 84, 0.1)',
                border: '2px solid #1ed760',
              }
            }}
          >
            Create Account
          </ActionButton>
        </Box>

        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            flexWrap: 'wrap',
            gap: 2,
            mt: 4 
          }}
        >
          <FeatureCard delay={1500}>
            <SpeedIcon sx={{ fontSize: 40, color: '#1DB954', mb: 2 }} />
            <Typography variant="h6" color="#fff" gutterBottom>
              Fast & Easy
            </Typography>
            <Typography variant="body2" color="#ccc">
              Book your car in minutes
            </Typography>
          </FeatureCard>

          <FeatureCard delay={1700}>
            <SecurityIcon sx={{ fontSize: 40, color: '#1DB954', mb: 2 }} />
            <Typography variant="h6" color="#fff" gutterBottom>
              Secure Booking
            </Typography>
            <Typography variant="body2" color="#ccc">
              100% secure payment
            </Typography>
          </FeatureCard>

          <FeatureCard delay={1900}>
            <SupportIcon sx={{ fontSize: 40, color: '#1DB954', mb: 2 }} />
            <Typography variant="h6" color="#fff" gutterBottom>
              24/7 Support
            </Typography>
            <Typography variant="body2" color="#ccc">
              Always here to help
            </Typography>
          </FeatureCard>
        </Box>

        <Box sx={{ mt: 6 }}>
          <Button 
            variant="text" 
            onClick={() => navigate('/ads')}
            sx={{ 
              color: '#ccc',
              textDecoration: 'underline',
              '&:hover': {
                color: '#1DB954',
              }
            }}
          >
            Browse as Guest →
          </Button>
        </Box>
      </ContentWrapper>
    </HeroSection>
  );
}

export default HomePage; 