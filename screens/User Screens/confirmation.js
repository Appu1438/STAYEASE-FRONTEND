import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Image, Pressable, StatusBar, ActivityIndicator, Linking, Alert, StyleSheet, Modal } from "react-native";
import { Styles } from "../../components/Common Component/Styles";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBookSkull, faL, faTag } from "@fortawesome/free-solid-svg-icons";
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute, } from "@react-navigation/native";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import formatDate from "../../Service/DetailviewService/FormatDate";
import formateTime from "../../Service/DetailviewService/FormateTime";
import OpenMaps from "../../Service/Map and Dial/OpenMaps";
import OpenDial from "../../Service/Map and Dial/Dial";
import getDateDifference from "../../Service/ConfirmationServices/GetdateDifference";
import getBookingdetails from "../../Service/ConfirmationServices/GetBookingDetails";
import calculaterefund from "../../Service/ConfirmationServices/CalculateRefund";
import CancelBooking from "../../Service/ConfirmationServices/Cancel";
import { useSelector } from "react-redux";
import Loading from "../../components/Common Component/loading";




export default function Confirmation() {
    const route = useRoute();
    const navigation = useNavigation();
    const UserData = useSelector(state => state.user.userData)


    const [BookingID, setBookingID] = useState(route.params.data);
    // const [UserData, setUserData] = useState('');
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
        // getdata(setUserData);
        getBookingdetails(BookingID, setBookingDetails, setHotelData, setTotal, setNormalMessage, setOfferMessage, setBookingsts, setCheckin);

    }, []);



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
                onPress: () => CancelBooking(BookingDetails,UserData,setLoading,navigation,RefundedAmount),
                style: 'cancel'
            }
            ])
        return true;
    }

   





    if (!BookingDetails || !HotelData || !UserData) {
        // Show loading indicator until data is fetched
        return (
                <Loading />
            
        )
    }
    else {

        return (

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

                                <TouchableOpacity style={styles.box} onPress={() => OpenMaps(HotelData.locationlink)}>
                                    <View style={[styles.locationbox]}>
                                        <FontAwesomeIcon size={25} color="#333" icon={faLocationDot} />
                                    </View>
                                    <Text style={styles.boxtext}>Locaton</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.box} onPress={() => OpenDial(HotelData.hotelnumber)}>
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
                                                        (setIsModal(true), calculaterefund(BookingDetails,setRefundedAmount), setLoading(true), alertCan())
                                                         :  (setLoading(true), alertCan()) 
                                                         : null;

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
                                                calculaterefund(BookingDetails,setRefundedAmount)
                                            }} >
                                            <Text
                                                style={[Styles.navtextone, { alignSelf: 'flex-start', left: 16, top: 25,marginBottom:0 }]}
                                            >
                                                View Cancellation Charges!!</Text>
                                        </TouchableOpacity>

                                    </>
                                )}

                                <View style={[Styles.checkingbox,{borderBottomWidth:0}]}>

                                    <View>
                                        <Text

                                            style={[Styles.navtextone, { top: '0%',marginBottom:10 }]}>For any queries related to your bookings, feel free to contact us. We're here to assist you!</Text>
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

                        </View>
                    </View>
                </Modal>

                </SafeAreaView>
                



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
        width: '95%',
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
