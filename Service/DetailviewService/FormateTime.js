

const formateTime = (datestring) => {
    // Create a new Date object with the desired date
    const date = new Date(datestring);

    // Get the individual components
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const day = date.getDate();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    // Convert hours to 12-hour format and determine AM/PM
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Handle midnight (0 hours) as 12 AM

    // Format the minutes component with leading zero if needed
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formatedHourwithZero = formattedHours < 10 ? `0${formattedHours}` : formattedHours

    // Format the components into a string
    const formattedDate = `${day} ${monthNames[monthIndex]} ${year} ${formatedHourwithZero}:${formattedMinutes} ${period}`;

    // Return the formatted date
    return formattedDate;
}

export default formateTime