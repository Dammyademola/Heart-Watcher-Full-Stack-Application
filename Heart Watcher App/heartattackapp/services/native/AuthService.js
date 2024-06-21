import axios from "axios";
import alertService from "./AlertService";
import BASE_URL from "../../constants/Endpoints";

const loginUser = async (userData) => {
  try {
    axios.defaults.baseURL = BASE_URL;

    const response = await axios.post("/api/login", userData);

    if (response.status === 200) {
      return { userId: response.data.userId };
    } else {
      throw new Error("Failed to login user");
    }
  } catch (error) {
    console.error("Error logging in:", error);

    await alertService.showAlert(
      "Error",
      "An error occurred during the login process. Please try again."
    );

    throw error;
  }
};

const registerUser = async (userData) => {
  try {
    axios.defaults.baseURL = BASE_URL;

    const response = await axios.post("/api/register", userData);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to register user");
    }
  } catch (error) {
    console.error("Error registering user:", error);
    await alertService.showAlert(
      "Error",
      "An error occurred during the registration process"
    );
    throw error;
  }
};

export { loginUser, registerUser };