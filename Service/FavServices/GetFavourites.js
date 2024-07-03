import axios from "axios";
import API_BASE_URL from "../../Api";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getUserFavorites = async (userId, Favourites) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        // console.log('Service get')
        try {
            const response = await axios.get(`${API_BASE_URL}/user/get-favorites/${userId}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            if (response.data.status == 'ok') {
                // Return the list of favorites
                // console.log(response.data.data)
                Favourites(response.data.data)
            } else {
                // console.error('Failed to fetch user favorites:', response.data.message);
                Favourites([]); // Return an empty array if there's an error
            }
        } catch (error) {
            console.error('Error fetching user favorites:', error);
            return []; // Return an empty array if there's an error
        }
    }

};



export default getUserFavorites