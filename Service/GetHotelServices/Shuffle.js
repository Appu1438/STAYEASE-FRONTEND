import axios from "axios";
import API_BASE_URL from "../../Api";
import Toast from "react-native-toast-message";


const shuffleArray = (array,setRandom) => {
    console.log( Array.isArray(array))

    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    setRandom( shuffledArray)
};

export default shuffleArray