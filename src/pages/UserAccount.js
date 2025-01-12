import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Box, styled, Typography, Button, Grid, Chip, IconButton } from '@mui/material';
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import { 
  DirectionsCar, 
  Speed, 
  Palette, 
  Settings,
  CarRental as CarIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  LocalGasStation,
  Speed as SpeedIcon,
  ColorLens,
  Build,
  Timeline,
  EmojiTransportation
} from '@mui/icons-material';

const PageContainer = styled(Box)({
  background: 'linear-gradient(135deg, #0a0a0a 0%, #0a2818 50%, #0a0a0a 100%)',
  minHeight: '100vh',
  minWidth: '100vw',
  margin: 0,
  padding: 0,
  position: 'relative',
  overflow: 'hidden',
  boxSizing: 'border-box',
  color: '#fff',
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

const ContentContainer = styled(Box)({
  padding: '20px',
  position: 'relative',
  zIndex: 1,
  maxWidth: '100%',
  overflow: 'auto',
  maxHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  '&::-webkit-scrollbar': {
    display: 'none'
  },
  '-ms-overflow-style': 'none',
  'scrollbarWidth': 'none'
});

const AnimatedHeader = styled(motion.header)({
  background: 'rgba(18, 18, 18, 0.95)',
  padding: '20px 30px',
  borderRadius: '15px',
  marginBottom: '30px',
  marginTop: '80px',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
});

const AnimatedText = styled(motion.span)({
  background: 'linear-gradient(90deg, #1DB954, #1ed760)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 'bold',
});

const AnimatedAdCard = styled(motion(Box))({
  background: 'rgba(18, 18, 18, 0.95)',
  borderRadius: '20px',
  padding: '25px',
  marginBottom: '20px',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(45deg, rgba(29, 185, 84, 0.05), transparent)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover::before': {
    opacity: 1,
  },
});

const FormContainer = styled(Box)({
  background: 'rgba(18, 18, 18, 0.95)',
  borderRadius: '15px',
  padding: '30px',
  marginTop: '20px',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
  '& h3': {
    color: '#1DB954',
    marginBottom: '20px',
  },
  '& input, & textarea': {
    width: '100%',
    padding: '12px',
    margin: '10px 0',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    color: 'white',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    '&::placeholder': {
      color: 'rgba(255, 255, 255, 0.5)',
    },
    '&:focus': {
      outline: 'none',
      border: '1px solid #1DB954',
      background: 'rgba(255, 255, 255, 0.1)',
    }
  },
  '& textarea': {
    minHeight: '100px',
    resize: 'vertical',
  }
});

const StyledButton = styled(Button)({
  backgroundColor: '#1DB954',
  color: 'white',
  padding: '10px 24px',
  borderRadius: '8px',
  border: 'none',
  fontSize: '1rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  marginTop: '20px',
  '&:hover': {
    backgroundColor: '#1ed760',
    transform: 'translateY(-2px)',
    boxShadow: '0 5px 15px rgba(29, 185, 84, 0.3)',
  },
  '&:active': {
    transform: 'translateY(0)',
  }
});

const AnimatedFormContainer = styled(motion(FormContainer))({
  // păstrează stilurile existente din FormContainer
});

const LogoContainer = styled(Link)({
  position: "fixed",
  top: "20px",
  left: "20px",
  zIndex: 1000,
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  textDecoration: 'none',
  '& .car-icon': {
    fontSize: '2.5rem',
    color: '#1DB954',
  },
  background: 'rgba(10, 10, 10, 0.5)',
  padding: '8px 12px',
  borderRadius: '12px',
  backdropFilter: 'blur(8px)',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(10, 10, 10, 0.7)',
    transform: 'translateY(2px)',
  },
});

const LogoText = styled(Typography)({
  fontSize: '2rem',
  fontWeight: 'bold',
  background: 'linear-gradient(45deg, #1DB954, #fff)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
});

const HeaderActions = styled(Box)({
  display: 'flex',
  gap: '10px',
});

const HeaderButton = styled(Button)({
  backgroundColor: 'rgba(29, 185, 84, 0.1)',
  color: '#1DB954',
  borderRadius: '20px',
  padding: '8px 16px',
  textTransform: 'none',
  border: '1px solid rgba(29, 185, 84, 0.2)',
  '&:hover': {
    backgroundColor: 'rgba(29, 185, 84, 0.2)',
    border: '1px solid rgba(29, 185, 84, 0.3)',
  },
});

const StatsContainer = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '20px',
  marginBottom: '30px',
});

const StatCard = styled(motion.div)({
  background: 'rgba(29, 185, 84, 0.1)',
  borderRadius: '15px',
  padding: '20px',
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-5px)',
    background: 'rgba(29, 185, 84, 0.15)',
  },
});

const ActionBar = styled(motion.div)({
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
  marginBottom: '30px',
  padding: '20px',
  background: 'rgba(18, 18, 18, 0.95)',
  borderRadius: '15px',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
});

const ActionButton = styled(motion.button)({
  padding: '12px 24px',
  borderRadius: '12px',
  border: 'none',
  cursor: 'pointer',
  fontSize: '1rem',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  transition: 'all 0.3s ease',
  background: 'linear-gradient(45deg, #1DB954, #1ed760)',
  color: 'white',
  boxShadow: '0 4px 15px rgba(29, 185, 84, 0.3)',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(29, 185, 84, 0.4)',
  },
  '&.delete': {
    background: 'linear-gradient(45deg, #FF4C4C, #FF6B6B)',
    boxShadow: '0 4px 15px rgba(255, 76, 76, 0.3)',
    '&:hover': {
      boxShadow: '0 6px 20px rgba(255, 76, 76, 0.4)',
    },
  },
});

const CardGrid = styled(motion.div)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '20px',
  marginTop: '20px',
});

const StatsGrid = styled(motion.div)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '20px',
  marginBottom: '30px',
});

const StatCardEnhanced = styled(motion.div)({
  background: 'linear-gradient(135deg, rgba(29, 185, 84, 0.1), rgba(29, 185, 84, 0.05))',
  borderRadius: '20px',
  padding: '25px',
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
  position: 'relative',
  overflow: 'hidden',
  border: '1px solid rgba(29, 185, 84, 0.2)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at top right, rgba(29, 185, 84, 0.2), transparent)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover::before': {
    opacity: 1,
  },
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 30px rgba(29, 185, 84, 0.2)',
  },
});

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

function UserAccount() {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState('');
    const [userId, setUserId] = useState(null); // State to store user ID
    const [userAds, setUserAds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [step, setStep] = useState(1);
    const [carData, setCarData] = useState({
        vin: '',
        brand: '',
        model: '',
        body: '',
        yearOfManufacture: '',
        km: '',
        fuelType: '',
        gearBox: '',
        cylindricalCapacity: '',
        horsePower: '',
        color: '',
    });
    const [adData, setAdData] = useState({
        title: '',
        description: '',
        price: '',
    });

    useEffect(() => {
        const email = localStorage.getItem('userEmail');
        if (email) {
            setUserEmail(email);
            fetchUserAds(email);
        } else {
            navigate('/');
        }
    }, [navigate]);

    const fetchUserAds = async (email) => {
        try {
            const response = await axios.get(`http://localhost:8081/user/email/${email}`);
            if (response.status === 200) {
                setUserAds(response.data.ads);
                setUserId(response.data.id); // Save the user's ID
            }
        } catch (error) {
            console.error('Error fetching user ads:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('userEmail');
        navigate('/');
    };

    const handleDeleteAccount = async () => {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this account? This action cannot be undone.'
        );

        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:8081/user/delete/${userEmail}`);
            alert('Account deleted successfully!');
            localStorage.removeItem('userEmail');
            navigate('/');
        } catch (error) {
            console.error('Error deleting account:', error);
            alert('Failed to delete account.');
        }
    };

    const handleCarDataChange = (e) => {
        setCarData({ ...carData, [e.target.name]: e.target.value });
    };

    const handleAdDataChange = (e) => {
        setAdData({ ...adData, [e.target.name]: e.target.value });
    };

    const handleNextStep = async () => {
        if (step === 1) {
            try {
                const response = await axios.post('http://localhost:8081/car/create', carData);
                if (response.status === 201) {
                    setCarData({ ...carData, id: response.data.id }); // Save car ID
                    setStep(2); // Move to the next step
                }
            } catch (error) {
                console.error('Error creating car:', error);
                alert('Failed to create car. Please check your inputs.');
            }
        } else if (step === 2) {
            try {
                const adPayload = {
                    title: adData.title,
                    description: adData.description,
                    price: adData.price,
                    user: { id: userId }, // Use the dynamically retrieved user ID
                    car: { id: carData.id },
                };
                const response = await axios.post('http://localhost:8081/ad/create', adPayload);
                if (response.status === 201) {
                    alert('Ad created successfully!');
                    setShowForm(false); // Close the form
                    fetchUserAds(userEmail); // Refresh the user's ads
                }
            } catch (error) {
                console.error('Error creating ad:', error);
                alert('Failed to create ad. Please check your inputs.');
            }
        }
    };

    const handleDeleteAd = async (adId) => {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this ad? This action cannot be undone.'
        );

        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:8081/ad/delete/${adId}`);
            alert('Ad deleted successfully!');
            fetchUserAds(userEmail); // Refresh the user's ads after deletion
        } catch (error) {
            console.error('Error deleting ad:', error);
            alert('Failed to delete ad.');
        }
    };

    return (
        <PageContainer>
            <LogoContainer to="/ads">
                <CarIcon className="car-icon" />
                <LogoText>DriftRent</LogoText>
            </LogoContainer>
            <ContentContainer>
                <AnimatedHeader
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <Box>
                        <motion.h2
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            style={{ margin: 0, marginBottom: '8px' }}
                        >
                            User Account
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            style={{ margin: 0, color: '#888' }}
                        >
                            Logged in as: <AnimatedText>{userEmail}</AnimatedText>
                        </motion.p>
                    </Box>
                    <HeaderActions>
                        <HeaderButton
                            onClick={() => navigate('/ads')}
                            startIcon={<DirectionsCar />}
                        >
                            Browse Ads
                        </HeaderButton>
                        <HeaderButton
                            onClick={handleLogout}
                            sx={{
                                backgroundColor: 'rgba(255, 76, 76, 0.1)',
                                color: '#FF4C4C',
                                borderColor: 'rgba(255, 76, 76, 0.2)',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 76, 76, 0.2)',
                                    borderColor: 'rgba(255, 76, 76, 0.3)',
                                },
                            }}
                        >
                            Logout
                        </HeaderButton>
                    </HeaderActions>
                </AnimatedHeader>

                {loading ? (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        Loading your data...
                    </motion.p>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                    >
                        <StatsGrid>
                            <StatCardEnhanced
                                variants={itemVariants}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <EmojiTransportation sx={{ fontSize: 40, color: '#1DB954' }} />
                                <Box>
                                    <Typography variant="h4" color="#fff" fontWeight="bold">
                                        {userAds.length}
                                    </Typography>
                                    <Typography color="#888">Active Listings</Typography>
                                </Box>
                            </StatCardEnhanced>

                            <StatCardEnhanced
                                variants={itemVariants}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Timeline sx={{ fontSize: 40, color: '#1DB954' }} />
                                <Box>
                                    <Typography variant="h4" color="#fff" fontWeight="bold">
                                        {userAds.reduce((total, ad) => total + parseInt(ad.carDTO.km), 0).toLocaleString()}
                                    </Typography>
                                    <Typography color="#888">Total Kilometers</Typography>
                                </Box>
                            </StatCardEnhanced>

                            <StatCardEnhanced
                                variants={itemVariants}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <SpeedIcon sx={{ fontSize: 40, color: '#1DB954' }} />
                                <Box>
                                    <Typography variant="h4" color="#fff" fontWeight="bold">
                                        {userAds.reduce((max, ad) => Math.max(max, ad.carDTO.horsePower), 0)}
                                    </Typography>
                                    <Typography color="#888">Max Horsepower</Typography>
                                </Box>
                            </StatCardEnhanced>
                        </StatsGrid>

                        <ActionBar
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <ActionButton
                                onClick={() => setShowForm(true)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <AddIcon /> Add New Listing
                            </ActionButton>
                            <ActionButton
                                className="delete"
                                onClick={handleDeleteAccount}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <DeleteIcon /> Delete Account
                            </ActionButton>
                        </ActionBar>

                        <CardGrid
                            variants={containerVariants}
                            initial="hidden"
                            animate="show"
                        >
                            {userAds.map((ad, index) => (
                                <AnimatedAdCard
                                    key={ad.id}
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    layout
                                >
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Typography variant="h5" color="#1DB954" gutterBottom fontWeight="bold">
                                                {ad.carDTO.brand} {ad.carDTO.model}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Box display="flex" gap={1} flexWrap="wrap">
                                                <Chip
                                                    icon={<SpeedIcon />}
                                                    label={`${ad.carDTO.horsePower} HP`}
                                                    sx={{ 
                                                        background: 'linear-gradient(45deg, rgba(29, 185, 84, 0.1), rgba(29, 185, 84, 0.2))',
                                                        color: '#1DB954',
                                                        border: '1px solid rgba(29, 185, 84, 0.3)',
                                                    }}
                                                />
                                                <Chip
                                                    icon={<LocalGasStation />}
                                                    label={ad.carDTO.fuelType}
                                                    sx={{ 
                                                        background: 'linear-gradient(45deg, rgba(29, 185, 84, 0.1), rgba(29, 185, 84, 0.2))',
                                                        color: '#1DB954',
                                                        border: '1px solid rgba(29, 185, 84, 0.3)',
                                                    }}
                                                />
                                                <Chip
                                                    icon={<Timeline />}
                                                    label={`${ad.carDTO.km} km`}
                                                    sx={{ 
                                                        background: 'linear-gradient(45deg, rgba(29, 185, 84, 0.1), rgba(29, 185, 84, 0.2))',
                                                        color: '#1DB954',
                                                        border: '1px solid rgba(29, 185, 84, 0.3)',
                                                    }}
                                                />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                                <Typography color="#fff" fontSize="1.2rem" fontWeight="bold">
                                                    ${ad.price}/day
                                                </Typography>
                                                <IconButton
                                                    onClick={() => handleDeleteAd(ad.id)}
                                                    sx={{ 
                                                        color: '#FF4C4C',
                                                        background: 'rgba(255, 76, 76, 0.1)',
                                                        '&:hover': { 
                                                            background: 'rgba(255, 76, 76, 0.2)',
                                                            transform: 'scale(1.1)',
                                                        }
                                                    }}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </AnimatedAdCard>
                            ))}
                        </CardGrid>

                        <AnimatePresence>
                            {showForm && (
                                <AnimatedFormContainer
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 50 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {step === 1 ? (
                                        <div>
                                            <h3>Step 1: Enter Car Details</h3>
                                            <form>
                                                <input type="text" name="vin" value={carData.vin} onChange={handleCarDataChange} placeholder="VIN" />
                                                <input type="text" name="brand" value={carData.brand} onChange={handleCarDataChange} placeholder="Brand" />
                                                <input type="text" name="model" value={carData.model} onChange={handleCarDataChange} placeholder="Model" />
                                                <input type="text" name="body" value={carData.body} onChange={handleCarDataChange} placeholder="Body" />
                                                <input type="number" name="yearOfManufacture" value={carData.yearOfManufacture} onChange={handleCarDataChange} placeholder="Year of Manufacture" />
                                                <input type="number" name="km" value={carData.km} onChange={handleCarDataChange} placeholder="Kilometers" />
                                                <input type="text" name="fuelType" value={carData.fuelType} onChange={handleCarDataChange} placeholder="Fuel Type" />
                                                <input type="text" name="gearBox" value={carData.gearBox} onChange={handleCarDataChange} placeholder="Gearbox" />
                                                <input type="number" name="cylindricalCapacity" value={carData.cylindricalCapacity} onChange={handleCarDataChange} placeholder="Cylindrical Capacity" />
                                                <input type="number" name="horsePower" value={carData.horsePower} onChange={handleCarDataChange} placeholder="Horsepower" />
                                                <input type="text" name="color" value={carData.color} onChange={handleCarDataChange} placeholder="Color" />
                                            </form>
                                            <StyledButton onClick={handleNextStep}>Next</StyledButton>
                                        </div>
                                    ) : (
                                        <div>
                                            <h3>Step 2: Enter Ad Details</h3>
                                            <form>
                                                <input type="text" name="title" value={adData.title} onChange={handleAdDataChange} placeholder="Ad Title" />
                                                <textarea name="description" value={adData.description} onChange={handleAdDataChange} placeholder="Ad Description" />
                                                <input type="number" name="price" value={adData.price} onChange={handleAdDataChange} placeholder="Price" />
                                            </form>
                                            <StyledButton onClick={handleNextStep}>Submit</StyledButton>
                                        </div>
                                    )}
                                </AnimatedFormContainer>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </ContentContainer>
        </PageContainer>
    );
}

export default UserAccount;
