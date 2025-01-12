import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import {
  Typography,
  Box,
  Button,
  Grid,
  CircularProgress,
  Divider,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Chip,
} from '@mui/material';

const PageContainer = styled(Box)({
  background: 'linear-gradient(90deg, #1DB954 0%, #121212 100%)',
  minHeight: '100vh',
  minWidth: '100vw',
  padding: '40px 20px',
});

const ContentWrapper = styled(Box)({
  maxWidth: '1200px',
  margin: '0 auto',
  background: 'rgba(18, 18, 18, 0.95)',
  borderRadius: '15px',
  padding: '30px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
});

const ImageContainer = styled(Box)({
  position: 'relative',
  width: '100%',
  height: '400px',
  borderRadius: '10px',
  overflow: 'hidden',
  marginBottom: '30px',
});

const MainImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '10px',
});

const PriceTag = styled(Paper)({
  position: 'absolute',
  bottom: '20px',
  right: '20px',
  padding: '15px 25px',
  background: '#1DB954',
  color: 'white',
  borderRadius: '25px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
});

const FeatureChip = styled(Chip)({
  margin: '5px',
  backgroundColor: 'rgba(29, 185, 84, 0.1)',
  color: '#1DB954',
  '&:hover': {
    backgroundColor: 'rgba(29, 185, 84, 0.2)',
  },
});

const StyledButton = styled(Button)({
  backgroundColor: '#1DB954',
  color: '#fff',
  padding: '10px 30px',
  borderRadius: '25px',
  '&:hover': {
    backgroundColor: '#1ed760',
  },
});

const SpecTable = styled(Table)({
  '& .MuiTableCell-root': {
    borderColor: 'rgba(255, 255, 255, 0.1)',
    color: '#fff',
    padding: '12px 16px',
  },
  '& .MuiTableCell-head': {
    color: '#1DB954',
    fontWeight: 'bold',
  },
});

function AdDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Fetching ad with id:', id);
    
    fetch(`http://localhost:8081/ad/id/${id}`)
      .then((response) => {
        console.log('Response status:', response.status);
        if (!response.ok) {
          throw new Error('Ad not found');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Received data:', data);
        setAd(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <PageContainer>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
          <CircularProgress sx={{ color: '#1DB954' }} />
        </Box>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <ContentWrapper>
          <Typography variant="h5" color="error" textAlign="center">
            {error}
          </Typography>
          <Box display="flex" justifyContent="center" mt={3}>
            <StyledButton onClick={() => navigate('/ads')}>Back to Ads</StyledButton>
          </Box>
        </ContentWrapper>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <ContentWrapper>
        <ImageContainer>
          <MainImage src={ad.imageUrl || 'https://via.placeholder.com/800x400?text=No+Image'} alt={ad.title} />
          <PriceTag elevation={3}>
            <Typography variant="h5" fontWeight="bold">
              ${ad.price}/day
            </Typography>
          </PriceTag>
        </ImageContainer>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" color="#fff" gutterBottom>
              {ad.title}
            </Typography>
            <Typography variant="body1" color="#ccc" paragraph>
              {ad.description}
            </Typography>

            <Box my={3}>
              <Typography variant="h6" color="#1DB954" gutterBottom>
                Key Features
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={1}>
                <FeatureChip label={`Year: ${ad.carDTO.yearOfManufacture}`} />
                <FeatureChip label={`Mileage: ${ad.carDTO.km}km`} />
                <FeatureChip label={`Fuel: ${ad.carDTO.fuelType}`} />
                <FeatureChip label={`Transmission: ${ad.carDTO.gearBox}`} />
                <FeatureChip label={`Power: ${ad.carDTO.horsePower}hp`} />
              </Box>
            </Box>

            <Divider sx={{ my: 3, backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />

            <Typography variant="h6" color="#1DB954" gutterBottom>
              Specifications
            </Typography>
            <SpecTable>
              <TableBody>
                <TableRow>
                  <TableCell component="th">Brand</TableCell>
                  <TableCell>{ad.carDTO.brand}</TableCell>
                  <TableCell component="th">Model</TableCell>
                  <TableCell>{ad.carDTO.model}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">VIN</TableCell>
                  <TableCell>{ad.carDTO.vin}</TableCell>
                  <TableCell component="th">Color</TableCell>
                  <TableCell>{ad.carDTO.color}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Year</TableCell>
                  <TableCell>{ad.carDTO.yearOfManufacture}</TableCell>
                  <TableCell component="th">Horse Power</TableCell>
                  <TableCell>{ad.carDTO.horsePower}hp</TableCell>
                </TableRow>
              </TableBody>
            </SpecTable>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '10px' }}>
              <Typography variant="h6" color="#1DB954" gutterBottom>
                Contact Information
              </Typography>
              <Typography color="#fff" paragraph>
                Owner: {ad.owner?.username || 'Not available'}
              </Typography>
              <Typography color="#fff" paragraph>
                Email: {ad.owner?.email || 'Not available'}
              </Typography>
              <Typography variant="body2" color="#ccc" sx={{ mt: 2 }}>
                Posted on: {new Date(ad.createdAt).toLocaleDateString()}
              </Typography>
            </Paper>

            <Box mt={3} display="flex" gap={2} flexDirection="column">
              <StyledButton variant="contained" fullWidth>
                Contact Owner
              </StyledButton>
              <StyledButton 
                variant="outlined" 
                fullWidth
                onClick={() => navigate('/ads')}
                sx={{ 
                  borderColor: '#1DB954', 
                  color: '#1DB954',
                  '&:hover': {
                    borderColor: '#1ed760',
                    backgroundColor: 'rgba(29, 185, 84, 0.1)',
                  }
                }}
              >
                Back to Ads
              </StyledButton>
            </Box>
          </Grid>
        </Grid>
      </ContentWrapper>
    </PageContainer>
  );
}

export default AdDetailsPage;