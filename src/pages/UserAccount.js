import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, styled } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { DirectionsCar, Speed, Palette, Settings } from '@mui/icons-material';

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

const StyledButton = styled('button')(({ variant }) => ({
  padding: '10px 20px',
  backgroundColor: variant === 'delete' ? '#FF4C4C' : '#1DB954',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  borderRadius: '5px',
  margin: '10px',
  '&:hover': {
    backgroundColor: variant === 'delete' ? '#FF6B6B' : '#1ed760',
  }
}));

const AdCard = styled(Box)({
  background: 'rgba(255, 255, 255, 0.1)',
  borderRadius: '10px',
  padding: '20px',
  marginBottom: '20px',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
});

const FormContainer = styled(Box)({
  background: 'rgba(255, 255, 255, 0.1)',
  borderRadius: '10px',
  padding: '20px',
  marginTop: '20px',
  backdropFilter: 'blur(10px)',
  '& input, & textarea': {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '5px',
    color: 'white',
    '&::placeholder': {
      color: 'rgba(255, 255, 255, 0.5)',
    }
  }
});

const AnimatedHeader = styled(motion.header)({
  background: 'rgba(255, 255, 255, 0.1)',
  padding: '15px 25px',
  borderRadius: '10px',
  marginBottom: '20px',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
});

const AnimatedText = styled(motion.span)({
  background: 'linear-gradient(90deg, #1DB954, #1ed760)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 'bold',
});

const AnimatedAdCard = styled(motion(AdCard))({
  // păstrează stilurile existente din AdCard
});

const AnimatedFormContainer = styled(motion(FormContainer))({
  // păstrează stilurile existente din FormContainer
});

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
            <ContentContainer>
                <AnimatedHeader
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        User Account
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        Logged in as: <AnimatedText>{userEmail}</AnimatedText>
                    </motion.p>
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
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <section>
                            <motion.h3
                                initial={{ x: -20 }}
                                animate={{ x: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                My Listed Cars
                            </motion.h3>
                            
                            {userAds.length > 0 ? (
                                <div>
                                    {userAds.map((ad, index) => (
                                        <AnimatedAdCard
                                            key={ad.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            whileHover={{ scale: 1.02 }}
                                        >
                                            <h4>{ad.carDTO.brand} {ad.carDTO.model}</h4>
                                            <p><DirectionsCar sx={{ color: '#1DB954' }} /> <strong>Brand:</strong> {ad.carDTO.brand}</p>
                                            <p><Speed sx={{ color: '#1DB954' }} /> <strong>Kilometers:</strong> {ad.carDTO.km} km</p>
                                            <p><Palette sx={{ color: '#1DB954' }} /> <strong>Color:</strong> {ad.carDTO.color}</p>
                                            <p><Settings sx={{ color: '#1DB954' }} /> <strong>Gearbox:</strong> {ad.carDTO.gearBox}</p>
                                            <StyledButton 
                                                variant="delete"
                                                onClick={() => handleDeleteAd(ad.id)}
                                            >
                                                Delete Ad
                                            </StyledButton>
                                        </AnimatedAdCard>
                                    ))}
                                </div>
                            ) : (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    You have no listed cars.
                                </motion.p>
                            )}
                        </section>

                        <StyledButton onClick={() => setShowForm(true)}>
                            Add New Ad
                        </StyledButton>

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

                        <Box sx={{ mt: 3 }}>
                            <StyledButton variant="delete" onClick={handleLogout}>
                                Logout
                            </StyledButton>
                            <StyledButton variant="delete" onClick={handleDeleteAccount}>
                                Delete Account
                            </StyledButton>
                        </Box>
                    </motion.div>
                )}
            </ContentContainer>
        </PageContainer>
    );
}

export default UserAccount;
