import React, { useEffect, useState } from 'react';

import '../assets/less/TotalProduct.css';

const TotalProduct = ({ displayedProducts }) => {
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        const tasksToDisplay = getTasksFromLocalStorage();
        setTotalCount(displayedProducts.length + tasksToDisplay.length);
    }, [displayedProducts]);

    const getTasksFromLocalStorage = () => {
        const tasksToDisplay = [];
        let n = 1;
        let taskKey = 'task' + n;
        while (localStorage.getItem(taskKey)) {
            const taskData = JSON.parse(localStorage.getItem(taskKey));
            tasksToDisplay.push(taskData);
            n++;
            taskKey = 'task' + n;
        }
        return tasksToDisplay;
    };

    return (
        <div className="total-product">
            <p>{totalCount}</p>
        </div>
    );
};

export default TotalProduct;
