import axios from "axios";
import API_BASE_URL from "../../Api";


const fetchReviews = async (setoldReviews,id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/user/reviews/${id}`);
        setoldReviews(response.data.data);
    } catch (error) {
        console.error('Error fetching reviews:', error);
       
    }
};

export default fetchReviews