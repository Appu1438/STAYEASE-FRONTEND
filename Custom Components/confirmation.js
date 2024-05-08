import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Image, Pressable, StatusBar, ActivityIndicator, Linking, Alert, StyleSheet, Modal } from "react-native";
import { Styles } from "../Common Component/Styles";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBookSkull, faL, faTag } from "@fortawesome/free-solid-svg-icons";
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute, } from "@react-navigation/native";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import API_BASE_URL from "../Api";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../Common Component/loading";
import { encode } from "base-64";
import RazorpayCheckout from 'react-native-razorpay';
import { CardField, useConfirmPayment, useStripe } from "@stripe/stripe-react-native";




export default function Confirmation() {
    const route = useRoute();
    const navigation = useNavigation();


    const [BookingID, setBookingID] = useState(route.params.data);
    const [UserData, setUserData] = useState('');
    const [BookingDetails, setBookingDetails] = useState(null); // Initialize as null to indicate loading state
    const [HotelData, setHotelData] = useState(null); // Initialize as null to indicate loading state

    const [Total, setTotal] = useState('');
    const [OfferMeaasge, setOfferMessage] = useState('');
    const [NormalMessage, setNormalMessage] = useState('');

    const [Bookingsts, setBookingsts] = useState('');
    const [Checkin, setCheckin] = useState('');




    const currentDate = new Date()
    const [Looading, setLoading] = useState(false);
    const [RefundedAmount, setRefundedAmount] = useState(0);
    const [isModal, setIsModal] = useState(false);


    useEffect(() => {
        getdata();
        getBookingdetails();

    }, []);



    const getOffer = async (BookingDetails) => {
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



    const formatDate = (dateString) => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            // Handle invalid date string
            return 'Invalid Date';
        }
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const day = date.getDate().toString().padStart(2, '0');
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    };

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

    // Example usage


    // Example     
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



    async function getdata() {
        const token = await AsyncStorage.getItem('token');
        axios.post(`${API_BASE_URL}/user-data`, { token: token })
            .then(res => {
                setUserData(res.data.data);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                // Handle error
            });
    }

    async function getBookingdetails() {
        try {
            const _id = BookingID;
            const response = await axios.get(`${API_BASE_URL}/get-booking-deatils/${_id}`);
            if (response.data.status === 'ok') {
                setBookingDetails(response.data.data);
                setTotal(response.data.data.TotalAmount);

                getHotelById(response.data.data.hotelId);
                setBookingsts(response.data.data.BookingStatus)
                await getOffer(response.data.data)
                setCheckin(new Date(response.data.data.CheckIn))


            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Failed to get booking details',
                    visibilityTime: 3000,
                    position: 'bottom'
                });
            }
        } catch (error) {
            console.error('Error fetching booking details:', error);
            // Handle error
        }
    }

    async function getHotelById(id) {
        try {
            const response = await axios.get(`${API_BASE_URL}/get-hotel-byID?id=${id}`);
            if (response.data.status === 'ok') {
                setHotelData(response.data.data);
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Failed to get hotel details',
                    visibilityTime: 3000,
                    position: 'bottom'
                });
            }
        } catch (error) {
            console.error('Error fetching hotel details:', error);
            // Handle error
        }
    }

    function alertCan() {
        Alert.alert('Cancel Booking', 'Do you want to cancel your booking',
            [{
                text: 'cancel',
                onPress: () => {
                    null
                    setLoading(false)
                },
                style: 'cancel'
            }, {
                text: 'ok',
                onPress: () => CancelBooking(BookingDetails._id),
                style: 'cancel'
            }
            ])
        return true;
    }

    async function CancelBooking(id) {
        try {
            const response = await axios.post(`${API_BASE_URL}/cancel-booking`, { id: id });
            // console.log(response);

            setLoading(false);

            if (response.data.status === 'ok') {
                if (BookingDetails.PaymentStatus == 'paid') {
                    Toast.show({
                        type: 'success',
                        text1: 'Booking is Cancelled',
                        visibilityTime: 3000,
                        position: 'bottom'
                    });
                    await initiateRefund()
                } else {
                    Toast.show({
                        type: 'success',
                        text1: 'Booking is Cancelled',
                        visibilityTime: 3000,
                        position: 'bottom'
                    });
                    navigation.navigate('Bookings', { data: UserData });
                    navigation.navigate('Confirmation', { data: BookingDetails._id });
                }

            } else {
                Toast.show({
                    type: 'error',
                    text1: JSON.stringify(response.data.data),
                    visibilityTime: 3000,
                    position: 'bottom'
                });
            }
        } catch (error) {
            console.error('Error cancelling booking:', error);
            Toast.show({
                type: 'error',
                text1: 'An error occurred while cancelling the booking',
                visibilityTime: 3000,
                position: 'bottom'
            });
        }
    }

    async function initiateRefund() {

        
        const data = {
            paymentMethodId: BookingDetails.PaymentDetails[0].paymentMethodId,
            // amount: BookingDetails.PaymentDetails[0].amount,
            amount:RefundedAmount*100,
            id: BookingDetails._id
        };
        try {
            const res = await axios.post(`${API_BASE_URL}/refund`, data);
            if (res.data.status === 'ok') {
                Toast.show({
                    type: 'success',
                    text1: 'Refund Initiated',
                    visibilityTime: 3000,
                    position: 'bottom'
                });
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Error In Initiating Refund',
                    visibilityTime: 3000,
                    position: 'bottom'
                });
            }
        } catch (err) {
            console.error(err);
            Toast.show({
                type: 'error',
                text1: 'An error occurred while initiating refund',
                visibilityTime: 3000,
                position: 'bottom'
            });
        }
        navigation.navigate('Bookings', { data: UserData });
        navigation.navigate('Confirmation', { data: BookingDetails._id });
    }

    const OpenMaps = () => {
        console.log('Maps')
        const Mapurl = HotelData.locationlink

        Linking.openURL(Mapurl);

    }

    const OpenDial = () => {
        const phoneNumber = HotelData.hotelnumber // Replace with your phone number
        const dialerUrl = `tel:+91${phoneNumber}`;

        Linking.openURL(dialerUrl);
    }

    async function calculaterefund() {

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






    if (!BookingDetails || !HotelData || !UserData) {
        // Show loading indicator until data is fetched
        return (
            <Modal visible={true} animationType="fade" transparent={true}>
                <Loading />
            </Modal>
        )
    }
    else {

        return (
            <Modal visible={true} animationType="fade" transparent={true}>

                <SafeAreaView style={{ flex: 1 }}>
                    <StatusBar backgroundColor={Bookingsts == 'Confirmed' ? "#347442" : '#dbc607'} barStyle='light-content' />


                    <ScrollView >
                        <View style={Bookingsts == 'Confirmed' ? Styles.confirmboxg : Styles.confirmboxy}>
                            <TouchableOpacity style={{ top: '10%', zIndex: 1 }} onPress={() => navigation.goBack()}>
                                <AntDesign name="closecircleo" size={20} color='white' />
                            </TouchableOpacity>
                            <Text style={[Styles.confirmtext, { top: '25%' }]}>Your booking is {Bookingsts}</Text>

                            {
                                Bookingsts == 'Cancelled' || Bookingsts == 'expired' ? null
                                    : currentDate > Checkin && Bookingsts != 'Cancelled' ? (
                                        <Text style={[Styles.confirmtext, { top: '26%' }]}>Cancellation Not Available </Text>
                                    ) : (
                                        <Text style={[Styles.confirmtext, { top: '26%' }]}>Cancellation available until {formateTime(Checkin)} </Text>
                                    )
                            }

                        </View>
                        {/* <Confirm /> */}


                        <View style={Bookingsts == 'Cancelled' || Bookingsts == 'expired' || BookingDetails.PaymentStatus == 'paid' ? Styles.confirmboxtwoC : Styles.confirmboxtwo}>

                            <Text style={[Styles.confirmtext, { color: 'black' }]}>
                                {NormalMessage}
                            </Text>

                            {BookingDetails.PaymentStatus == 'paid' && Bookingsts != 'expired' && Bookingsts != 'Cancelled' ?
                                (
                                    <View style={Styles.offerg}>
                                        <MaterialIcons size={20} name='celebration' color={'#ffff'} />
                                        <Text style={Styles.offertextg}>
                                            {OfferMeaasge}
                                        </Text>
                                    </View>
                                ) :

                                (
                                    <View style={Styles.offer}>
                                        <FontAwesomeIcon size={20} icon={faTag} color={'#B99207'} />
                                        <Text style={Styles.offertext}>
                                            {OfferMeaasge}

                                        </Text>
                                    </View>
                                )}

                            {Bookingsts == 'Cancelled' || Bookingsts == 'expired' || BookingDetails.PaymentStatus == 'paid' ? (null) : (
                                <View>
                                    <Pressable
                                        style={[Styles.btn, { width: '95%' }]}
                                        onPress={() => {
                                            navigation.navigate('Payment', {
                                                data: {
                                                    total: Total,
                                                    bookingId: BookingDetails._id,

                                                }
                                            });
                                        }}
                                    >
                                        <Text style={Styles.btntext}>
                                            Pay {Total}
                                        </Text>


                                    </Pressable>
                                </View>


                            )}

                        </View>


                        {/* <PayOnline/> */}

                        <View style={Styles.confirmboxthree}>

                            <Text style={[Styles.detailText,]}>{HotelData?.hotelname}</Text>
                            <Text style={[Styles.detailText, { color: 'grey', fontSize: 15 }]}>{HotelData?.location}</Text>

                            <View style={Styles.orderdetails}>

                                <TouchableOpacity style={styles.box} onPress={() => OpenMaps()}>
                                    <View style={[styles.locationbox]}>
                                        <FontAwesomeIcon size={25} color="#333" icon={faLocationDot} />
                                    </View>
                                    <Text style={styles.boxtext}>Locaton</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.box} onPress={() => OpenDial()}>
                                    <View style={[styles.locationbox]}>
                                        <Feather size={25} color='#333' name="phone" />
                                    </View>
                                    <Text style={styles.boxtext}>Call Hotel</Text>
                                </TouchableOpacity>

                                <Pressable onPress={() => navigation.navigate('Detailview', { data: HotelData._id })}>
                                    <Image style={Styles.paymentimg} source={{ uri: HotelData?.images[0] }}></Image>
                                </Pressable>

                            </View>

                            <View style={Bookingsts == 'Cancelled' || currentDate > Checkin || Bookingsts == 'expired' ? Styles.checkingdetailsC : Styles.checkingdetails}>

                                <View style={[Styles.checkingbox, { height: 75 }]}>

                                    <View>
                                        <Text style={Styles.navtextone}>Check-in</Text>
                                        <Text style={[Styles.navtextone, { fontWeight: "300" }]}>{formatDate(BookingDetails.CheckIn)}</Text>

                                    </View>

                                    <View>
                                        <Text style={Styles.navtextone}>{getDateDifference(BookingDetails.CheckIn, BookingDetails.CheckOut)}N</Text>
                                    </View>

                                    <View>
                                        <Text style={Styles.navtextone}>Check-out</Text>
                                        <Text style={[Styles.navtextone, { fontWeight: "300" }]}>{formatDate(BookingDetails.CheckOut)}</Text>

                                    </View>

                                </View>

                                <View style={[Styles.checkingbox,]}>

                                    <View>
                                        <Text style={Styles.navtextone}>Booking ID</Text>
                                        <Text style={[Styles.navtextone, { fontWeight: "300" }]}>{BookingDetails.BookingId}</Text>
                                    </View>


                                </View>
                                <View style={[Styles.checkingbox,]}>

                                    <View>
                                        <Text style={Styles.navtextone}>Reserved For</Text>
                                        <Text style={[Styles.navtextone, { fontWeight: "300" }]}>{UserData.name}</Text>
                                    </View>


                                </View>

                                <View style={[Styles.checkingbox,]}>

                                    <View>
                                        <Text style={Styles.navtextone}>Rooms & Guests</Text>
                                        <Text style={[Styles.navtextone, { fontWeight: "300" }]}>{BookingDetails.Rooms} Room . {BookingDetails.Guests} Guest</Text>
                                    </View>


                                </View>

                                <View style={[Styles.checkingbox,]}>

                                    <View>
                                        <Text style={Styles.navtextone}>Contact Information</Text>
                                        <Text style={[Styles.navtextone, { fontWeight: "300" }]}>+91 {UserData.number}</Text>
                                    </View>


                                </View>

                                {Bookingsts == 'Cancelled' || currentDate > Checkin || Bookingsts == 'expired' ? (null) : (

                                    <>
                                        <Pressable style={[Styles.btn, { width: '95%', top: 20 }]} onPress={() => {
                                            {
                                                Looading !== null ?
                                                    BookingDetails.PaymentStatus == 'paid' ?
                                                        (setIsModal(true), calculaterefund(), setLoading(true), alertCan()) :
                                                        (setLoading(true), alertCan()) :
                                                    null;

                                            }
                                        }}>
                                            {Looading ? <ActivityIndicator color='white' /> : (
                                                <Text style={Styles.btntext}>
                                                    Cancel Booking
                                                </Text>)}
                                        </Pressable>



                                    </>
                                )}
                                {currentDate > Checkin && Bookingsts != 'Cancelled' || Bookingsts == 'expired' ? (null) : (

                                    <>
                                        <TouchableOpacity style={{ alignSelf: 'flex-start',width:'100%',height:25,top:5 }}
                                            onPress={() => {
                                                setIsModal(true)
                                                calculaterefund()
                                            }} >
                                            <Text
                                                style={[Styles.navtextone, { alignSelf: 'flex-start', left: 19, top: 30 }]}
                                            >
                                                View Cancellation Charges!!</Text>
                                        </TouchableOpacity>

                                    </>
                                )}

                                <View style={[Styles.checkingbox,{borderBottomWidth:0}]}>

                                    <View>
                                        <Text

                                            style={[Styles.navtextone, { top: '0%' }]}>For any queries related to your bookings, feel free to contact us. We're here to assist you!</Text>
                                    </View>


                                </View>

                            </View>



                        </View>

                        {/* <OrderDetails/> */}

                    </ScrollView>

                    <View style={Styles.CheckingFooter}>

                        <Text style={[Styles.detailText, { fontSize: 15 }]}>Important to Note</Text>

                        <View style={Styles.footercontent}>

                            <View style={{ flexDirection: "row", }}>
                                <Feather style={{ top: '5%', right: 5 }} name="key" size={30} />

                                <View>
                                    <Text style={Styles.navtextone}>Check-in</Text>
                                    <Text style={[Styles.navtextone, { color: 'grey' }]}>{formateTime(BookingDetails.CheckIn)}</Text>
                                </View>

                            </View>

                            <View >
                                <Text style={Styles.navtextone}>Check-out</Text>
                                <Text style={[Styles.navtextone, { color: 'grey' }]}>{formateTime(BookingDetails.CheckOut)}</Text>
                            </View>

                        </View>
                    </View>
                    {/* <ImporatToNote/> */}



                </SafeAreaView>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={isModal}
                    onRequestClose={() => setIsModal(false)}
                >

                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Cancellation Policy</Text>
                            <Text style={styles.message}>This is a refund policy based on established guidelines.</Text>

                            <View style={styles.row}>
                                <Text style={styles.leftText}>Cancel Before 4 hours of Check-in</Text>
                                <Text style={styles.rightText}>100% Return</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.leftText}>Before 3 hours</Text>
                                <Text style={styles.rightText}>75%</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.leftText}>Before 2 hours</Text>
                                <Text style={styles.rightText}>50%</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.leftText}>Before 1 hour</Text>
                                <Text style={styles.rightText}>25%</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.leftText}>Less than 1 hour</Text>
                                <Text style={styles.rightText}>0%</Text>
                            </View>
                            {BookingDetails.PaymentStatus == 'paid' ? (
                                <Text style={styles.note}>
                                    Refund Based on Current Status: Rs {RefundedAmount}
                                </Text>
                            )
                             : (null)}

                            <TouchableOpacity style={{ marginTop:20, zIndex: 1,alignSelf:'center' }} onPress={() => setIsModal(false)}>
                                <AntDesign name="closecircleo" size={25} color='black' />
                            </TouchableOpacity>

                            {/* <Pressable
                                onPress={() => setIsModal(false)}>
                                <Text
                                    style={styles.closeButton}
                                >
                                    Close
                                </Text>
                            </Pressable> */}

                        </View>
                    </View>
                </Modal>

            </Modal>


        )

    }

}


const styles = StyleSheet.create({
    locationbox: {
        width: 60,
        height: 60,
        borderRadius: 35,
        marginLeft: 0,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: '#f4f4f4', /* Light background color */
        borderWidth: 1,
        borderColor: '#ccc', /* Light border color */
    },

    box: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10
    },

    boxtext: {
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 0,
        color: '#444', /* Darker text color */
        marginTop: 5, /* Adjusted margin for better alignment with icon */
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '85%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    leftText: {
        flex: 1,
        textAlign: 'left',
        fontSize: 12,
    },
    rightText: {
        flex: 1,
        textAlign: 'right',
        fontSize: 12,
    },
    note: {
        fontSize: 15,
        marginTop: 10,
        // fontStyle: 'italic',
        textAlign: 'center',
    },
    closeButton: {
        alignSelf: 'center',
        marginTop: 20,
        color: 'black',
        // textDecorationLine: 'underline',
        fontSize: 15,
    },
    message: {
        fontSize: 13,
        marginBottom: 10,
        textAlign: 'center',
    },
})
