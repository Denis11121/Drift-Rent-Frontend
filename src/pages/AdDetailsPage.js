import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { styled, keyframes } from '@mui/system';
import {
  Typography,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Rating,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  Avatar,
} from '@mui/material';
import {
  Speed as SpeedIcon,
  Speed,
  CalendarToday,
  Settings,
  ArrowBack,
  Share,
  Favorite,
  Phone,
  Email,
  WhatsApp,
  LocalGasStation,
  ColorLens,
  VpnKey,
} from '@mui/icons-material';

// Keyframes for animations
const neonGlow = keyframes`
  0%, 100% { text-shadow: 0 0 10px #1DB954, 0 0 20px #1DB954, 0 0 30px #1DB954; }
  50% { text-shadow: 0 0 20px #1DB954, 0 0 30px #1DB954, 0 0 40px #1DB954; }
`;

const parallaxScroll = keyframes`
  0% { background-position: 0% 0%; }
  100% { background-position: 100% 100%; }
`;

const slideIn = keyframes`
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const pulseGlow = keyframes`
  0%, 100% { 
    box-shadow: 0 0 20px rgba(29, 185, 84, 0.5),
                0 0 40px rgba(29, 185, 84, 0.3),
                0 0 60px rgba(29, 185, 84, 0.1);
  }
  50% { 
    box-shadow: 0 0 30px rgba(29, 185, 84, 0.8),
                0 0 60px rgba(29, 185, 84, 0.5),
                0 0 90px rgba(29, 185, 84, 0.2);
  }
`;

const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(2deg); }
`;

const priceEntrance = keyframes`
  0% { transform: translateY(-100px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
`;

const PageContainer = styled(Box)({
  background: 'linear-gradient(135deg, #0a0a0a 0%, #0a2818 50%, #0a0a0a 100%)',
  minHeight: '100vh',
  minWidth: '100vw',
  position: 'relative',
  overflowX: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 50% 50%, rgba(29, 185, 84, 0.1) 0%, transparent 50%)',
    pointerEvents: 'none',
  }
});

const HeroSection = styled(Box)({
  position: 'relative',
  width: '100%',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  padding: '40px 20px',
  background: 'linear-gradient(-45deg, #000000, #0a2818, #000000, #1DB954)',
  backgroundSize: '400% 400%',
  animation: `${parallaxScroll} 15s ease infinite`,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      linear-gradient(90deg, rgba(29, 185, 84, 0.03) 1px, transparent 1px),
      linear-gradient(0deg, rgba(29, 185, 84, 0.03) 1px, transparent 1px)
    `,
    backgroundSize: '30px 30px',
    animation: `${parallaxScroll} 30s linear infinite`,
    opacity: 0.5,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.8) 100%)',
  },
});

const NeonText = styled(Typography)({
  fontSize: '4rem',
  fontWeight: 'bold',
  color: '#1DB954',
  textTransform: 'uppercase',
  animation: `${neonGlow} 2s infinite`,
  textAlign: 'center',
});

const InteractiveModel = styled(Box)({
  position: 'absolute',
  width: '100%',
  height: '100%',
  perspective: '1000px',
  transformStyle: 'preserve-3d',
  '& img': {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%) rotateY(0deg)',
    animation: `${parallaxScroll} 20s infinite linear`,
    maxWidth: '80%',
    maxHeight: '80%',
    filter: 'drop-shadow(0 0 30px rgba(29, 185, 84, 0.3))',
  },
});

const PriceTag = styled(Box)({
  position: 'relative',
  background: 'rgba(0, 0, 0, 0.9)',
  backdropFilter: 'blur(10px)',
  padding: '30px 50px',
  borderRadius: '20px',
  border: '2px solid #1DB954',
  animation: `${priceEntrance} 1s ease-out forwards, ${floatAnimation} 3s ease-in-out infinite`,
  zIndex: 10,
  margin: '40px auto 0',
  width: 'fit-content',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    background: 'linear-gradient(45deg, #1DB954, transparent, #1DB954)',
    borderRadius: '22px',
    zIndex: -1,
    animation: `${pulseGlow} 2s infinite`,
  },
});

const SpecCard = styled(Box)({
  background: 'rgba(0, 0, 0, 0.6)',
  backdropFilter: 'blur(10px)',
  padding: '20px',
  borderRadius: '15px',
  border: '1px solid rgba(29, 185, 84, 0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    border: '1px solid #1DB954',
    boxShadow: '0 10px 20px rgba(29, 185, 84, 0.2)',
    '& .spec-value': {
      color: '#1DB954',
      transform: 'scale(1.1)',
    },
  },
});

const DetailsPanel = styled(Box)({
  position: 'relative',
  background: 'rgba(0, 0, 0, 0.8)',
  backdropFilter: 'blur(10px)',
  padding: '40px',
  borderRadius: '20px',
  marginTop: '-100px',
  marginX: '20px',
  animation: `${slideIn} 1s ease-out forwards`,
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
  zIndex: 2,
  border: '1px solid rgba(29, 185, 84, 0.2)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, transparent, rgba(29, 185, 84, 0.1))',
    borderRadius: '20px',
    zIndex: -1,
  },
});

const OwnerProfileDialog = ({ open, onClose, owner }) => {
  console.log('Dialog props:', { open, owner });

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        style: {
          backgroundColor: '#121212',
          borderRadius: '20px',
          border: '1px solid rgba(29, 185, 84, 0.3)',
          boxShadow: '0 0 30px rgba(29, 185, 84, 0.2)',
        },
      }}
    >
      <DialogTitle 
        sx={{ 
          textAlign: 'center', 
          color: '#1DB954',
          borderBottom: '1px solid rgba(29, 185, 84, 0.2)',
          padding: '20px',
        }}
      >
        Owner Information
      </DialogTitle>
      <DialogContent 
        sx={{ 
          textAlign: 'center',
          padding: '30px',
          background: 'linear-gradient(180deg, #121212 0%, #0a0a0a 100%)',
        }}
      >
        <Avatar
          sx={{
            width: 100,
            height: 100,
            margin: '0 auto',
            backgroundColor: '#1DB954',
            fontSize: '2.5rem',
            border: '3px solid rgba(29, 185, 84, 0.5)',
            boxShadow: '0 0 20px rgba(29, 185, 84, 0.3)',
          }}
        >
          {owner?.firstName?.[0] || ''}{owner?.lastName?.[0] || ''}
        </Avatar>
        <Typography 
          variant="h5" 
          sx={{ 
            mt: 3, 
            color: '#fff',
            fontWeight: 'bold',
            textShadow: '0 0 10px rgba(29, 185, 84, 0.3)',
          }}
        >
          {owner?.firstName || 'N/A'} {owner?.lastName || 'N/A'}
        </Typography>
        <Rating 
          value={4.5} 
          readOnly 
          size="large" 
          sx={{ 
            mt: 2,
            '& .MuiRating-iconFilled': {
              color: '#1DB954',
            },
          }} 
        />
        <Box sx={{ 
          mt: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}>
          <Button
            startIcon={<Phone />}
            onClick={() => window.location.href = `tel:${owner?.phone || ''}`}
            sx={{
              color: '#fff',
              backgroundColor: 'rgba(29, 185, 84, 0.1)',
              border: '1px solid rgba(29, 185, 84, 0.3)',
              padding: '12px 24px',
              borderRadius: '10px',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(29, 185, 84, 0.2)',
                transform: 'translateY(-2px)',
                boxShadow: '0 5px 15px rgba(29, 185, 84, 0.2)',
              },
            }}
          >
            Call
          </Button>
          <Button
            startIcon={<Email />}
            onClick={() => window.location.href = `mailto:${owner?.email || ''}`}
            sx={{
              color: '#fff',
              backgroundColor: 'rgba(29, 185, 84, 0.1)',
              border: '1px solid rgba(29, 185, 84, 0.3)',
              padding: '12px 24px',
              borderRadius: '10px',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(29, 185, 84, 0.2)',
                transform: 'translateY(-2px)',
                boxShadow: '0 5px 15px rgba(29, 185, 84, 0.2)',
              },
            }}
          >
            Email
          </Button>
          <Button
            startIcon={<WhatsApp />}
            onClick={() => window.open(`https://wa.me/${owner?.phone || ''}?text=I'm interested in your car`)}
            sx={{
              color: '#fff',
              backgroundColor: 'rgba(29, 185, 84, 0.1)',
              border: '1px solid rgba(29, 185, 84, 0.3)',
              padding: '12px 24px',
              borderRadius: '10px',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(29, 185, 84, 0.2)',
                transform: 'translateY(-2px)',
                boxShadow: '0 5px 15px rgba(29, 185, 84, 0.2)',
              },
            }}
          >
            WhatsApp
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

function AdDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorite, setFavorite] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const response = await fetch(`http://localhost:8081/ad/id/${id}`);
        if (!response.ok) throw new Error('Ad not found');
        const data = await response.json();
        console.log('Fetched ad data:', data);
        setAd(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAd();
  }, [id]);

  const handleShare = () => {
    navigator.share({
      title: ad.title,
      text: ad.description,
      url: window.location.href,
    }).catch(console.error);
  };

  if (loading) {
    return (
      <PageContainer>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
          <CircularProgress sx={{ color: '#1DB954' }} />
        </Box>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
          <Typography variant="h5" color="error" gutterBottom>
            {error}
          </Typography>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/ads')}
            sx={{ color: '#1DB954' }}
          >
            Back to Ads
          </Button>
        </Box>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <HeroSection>
        <InteractiveModel>
          <img src={ad.carDTO.imageUrl} alt={ad.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </InteractiveModel>
        
        <Box sx={{ position: 'relative', zIndex: 10 }}>
          <NeonText>
            {ad.carDTO.brand} {ad.carDTO.model}
          </NeonText>
          
          <PriceTag>
            <Typography
              sx={{
                fontSize: '0.9rem',
                color: '#1DB954',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                textAlign: 'center',
                mb: 1,
              }}
            >
              Daily Rate
            </Typography>
                  <Typography 
                    variant="h3" 
                    sx={{ 
                      fontWeight: 'bold',
                      color: '#fff',
                textAlign: 'center',
                textShadow: '0 0 10px rgba(29, 185, 84, 0.5)',
              }}
            >
              ${ad.price}
            </Typography>
          </PriceTag>
        </Box>
      </HeroSection>

      <DetailsPanel>
                    <Typography 
          variant="h4" 
                      sx={{ 
            color: '#1DB954', 
            mb: 4, 
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            textShadow: '0 0 10px rgba(29, 185, 84, 0.5)',
          }}
        >
          Car Specifications
                    </Typography>
        <Grid container spacing={4}>
          {[
            { label: 'Horsepower', value: `${ad.carDTO.horsePower} HP`, icon: <SpeedIcon /> },
            { label: 'Year', value: ad.carDTO.yearOfManufacture, icon: <CalendarToday /> },
            { label: 'Mileage', value: `${ad.carDTO.km} km`, icon: <Speed /> },
            { label: 'Engine', value: `${ad.carDTO.cylindricalCapacity} cc`, icon: <Settings /> },
            { label: 'Fuel Type', value: ad.carDTO.fuelType, icon: <LocalGasStation /> },
            { label: 'Transmission', value: ad.carDTO.gearBox, icon: <Settings /> },
            { label: 'Color', value: ad.carDTO.color, icon: <ColorLens /> },
            { label: 'VIN', value: ad.carDTO.vin, icon: <VpnKey /> },
          ].map((spec, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <SpecCard>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {React.cloneElement(spec.icon, { 
                    sx: { color: '#1DB954', mr: 1, fontSize: '1.5rem' }
                  })}
                  <Typography variant="h6" sx={{ color: '#fff' }}>
                    {spec.label}
                  </Typography>
            </Box>
                <Typography
                  className="spec-value"
                  sx={{
                    color: '#fff', 
                    fontSize: '1.2rem',
                    transition: 'all 0.3s ease',
                    textAlign: 'center',
                    mt: 1,
                  }}
                >
                  {spec.value}
                </Typography>
              </SpecCard>
            </Grid>
          ))}
        </Grid>
      </DetailsPanel>

      <Box sx={{ padding: '20px', textAlign: 'center' }}>
                <IconButton onClick={() => setFavorite(!favorite)} sx={{ color: favorite ? '#ff4444' : '#666' }}>
                  <Favorite />
                </IconButton>
                <IconButton onClick={handleShare} sx={{ color: '#666' }}>
                  <Share />
                </IconButton>
            </Box>

      <Box sx={{ padding: '20px', textAlign: 'center' }}>
        <Button
          onClick={() => {
            console.log('Opening dialog...');
            setDialogOpen(true);
          }}
                sx={{ 
            color: '#fff',
            backgroundColor: 'rgba(29, 185, 84, 0.1)',
            border: '1px solid rgba(29, 185, 84, 0.3)',
            padding: '15px 30px',
            borderRadius: '15px',
                  fontSize: '1.1rem',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: 'rgba(29, 185, 84, 0.2)',
              transform: 'translateY(-2px)',
              boxShadow: '0 5px 15px rgba(29, 185, 84, 0.2)',
            },
          }}
        >
          Contact Owner
        </Button>
              </Box>

      <OwnerProfileDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        owner={{
          firstName: ad?.ownerFirstName,
          lastName: ad?.ownerLastName,
          email: ad?.ownerEmail,
          rating: ad?.ownerRating,
        }}
      />
    </PageContainer>
  );
}

export default AdDetailsPage;