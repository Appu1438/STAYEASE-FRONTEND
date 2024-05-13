import axios from "axios";
import API_BASE_URL from "../../Api";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from 'expo-location';


const fetchNearbyCities = async (latitude, longitude,setnearbyCities) => {
    console.log('nearby')
    try {
        let cities = [];
        let offset = 0;
        let step = 0.02;
        let direction = 1;
        while (cities.length < 10) {
            const response = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=10&offset=${offset}&appid=c8461955d638e0ac0311c9d54b64f38f`);
            if (response.data && response.data.length > 0) {
                cities = cities.concat(response.data.map(city => city.name));
                offset += response.data.length;
                latitude += step * direction;
                longitude += step * direction;
                direction *= -1;
                step *= 2;
            } else {
                break;
            }
        }
        if (cities.length > 0) {
            setnearbyCities(cities);
        } else {
            console.log('No nearby cities found.');
        }
    } catch (error) {
        console.error('Error fetching nearby cities:', error);
    }
};

export default fetchNearbyCities