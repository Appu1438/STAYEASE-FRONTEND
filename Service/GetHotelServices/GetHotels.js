import axios from "axios";
import API_BASE_URL from "../../Api";
import Toast from "react-native-toast-message";
import shuffleArray from "./Shuffle";


const getAllHotels = async (setAllHotels,setRandomHotels) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/get-all-hotels`);
        if (response.data.status === 'ok') {
            setAllHotels(response.data.data);
            // Select random 4 hotels to show
            const shuffledHotels = shuffleArray(response.data.data);
            setRandomHotels(shuffledHotels.slice(0, 4));
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


export default getAllHotels