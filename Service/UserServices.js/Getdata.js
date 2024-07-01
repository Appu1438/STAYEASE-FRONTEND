import axios from "axios";
import API_BASE_URL from "../../Api";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { store } from "../../Redux/Store";
import { setUser } from "../../Redux/User";

async function getdata(navigation) {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            throw new Error('Token not found');
        }

        const response = await axios.post(`${API_BASE_URL}/user/user-data`, { token });

        store.dispatch(setUser(response.data.data));
    }
    catch (error) {
        // console.error('Error fetching user data:', error.message);

    }
}

export default getdata;
