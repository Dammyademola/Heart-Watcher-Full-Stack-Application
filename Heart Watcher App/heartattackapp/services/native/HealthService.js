import axios from "axios";
import alertService from "./AlertService";
import BASE_URL from "../../constants/Endpoints";

const FetchMIPredictionTable = async (userId) => {
    try {
        axios.defaults.baseURL = BASE_URL;
        const response = await axios.get(`/api/fetch/mi/prediction/table/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error checking tables: ", error);
        throw error;
    }
};

const FetchCHFPredictionTable = async (userId) => {
    try {
        axios.defaults.baseURL = BASE_URL;
        const response = await axios.get(`/api/fetch/chf/prediction/table/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error checking tables: ", error);
        throw error;
    }
}

export {FetchMIPredictionTable, FetchCHFPredictionTable};