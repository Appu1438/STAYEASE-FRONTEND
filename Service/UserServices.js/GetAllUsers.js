import axios from "axios"
import API_BASE_URL from "../../Api"
import Toast from "react-native-toast-message"
import { store } from "../../Redux/Store"
import { setAllUsers } from "../../Redux/User"


async function getAllUsers() {
    axios.get(`${API_BASE_URL}/get-all-users`).then(res => {
        // console.log('Users:', res.data)
        if (res.data.status == 'ok') {
            store.dispatch(setAllUsers(res.data.data))
           
            console.log("State", allUsers)
        } else {
          
        }
    }).catch(err => {
        
    })
}

export default getAllUsers