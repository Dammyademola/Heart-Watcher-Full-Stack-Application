import axios from 'axios';
import BASE_URL from "../../constants/Endpoints";

const checkData = async (userId) => {
    try {
        axios.defaults.baseURL = BASE_URL;

        const response = await axios.get(`/api/check-details/${userId}`);

        if (response.status === 200) {
            const userDetails = response.data.userDetails;

            const hasNullValues = Object.values(userDetails).some(value => value === null);
            
            return !hasNullValues;
        } else {
            console.error("Unexpected response status:", response.status);
            return null;
        }
    } catch (error) {
        console.error("Error checking personal details:", error);
        throw error;
    }
};

const checkMedicalData = async (userId) => {
    try {
      axios.defaults.baseURL = BASE_URL;
  
      const response = await axios.get(`/api/check-medical-details/${userId}`);
  
      if (response.status === 200) {
        const userDetails = response.data.userDetails;
  
        // Check if any value in any object in userDetails array is null
        const hasNullValues = userDetails.some((user) => {
          return Object.values(user).some((value) => value === null);
        });
        
        return !hasNullValues; // Return both values
      } else {
        console.error("Unexpected response status:", response.status);
        return { hasNullValues: null, userDetails: null }; // Return null values
      }
    } catch (error) {
      console.error("Error checking medical details:", error);
      throw error;
    }
  };


const checkUsageCHF = async (userId) => {
    try {
        const response = await axios.get(`/api/check-chf-history/${userId}`);
        if (response.data && response.data.exists) {
            console.log("CHF history exists:", response.data.message);
            return true;
        } else {
            console.log("No CHF history found:", response.data.message);
            return false;
        }
    } catch (error) {
        console.error('Failed to check CHF history:', error);
    }
};

const checkUsageMI = async (userId) => {
    try {
        const response = await axios.get(`/api/check-mi-history/${userId}`);
        if (response.data && response.data.exists) {
            console.log("MI history exists:", response.data.message);
            return true;
        } else {
            console.log("No MI history found:", response.data.message);
            return false;
        }
    } catch (error) {
        console.error('Failed to check MI history:', error);
    }
};



export { checkData, checkMedicalData, checkUsageCHF, checkUsageMI };
