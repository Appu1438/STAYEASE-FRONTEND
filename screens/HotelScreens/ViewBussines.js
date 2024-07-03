

import { View, Text, SafeAreaView, Pressable, Alert, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, StatusBar, FlatList, RefreshControl } from "react-native"
import { Styles } from "../../components/Common Component/Styles"
import { useEffect, useState } from "react"

import { useNavigation, useRoute } from "@react-navigation/native";

import { faStar, faIndianRupeeSign, faEdit, faTrash, faUnderline } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import handleDelete from "../../Service/BusinessService/DeleteBusiness";
import { useSelector } from "react-redux";
import getUserBusiness from "../../Service/BusinessService/getBusiness";
import { Switch } from "react-native";
import changeAvailability from "../../Service/BusinessService/Available";
import ActiveHotel from "../../Service/BusinessService/Available";
import DeactiveHotel from "../../Service/BusinessService/Deactive";



export default function Viewbussiness() {
    const navigation = useNavigation()
    const Hoteluser = useSelector(state => state.user.userData)

    // const [Hoteluser, setHotelUser] = useState('')
    const [allHotels, setAllHotels] = useState([]);
    const [Loading, setLoading] = useState(true)

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = () => {
        setRefreshing(true);
        // Call your refresh function here, for example:
        getUserBusiness(Hoteluser._id,setAllHotels,setLoading,navigation)
        setRefreshing(false);
    };

    const route = useRoute()



    useEffect(() => {
        if (Hoteluser && Hoteluser._id) {
            getUserBusiness(Hoteluser._id,setAllHotels,setLoading,navigation)
        }

    }, [Hoteluser])

    async function onDelete(_id) {
        Alert.alert('Delete Business', 'Do you want to delete Business',
            [{
                text: 'Cancel',
                onPress: () => null,
                style: 'cancel'
            }, {
                text: 'Delete',
                onPress: () => handleDelete(_id, navigation),
                style: 'cancel'
            }
            ])
        return true;
    }




    const renderHotelCard = ({ item }) => {

        const available = (item.available);
        let showavailable = (item.available);

        const toggleAvailability = async () => {
            
            showavailable=available?false:true

            try {
                console.log(showavailable)
                if (available) {
                    await DeactiveHotel(item._id,navigation);
                    onRefresh()
                } else {
                    await ActiveHotel(item._id,navigation);
                    onRefresh()
                }
            } catch (error) {
                console.error('Error toggling availability:', error.message);
            }
        };

        return (
            <Pressable onPress={() => navigation.navigate('Detailview', { data: item._id })}>
                <View style={styles.cardContainer}>
                    <Image style={styles.hotelImage} source={{ uri: item.images[0] }} />
                    <View style={styles.cardContent}>
                        <Text style={styles.hotelName}>{item.hotelname}</Text>
                        <Text style={styles.hotelLocation}>{item.location}</Text>
                        <View style={styles.ratingContainer}>
                            <FontAwesomeIcon icon={faStar} size={15} color="red" />
                            <Text style={styles.ratingText}>{item.averageRating} ({item.reviewcount})</Text>
                        </View>
                        <View style={styles.priceContainer}>
                            <FontAwesomeIcon size={15} icon={faIndianRupeeSign} />
                            <Text style={styles.discountedRate}>{item.discountedrate}</Text>
                            <Text style={styles.actualRate}>{item.actualrate}</Text>
                            <Text style={styles.discountPercentage}>{item.discountpercentage}% Off</Text>
                        </View>
                        <Text style={styles.taxesAndFees}>+{item.taxandfee} taxes and fees</Text>
                    </View>
                    <Switch
                        style={styles.availabilitySwitch}
                        onValueChange={toggleAvailability}
                        value={showavailable}
                    />
                    <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(item._id)}>
                        <FontAwesomeIcon icon={faTrash} size={20} color="red" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditBusiness', { data: item })}>
                        <FontAwesomeIcon icon={faEdit} size={20} color="#0a84ff" />
                    </TouchableOpacity>
                </View>
            </Pressable>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="white" barStyle="dark-content" />

            <View style={{ left: '5%', top: '5%', alignSelf: 'flex-start' }}>
                <Text style={Styles.profile}>Your Bussiness</Text>
            </View>
            <View style={{ flex: 1, paddingHorizontal: 10, justifyContent: "center", top: '6%' }}>
                <>{Loading ?
                    (
                        <ActivityIndicator size={30} color='black' />
                    )
                    : (
                        allHotels.length > 0 ?
                            (
                                <FlatList
                                    data={allHotels}
                                    keyExtractor={(item) => item._id}
                                    renderItem={renderHotelCard}
                                    contentContainerStyle={styles.listContent}
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={refreshing}
                                            onRefresh={onRefresh}
                                        />
                                    }
                                />
                            )
                            :
                            (
                                <Text style={{ fontSize: 20, alignSelf: 'center' }}>No Business Found</Text>
                            )

                    )}
                </>
            </View>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    discountedRate: {
        fontSize: 16,
        marginLeft: 5,
    },
    actualRate: {
        fontSize: 12,
        textDecorationLine: 'line-through',
        color: 'gray',
        marginLeft: 10,
    },
    discountPercentage: {
        fontSize: 12,
        color: 'green',
        marginLeft: 10,
    },
    taxesAndFees: {
        fontSize: 12,
        color: 'gray',
        marginTop: 5,
    },
    listContent: {
        paddingBottom: 50,
    },
    cardContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 20,
        shadowColor: "blue",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    hotelImage: {
        width: '100%',
        height: 150,
    },
    cardContent: {
        padding: 15,
    },
    hotelName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    hotelLocation: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 5,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    ratingText: {
        marginLeft: 5,
        fontSize: 14,
        color: 'gray',
    },
    favourite: {
        position: 'absolute',
        right: 10,
        top: 10,
        zIndex: 1,
    },
    deleteButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    editButton: {
        position: 'absolute',
        top: 10,
        right: 40,
    },
    availabilitySwitch: {
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
});
