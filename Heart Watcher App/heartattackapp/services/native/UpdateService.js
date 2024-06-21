import axios from "axios";
import alertService from "./AlertService";
import BASE_URL from "../../constants/Endpoints";

const updateDetailsService = async (userId, userData) => {
    try {
        axios.defaults.baseURL = BASE_URL;

        const response = await axios.post(`/api/update-personal/${userId}`, userData);

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error("Failed to update user");
        }
    } catch (error) {
    console.error("Error registering user:", error);
    await alertService.showAlert(
        "Error",
        "An error occurred during updating user detials"
    );
    throw error;
    }
};

const updatePasswordService = async (userId, userData) => {
    try {
        axios.defaults.baseURL = BASE_URL;

        const response = await axios.post(`/api/update-personal-password/${userId}`, userData);

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error("Failed to update user password");
        }
    } catch (error) {
    console.error("Error registering password:", error);
    await alertService.showAlert(
        "Error",
        "An error occurred during updating user password"
    );
    throw error;
    }
};
  
export {updateDetailsService, updatePasswordService};
  