import axios from "axios";
import API_BASE_URL from "../../Api";
import Toast from "react-native-toast-message";


const getAllBusiness = async (id,setAllHotels,setLoading) => {
    const hoteluserid = id
    try {
        const response = await axios.get(`${API_BASE_URL}/get-user-hotels/${hoteluserid}`);
        console.log(response.data.data)
        if (response.data.status == 'ok') {
            setAllHotels(response.data.data)
        } else {
            Toast.show({
                type: "error",
                text1: JSON.stringify(response.data.data),
                visibilityTime: 3000,
                position: "bottom",
            })
        }
    } catch (error) {
        console.error("Error fetching business:", error);
        Toast.show({
            type: "error",
            text1: "Error fetching Hotels",
            visibilityTime: 3000,
            position: "bottom",
        });
    }
    setLoading(false)
};

export default getAllBusiness