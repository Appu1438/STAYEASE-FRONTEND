const getOffer = async (BookingDetails,setTotal,setNormalMessage,setOfferMessage,setBookingsts) => {

    
    const bookingTime = new Date(BookingDetails.BookedAt);
    const checkoutTime = new Date(BookingDetails.CheckOut);
    const checkInTime = new Date(BookingDetails.CheckIn);
    const currentTime = new Date();
    console.log('curr', currentTime)
    console.log('book', bookingTime)
    console.log('checkout', checkoutTime)


    // Calculate the time differences in milliseconds
    const timeDifferenceBookingToCheckout = checkoutTime.getTime() - bookingTime.getTime();
    const timeDifferenceBookingToCurrent = currentTime.getTime() - bookingTime.getTime();

    // Calculate the time differences in hours
    const timeDifferenceBookingToCheckoutInHours = timeDifferenceBookingToCheckout / (1000 * 3600);
    const timeDifferenceBookingToCurrentInHours = timeDifferenceBookingToCurrent / (1000 * 3600);



    // Assume total amount is fetched from somewhere
    const totalAmount = BookingDetails.TotalAmount; // Example total amount




    // If current date is greater than checkout date, set booking as expired
    if (BookingDetails.BookingStatus == 'Cancelled' && BookingDetails.PaymentStatus!='Refunded') {
        setTotal('');
        setNormalMessage('Your booking Cancelled');
        setOfferMessage(' No offers available');
        setBookingsts('Cancelled');
    }else if(BookingDetails.BookingStatus == 'Cancelled' && BookingDetails.PaymentStatus=='Refunded'){
        setTotal('');
        setNormalMessage(`Your booking Cancelled , Rs ${BookingDetails.RefundedAmount} has been Refunded`);
        setOfferMessage(' No offers available');
        setBookingsts('Cancelled');
    } else if (BookingDetails.PaymentStatus == 'paid' && BookingDetails.BookingStatus != 'Cancelled' && currentTime < checkoutTime) {
        setTotal('');
        setNormalMessage(`Payment Successfull${BookingDetails.PaidAmount < BookingDetails.TotalAmount ? (` , You got a discount of ${parseInt(BookingDetails.TotalAmount) - parseInt(BookingDetails.PaidAmount)}`) : (null)}`);
        setOfferMessage(` Enjoy Your Booking `);
    }
    else if (currentTime > checkoutTime && BookingDetails.BookingStatus != 'Cancelled') {
        setTotal('');
        setNormalMessage('Your booking expired');
        setOfferMessage(' No offers available');
        setBookingsts('expired');
    }
    else if (timeDifferenceBookingToCurrentInHours > 2 && BookingDetails.PaymentStatus != 'paid') {
        setTotal(totalAmount);
        setNormalMessage('You Need to Pay Full Amount');
        setOfferMessage(' Offer Times up!!');
    } else if (timeDifferenceBookingToCurrentInHours < 2 && BookingDetails.PaymentStatus != 'paid') {
        let discount = 0
        if (totalAmount < 1000) {
            // Apply a discount of ₹75 for total amount less than ₹1000
            discount = 75
        } else if (totalAmount >= 1000 && totalAmount < 2000) {
            // Apply a discount of ₹100 for total amount between ₹1000 and ₹2000
            discount = 100


        } else if (totalAmount >= 2000 && totalAmount < 3000) {
            // Apply a discount of ₹150 for total amount between ₹2000 and ₹3000
            discount = 150

        } else if (totalAmount >= 3000) {
            // Apply a discount of ₹200 for total amount above ₹3000
            discount = 200
        }
        setTotal(totalAmount - discount);
        setNormalMessage(`Pay now to get an discount of Rs ${(discount)}`);
        setOfferMessage(' Offer valid till 2 hours after booking');

    } else {

    }
}

export default getOffer