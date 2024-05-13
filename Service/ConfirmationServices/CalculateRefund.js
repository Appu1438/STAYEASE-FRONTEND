async function calculaterefund(BookingDetails,setRefundedAmount) {

    const currentDate = new Date();
    const checkIn = new Date(BookingDetails.CheckIn);
    const timeDifferenceInMillis = currentDate.getTime() - checkIn.getTime();
    const timeDifferenceInHours = Math.abs(timeDifferenceInMillis / (1000 * 60 * 60)); // Convert milliseconds to hours

    let refundPercentage = 0;
    if (timeDifferenceInHours >= 4) {
        refundPercentage = 1.00;
    } else if (timeDifferenceInHours >= 3) {
        refundPercentage = 0.75;
    } else if (timeDifferenceInHours >= 2) {
        refundPercentage = 0.50;
    } else if (timeDifferenceInHours >= 1) {
        refundPercentage = 0.25;
    } else {
        refundPercentage = 0
    }

    const refundAmount = parseInt(BookingDetails.PaidAmount) * refundPercentage;
    setRefundedAmount(refundAmount)
    return refundAmount;
}

export default calculaterefund