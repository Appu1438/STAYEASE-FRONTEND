
// import { View , ScrollView,Text,Image,Pressable,TouchableOpacity} from "react-native"
// import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
// import { Styles } from "../Common Component/Styles"
// import { faLocationDot, faSearch, faBars, faIndianRupeeSign, faHouse, faHotel, faTag, faGift, faHeadset, faL } from "@fortawesome/free-solid-svg-icons";
// import { useNavigation } from "@react-navigation/native";



// export default function Locations({userLocation,User}){
//     const navigation = useNavigation();

    
// const locations = [
//     { name: 'Nearby',value:userLocation, iconColor: '#0d0d0c', icon: faLocationDot },
//     { name: 'Alappuzha',value:'Alappuzha', image: require("../assets/licensed-image.jpg") },
//     { name: 'Agra',value:'Agra', image: require("../assets/agra2.jpg") },
//     { name: 'Hyderbad',value:'Hyderbad', image: require("../assets/hyderbad.jpg") },
//     { name: 'Madgaon',value:'Madgaon', image: require("../assets/madgaon.jpg") },
//     { name: 'Mumbai', value:'Mumbai',image: require("../assets/mumbai.jpg") },
//     { name: 'Gurgaon',value:'Gurgaon', image: require("../assets/gurgaon.jpeg") },
// ];


//     return (
//         <ScrollView style={{ backgroundColor: '', maxHeight: 130 }} horizontal showsHorizontalScrollIndicator={false}>
//             <View style={Styles.locationContainer}>
//                 {locations.map((location, index) => (
//                     <TouchableOpacity key={index} onPress={() => navigation.navigate('Search',{data:location.value})}>
//                         <View style={Styles.box}>
//                             {location.iconColor && (
//                                 <View style={[Styles.locationbox, { backgroundColor: location.iconColor }]}>
//                                     <FontAwesomeIcon size={30} color="white" icon={location.icon} />
//                                 </View>
//                             )}
//                             {location.image && (
//                                 <View style={Styles.locationbox}>
//                                     <Image style={Styles.locationimg} source={location.image}></Image>
//                                 </View>
//                             )}
//                             <Text style={Styles.boxtext}>{location.name}</Text>
//                         </View>
//                     </TouchableOpacity>
//                 ))}
//             </View>
//         </ScrollView>
//     );
// }

import React from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
// import { styles } from "../Common Component/Styles";

export default function Locations({ userLocation, User }) {
    const navigation = useNavigation();

    const locations = [
        { name: 'Nearby', value: userLocation, iconColor: '#0d0d0c', icon: faLocationDot },
        { name: 'Banglore', value: 'Banglore', image: require("../../assets/images/licensed-image.jpg") },
        { name: 'Agra', value: 'Agra', image: require("../../assets/images/agra2.jpg") },
        { name: 'Hyderabad', value: 'Hyderabad', image: require("../../assets/images/hyderbad.jpg") },
        { name: 'Madgaon', value: 'Madgaon', image: require("../../assets/images/madgaon.jpg") },
        { name: 'Mumbai', value: 'Mumbai', image: require("../../assets/images/mumbai.jpg") },
        { name: 'Gurgaon', value: 'Gurgaon', image: require("../../assets/images/gurgaon.jpeg") },
    ];

    return (
        <ScrollView style={styles.scrollContainer} horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.locationContainer}>
                {locations.map((location, index) => (
                    <TouchableOpacity key={index} onPress={() => navigation.navigate('Search', { data: location.value })}>
                        <View style={styles.box}>
                            {location.iconColor && (
                                <View style={[styles.locationBox, { backgroundColor: location.iconColor }]}>
                                    <FontAwesomeIcon size={30} color="white" icon={location.icon} />
                                </View>
                            )}
                            {location.image && (
                                <View style={styles.locationBox}>
                                    <Image style={styles.locationImg} source={location.image} />
                                </View>
                            )}
                            <Text style={styles.boxText}>{location.name}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
}

export const styles = StyleSheet.create({
    scrollContainer: {
        paddingVertical: 10,
    },
    locationContainer: {
        flexDirection: 'row',
    },
    box: {
        alignItems: 'center',
        marginHorizontal: 10,
    },
    locationBox: {
        width: 75,
        height: 75,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 5,
    },
    locationImg: {
        width: '100%',
        height: '100%',
    },
    boxText: {
        textAlign: 'center',
        fontSize: 12,
        marginTop: 5,
    },
});
