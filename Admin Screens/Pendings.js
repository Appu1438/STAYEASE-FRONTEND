import React, { useEffect, useState } from "react";
import { View, Text, Pressable, Image, FlatList, StatusBar, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faIndianRupeeSign, faTrash } from "@fortawesome/free-solid-svg-icons";
import getallPendingHotels from "../Service/AdminServices/getAllPendingReq";

export default function PendingRequests({ navigation }) {
    const [allHotels, setAllHotels] = useState([]);

    useEffect(() => {
        getallPendingHotels(setAllHotels);
    }, []);

    const renderHotelCard = ({ item }) => (
        <Pressable
            onPress={() => {
                navigation.navigate('PendingsDetails', { data: item });
            }}
        >
            <View style={styles.cardContainer}>
                <Image style={styles.hotelImage} source={{ uri: item.images[0] }} />
                <View style={styles.cardContent}>
                    <Text style={styles.hotelName}>{item.hotelname}</Text>
                    <Text style={styles.hotelLocation}>{item.location}</Text>
                    <View style={styles.priceContainer}>
                        <FontAwesomeIcon size={15} icon={faIndianRupeeSign} />
                        <Text style={styles.discountedRate}>{item.discountedrate}</Text>
                        <Text style={styles.actualRate}>{item.actualrate}</Text>
                        <Text style={styles.discountPercentage}>{item.discountpercentage}% Off</Text>
                    </View>
                    <Text style={styles.taxesAndFees}>+{item.taxandfee} taxes and fees</Text>
                </View>

            </View>
        </Pressable>
    );

    return (
        <View style={[styles.container]}>
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            <Text style={styles.heading}>All Pending Requests</Text>

            {allHotels.length > 0 ? (
                <FlatList
                    data={allHotels}
                    keyExtractor={(item) => item._id}
                    renderItem={renderHotelCard}
                    contentContainerStyle={styles.listContent}

                />
            ) : (
                <Text style={styles.noRequestsText}>No Pending Requests Found</Text>
            )}
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
        paddingBottom: 20,
    },
    cardContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 20,
        shadowColor: "#000",
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
        fontSize: 18,
        fontWeight: 'bold',
    },
    hotelLocation: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 10,
    },
});
