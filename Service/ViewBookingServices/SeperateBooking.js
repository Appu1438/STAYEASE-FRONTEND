

const separateBookings = (bookingDetails,setUpcomingBookings,setCancelledBookings,setExpiredBookings) => {
    const upcoming = [];
    const cancelled = [];
    const expired = [];

    const currentDate = new Date();

    bookingDetails.forEach(booking => {
        if (booking.BookingStatus === 'Cancelled') {
            cancelled.push(booking);
        } else if (booking.BookingStatus === 'Confirmed' && new Date(booking.CheckOut) > currentDate) {
            upcoming.push(booking);
        } else {
            expired.push(booking);
        }
    });

    setUpcomingBookings(upcoming);
    setCancelledBookings(cancelled);
    setExpiredBookings(expired);
};

export default separateBookings