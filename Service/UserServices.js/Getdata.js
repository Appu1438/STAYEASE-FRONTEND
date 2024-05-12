import axios from "axios";
import API_BASE_URL from "../../Api";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";


async function getdata(setUserData) {
    const token = await AsyncStorage.getItem('token');
    // console.log("Profile",token);
    axios.post(`${API_BASE_URL}/user-data`, { token: token })
        .then(res => {
            // console.log(res.data);
            setUserData(res.data.data)

        });
}

export default getdata