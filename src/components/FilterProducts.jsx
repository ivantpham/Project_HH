import React from 'react';

const FilterProducts = ({ activeFilter, onFilterChange }) => {
    const handleClick = (filter) => {
        onFilterChange(filter);
    };

    return (
        <div className="filter">
            <button
                className={activeFilter === 'All' ? 'active' : ''}
                onClick={() => handleClick('All')}
            >
                All
            </button>
            <button
                className={activeFilter === 'Điện Thoại' ? 'active' : ''}
                onClick={() => handleClick('Điện Thoại')}
            >
                Điện Thoại
            </button>
            <button
                className={activeFilter === 'Laptop' ? 'active' : ''}
                onClick={() => handleClick('Laptop')}
            >
                Laptop
            </button>
            <button
                className={activeFilter === 'Tablet' ? 'active' : ''}
                onClick={() => handleClick('Tablet')}
            >
                Tablet
            </button>
            <button
                className={activeFilter === 'Đồng Hồ' ? 'active' : ''}
                onClick={() => handleClick('Đồng Hồ')}
            >
                Đồng Hồ
            </button>
        </div>
    );
};

export default FilterProducts;
