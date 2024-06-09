import axios from "axios";
import API_BASE_URL from "../../Api";
import Toast from "react-native-toast-message";

const removeReview = async (id, oldReviews, setOldReviews,reviewChanged,setReviewChanged) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/user/reviews/${id}`);
        if (response.status === 200 && response.data.status === 'ok') {
            // Remove the deleted review from the oldReviews state
            const updatedReviews = oldReviews.filter(review => review._id !== id);
            setOldReviews(updatedReviews);
            Toast.show({
                type: 'success',
                text1: 'Review deleted',
                visibilityTime: 3000,
                position: 'bottom'
            });
            setReviewChanged(!reviewChanged)
        } else {
            throw new Error('Failed to delete review');
        }
    } catch (error) {
        console.error('Error deleting review:', error);
        Toast.show({
            type: 'error',
            text1: 'Error deleting review',
            visibilityTime: 3000,
            position: 'bottom'
        });
    }
};

export default removeReview;
