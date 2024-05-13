import axios from "axios";
import API_BASE_URL from "../../Api";
import Toast from "react-native-toast-message";
import shuffleArray from "./Shuffle";


const getRandomHotels = async (setRandomHotels,setAllHotels,setShow,searchedLocation) => {
    console.log('search')
    try {
        const response = await axios.get(`${API_BASE_URL}/get-all-hotels`);
        if (response.data.status === 'ok') {
            const allHotelsData = response.data.data;
            let shuffledHotels;
            if (searchedLocation) {
                const filteredHotels = allHotelsData.filter(hotel => hotel.location.toLowerCase().includes(searchedLocation.toLowerCase()));
                shuffledHotels = filteredHotels;
            } else {
                setShow(true)
                shuffledHotels = shuffleArray(allHotelsData);
            }
            setRandomHotels(shuffledHotels);
            setAllHotels(allHotelsData);
        } else {
            Toast.show({
                type: 'error',
                text1: JSON.stringify(response.data.data),
                visibilityTime: 3000,
                position: 'bottom'
            });
        }
    } catch (error) {
        console.error('Error fetching Hotels:', error);
        Toast.show({
            type: 'error',
            text1: 'Error fetching Hotels',
            visibilityTime: 3000,
            position: 'bottom'
        });
    }
};


export default getRandomHotels