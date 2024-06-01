import React, { useEffect, useState, useRef } from 'react';
import { View, StatusBar, Text, ScrollView, SafeAreaView, Pressable, Image, Dimensions, TouchableOpacity, ActivityIndicator, Alert, useWindowDimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { decrementGuest } from "../Redux/Guests";
import getUserFavorites from "../Service/FavServices/GetFavourites";
import addToFavorites from "../Service/FavServices/AddFavourites";
import removeFromFavorites from "../Service/FavServices/RemoveFavourite";
import gethotelDetails from "../Service/GetHotelServices/HotelbyId";
import calculateTotalAmount from "../Service/DetailviewService/CalculateAmount";
import { Styles } from "../Common Component/Styles";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Toast from "react-native-toast-message";
import axios from "axios";
import API_BASE_URL from "../Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faHeart, faStar, faUserGroup, faSquareParking, faCalendarDays, faUser, faBed, faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons"
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute } from "@react-navigation/native";
import Loading from "../Common Component/loading";
import RecommendationsText from "../HomeComponents/recommendationText";
import RecommendationsOne from "../HomeComponents/recommendationsOne";
import setDates from "../Service/DetailviewService/Setdates";
import formatDate from "../Service/DetailviewService/FormatDate";
import handleIncRoom from "../Service/DetailviewService/Increaseroom";
import handleDecRoom from "../Service/DetailviewService/DecreaseRoom";
import handleIncGuests from "../Service/DetailviewService/IncreaseGuests";
import handleDecGuests from "../Service/DetailviewService/DecreaseGuests";
import OpenMaps from "../Service/Map and Dial/OpenMaps";
import HotelBooking from "../Service/DetailviewService/Booking";

export default function Detailview() {
    const windowwidth = useWindowDimensions().width;
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = useRoute();

    const { roomCount } = useSelector((state) => state.room);
    const { guestCount } = useSelector((state) => state.guest);
    const userData = useSelector(state => state.user.userData);

    const scrollViewRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const windowWidth = Dimensions.get('window').width;

    // const [Hoteldata, setHotelData] = useState('');
    const allHotels = useSelector(state => state.hotel.AllHotelsData.hotels)
    const Hoteldata = allHotels.find(hotel => hotel._id == route.params.data)

    const [favorites, setFavorites] = useState([]);
    const [favchanged, setfavchanged] = useState(false);

    const [isFromDatePickerVisible, setIsFromDatePickerVisible] = useState(false);
    const [isToDatePickerVisible, setIsToDatePickerVisible] = useState(false);

    const [unformatedselectedFromDate, setUnformatedSelectedFromDate] = useState('');
    const [unformatedselectedToDate, setUnformatedSelectedToDate] = useState('');

    const [selectedFromDate, setSelectedFromDate] = useState('');
    const [selectedToDate, setSelectedToDate] = useState('');

    const [BaseAmount, setBaseAmount] = useState(0);
    const [ExtraAmount, setExtraAmount] = useState(0);
    const [Total, setTotal] = useState(0);

    const [loading, setloading] = useState(false);

    useEffect(() => {
        // gethotelDetails(route.params.data, setHotelData, setBaseAmount, setTotal);
        setBaseAmount(parseInt(Hoteldata.discountedrate))
        setTotal(parseInt(Hoteldata.discountedrate))
        setDates(setUnformatedSelectedFromDate, setUnformatedSelectedToDate, setSelectedFromDate, setSelectedToDate);
    }, []);

    useEffect(() => {
        if (userData._id) {
            getUserFavorites(userData._id, setFavorites);
        }
    }, [userData]);

    useEffect(() => {
        let total = calculateTotalAmount(unformatedselectedFromDate, unformatedselectedToDate, BaseAmount, Hoteldata, roomCount, guestCount);
        setTotal(total);
    }, [selectedFromDate, selectedToDate, Hoteldata, BaseAmount, roomCount, guestCount]);

    useEffect(() => {
        if (guestCount > roomCount * parseInt(Hoteldata.personsperroom)) {
            adjustGuestCount();
        }
    }, [roomCount, guestCount]);

    const adjustGuestCount = () => {
        const maxGuests = roomCount * parseInt(Hoteldata.personsperroom);
        if (guestCount > maxGuests) {
            for (let i = guestCount; i > maxGuests; i--) {
                dispatch(decrementGuest());
            }
        }
    };


    const showFromDatePicker = () => {
        Toast.show({
            type: 'success',
            text1: 'Please Select From Date',
            visibilityTime: 3000,
            position: 'bottom'
        });
        setIsFromDatePickerVisible(true);
    };

    const hideFromDatePicker = () => {
        setIsFromDatePickerVisible(false);
    };

    const showToDatePicker = () => {
        Toast.show({
            type: 'success',
            text1: 'Please Select To Date',
            visibilityTime: 2000,
            position: 'bottom'
        });
        setIsToDatePickerVisible(true);
    };

    const hideToDatePicker = () => {
        setIsToDatePickerVisible(false);
    };

    const handleFromConfirm = (date) => {
        hideFromDatePicker();

        // Setting selected from date to one hour ahead
        const oneHourAhead = new Date(date.getTime() + (1 * 60 * 60 * 1000));
        setUnformatedSelectedFromDate(oneHourAhead);
        const formattedFromDate = formatDate(oneHourAhead);
        setSelectedFromDate(formattedFromDate);

        // Setting selected to date to one hour ahead of the next day
        const tomorrowDate = new Date(date.getTime());
        tomorrowDate.setDate(tomorrowDate.getDate() + 1);
        const oneHourAheadTomorrow = new Date(tomorrowDate.getTime() + (1 * 60 * 60 * 1000));
        setUnformatedSelectedToDate(oneHourAheadTomorrow);
        const formattedToDate = formatDate(oneHourAheadTomorrow);
        setSelectedToDate(formattedToDate);
    };

    const handleToConfirm = (date) => {

        hideToDatePicker();
        const oneHourAhead = new Date(date.getTime() + (1 * 60 * 60 * 1000)); // Adding 1 hour

        const formattedDate = formatDate(oneHourAhead);

        if (formattedDate < selectedFromDate) {

            const nextDay = new Date(unformatedselectedFromDate);
            nextDay.setDate(nextDay.getDate() + 1);
            setUnformatedSelectedToDate(nextDay)
            const formattedNextDay = formatDate(nextDay);

            setSelectedToDate(formattedNextDay);
            Toast.show({
                type: 'error',
                text1: 'Please select a valid date',
                visibilityTime: 3000,
                position: 'bottom'
            });
        } else {
            setUnformatedSelectedToDate(oneHourAhead)
            setSelectedToDate(formattedDate);
        }
    };

    const isFavorite = (hotelId) => {
        return favorites.includes(hotelId);
    };

    const handleBook = () => {
        Alert.alert('Book Hotel', 'Do you want to Book this Hotel', [{
            text: 'cancel',
            onPress: () => {
                null
                setloading(false)
            },
            style: 'cancel'
        }, {
            text: 'Book',
            onPress: () => submitBooking(),
            style: 'cancel'
        }
        ])
    }


    const submitBooking = async () => {
        if (roomCount <= guestCount) {
            try {
                const token = await AsyncStorage.getItem('token');
                const bookingData = {
                    userId: userData._id,
                    username: userData.name,
                    usernumber: userData.number,
                    hotelId: Hoteldata._id,
                    hoteluserId: Hoteldata.hoteluserid,
                    hotelName: Hoteldata.hotelname,
                    BookedAt: new Date(),
                    CheckIn: unformatedselectedFromDate,
                    CheckOut: unformatedselectedToDate,
                    Rooms: roomCount,
                    Guests: guestCount,
                    BookingId: await generateBookingId(6),
                    TotalAmount: parseInt(Total) + parseInt(Hoteldata.taxandfee),
                    BookingStatus: "Confirmed",
                    PaymentStatus: 'Not paid'
                    // Add other booking details as needed
                };

                await HotelBooking(bookingData, navigation, token, setloading)

            } catch (error) {
                // Handle network errors or other exceptions
                console.error('Error submitting booking:', error);
                Toast.show({
                    type: 'error',
                    text1: 'Error submitting booking',
                    visibilityTime: 3000,
                    position: 'bottom'
                });
            }

        } else {
            setloading(false)
            Toast.show({
                type: 'error',
                text1: 'Please fill Rooms and Guests Correctly',
                visibilityTime: 3000,
                position: 'bottom'
            });
        }
    };

    function generateBookingId(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let bookingId = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            bookingId += characters[randomIndex];
        }
        return bookingId;
    }


    const handleImageChange = (index) => {
        setCurrentIndex(index);
        scrollViewRef.current.scrollTo({ x: windowWidth * index, y: 0, animated: true });
    };



    if (!Hoteldata) {
        return (
            <Loading />
        )
    } else {
        const isFav = isFavorite(Hoteldata._id);

        return (

            <SafeAreaView style={[Styles.container, { alignItems: 'flex-start' }]}>
                <StatusBar translucent={true} backgroundColor="transparent" barStyle="light-content" />

                <ScrollView style={{}}>

                    <ScrollView>
                        <View>
                            <Pressable
                                style={[Styles.favourite, { top: 40 }]}
                                onPress={async () => {
                                    if (isFav) {
                                        removeFromFavorites(userData._id, Hoteldata._id, favorites, setFavorites);
                                    } else {
                                        addToFavorites(Hoteldata._id, userData._id);
                                    }
                                    setFavorites(prevFavorites => {
                                        if (isFav) {
                                            return prevFavorites.filter(fav => fav !== Hoteldata._id);
                                        } else {
                                            return [...prevFavorites, Hoteldata._id];
                                        }
                                    });
                                }}
                            >
                                <FontAwesome size={25} name={isFav ? 'heart' : 'heart-o'} color={isFav ? 'red' : 'black'} />
                            </Pressable>
                        </View>


                        <ScrollView
                            ref={scrollViewRef}
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            onMomentumScrollEnd={(event) => {
                                const newIndex = Math.round(event.nativeEvent.contentOffset.x / windowWidth);
                                setCurrentIndex(newIndex);
                            }}
                        >
                            <View style={Styles.detailViewImgBox}>
                                {Hoteldata.images.map((image, index) => (
                                    <View key={index}>
                                        <Image style={[Styles.detailimg, { width: windowwidth }]} source={{ uri: image }} />
                                    </View>
                                ))}
                            </View>
                        </ScrollView>

                    </ScrollView>

                    <ScrollView>
                        <View style={{ height: 270 }}>
                            <Text style={[Styles.detailText]}>{Hoteldata.hotelname}</Text>

                            <View style={{ flexDirection: 'row', left: '5%' }}>
                                <FontAwesomeIcon style={{ paddingTop: 40 }} color="red" icon={faStar} size={19} />
                                <Text style={[Styles.detailText]}>{Hoteldata.rating} ({Hoteldata.reviewcount})</Text>
                                <Text style={[Styles.detailText, { color: '#016DD0', fontSize: 12, padding: 5 }]}> See Reviews</Text>
                            </View>

                            <Text style={[Styles.detailText, { color: 'grey', fontSize: 15, marginTop: 0 }]}>{Hoteldata.location}</Text>

                            <TouchableOpacity onPress={() => OpenMaps(Hoteldata.locationlink)}>
                                <Text style={[Styles.detailText, { color: '#016DD0', fontSize: 13 }]}>View on Map</Text>
                            </TouchableOpacity>

                            <Text style={[Styles.detailText, { fontSize: 15 }]}>Why Book this?</Text>

                            {Hoteldata.facilities.map((facility, index) => (
                                <View key={index} style={Styles.features}>
                                    <Entypo style={{ paddingTop: 8 }} color="#F20493" name="feather" size={20} />
                                    <Text style={Styles.featurestext}>{facility}</Text>
                                </View>
                            ))}
                        </View>
                    </ScrollView>

                    <ScrollView>
                        <Text style={[Styles.detailText, { marginTop: 0 }]}>Your Booking Details</Text>
                        <View style={Styles.bookingboxContainer}>
                            <View style={Styles.bookingbox}>
                                <View style={[Styles.bookingboxes, {}]}>

                                    <FontAwesomeIcon size={20} icon={faCalendarDays} />
                                    <FontAwesomeIcon size={20} icon={faBed} />
                                    <FontAwesomeIcon size={20} icon={faUserGroup} />
                                    <FontAwesomeIcon size={20} icon={faUser} />
                                </View>

                                <View style={[Styles.bookingboxes, { width: '26%' }]}>
                                    <Text style={Styles.bookingtext}>Dates</Text>
                                    <Text style={Styles.bookingtext}>Rooms</Text>
                                    <Text style={Styles.bookingtext}>Guests</Text>
                                    <Text style={Styles.bookingtext}>Booking For</Text>
                                </View>

                                <View style={[Styles.bookingboxes, { width: '64%', backgroundColor: 're' }]}>

                                    <TouchableOpacity style={{ flexDirection: 'row', alignSelf: 'flex-end', right: '10%' }}>

                                        <TouchableOpacity onPress={showFromDatePicker}>
                                            <Text style={Styles.bookingLasttext}>{selectedFromDate} -</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={showToDatePicker}>
                                            <Text style={Styles.bookingLasttext}>{selectedToDate}</Text>
                                        </TouchableOpacity>

                                    </TouchableOpacity>

                                    <TouchableOpacity style={Styles.selectionbox}>

                                        <TouchableOpacity onPress={() => {
                                            handleDecRoom(roomCount, Hoteldata, setExtraAmount, setTotal, ExtraAmount, Total, dispatch)
                                        }
                                        }>
                                            <AntDesign name="minus" size={15} color='black' />
                                        </TouchableOpacity>

                                        <Text style={[Styles.bookingLasttext, { alignSelf: 'center' }]}>{roomCount}</Text>

                                        <TouchableOpacity onPress={() => {
                                            handleIncRoom(roomCount, Hoteldata, setExtraAmount, setTotal, ExtraAmount, Total, dispatch)
                                        }
                                        } >
                                            <AntDesign name="plus" size={15} color='black' />
                                        </TouchableOpacity>

                                    </TouchableOpacity>

                                    <TouchableOpacity style={Styles.selectionbox}>

                                        <TouchableOpacity onPress={() => {
                                            handleDecGuests(Hoteldata, guestCount, ExtraAmount, setExtraAmount, Total, setTotal, dispatch)
                                        }

                                        }>
                                            <AntDesign name="minus" size={15} color='black' />
                                        </TouchableOpacity>

                                        <Text style={[Styles.bookingLasttext, { alignSelf: 'center' }]}>{guestCount}</Text>

                                        <TouchableOpacity onPress={() => {
                                            handleIncGuests(Hoteldata, guestCount, roomCount, ExtraAmount, setExtraAmount, Total, setTotal, dispatch)
                                        }
                                        } >
                                            <AntDesign name="plus" size={15} color='black' />
                                        </TouchableOpacity>

                                    </TouchableOpacity>

                                    <Text style={Styles.bookingLasttext}>{userData.name}</Text>
                                </View>
                            </View>
                        </View>
                        <DateTimePickerModal
                            isVisible={isFromDatePickerVisible}
                            mode="date"
                            minimumDate={new Date()} // Disable past dates
                            onConfirm={(date) => {
                                handleFromConfirm(date),
                                    showToDatePicker()
                            }}
                            onCancel={hideFromDatePicker}
                        />
                        <DateTimePickerModal
                            isVisible={isToDatePickerVisible}
                            mode="date"
                            minimumDate={new Date(new Date(unformatedselectedFromDate).getTime() + (24 * 60 * 60 * 1000))} // Disable past dates and ensure "To" date is from tomorrow onward
                            onConfirm={handleToConfirm}
                            onCancel={hideToDatePicker}
                        />
                    </ScrollView>

                    <RecommendationsText />
                    <RecommendationsOne user={userData._id} />
                    <RecommendationsOne user={userData._id} />

                </ScrollView>

                <View style={Styles.bookingfooter}>
                    <View>
                        <View style={{ flexDirection: 'row' }}>
                            <FontAwesomeIcon style={{ marginTop: 3, left: 5 }} size={15} icon={faIndianRupeeSign} />
                            <Text style={[Styles.bookingtext, { fontSize: 15 }]}>{Total}</Text>
                            <Text style={[Styles.bookingtext, { textDecorationLine: 'line-through', fontSize: 10, top: 5, left: 0 }]}>{Hoteldata.actualrate}</Text>
                        </View>
                        <View>
                            <Text style={[Styles.bookingtext, { color: '#016DD0', fontSize: 10, top: 0, left: 0 }]}>+{Hoteldata.taxandfee} taxes and fees</Text>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity style={Styles.bookingbtn} onPress={() => {
                            {
                                loading ? null : setloading(true)
                                handleBook()
                            }
                        }} >
                            {loading ? <ActivityIndicator color='white' /> : (
                                <Text style={Styles.bookingbtntext}>
                                    Book Now & Pay At Hotel
                                </Text>
                            )}

                        </TouchableOpacity>
                    </View>
                </View>
                {/* <Bookingfooter payment={setmodalVisible} /> */}
            </SafeAreaView >
        );

    }
}
