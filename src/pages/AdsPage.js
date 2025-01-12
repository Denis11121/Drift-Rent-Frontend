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
  AttachMoney,
  CarRental as CarIcon
} from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';

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

const LogoContainer = styled(Link)({
  position: "absolute",
  top: "20px",
  left: "20px",
  zIndex: 102,
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

function AdsPage() {
  const navigate = useNavigate();
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    priceRange: [0, 1000],
    brand: 'all',
    horsePower: [0, 1000],
    kilometers: [0, 500000],
    yearRange: [1990, new Date().getFullYear()],
    fuelType: 'all',
    gearBox: 'all',
    sort: 'price-asc',
  });

  const carBrands = [
    'Audi', 'BMW', 'Mercedes-Benz', 'Volkswagen', 'Porsche', 
    'Toyota', 'Honda', 'Ford', 'Chevrolet', 'Tesla',
    'Hyundai', 'Kia', 'Mazda', 'Nissan', 'Lexus',
    'Volvo', 'Jaguar', 'Land Rover', 'Subaru', 'Mini'
  ];

  const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'Plug-in Hybrid'];
  const transmissionTypes = ['Manual', 'Automatic', 'Semi-automatic', 'CVT'];

  useEffect(() => {
    fetchAds();
  }, [filters]); // This will re-fetch when any filter changes

  const fetchAds = async () => {
    try {
      // Build query parameters based on filters
      const queryParams = new URLSearchParams();
      
      // Add filter parameters only if they are not 'all' or empty
      if (filters.brand && filters.brand !== 'all') {
        queryParams.append('brand', filters.brand);
      }
      if (filters.fuelType && filters.fuelType !== 'all') {
        queryParams.append('fuelType', filters.fuelType);
      }
      if (filters.gearBox && filters.gearBox !== 'all') {
        queryParams.append('gearBox', filters.gearBox);
      }
      
      // Add range parameters
      if (filters.priceRange[0] > 0) {
        queryParams.append('minPrice', filters.priceRange[0]);
      }
      if (filters.priceRange[1] < 1000) {
        queryParams.append('maxPrice', filters.priceRange[1]);
      }
      
      if (filters.horsePower[0] > 0) {
        queryParams.append('minHorsePower', filters.horsePower[0]);
      }
      if (filters.horsePower[1] < 1000) {
        queryParams.append('maxHorsePower', filters.horsePower[1]);
      }
      
      if (filters.kilometers[0] > 0) {
        queryParams.append('minKm', filters.kilometers[0]);
      }
      if (filters.kilometers[1] < 500000) {
        queryParams.append('maxKm', filters.kilometers[1]);
      }
      
      if (filters.yearRange[0] > 1990) {
        queryParams.append('startYear', filters.yearRange[0]);
      }
      if (filters.yearRange[1] < new Date().getFullYear()) {
        queryParams.append('endYear', filters.yearRange[1]);
      }

      // Fetch ads with filters
      const response = await fetch(`http://localhost:8081/ad/filter?${queryParams}`);
      if (!response.ok) {
        throw new Error('Failed to fetch ads');
      }
      
      let data = await response.json();
      
      // Apply search filter locally if search term exists
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        data = data.filter(ad => 
          ad.carDTO.brand.toLowerCase().includes(searchTerm) ||
          ad.carDTO.model.toLowerCase().includes(searchTerm) ||
          ad.description.toLowerCase().includes(searchTerm)
        );
      }

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
      <LogoContainer to="/ads">
        <CarIcon className="car-icon" />
        <LogoText>DriftRent</LogoText>
      </LogoContainer>
      <SearchBar>
        <Container maxWidth="lg">
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12}>
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
            
            <Grid item xs={12}>
              <Box display="flex" gap={2} flexWrap="wrap">
                <FormControl sx={{ minWidth: 200 }}>
                  <Typography color="white" gutterBottom>Brand</Typography>
                  <Select
                    value={filters.brand}
                    onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                    sx={{ color: '#fff', backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                  >
                    <MenuItem value="all">All Brands</MenuItem>
                    {carBrands.map(brand => (
                      <MenuItem key={brand} value={brand.toLowerCase()}>{brand}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 200 }}>
                  <Typography color="white" gutterBottom>Fuel Type</Typography>
                  <Select
                    value={filters.fuelType}
                    onChange={(e) => setFilters({ ...filters, fuelType: e.target.value })}
                    sx={{ color: '#fff', backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                  >
                    <MenuItem value="all">All Types</MenuItem>
                    {fuelTypes.map(type => (
                      <MenuItem key={type} value={type.toLowerCase()}>{type}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 200 }}>
                  <Typography color="white" gutterBottom>Transmission</Typography>
                  <Select
                    value={filters.gearBox}
                    onChange={(e) => setFilters({ ...filters, gearBox: e.target.value })}
                    sx={{ color: '#fff', backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                  >
                    <MenuItem value="all">All Types</MenuItem>
                    {transmissionTypes.map(type => (
                      <MenuItem key={type} value={type.toLowerCase()}>{type}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 200 }}>
                  <Typography color="white" gutterBottom>Sort By</Typography>
                  <Select
                    value={filters.sort}
                    onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                    sx={{ color: '#fff', backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                  >
                    <MenuItem value="price-asc">Price: Low to High</MenuItem>
                    <MenuItem value="price-desc">Price: High to Low</MenuItem>
                    <MenuItem value="newest">Newest First</MenuItem>
                    <MenuItem value="hp-desc">Horsepower: High to Low</MenuItem>
                    <MenuItem value="km-asc">Kilometers: Low to High</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                  <Box sx={{ px: 2 }}>
                    <Typography color="white" gutterBottom>Price Range ($)</Typography>
                    <Slider
                      value={filters.priceRange}
                      onChange={(e, newValue) => setFilters({ ...filters, priceRange: newValue })}
                      valueLabelDisplay="auto"
                      min={0}
                      max={1000}
                      sx={{ color: '#1DB954' }}
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Box sx={{ px: 2 }}>
                    <Typography color="white" gutterBottom>Horsepower</Typography>
                    <Slider
                      value={filters.horsePower}
                      onChange={(e, newValue) => setFilters({ ...filters, horsePower: newValue })}
                      valueLabelDisplay="auto"
                      min={0}
                      max={1000}
                      sx={{ color: '#1DB954' }}
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Box sx={{ px: 2 }}>
                    <Typography color="white" gutterBottom>Kilometers</Typography>
                    <Slider
                      value={filters.kilometers}
                      onChange={(e, newValue) => setFilters({ ...filters, kilometers: newValue })}
                      valueLabelDisplay="auto"
                      min={0}
                      max={500000}
                      sx={{ color: '#1DB954' }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </SearchBar>

      <Box sx={{ 
        position: 'absolute', 
        top: 20, 
        right: 20, 
        zIndex: 101 
      }}>
        <Button
          variant="contained"
          startIcon={<AccountCircle />}
          onClick={() => navigate('/account')}
          sx={{
            backgroundColor: '#1DB954',
            color: '#fff',
            borderRadius: '50px',
            padding: '10px 20px',
            '&:hover': {
              backgroundColor: '#1ed760',
            },
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
          }}
        >
          My Account
        </Button>
      </Box>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
            <CircularProgress sx={{ color: '#1DB954' }} />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {ads.map((ad) => (
              <Grid item xs={12} sm={6} md={4} key={ad.id}>
                <Fade in={true}>
                  <CarCard onClick={() => handleCardClick(ad.id)}>
                    <Box sx={{ p: 2 }}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          mb: 2,
                          color: '#1DB954', // Spotify green color
                          fontWeight: 'bold',
                          textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                        }}
                      >
                        {ad.title}
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                        <FeatureChip
                          icon={<DirectionsCar />}
                          label={`${ad.carDTO.brand} ${ad.carDTO.model}`}
                        />
                        <FeatureChip
                          icon={<AttachMoney />}
                          label={`${ad.price}€`}
                        />
                      </Box>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        <FeatureChip
                          icon={<Settings />}
                          label={ad.carDTO.gearBox}
                        />
                        <FeatureChip
                          icon={<Speed />}
                          label={`${ad.carDTO.kilometers} km`}
                        />
                        <FeatureChip
                          icon={<LocalGasStation />}
                          label={ad.carDTO.fuelType}
                        />
                      </Box>
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