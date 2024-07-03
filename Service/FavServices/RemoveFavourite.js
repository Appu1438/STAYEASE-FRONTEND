import axios from "axios";
import API_BASE_URL from "../../Api";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const removeFromFavorites = async (userId, hotelId, fav, setFav, navigation) => {
    console.log('Services Rem')
    const token = await AsyncStorage.getItem('token');

    try {
        const response = await axios.post(`${API_BASE_URL}/user/remove-from-favorites`, { userId, hotelId }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.data.status === 'ok') {
            Toast.show({
                type: 'success',
                text1: 'Removed From Favourites',
                visibilityTime: 3000,
                position: 'bottom'
            });
            setFav(fav.filter(favorite => favorite !== hotelId));
        } else if (response.data.status == 'NotOk') {
            TokenExpiry(navigation, response)
        } else {
            Toast.show({
                type: 'error',
                text1: JSON.stringify(response.data.data),
                visibilityTime: 3000,
                position: 'bottom'
            });
        }
    } catch (error) {
        console.error('Error removing hotel from favorites:', error);
    }
};


export default removeFromFavorites