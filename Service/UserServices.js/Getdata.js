import axios from "axios";
import API_BASE_URL from "../../Api";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { store } from "../../Redux/Store";
import { setUser } from "../../Redux/User";
import TokenExpiry from "../TokenService/TokenExpiry";

async function getdata(navigation) {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            console.log('token not found')
        } else {
            const response = await axios.post(`${API_BASE_URL}/user/user-data`, { token },{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            if(response.data.status=='NotOk'){
                TokenExpiry(navigation,response)
            }else{
                console.log('user')

                store.dispatch(setUser(response.data.data));
            }
            
        }
       
    }
    catch (error) {
        console.error('Error fetching user data:', error.message);
    }
}

export default getdata;
