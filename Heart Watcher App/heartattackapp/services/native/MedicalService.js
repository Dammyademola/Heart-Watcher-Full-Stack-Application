import axios from "axios";
import alertService from "./AlertService";
import BASE_URL from "../../constants/Endpoints";

const addMIMedicalData = async (userId, userData) => {
    try {
        axios.defaults.baseURL = BASE_URL;

        const response = await axios.post(`/api/update-mi-medical/${userId}`, userData);

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error("Failed to inserting user medical data");
        }

    } catch (error) {
    console.error("Error inserting user medical data:", error);
    await alertService.showAlert(
        "Error",
        "An error occurred during inserting user medical data"
    );
    throw error;
    }
};

const addCHFMedicalData = async (userId, userData) => {
    try {
        axios.defaults.baseURL = BASE_URL;

        const response = await axios.post(`/api/update-chf-medical/${userId}`, userData);

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error("Failed to insert user medical data");
        }

    } catch (error) {
        console.error("Error inserting user medical data:", error);
        await alertService.showAlert(
            "Error",
            "An error occurred during inserting user medical data"
        );
        throw error;
    }
};
  
export {addMIMedicalData, addCHFMedicalData};
  