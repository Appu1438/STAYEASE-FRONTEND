import axios from "axios";
import API_BASE_URL from "../../Api";
import Toast from "react-native-toast-message";

const removeFromFavorites = async (userId,hotelId,fav,setFav) => {
    console.log('Services Rem')

    try {
        const response = await axios.post(`${API_BASE_URL}/remove-from-favorites`, { userId, hotelId });
        if (response.data.status === 'ok') {
            Toast.show({
                type: 'success',
                text1: 'Removed From Favourites',
                visibilityTime: 3000,
                position: 'bottom'
            });
            setFav(fav.filter(favorite => favorite !== hotelId));
        }else{
            Toast.show({
                type: 'error',
                text1:JSON.stringify(response.data.data),
                visibilityTime: 3000,
                position: 'bottom'
            });
        }
    } catch (error) {
        console.error('Error removing hotel from favorites:', error);
    }
};


export default removeFromFavorites