import axios from "axios";
import API_BASE_URL from "../../Api";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TokenExpiry from "../TokenService/TokenExpiry";


const getallPendingHotels = async (setAllHotels,navigation) => {
    const token = await AsyncStorage.getItem('token');

    try {
    const response = await axios.get(`${API_BASE_URL}/admin/get-pending-hotels`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    });
        if (response.data.status === "ok") {
            setAllHotels(response.data.data);
        } else if (response.data.status == 'NotOk') {
            TokenExpiry(navigation, response)
        } else {
            Toast.show({
                type: "error",
                text1: JSON.stringify(response.data.data),
                visibilityTime: 3000,
                position: "bottom",
            });
        }
    } catch (error) {
        console.error("Error fetching Hotels:", error);
        Toast.show({
            type: "error",
            text1: "Error fetching Hotels",
            visibilityTime: 3000,
            position: "bottom",
        });
    }
};
export default getallPendingHotels