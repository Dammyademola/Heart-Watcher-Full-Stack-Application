import axios from 'axios';
import alertService from "./AlertService";
import BASE_URL from "../../constants/Endpoints";

const getUserRecords = async (userId) => {

    try {

        axios.defaults.baseURL = BASE_URL;
        
        const response = await axios.get(`/api/users/${userId}`);
        
        const userRecords = response.data;

        return userRecords;

    } catch (error) {
      console.error('Error fetching user records:', error);
      await alertService.showAlert(
        "Error",
        "An error occurred while fetching user records. Please try again."
      );
      
    }
  };


export { getUserRecords };