import axios from "axios";
import BASE_URL from "../../constants/Endpoints";

const handleRunPrediction = async (userId) => {
  try {
    axios.defaults.baseURL = BASE_URL;

    const response = await axios.get(`/model/predict/mi/${userId}`);

    console.log("Prediction response:", response.data);
  } catch (error) {
    console.error("Error running prediction:", error);
    throw error;
  }
};

const CheckMITable = async (userId) => {
  try {
    const response = await axios.get(`/model/checks/mi/${userId}`);
    return response.data.isDataComplete;
  } catch (error) {
    console.error("Error checking MI table:", error);
    throw error;
  }
};

export { handleRunPrediction, CheckMITable };
