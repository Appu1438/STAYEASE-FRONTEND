import axios from "axios";
import API_BASE_URL from "../../Api";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from 'expo-location';
import fetchNearbyCities from "./NearbyLocation";


const getUserLocation = async (setUserLocation, setnearbyCities) => {
    try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Toast.show({
                type: 'error',
                text1: 'Location Permission Denied',
                visibilityTime: 3000,
                position: 'bottom'
            });
            console.log('Location permission denied');
            return;
        }
        else {

            let location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High,
            });
            const { latitude, longitude } = location.coords;

            let address = await Location.reverseGeocodeAsync({ latitude, longitude });
            // console.log(address);
            setUserLocation(address[0].city)

            fetchNearbyCities(latitude, longitude, setnearbyCities)
        }
    } catch (error) {
        console.error(error);
    }
};

export default getUserLocation