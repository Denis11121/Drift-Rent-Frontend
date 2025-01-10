import React, { useState, useEffect } from 'react';
import { styled, keyframes } from '@mui/system';
import {
  Box,
  Container,
  Typography,
  Card,
  Grid,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Slider,
  FormControl,
  Select,
  MenuItem,
  CircularProgress,
  Fade,
  Button,
} from '@mui/material';
import {
  Search as SearchIcon,
  DirectionsCar,
  Speed,
  LocalGasStation,
  Settings,
  Sort as SortIcon,
  FilterList as FilterIcon,
  AccountCircle,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const shine = keyframes`
  to {
    background-position: 200% center;
  }
`;

// Styled Components
const PageContainer = styled(Box)({
  background: 'linear-gradient(135deg, #0a0a0a 0%, #0a2818 50%, #0a0a0a 100%)',
  minHeight: '100vh',
  minWidth: '100vw',
  margin: 0,
  padding: 0,
  position: 'relative',
  overflow: 'hidden',
  boxSizing: 'border-box',
});

const SearchBar = styled(Box)(({ theme }) => ({
  position: 'sticky',
  top: 0,
  zIndex: 100,
  padding: '20px',
  background: 'rgba(10, 10, 10, 0.8)',
  backdropFilter: 'blur(10px)',
}));

const CarCard = styled(Card)(({ theme }) => ({
  background: 'rgba(18, 18, 18, 0.95)',
  borderRadius: '15px',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  animation: `${fadeIn} 0.5s ease-out forwards`,
  opacity: 0,
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
    '& .car-image': {
      transform: 'scale(1.1)',
    },
  },
}));

const CarImage = styled('img')({
  width: '100%',
  height: '200px',
  objectFit: 'cover',
  transition: 'transform 0.5s ease',
});

const GradientText = styled(Typography)({
  background: 'linear-gradient(45deg, #1DB954, #fff)',
  backgroundSize: '200% auto',
  animation: `${shine} 3s linear infinite`,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 'bold',
});

const FeatureChip = styled(Chip)({
  margin: '4px',
  backgroundColor: 'rgba(29, 185, 84, 0.1)',
  color: '#1DB954',
  '&:hover': {
    backgroundColor: 'rgba(29, 185, 84, 0.2)',
  },
});

function AdsPage() {
  const navigate = useNavigate();
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    priceRange: [0, 1000],
    brand: 'all',
    sort: 'price-asc',
  });

  useEffect(() => {
    fetchAds();
  }, [filters]);

  const fetchAds = async () => {
    try {
      const response = await fetch('http://localhost:8081/ad/all');
      const data = await response.json();
      setAds(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching ads:', error);
      setLoading(false);
    }
  };

  const handleCardClick = (id) => {
    navigate(`/ad/${id}`);
  };

  return (
    <PageContainer>
      <SearchBar>
        <Container maxWidth="lg">
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search cars..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: '#1DB954' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.23)' },
                    '&:hover fieldset': { borderColor: '#1DB954' },
                    '&.Mui-focused fieldset': { borderColor: '#1DB954' },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Box display="flex" gap={2} alignItems="center">
                <FormControl fullWidth>
                  <Select
                    value={filters.brand}
                    onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                    sx={{ color: '#fff', backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                  >
                    <MenuItem value="all">All Brands</MenuItem>
                    <MenuItem value="bmw">BMW</MenuItem>
                    <MenuItem value="mercedes">Mercedes</MenuItem>
                    <MenuItem value="audi">Audi</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <Select
                    value={filters.sort}
                    onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                    sx={{ color: '#fff', backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                  >
                    <MenuItem value="price-asc">Price: Low to High</MenuItem>
                    <MenuItem value="price-desc">Price: High to Low</MenuItem>
                    <MenuItem value="newest">Newest First</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  variant="contained"
                  startIcon={<AccountCircle />}
                  onClick={() => navigate('/account')}
                  sx={{
                    backgroundColor: '#1DB954',
                    '&:hover': {
                      backgroundColor: '#18a449',
                    },
                    minWidth: '150px'
                  }}
                >
                  My Account
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </SearchBar>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
            <CircularProgress sx={{ color: '#1DB954' }} />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {ads.map((ad, index) => (
              <Grid item xs={12} sm={6} md={4} key={ad.id}>
                <Fade in={true} style={{ transitionDelay: `${index * 100}ms` }}>
                  <CarCard onClick={() => handleCardClick(ad.id)}>
                    <Box sx={{ position: 'relative' }}>
                      <CarImage
                        className="car-image"
                        src={ad.imageUrl || 'https://via.placeholder.com/400x200'}
                        alt={ad.title}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                          p: 2,
                        }}
                      >
                        <GradientText variant="h6">${ad.price}/day</GradientText>
                      </Box>
                    </Box>
                    <Box sx={{ p: 2 }}>
                      <Typography variant="h6" color="#fff" gutterBottom>
                        {ad.title}
                      </Typography>
                      <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
                        <FeatureChip
                          icon={<DirectionsCar />}
                          label={`${ad.carDTO.brand} ${ad.carDTO.model}`}
                        />
                        <FeatureChip
                          icon={<Speed />}
                          label={`${ad.carDTO.horsePower}hp`}
                        />
                        <FeatureChip
                          icon={<LocalGasStation />}
                          label={ad.carDTO.fuelType}
                        />
                      </Box>
                      <Typography variant="body2" color="#ccc" noWrap>
                        {ad.description}
                      </Typography>
                    </Box>
                  </CarCard>
                </Fade>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </PageContainer>
  );
}

export default AdsPage;