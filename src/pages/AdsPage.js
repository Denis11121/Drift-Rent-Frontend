import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdsPage() {
    const navigate = useNavigate(); // Inițializarea useNavigate

    const ads = [
        { id: 1, title: 'Car 1', description: 'A great car for rent.' },
        { id: 2, title: 'Car 2', description: 'Another amazing car.' },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h2>Rental Ads</h2>
            <ul>
                {ads.map((ad) => (
                    <li key={ad.id}>
                        <h3>{ad.title}</h3>
                        <p>{ad.description}</p>
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
