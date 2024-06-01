import React, { useEffect, useState } from "react";
import { View, Text, Pressable, TouchableOpacity, Image, FlatList, StatusBar, Alert, TextInput, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import handleDelete from "../Service/BusinessService/DeleteBusiness";
import OpenDial from "../Service/Map and Dial/Dial";

export default function AllHotels({ navigation }) {
    const allHotels = useSelector(state => state.hotel.AllHotelsData.hotels);
    const allUsers = useSelector(state => state.user.AllUsersData);
    const [searchedHotel, setSearchedHotel] = useState('');
    const [filteredHotel, setFilteredHotel] = useState(allHotels);

    useEffect(() => {
        setFilteredHotel(
            allHotels.filter(hotel => 
                hotel.hotelname.toLowerCase().includes(searchedHotel.toLowerCase()) ||
                hotel.location.toLowerCase().includes(searchedHotel.toLowerCase())
            )
        );
    }, [searchedHotel, allHotels]);

    async function onDelete(_id) {
        Alert.alert('Delete Business', 'Do you want to delete this business?',
            [{
                text: 'Cancel',
                onPress: () => null,
                style: 'cancel'
            }, {
                text: 'Delete',
                onPress: () => handleDelete(_id, navigation),
                style: 'cancel'
            }]
        );
        return true;
    }

    const renderHotelCard = ({ item }) => {
        const hotelOwner = allUsers.find(user => user._id == item.hoteluserid);
        return (
            <Pressable
                onPress={() => {
                    navigation.navigate('Detailview', { data: item._id });
                }}
            >
                <View style={styles.cardContainer}>
                    <Image style={styles.hotelImage} source={{ uri: item.images[0] }} />
                    <View style={styles.cardContent}>
                        <Text style={styles.hotelName}>{item.hotelname}</Text>
                        <Text style={styles.hotelLocation}>{item.location}</Text>
                        <Text style={styles.hotelOwner}>Owner: {hotelOwner.name}</Text>
                        <TouchableOpacity onPress={() => OpenDial(hotelOwner.number)}>
                            <Text style={styles.hotelNumber}>Number: {hotelOwner.number}</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(item._id)}>
                        <FontAwesomeIcon icon={faTrash} size={20} color="red" />
                    </TouchableOpacity>
                </View>
            </Pressable>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#f8f8f8" barStyle="dark-content" />
            <Text style={styles.heading}>All Hotels</Text>
            <Pressable style={styles.searchContainer}>
                <FontAwesomeIcon size={15} icon={faSearch} style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search Hotel by Name or Location"
                    value={searchedHotel}
                    onChange={(e) => setSearchedHotel(e.nativeEvent.text)}
                />
            </Pressable>
            <FlatList
                data={filteredHotel}
                keyExtractor={(item) => item._id}
                renderItem={renderHotelCard}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        paddingHorizontal: 10,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    searchContainer: {
        backgroundColor: '#dedede',
        width: '90%',
        height: 45,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        alignSelf:'center',
        backgroundColor: '#dededede',
        paddingHorizontal: 15,
        marginVertical:10,
        fontSize: 16,
        color: '#333',
        shadowColor: '#39a8db',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 10,
        flexDirection:'row'
    },
    searchIcon: {
        marginRight: 10,
        color: 'gray',
    },
    searchInput: {
        flex: 1,
        height: 40,
        textAlign:'center'
    },
    listContent: {
        paddingBottom: 20,
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
        marginBottom: 0,
    },
    hotelOwner: {
        fontSize: 14,
        marginBottom: 0,
    },
    hotelNumber: {
        fontSize: 14,
        color: 'grey',
    },
    deleteButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
});
