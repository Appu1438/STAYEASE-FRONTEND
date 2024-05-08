import { View, StatusBar, Text, ScrollView, SafeAreaView, Pressable, Image, Modal, Dimensions, TouchableOpacity, useWindowDimensions, ActivityIndicator, Linking, PanResponder } from "react-native";
import { Styles } from "../Common Component/Styles";
import Moreimages from "../DetailViewComponent/Moreimage";
import OtherDetails from "../DetailViewComponent/OtherDetails";
import BookingDetails from "../DetailViewComponent/bookingDetails";
import Bookingfooter from "../DetailViewComponent/Book";
import RecommendationsText from "../HomeComponents/recommendationText";
import RecommendationsOne from "../HomeComponents/recommendationsOne";
import { useEffect, useState, useRef } from "react";
import Loading from "../Common Component/loading";
import Payment from "./confirmation";
import Bookings from "./ViewBooking";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import API_BASE_URL from "../Api";
import Toast from "react-native-toast-message";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faHeart } from "@fortawesome/free-regular-svg-icons"
import { faStar } from "@fortawesome/free-regular-svg-icons"
import { faUserGroup, faSquareParking, } from "@fortawesome/free-solid-svg-icons"
import { faCalendarDays, faUser, faBed } from "@fortawesome/free-solid-svg-icons"
import { faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ConfirmationModal from "../Common Component/ConfirmationModal";






export default function Detailview({ }) {
    let windowwidth = useWindowDimensions().width

    const scrollViewRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const windowWidth = Dimensions.get('window').width;

    const navigation = useNavigation()

    const [userData, setUserData] = useState('')
    const [Hoteldata, setHotelData] = useState('')
    const [favorites, setFavorites] = useState([]);


    const [isFromDatePickerVisible, setIsFromDatePickerVisible] = useState(false);
    const [isToDatePickerVisible, setIsToDatePickerVisible] = useState(false);

    const [unformatedselectedFromDate, setUnformatedSelectedFromDate] = useState('');
    const [unformatedselectedToDate, setUnformatedSelectedToDate] = useState('');

    const [selectedFromDate, setSelectedFromDate] = useState('');
    const [selectedToDate, setSelectedToDate] = useState('');

    const [Rooms, setRooms] = useState(1);
    const [Guests, setGuests] = useState(1);

    const [BaseAmount, setBaseAmount] = useState(0);
    const [ExtraAmount, setExtraAmount] = useState(0);
    const [Total, setTotal] = useState(0);

    const [loading, setloading] = useState(false);




    const route = useRoute()

    useEffect(() => {
        getdata()
        gethotelDetails()
        setDates()
    }, [])

    useEffect(() => {
        getUserFavorites(userData._id)
    })

    useEffect(() => {
        calculateTotalAmount();
    }, [selectedFromDate, selectedToDate]);


    const setDates = () => {
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

    // Function to format date to 'YYYY-MM-DD'
    const formatDate = (date) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const day = date.getDate().toString().padStart(2, '0');
        const month = months[date.getMonth()];
        //  const month = date.getMonth().toString().padStart(2, '0');
        const year = date.getFullYear();
        // const year = date.getFullYear().toString().slice(-2); 
        return `${day} ${month} ${year}`;
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

    const handleIncRoom = () => {
        console.log('plus')
        if (Rooms != 4) {
            setRooms(Rooms + 1)
            setExtraAmount(ExtraAmount + 220)
            setTotal(Total + 220)
        } else {
            Toast.show({
                type: 'error',
                text1: 'Max limit Reached',
                visibilityTime: 2000,
                position: 'bottom'
            });
        }
    }
    const handleDecRoom = () => {
        console.log('minus')
        if (Rooms != 1) {
            setRooms(Rooms - 1)
            setExtraAmount(ExtraAmount - 220)
            setTotal(Total - 220)

        } else {
            Toast.show({
                type: 'error',
                text1: 'Minimum One Room',
                visibilityTime: 2000,
                position: 'bottom'
            });
        }
    }
    const handleIncGuests = () => {
        console.log('plus')
        const limit = Rooms * 4
        if (Guests != limit) {
            setGuests(Guests + 1)
            setExtraAmount(ExtraAmount + 75)
            setTotal(Total + 75)

        } else {
            Toast.show({
                type: 'error',
                text1: 'Max limit for 1 Room is 4',
                visibilityTime: 2000,
                position: 'bottom'
            });
        }
    }
    const handleDecGuests = () => {
        console.log('minus')
        if (Guests != 1) {
            setGuests(Guests - 1)
            setExtraAmount(ExtraAmount - 75)
            setTotal(Total - 75)

        } else {
            Toast.show({
                type: 'error',
                text1: 'Minimum One Person',
                visibilityTime: 2000,
                position: 'bottom'
            });
        }
    }

    const calculateTotalAmount = async () => {
        // Calculate the number of days between selectedFromDate and selectedToDate
        const startDate = await new Date(unformatedselectedFromDate);
        const endDate = await new Date(unformatedselectedToDate);
        const numberOfDays = await Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

        // Calculate the total amount based on room rate for the first day
        // Assuming discounted rate is per day
        const baseTotalAmount = BaseAmount;

        // Calculate the total amount for extra days beyond the first day
        const extraDays = numberOfDays - 1; // Exclude the first day
        const extraDayRate = 340; // Additional rate per extra day
        const extraDayAmount = extraDays * extraDayRate;
        // Calculate the total amount including extra days
        const totalAmount = baseTotalAmount + extraDayAmount;

        // Update the Total state with the calculated amount
        setTotal(totalAmount + ExtraAmount);
    };





    async function getdata() {
        const token = await AsyncStorage.getItem('token');
        // console.log("Profile", token);
        axios.post(`${API_BASE_URL}/user-data`, { token: token })
            .then(res => {
                // console.log(res.data);
                setUserData(res.data.data)
            });
    }
    async function gethotelDetails() {
        try {
            const hotelId = route.params.data
            await axios.get(`${API_BASE_URL}/get-hotel-byID?id=${hotelId}`).then(res => {
                console.log(res.data.data)
                if (res.data.status == 'ok') {
                    setHotelData(res.data.data)
                    setBaseAmount(parseInt(res.data.data.discountedrate))
                    setTotal(parseInt(res.data.data.discountedrate))
                    // setTotalPlustax(parseInt(res.data.data.discountedrate)+parseInt(res.data.data.taxandfee));

                } else {
                    Toast.show({
                        type: 'error',
                        text1: JSON.stringify(response.data.data),
                        visibilityTime: 3000,
                        position: 'bottom'
                    });
                }
            })
        } catch (err) {
            Toast.show({
                type: 'error',
                text1: JSON.stringify(err),
                visibilityTime: 3000,
                position: 'bottom'
            });
        }

    }


    const getUserFavorites = async (userId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/get-favorites/${userId}`);
            if (response.data.status === 'ok') {
                // Return the list of favorites
                // console.log(response.data.data)
                setFavorites(response.data.data)
            } else {
                console.error('Failed to fetch user favorites:', response.data.message);
                setFavorites([]); // Return an empty array if there's an error
            }
        } catch (error) {
            console.error('Error fetching user favorites:', error);
            return []; // Return an empty array if there's an error
        }
    };




    const addToFavorites = async (hotelId) => {
        const userId = userData._id
        try {
            // Make a POST request to your backend API to add the hotel to favorites
            const response = await axios.post(`${API_BASE_URL}/add-to-favorites`, { userId, hotelId });
            if (response.data.status == 'ok') {
                // If the hotel is successfully added to favorites, update the state
                Toast.show({
                    type: 'success',
                    text1: 'Added To Favourites',
                    visibilityTime: 3000,
                    position: 'bottom'
                });
            } else {
                Toast.show({
                    type: 'error',
                    text1: JSON.stringify(response.data.data),
                    visibilityTime: 3000,
                    position: 'bottom'
                });
                // // Handle error if the hotel could not be added to favorites
                // console.error('Failed to add hotel to favorites:');
                // // Display error message to the user if needed
            }
        } catch (error) {
            console.error('Error adding hotel to favorites:');
            // Display error message to the user if needed
        }
    };

    const removeFromFavorites = async (hotelId) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/remove-from-favorites`, { userId: userData._id, hotelId });
            if (response.data.status === 'ok') {
                Toast.show({
                    type: 'success',
                    text1: 'Removed From Favourites',
                    visibilityTime: 3000,
                    position: 'bottom'
                });
                setFavorites(favorites.filter(favorite => favorite !== hotelId));
            } else {
                Toast.show({
                    type: 'error',
                    text1: JSON.stringify(response.data.data),
                    visibilityTime: 3000,
                    position: 'bottom'
                });
            }
        } catch (error) {
            console.error('Error removing hotel from favorites:', error);
        }
    };

    const isFavorite = (hotelId) => {
        return favorites.includes(hotelId);
    };


    const submitBooking = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const bookingData = {
                userId: userData._id,
                hotelId: Hoteldata._id,
                hotelName: Hoteldata.hotelname,
                BookedAt: new Date(),
                CheckIn: unformatedselectedFromDate,
                CheckOut: unformatedselectedToDate,
                Rooms: Rooms,
                Guests: Guests,
                BookingId: generateBookingId(6),
                TotalAmount: parseInt(Total) + parseInt(Hoteldata.taxandfee),
                BookingStatus: "Confirmed",
                PaymentStatus: 'Not paid'
                // Add other booking details as needed
            };
            const response = await axios.post(`${API_BASE_URL}/submit-booking`, bookingData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setloading(false)
            if (response.data.status === 'ok') {
                // Handle success, e.g., show a success message to the user
                // console.log(response.data.data)
                navigation.navigate('Confirmation', { data: response.data.data._id })
                Toast.show({
                    type: 'success',
                    text1: 'Booking  successfull',
                    visibilityTime: 3000,
                    position: 'bottom'
                });
            } else {
                // Handle error from the backend, e.g., display an error message to the user
                Toast.show({
                    type: 'error',
                    text1: 'Failed to book',
                    visibilityTime: 3000,
                    position: 'bottom'
                });
            }
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


    const OpenMaps = () => {
        console.log('Maps')
        const Mapurl = Hoteldata.locationlink

        Linking.openURL(Mapurl);

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
                            <Pressable style={[Styles.favourite,{top:40}]} onPress={() => { isFav ? removeFromFavorites(Hoteldata._id) : addToFavorites(Hoteldata._id) }}>
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

                            <TouchableOpacity onPress={() => OpenMaps()}>
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

                                    <TouchableOpacity style={{ flexDirection: 'row', alignSelf: 'flex-end', right: '15%' }}>

                                        <TouchableOpacity onPress={handleDecRoom}>
                                            <AntDesign name="minussquareo" size={20} color='black' />
                                        </TouchableOpacity>

                                        <Text style={[Styles.bookingLasttext, { alignSelf: 'center' }]}>{Rooms}</Text>

                                        <TouchableOpacity onPress={handleIncRoom} >
                                            <AntDesign name="plussquareo" size={20} color='black' />
                                        </TouchableOpacity>

                                    </TouchableOpacity>

                                    <TouchableOpacity style={{ flexDirection: 'row', alignSelf: 'flex-end', right: '15%' }}>

                                        <TouchableOpacity onPress={handleDecGuests}>
                                            <AntDesign name="minussquareo" size={20} color='black' />
                                        </TouchableOpacity>

                                        <Text style={[Styles.bookingLasttext, { alignSelf: 'center' }]}>{Guests}</Text>

                                        <TouchableOpacity onPress={handleIncGuests} >
                                            <AntDesign name="plussquareo" size={20} color='black' />
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
                            minimumDate={new Date()} // Disable past dates
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
                                submitBooking()
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
            </SafeAreaView>
        );

    }
}
