import axios from "axios";
import API_BASE_URL from "../../Api";
import Toast from "react-native-toast-message";
import shuffleArray from "./Shuffle";

const getRandomHotels = async (setRandomHotels, allHotelsData, setShow, searchedLocation) => {
    console.log('search');
    try {
        let shuffledHotels;
        if (searchedLocation) {
            const filteredHotels = allHotelsData.filter(hotel => hotel.location.toLowerCase().includes(searchedLocation.toLowerCase()) ||
                                                                  hotel.hotelname.toLowerCase().includes(searchedLocation.toLowerCase()));
            shuffledHotels = filteredHotels;
            setRandomHotels(shuffledHotels);
        } else {
            setShow(true);
             shuffleArray(allHotelsData,setRandomHotels);
        }
    } catch (error) {
        console.error('Error searching Hotels:', error);
        Toast.show({
            type: 'error',
            text1: 'Error searching Hotels',
            visibilityTime: 3000,
            position: 'bottom'
        });
    }
};

export default getRandomHotels;
