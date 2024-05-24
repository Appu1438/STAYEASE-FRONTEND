const calculateTotalAmount =  (unformatedselectedFromDate,unformatedselectedToDate,BaseAmount,Hoteldata,room,guest) => {
    // Calculate the number of days between selectedFromDate and selectedToDate
    console.log('calculate');
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
    // const totalAmount = baseTotalAmount + extraDayAmount;

    //extra rates per room and guests\

   const  extraPerRooms=(room-1)*parseInt(Hoteldata.extraperroom)
    const extraPerguests=(guest-1)*parseInt(Hoteldata.extraperhead)
    const ExtraAmount= extraPerguests + extraPerRooms

    console.log('extra',ExtraAmount)



    // Update the Total state with the calculated amount
    const total=baseTotalAmount+extraDayAmount + ExtraAmount
    console.log('total', total)

    return total

    
};

export default calculateTotalAmount