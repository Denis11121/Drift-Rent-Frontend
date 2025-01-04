import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';

function AdsPage() {
    const navigate = useNavigate();
    const [ads, setAds] = useState([]);
    const [filteredAds, setFilteredAds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8081/ad/all')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch ads');
                }
                return response.json();
            })
            .then((data) => {
                setAds(data);
                setFilteredAds(data);  // Initialize filteredAds with all ads
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    const handleSearch = (filters) => {
        const filtered = ads.filter((ad) => {
            return (
                (!filters.brand || (ad.brand && ad.brand.toLowerCase().includes(filters.brand.toLowerCase()))) &&
                (!filters.model || (ad.model && ad.model.toLowerCase().includes(filters.model.toLowerCase()))) &&
                (!filters.body || (ad.body && ad.body.toLowerCase().includes(filters.body.toLowerCase()))) &&
                (!filters.startYear || ad.year >= parseInt(filters.startYear)) &&
                (!filters.endYear || ad.year <= parseInt(filters.endYear)) &&
                (!filters.minKm || ad.km >= parseInt(filters.minKm)) &&
                (!filters.maxKm || ad.km <= parseInt(filters.maxKm)) &&
                (!filters.fuelType || (ad.fuelType && ad.fuelType.toLowerCase().includes(filters.fuelType.toLowerCase()))) &&
                (!filters.gearBox || (ad.gearBox && ad.gearBox.toLowerCase().includes(filters.gearBox.toLowerCase()))) &&
                (!filters.minEngineCapacity || ad.engineCapacity >= parseInt(filters.minEngineCapacity)) &&
                (!filters.maxEngineCapacity || ad.engineCapacity <= parseInt(filters.maxEngineCapacity)) &&
                (!filters.minHorsePower || ad.horsePower >= parseInt(filters.minHorsePower)) &&
                (!filters.maxHorsePower || ad.horsePower <= parseInt(filters.maxHorsePower)) &&
                (!filters.color || (ad.color && ad.color.toLowerCase().includes(filters.color.toLowerCase())))
            );
        });
        setFilteredAds(filtered);  // Update filteredAds with the search results
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <SearchBar onSearch={handleSearch} />
            <h2>Rental Ads</h2>
            <ul>
                {filteredAds.map((ad) => (
                    <li key={ad.id} style={{ marginBottom: '20px' }}>
                        <Link to={`/ad/${ad.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                            <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
                                <h3>{ad.title}</h3>
                                <p>{ad.description}</p>
                                <p><strong>Price:</strong> ${ad.price}</p>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
            <button
                onClick={() => navigate('/account')}
                style={{
                    marginTop: '20px',
                    padding: '10px 20px',
                    backgroundColor: '#007BFF',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    borderRadius: '5px',
                }}
            >
                Go to User Account
            </button>
        </div>
    );
}

export default AdsPage;
