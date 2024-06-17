import axios from "axios";
import API_BASE_URL from "../../Api";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { store } from "../../Redux/Store";
import { setUser } from "../../Redux/User";
import { useDispatch } from "react-redux";




async function getdata() {
    const token = await AsyncStorage.getItem('token');
    // console.log("Profile",token);
    if(token){
        axios.post(`${API_BASE_URL}/user/user-data`, { token: token })
        .then(res => {
            // console.log(res.data);
            store.dispatch(setUser(res.data.data))

        });
    }
    
}

export default getdata