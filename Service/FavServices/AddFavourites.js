
import axios from "axios";
import API_BASE_URL from "../../Api";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TokenExpiry from "../TokenService/TokenExpiry";



const addToFavorites = async (hotelId, userId,navigation) => {
    const token = await AsyncStorage.getItem('token');
    const data = await AsyncStorage.getItem('isLoggedIn')


    if (!token) {
        Toast.show({
            type: 'error',
            text1: 'Please login first',
            visibilityTime: 3000,
            position: 'bottom'
        });
    } else {
        console.log('Services Add')
        try {
            // Make a POST request to your backend API to add the hotel to favorites
            const response = await axios.post(`${API_BASE_URL}/user/add-to-favorites`, { userId, hotelId },{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data.status == 'ok') {
                // If the hotel is successfully added to favorites, update the state
                Toast.show({
                    type: 'success',
                    text1: 'Added To Favourites',
                    visibilityTime: 3000,
                    position: 'bottom'
                });
                setfav(fav)
            }else if(response.data.status=='NotOk'){
                  TokenExpiry(navigation,response)
            } else {
                Toast.show({
                    type: 'error',
                    text1: JSON.stringify(response.data.data),
                    visibilityTime: 3000,
                    position: 'bottom'
                });
                // // Handle error if the hotel could not be added to favorites
                // console.error('Failed to add hotel to favorites:');
                // // Display error message to the user if needed
            }
        } catch (error) {
            // console.error('Error adding hotel to favorites:');
            // Display error message to the user if needed
        }
    }
};



export default addToFavorites 