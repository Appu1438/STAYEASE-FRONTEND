import { View, StatusBar, Text, ScrollView, SafeAreaView, Pressable, Image, Modal, Dimensions, TouchableOpacity, useWindowDimensions, ActivityIndicator, Linking, PanResponder, Alert } from "react-native";
import { useEffect, useState, useRef } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import API_BASE_URL from "../../Api";
import Toast from "react-native-toast-message";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faStar } from "@fortawesome/free-regular-svg-icons"
import { faCalendarDays, faBed, faUserGroup, faUser, faIndianRupeeSign, faTag, faPhone } from "@fortawesome/free-solid-svg-icons";
import Entypo from 'react-native-vector-icons/Entypo';
import { err } from "react-native-svg";
import AddHotel from "../../Service/AdminServices/addHotel";
import { useSelector } from "react-redux";
import OpenMaps from "../../Service/Map and Dial/OpenMaps";
import OpenDial from "../../Service/Map and Dial/Dial";
import Loading from "../../components/Common Component/loading";
import { Styles } from "../../components/Common Component/Styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TokenExpiry from "../../Service/TokenService/TokenExpiry";





export default function PendingDetailview({ }) {
    let windowwidth = useWindowDimensions().width

    const scrollViewRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const windowWidth = Dimensions.get('window').width;

    const navigation = useNavigation()

    const [Hoteldata, setHotelData] = useState('')
    const allUser = useSelector(state => state.user.AllUsersData)
    const reqUser = allUser.find(user => user._id == Hoteldata.hoteluserid)



    const [loadingReject, setloadingReject] = useState(false);
    const [loadingAccept, setloadingAccept] = useState(false);
    const [token, setToken] = useState(false);




    const route = useRoute()

    useEffect(() => {
        setHotelData(route.params.data)
    }, [])

    useEffect(() => {
        const getToken = async () => {
            const token = await AsyncStorage.getItem('token');
            setToken(token)
            console.log(token);
        }
        getToken()
    }, [])







    const handleImageChange = (index) => {
        setCurrentIndex(index);
        scrollViewRef.current.scrollTo({ x: windowWidth * index, y: 0, animated: true });
    };

    const handleAccept = () => {
        Alert.alert('Accept Request', 'Do you want to Accept this Request', [{
            text: 'cancel',
            onPress: () => {
                null
                setloadingAccept(false)
            },
            style: 'cancel'
        }, {
            text: 'Accept',
            onPress: () => AcceptRequest(),
            style: 'cancel'
        }
        ])

    }
    const handleReject = () => {
        Alert.alert('Reject Request', 'Do you want to Reject this Request', [{
            text: 'cancel',
            onPress: () => {
                null
                setloadingReject(false)
            },
            style: 'cancel'
        }, {
            text: 'Reject',
            onPress: () => removeFromPendings(),
            style: 'cancel'
        }
        ])

    }

    async function AcceptRequest() {
        // const HotelData = {
        //     hoteluserid: Hoteldata.hoteluserid,
        //     hotelname: Hoteldata.hotelname,
        //     hotelnumber: Hoteldata.hotelnumber,
        //     location: Hoteldata.location,
        //     locationlink: Hoteldata.locationlink,
        //     actualrate: Hoteldata.actualrate,
        //     discountedrate: Hoteldata.discountedrate,
        //     discountpercentage: Hoteldata.discountpercentage,
        //     taxandfee: Hoteldata.taxandfee,
        //     availablerooms: Hoteldata.availablerooms,
        //     personsperroom: Hoteldata.personsperroom,
        //     extraperhead: Hoteldata.extraperhead,
        //     extraperroom: Hoteldata.extraperroom,
        //     extraperday: Hoteldata.extraperday,
        //     rating: Hoteldata.rating,
        //     facilities: Hoteldata.facilities,
        //     images: Hoteldata.images
        // }
        setloadingAccept(true)

        try {
            await AddHotel(Hoteldata, navigation)

        } catch (error) {
            console.log(err)
        }


        setloadingAccept(false)

    }

    async function removeFromPendings() {
        console.log('remove')
        setloadingReject(true)
        try {
            await axios.post(`${API_BASE_URL}/admin/remove-pending-hotels`, { _id: Hoteldata._id }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                console.log(res.data)
                if (res.data.status == 'ok') {
                    navigation.navigate('All Pendings')
                } else if (res.data.status == 'NotOk') {
                    TokenExpiry(navigation, res)
                } else {
                    Toast.show({
                        type: 'error',
                        text1: JSON.stringify(res.data.data),
                        visibilityTime: 3000,
                        position: 'bottom'
                    })
                }
            })

        } catch (error) {
            console.log(error)
        }
        setloadingReject(false)
    }



    if (!Hoteldata) {
        return (
            <Loading />
        )
    } else {

        return (

            <SafeAreaView style={[Styles.container, { alignItems: 'flex-start' }]}>
                <StatusBar translucent={true} backgroundColor="transparent" barStyle="light-content" />

                <ScrollView style={{}}>


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


                    <ScrollView>

                        <View style={{ height: 270 }}>
                            <Text style={[Styles.detailText]}>{Hoteldata.hotelname}</Text>

                            <View style={{ flexDirection: 'row', left: '5%' }}>
                                <FontAwesomeIcon style={{ paddingTop: 40 }} color="red" icon={faStar} size={19} />
                                <Text style={[Styles.detailText]}>{Hoteldata.rating} ({Hoteldata.reviewcount})</Text>
                                {/* <Text style={[Styles.detailText, { color: '#016DD0', fontSize: 12, padding: 5 }]}> See Reviews</Text> */}
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

                        <Text style={[Styles.detailText, { marginTop: 0 }]}>Hotel Owner and Payment Details</Text>

                        <View style={[Styles.bookingboxContainer, { height: 350 }]}>

                            <View style={[Styles.bookingbox, { height: 330 }]}>

                                <View style={[Styles.bookingboxes, {}]}>

                                    <FontAwesomeIcon size={15} icon={faIndianRupeeSign} />
                                    <FontAwesomeIcon size={15} icon={faTag} />
                                    <FontAwesomeIcon size={15} icon={faUser} />
                                    <FontAwesomeIcon size={15} icon={faBed} />
                                    <FontAwesomeIcon size={15} icon={faCalendarDays} />
                                    <FontAwesomeIcon size={15} icon={faUserGroup} />
                                    <FontAwesomeIcon size={15} icon={faUser} />
                                    <FontAwesomeIcon size={15} icon={faPhone} />
                                </View>

                                <View style={[Styles.bookingboxes, { width: '50%' }]}>
                                    <Text style={Styles.bookingtext}>Actual Rate</Text>
                                    <Text style={Styles.bookingtext}>Discounted Rate</Text>
                                    <Text style={Styles.bookingtext}>Extra Rate Per Head</Text>
                                    <Text style={Styles.bookingtext}>Extra Rate Per Room </Text>
                                    <Text style={Styles.bookingtext}>Extra Rate Per Day </Text>
                                    <Text style={Styles.bookingtext}>No: of Persons in a  Room </Text>
                                    <Text style={Styles.bookingtext}>Owner Name</Text>
                                    <Text style={Styles.bookingtext}>Owner Number</Text>
                                </View>

                                <View style={[Styles.bookingboxes, { width: '40%', backgroundColor: 're' }]}>


                                    <Text style={[Styles.bookingtext, { alignSelf: 'center' }]}>{Hoteldata.actualrate}</Text>
                                    <Text style={[Styles.bookingtext, { alignSelf: 'center' }]}>{Hoteldata.discountedrate}</Text>
                                    <Text style={[Styles.bookingtext, { alignSelf: 'center' }]}>{Hoteldata.extraperhead}</Text>
                                    <Text style={[Styles.bookingtext, { alignSelf: 'center' }]}>{Hoteldata.extraperroom}</Text>
                                    <Text style={[Styles.bookingtext, { alignSelf: 'center' }]}>{Hoteldata.extraperday}</Text>
                                    <Text style={[Styles.bookingtext, { alignSelf: 'center' }]}>{Hoteldata.personsperroom}</Text>
                                    <Text style={[Styles.bookingtext, { alignSelf: 'center' }]}>{reqUser.name}</Text>
                                    <TouchableOpacity onPress={() => OpenDial(reqUser.number)} style={{ alignSelf: 'center' }}>
                                        <Text style={[Styles.bookingLasttext, { alignSelf: 'center' }]}>{reqUser.number}</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>
                    </ScrollView>



                </ScrollView>

                <View style={Styles.bookingfooter}>

                    <View>
                        <TouchableOpacity style={Styles.bookingbtn} onPress={() => {
                            { loadingReject ? (null) : handleReject() }

                        }} >
                            {loadingReject ? <ActivityIndicator color='white' /> : (
                                <Text style={Styles.bookingbtntext}>
                                    Reject Request
                                </Text>
                            )}

                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={Styles.bookingbtn} onPress={() => {
                            { loadingAccept ? (null) : handleAccept() }


                        }} >
                            {loadingAccept ? <ActivityIndicator color='white' /> : (
                                <Text style={Styles.bookingbtntext}>
                                    Accept Request
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
