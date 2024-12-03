import React from 'react';
import { useNavigate } from 'react-router-dom';

function UserAccount() {
    const navigate = useNavigate(); // Inițializarea useNavigate

    const listedCars = [
        { id: 1, title: 'My Listed Car 1' },
        { id: 2, title: 'My Listed Car 2' },
    ];
    const rentedCars = [
        { id: 3, title: 'Rented Car 1' },
        { id: 4, title: 'Rented Car 2' },
    ];

    // Funcție de logout
    const handleLogout = () => {
        // Aici poti adăuga logica de a sterge token-ul sau alte date de autentificare, dacă este cazul
        navigate('/'); // Navigheaza la pagina de login
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>User Account</h2>
            <h3>Listed Cars</h3>
            <ul>
                {listedCars.map((car) => (
                    <li key={car.id}>{car.title}</li>
                ))}
            </ul>
            <h3>Rented Cars</h3>
            <ul>
                {rentedCars.map((car) => (
                    <li key={car.id}>{car.title}</li>
                ))}
            </ul>
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
                Log Out
            </button>
        </div>
    );
}

export default UserAccount;
