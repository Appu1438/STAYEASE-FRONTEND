import axios from "axios";
import API_BASE_URL from "../../Api";
import Toast from "react-native-toast-message";

const submitReview = async (Hoteldata,userData,review,setReview,oldReviews,setoldReviews) => {
    if (review.trim()) {
        try {
            const newReview = { hotelId: Hoteldata._id, userName: userData.name, userId:userData._id, review };
            const response = await axios.post(`${API_BASE_URL}/user/reviews`, newReview);
            setoldReviews([response.data.data, ...oldReviews]);
            setReview('');
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
            text1: 'Please enter a review before submitting',
            visibilityTime: 3000,
            position: 'bottom'
        });
    }
}

export default  submitReview