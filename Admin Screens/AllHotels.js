import React, { useEffect, useState } from "react";
import { View, Text, Pressable, TouchableOpacity, Image, FlatList, StatusBar,Alert} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar, faIndianRupeeSign, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Styles } from "../Common Component/Styles";
import { useSelector } from "react-redux";
import handleDelete from "../Service/BusinessService/DeleteBusiness";

export default function AllHotels({ navigation }) {
    // const [allHotels, setAllHotels] = useState([]);
    const allHotels = useSelector(state => state.hotel.AllHotelsData.hotels)


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
    const renderHotelCard = ({ item }) => (
        <Pressable
            onPress={() => {
                console.log("Hotel Card Pressed");
                console.log(item._id);
                navigation.navigate('Detailview', { data: item._id })
            }}
        >
            <View style={Styles.recomendationContentBox}>

                <Image style={Styles.recomendationimage} source={{ uri: item.images[0] }} />
                <View style={Styles.rating}>
                    <FontAwesomeIcon style={{ paddingTop: 28 }} color="red" icon={faStar} size={15} />
                    <Text style={[Styles.ratingText, { top: 5, left: 2 }]}>{item.rating} ({item.reviewcount})</Text>
                </View>
                <Text style={[Styles.ratingText, { left: "2%", top: 10 }]}>{item.hotelname}</Text>
                <Text style={[Styles.ratingText, { left: "2%", top: 15, color: "grey", fontSize: 10 }]}>{item.location}</Text>
                <View style={{ flexDirection: "row", top: 15 }}>
                    <FontAwesomeIcon style={{ marginTop: 8, left: 5 }} size={15} icon={faIndianRupeeSign} />
                    <Text style={Styles.pricetext}>{item.discountedrate}</Text>
                    <Text style={[Styles.pricetext, { textDecorationLine: "line-through", fontSize: 12, top: 3, left: 10 }]}>{item.actualrate}</Text>
                    <Text style={[Styles.pricetext, { color: "green", fontSize: 12, top: 3, left: 15 }]}>{item.discountpercentage}% Off</Text>
                </View>
                <Text style={[Styles.pricetext, { color: "grey", fontSize: 12, top: 15, left: 15 }]}>+{item.taxandfee} taxes and fees</Text>

                <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end", marginTop: 0 }}>
                    <TouchableOpacity onPress={() => onDelete(item._id)}>
                        <FontAwesomeIcon style={{ marginHorizontal: 8 }} size={20} icon={faTrash} color="red" />
                    </TouchableOpacity>
                </View>
            </View>

        </Pressable>
    );

    return (
        <View style={[Styles.Userscontainer, { flex: 1 }]}>
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            <Text style={Styles.Usersheading}>All Hotels</Text>

            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                {allHotels.length > 0 ? (<FlatList data={allHotels} keyExtractor={(item) => item._id} renderItem={renderHotelCard} />
                ) : (<Text style={{ fontSize: 20 }}>No Hotels Found</Text>)}
            </View>
        </View>
    );
}
