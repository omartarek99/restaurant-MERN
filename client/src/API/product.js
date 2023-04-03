import axios from "axios"

export const createProduct = async (data) => {

        const response = await axios.post('/API/product', data);

        return response;

}