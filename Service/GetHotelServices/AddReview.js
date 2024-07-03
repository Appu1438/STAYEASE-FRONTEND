import axios from "axios";
import API_BASE_URL from "../../Api";
import Toast from "react-native-toast-message";
import { Rating } from "react-native-ratings";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TokenExpiry from "../TokenService/TokenExpiry";

const submitReview = async (Hoteldata, userData, review, setReview, oldReviews, setoldReviews, reviewChanged, setreviewChanged, rating, loading, navigation) => {
    const token = await AsyncStorage.getItem('token');

    if (token) {
        loading(true)
        if (review.trim()) {
            try {
                const newReview = { hotelId: Hoteldata._id, userName: userData.name, userId: userData._id, review, rating };
                const response = await axios.post(`${API_BASE_URL}/user/reviews`, newReview, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.data.status == 'NotOk') {
                    TokenExpiry(navigation, response)
                } else {
                    setoldReviews([response.data.data, ...oldReviews]);
                    setReview('');
                    Toast.show({
                        type: 'success',
                        text1: 'Review submited',
                        visibilityTime: 3000,
                        position: 'bottom'
                    });
                    setreviewChanged(!reviewChanged)
                }
            } catch (error) {
                console.error('Error submitting review:', error);
                Toast.show({
                    type: 'error',
                    text1: 'Error submitting review',
                    visibilityTime: 3000,
                    position: 'bottom'
                });
            }
        } else {
            Toast.show({
                type: 'error',
                text1: 'Please write Review  before submitting',
                visibilityTime: 3000,
                position: 'bottom'
            });
        }
        loading(false)

    } else {
        Toast.show({
            type: 'error',
            text1: 'Please login to Review ',
            visibilityTime: 3000,
            position: 'bottom'
        });
    }

}

export default submitReview