import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function AdDetailsPage() {
    const { adId } = useParams(); // Obține id-ul anunțului din URL
    const [ad, setAd] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8081/ad/id/${adId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch ad details');
                }
                return response.json();
            })
            .then((data) => {
                setAd(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, [adId]);
    useEffect(() => {
        fetch(`http://localhost:8081/ad/id/${adId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch ad details');
                }
                return response.json();
            })
            .then((data) => {
                setAd(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, [adId]);
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!ad) {
        return <div>No ad found</div>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2>{ad.title}</h2>
            <p>{ad.description}</p>
            <p><strong>Price:</strong> ${ad.price}</p>
            <p><strong>Car Details:</strong></p>
            <ul>
                <li><strong>Brand:</strong> {ad.carDTO.brand}</li>
                <li><strong>Model:</strong> {ad.carDTO.model}</li>
                <li><strong>VIN:</strong> {ad.carDTO.vin}</li>
                <li><strong>Year:</strong> {ad.carDTO.yearOfManufacture}</li>
                <li><strong>Kilometers:</strong> {ad.carDTO.km} km</li>
                <li><strong>Fuel Type:</strong> {ad.carDTO.fuelType}</li>
                <li><strong>Gearbox:</strong> {ad.carDTO.gearBox}</li>
                <li><strong>Horsepower:</strong> {ad.carDTO.horsePower} HP</li>
                <li><strong>Color:</strong> {ad.carDTO.color}</li>
            </ul>
        </div>
    );
}

export default AdDetailsPage;
