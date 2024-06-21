import axios from "axios";
import BASE_URL from "../../constants/Endpoints";

const handleRunPrediction = async (userId) => {
  try {
    axios.defaults.baseURL = BASE_URL;

    const response = await axios.get(`/model/predict/chf/${userId}`);

    console.log("Prediction response:", response.data);
  } catch (error) {
    console.error("Error running prediction:", error);
    throw error;
  }
};

const CheckCHFTable = async (userId) => {
  try {
    const response = await axios.get(`/model/checks/chf/${userId}`);
    return response.data.isDataComplete;
  } catch (error) {
    console.error("Error checking CHF table:", error);
    throw error;
  }
};

export {handleRunPrediction, CheckCHFTable};
