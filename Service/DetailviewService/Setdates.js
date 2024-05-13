import formatDate from "./FormatDate";



const setDates = (setUnformatedSelectedFromDate,setUnformatedSelectedToDate,setSelectedFromDate,setSelectedToDate) => {
    const currentDate = new Date();
    const oneHourAhead = new Date(currentDate.getTime() + (1 * 60 * 60 * 1000)); // Adding 1 hour

    const tomorrowDate = new Date(currentDate.getTime());
    tomorrowDate.setDate(currentDate.getDate() + 1);
    const oneHourAheadTomorrow = new Date(tomorrowDate.getTime() + (1 * 60 * 60 * 1000)); // Adding 1 hour

    setUnformatedSelectedFromDate(oneHourAhead);
    setUnformatedSelectedToDate(oneHourAheadTomorrow);

    const formattedOneHourAhead = formatDate(oneHourAhead);
    const formattedOneHourAheadTomorrow = formatDate(oneHourAheadTomorrow);

    setSelectedFromDate(formattedOneHourAhead);
    setSelectedToDate(formattedOneHourAheadTomorrow);
};

export default setDates