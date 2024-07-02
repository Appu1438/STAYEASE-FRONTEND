import axios from "axios"
import API_BASE_URL from "../../Api"
import Toast from "react-native-toast-message"
import { store } from "../../Redux/Store"
import { setAllUsers } from "../../Redux/User"
import AsyncStorage from "@react-native-async-storage/async-storage"
import TokenExpiry from "../TokenService/TokenExpiry"


async function getAllUsers(navigation) {
    const token = await AsyncStorage.getItem('token');

    axios.get(`${API_BASE_URL}/admin/get-all-users`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(res => {
        // console.log('Users:', res.data)
        if (res.data.status == 'ok') {
            store.dispatch(setAllUsers(res.data.data))
            console.log("State", allUsers)
        } else if (res.data.status == 'NotOk') {
            TokenExpiry(navigation,res)
            // navigation.navigate('UserLogout')

        }else{

        }
    }).catch(err => {
        console.log(err)
    })
}

export default getAllUsers