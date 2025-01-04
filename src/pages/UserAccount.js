import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
        <div style={{ padding: '20px' }}>
            <header style={{ marginBottom: '20px' }}>
                <h2>User Account</h2>
                <p>Logged in as: <strong>{userEmail}</strong></p>
            </header>

            {loading ? (
                <p>Loading your data...</p>
            ) : (
                <div>
                    <section style={{ marginBottom: '40px' }}>
                        <h3>My Listed Cars</h3>
                        {userAds.length > 0 ? (
                            <ul>
                                {userAds.map((ad) => (
                                    <li key={ad.id} style={{ marginBottom: '20px' }}>
                                        <h4>{ad.carDTO.brand} {ad.carDTO.model}</h4>
                                        <p><strong>VIN:</strong> {ad.carDTO.vin}</p>
                                        <p><strong>Body:</strong> {ad.carDTO.body}</p>
                                        <p><strong>Year:</strong> {ad.carDTO.yearOfManufacture}</p>
                                        <p><strong>Kilometers:</strong> {ad.carDTO.km} km</p>
                                        <p><strong>Fuel Type:</strong> {ad.carDTO.fuelType}</p>
                                        <p><strong>Gearbox:</strong> {ad.carDTO.gearBox}</p>
                                        <p><strong>Cylindrical Capacity:</strong> {ad.carDTO.cylindricalCapacity} cc</p>
                                        <p><strong>Horsepower:</strong> {ad.carDTO.horsePower} HP</p>
                                        <p><strong>Color:</strong> {ad.carDTO.color}</p>
                                        <button
                                            onClick={() => handleDeleteAd(ad.id)}
                                            style={{
                                                padding: '5px 10px',
                                                backgroundColor: '#FF4C4C',
                                                color: 'white',
                                                border: 'none',
                                                cursor: 'pointer',
                                                borderRadius: '5px',
                                            }}
                                        >
                                            Delete Ad
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>You have no listed cars.</p>
                        )}
                    </section>

                    <button
                        onClick={() => setShowForm(true)}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            borderRadius: '5px',
                        }}
                    >
                        Add New Ad
                    </button>

                    {showForm && (
                        <div>
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
                                    <button onClick={handleNextStep}>Next</button>
                                </div>
                            ) : (
                                <div>
                                    <h3>Step 2: Enter Ad Details</h3>
                                    <form>
                                        <input type="text" name="title" value={adData.title} onChange={handleAdDataChange} placeholder="Ad Title" />
                                        <textarea name="description" value={adData.description} onChange={handleAdDataChange} placeholder="Ad Description" />
                                        <input type="number" name="price" value={adData.price} onChange={handleAdDataChange} placeholder="Price" />
                                    </form>
                                    <button onClick={handleNextStep}>Submit</button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            <button
                onClick={handleLogout}
                style={{
                    marginTop: '20px',
                    padding: '10px 20px',
                    backgroundColor: '#FF4C4C',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    borderRadius: '5px',
                }}
            >
                Logout
            </button>

            <button
                onClick={handleDeleteAccount}
                style={{
                    marginTop: '20px',
                    padding: '10px 20px',
                    backgroundColor: '#FF4C4C',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    borderRadius: '5px',
                }}
            >
                Delete Account
            </button>
        </div>
    );
}

export default UserAccount;
