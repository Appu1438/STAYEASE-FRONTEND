
const calculateTotalAmount = async (unformatedselectedFromDate,unformatedselectedToDate,BaseAmount,Hoteldata,ExtraAmount,setTotal) => {
    // Calculate the number of days between selectedFromDate and selectedToDate
    const startDate = new Date(unformatedselectedFromDate);
    const endDate = new Date(unformatedselectedToDate);
    const numberOfDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

    // Calculate the total amount based on room rate for the first day
    // Assuming discounted rate is per day
    const baseTotalAmount = BaseAmount;

    // Calculate the total amount for extra days beyond the first day
    const extraDays = numberOfDays - 1; // Exclude the first day
    const extraDayRate = parseInt(Hoteldata.extraperday); // Additional rate per extra day
    const extraDayAmount = extraDays * extraDayRate;
    // Calculate the total amount including extra days
    const totalAmount = baseTotalAmount + extraDayAmount;

    // Update the Total state with the calculated amount
    setTotal(totalAmount + ExtraAmount);
};

export default calculateTotalAmount