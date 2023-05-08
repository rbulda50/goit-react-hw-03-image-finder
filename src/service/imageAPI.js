import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '33896615-ace76cd589cb7d39e22f51a75';

const imageAPI = async (value, page) => {
    const options = {
        params: {
            key: API_KEY,
            q: value,
            per_page: 12,
            page: page,
            image_type: "photo",
            orientation: "horizontal",
        }
    };

    const response = await axios(BASE_URL, options)
    return response.data;
};

const API = {
    imageAPI,
}

export default API;