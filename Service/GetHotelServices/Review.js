import axios from "axios";
import API_BASE_URL from "../../Api";


const fetchReviews = async (setoldReviews,id,count) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/user/reviews/${id}`);
        const reviews = response.data.data;
        setoldReviews(reviews);
        count(reviews.length);
        return reviews.length;
    } catch (error) {
        console.error('Error fetching reviews:', error);
       
    }
};

export default fetchReviews