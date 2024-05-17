import axios from "axios"
import Toast from "react-native-toast-message"
import API_BASE_URL from "../../Api"



async function handleDelete(_id,navigation) {
    console.log('Dlt')
    axios.post(`${API_BASE_URL}/delete-business`, { _id:_id}).then(res => {
        console.log(res.data.data)
        if (res.data.status == 'ok') {
            Toast.show({
                type: 'success',
                text1:  JSON.stringify(res.data.data),
                visibilityTime: 3000,
                position: 'bottom'
            })
            navigation.navigate('Home')
        } else {
            Toast.show({
                type: 'error',
                text1: JSON.stringify(res.data.data),
                visibilityTime: 3000,
                position: 'bottom'
            })
        }
    }).catch(err => {
        console.log(err)
    })
}

export default handleDelete