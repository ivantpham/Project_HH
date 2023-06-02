import React from 'react';

const FilterProducts = ({ activeFilter, onFilterChange }) => {
    const handleClick = (filter) => {
        onFilterChange(filter);
    };

    return (
        <div className="filter">
            <button
                className={`btn ${activeFilter === 'All' ? 'btn-primary active' : 'btn-secondary'}`}
                onClick={() => handleClick('All')}
            >
                All
            </button>
            <button
                className={`btn ${activeFilter === 'Điện Thoại' ? 'btn-primary active' : 'btn-secondary'}`}
                onClick={() => handleClick('Điện Thoại')}
            >
                Điện Thoại
            </button>
            <button
                className={`btn ${activeFilter === 'Laptop' ? 'btn-primary active' : 'btn-secondary'}`}
                onClick={() => handleClick('Laptop')}
            >
                Laptop
            </button>
            <button
                className={`btn ${activeFilter === 'Tablet' ? 'btn-primary active' : 'btn-secondary'}`}
                onClick={() => handleClick('Tablet')}
            >
                Tablet
            </button>
            <button
                className={`btn ${activeFilter === 'Đồng Hồ' ? 'btn-primary active' : 'btn-secondary'}`}
                onClick={() => handleClick('Đồng Hồ')}
            >
                Đồng Hồ
            </button>
        </div>
    );
};

export default FilterProducts;
