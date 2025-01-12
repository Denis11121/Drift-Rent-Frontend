import React, { useState } from 'react';

function SearchBar({ onSearch }) {
    const [filters, setFilters] = useState({
        brand: '',
        model: '',
        body: '',
        startYear: '',
        endYear: '',
        minKm: '',
        maxKm: '',
        fuelType: '',
        gearBox: '',
        minEngineCapacity: '',
        maxEngineCapacity: '',
        minHorsePower: '',
        maxHorsePower: '',
        color: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(filters);
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
            <input
                type="text"
                name="brand"
                value={filters.brand}
                onChange={handleChange}
                placeholder="Brand"
            />
            <input
                type="text"
                name="model"
                value={filters.model}
                onChange={handleChange}
                placeholder="Model"
            />
            <input
                type="text"
                name="body"
                value={filters.body}
                onChange={handleChange}
                placeholder="Body"
            />
            <input
                type="number"
                name="startYear"
                value={filters.startYear}
                onChange={handleChange}
                placeholder="Start Year"
            />
            <input
                type="number"
                name="endYear"
                value={filters.endYear}
                onChange={handleChange}
                placeholder="End Year"
            />
            <input
                type="number"
                name="minKm"
                value={filters.minKm}
                onChange={handleChange}
                placeholder="Min KM"
            />
            <input
                type="number"
                name="maxKm"
                value={filters.maxKm}
                onChange={handleChange}
                placeholder="Max KM"
            />
            <input
                type="text"
                name="fuelType"
                value={filters.fuelType}
                onChange={handleChange}
                placeholder="Fuel Type"
            />
            <input
                type="text"
                name="gearBox"
                value={filters.gearBox}
                onChange={handleChange}
                placeholder="Gearbox"
            />
            <input
                type="number"
                name="minEngineCapacity"
                value={filters.minEngineCapacity}
                onChange={handleChange}
                placeholder="Min Engine Capacity"
            />
            <input
                type="number"
                name="maxEngineCapacity"
                value={filters.maxEngineCapacity}
                onChange={handleChange}
                placeholder="Max Engine Capacity"
            />
            <input
                type="number"
                name="minHorsePower"
                value={filters.minHorsePower}
                onChange={handleChange}
                placeholder="Min HorsePower"
            />
            <input
                type="number"
                name="maxHorsePower"
                value={filters.maxHorsePower}
                onChange={handleChange}
                placeholder="Max HorsePower"
            />
            <input
                type="text"
                name="color"
                value={filters.color}
                onChange={handleChange}
                placeholder="Color"
            />
            <button type="submit">Search</button>
        </form>
    );
}

export default SearchBar;
