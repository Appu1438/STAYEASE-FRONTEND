import axios from "axios"
import API_BASE_URL from "../../Api"
import Toast from "react-native-toast-message"
import { store } from "../../Redux/Store"
import { setAllUsers } from "../../Redux/User"


async function getAllUsers() {
    axios.get(`${API_BASE_URL}/get-all-users`).then(res => {
        // console.log('Users:', res.data)
        if (res.data.status == 'ok') {
            // setAllusers(res.data.data)
            store.dispatch(setAllUsers(res.data.data))
            // Toast.show({
            //     type: 'success',
            //     // text1: 'Users Fetched Successfully',
            //     visibilityTime: 3000,
            //     position: 'bottom'
            // })
            console.log("State", allUsers)
        } else {
            // Toast.show({
            //     type: 'error',
            //     // text1: JSON.stringify(res.data.data),
            //     visibilityTime: 3000,
            //     position: 'bottom'
            // })
        }
    }).catch(err => {
        
    })
}

export default getAllUsers