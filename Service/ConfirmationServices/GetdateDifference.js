const getDateDifference = (startDateString, endDateString) => {
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        // Handle invalid date strings
        return 'Invalid Date';
    }
    const difference = endDate - startDate; // Difference in milliseconds
    const days = Math.floor(difference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
    return `${days} `;
};

export default getDateDifference