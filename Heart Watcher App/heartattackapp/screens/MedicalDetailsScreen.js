import React, { useState, useEffect } from "react";
import {View, Text, TextInput, TouchableOpacity, Platform, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Image, } from "react-native";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  addMIMedicalData,
  addCHFMedicalData,
} from "../services/native/MedicalService";

import styles from "../assets/stylesheets/MedicalDetailsScreenStyles";

const MedicalDetailsScreen = ({ navigation }) => {

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState({});
  const [currentDetail, setCurrentDetail] = useState({});
  const [inputValue, setInputValue] = useState({});
  const [medicalDetailsData, setMedicalDetailsData] = useState({});
  const [detailsType, setDetailsType] = useState("MI");
  const [storedResponses, setStoredResponses] = useState({});

  const miDetails = [
    {
      question: "What type of chest pain do you have?",
      label: "Chest Pain",
      variable: "chest_pain",
      image: require("../assets/images/old-ladyheart.jpg"),
      type: "four-button",
      options:
        "Typical Angina, Atypical Angina, Non-anginal Pain, Asymptomatic",
    },
    {
      question: "What is your resting blood pressure?",
      label: "Resting BP",
      variable: "resting_bp",
      image: require("../assets/images/old-ladyheart.jpg"),
      type: "input",
    },
    {
      question: "What is your cholesterol level?",
      label: "Cholesterol Level",
      variable: "cholesterol_level",
      image: require("../assets/images/old-ladyheart.jpg"),
      type: "input",
    },
    {
      question: "Is your fasting blood sugar over 120 mg/dl?",
      label: "Fasting blood sugar",
      variable: "fasting_blood_sugar",
      image: require("../assets/images/old-ladyheart.jpg"),
      type: "two-button",
      options: "True, False",
    },
    {
      question: "What type of resting ecg do you have?",
      label: "Resting ecg",
      variable: "rest_ecg",
      image: require("../assets/images/old-ladyheart.jpg"),
      type: "three-button",
      options: "Normal, ST-T wave normality, Left ventricular hypertrophy",
    },
    {
      question: "What is your maximun heart rate?",
      label: "Max heart rate",
      variable: "max_heart_rate",
      image: require("../assets/images/old-ladyheart.jpg"),
      type: "input",
    },
    {
      question: "Do you have exercised induced angina?",
      label: "Exercise induced angina",
      variable: "exercise_induced_angina",
      image: require("../assets/images/old-ladyheart.jpg"),
      type: "two-button",
      options: "Yes, No",
    },
    {
      question: "What is your slope level?",
      label: "Slope",
      variable: "slope",
      image: require("../assets/images/old-ladyheart.jpg"),
      type: "three-button",
      options: "Upsloping, Flat, Downsloping",
    },
    {
      question: "How many major vessels?",
      label: "Number of major vessels",
      variable: "num_major_vessels",
      image: require("../assets/images/old-ladyheart.jpg"),
      type: "four-button",
      options: "0, 1, 2, 3",
    },
    {
      question: "What is your thalium stress level?",
      label: "Thalium stress",
      variable: "thalium_stress_test",
      image: require("../assets/images/old-ladyheart.jpg"),
      type: "three-button",
      options: "1, 2, 3",
    },
    {
      question: "What was your old peak?",
      label: "Old peak",
      variable: "oldpeak",
      image: require("../assets/images/old-ladyheart.jpg"),
      type: "input",
    },
  ];

  const chfDetails = [
      {
        question: "What is your cholesterol level?",
        label: "Cholesterol level",
        variable: "cholesterol_stage",
        image: require("../assets/images/old-ladyheart.jpg"),
        type: "three-button",
        options: "Normal, Above Normal, Well Above Normal",
      },
      {
        question: "What is your systolic level?",
        label: "Systolic",
        variable: "systolic",
        image: require("../assets/images/old-ladyheart.jpg"),
        type: "input",
      },
      {
        question: "What is your diastolic level?",
        label: "Diastolic",
        variable: "diastolic",
        image: require("../assets/images/old-ladyheart.jpg"),
        type: "input",
      },
      {
        question: "What is your glucose level?",
        label: "Glucose level",
        variable: "glucose",
        image: require("../assets/images/old-ladyheart.jpg"),
        type: "three-button",
        options: "Normal, Above Normal, Well Above Normal",
      },
      {
        question: "Do you smoke?",
        label: "Smoke",
        variable: "smoke",
        image: require("../assets/images/old-ladyheart.jpg"),
        type: "two-button",
        options: "Yes, No",
      },
      {
        question: "Do you drink alcohol?",
        label: "Alcohol",
        variable: "alcohol",
        image: require("../assets/images/old-ladyheart.jpg"),
        type: "two-button",
        options: "Yes, No",
      },
      {
        question: "Are you active?",
        label: "Active",
        variable: "active",
        image: require("../assets/images/old-ladyheart.jpg"),
        type: "two-button",
        options: "Yes, No",
      },
  ];

  const handleMedicalData = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");

      if (detailsType === "MI") {
        const miDetailsFilled = miDetails.every((detail) =>
          medicalDetailsData.hasOwnProperty(detail.variable)
        );
        if (!miDetailsFilled) {
          return;
        }

        await addMIMedicalData(userId, medicalDetailsData);

        setDetailsType("CHF");
        setCurrentStep(0);
        setCurrentDetail(chfDetails[0]);
      } else {
        const chfDetailsFilled = chfDetails.every((detail) =>
          medicalDetailsData.hasOwnProperty(detail.variable)
        );
        if (!chfDetailsFilled) {
          return;
        }

        await addCHFMedicalData(userId, medicalDetailsData);

        navigation.goBack();
      }

      setInputValue("");
      setSelectedOption({});
    } catch (error) {
      console.log(error);
    }
  };

  const saveMedicalDetails = async (data) => {
    try {
      await AsyncStorage.setItem("medicalDetails", JSON.stringify(data));
    } catch (error) {
      console.error("Error saving medical details:", error);
    }
  };

  const handleInputChange = (text, variable) => {
    if (!text || !variable) return;

    setInputValue((prevState) => ({
      ...prevState,
      [variable]: text.trim(),
    }));

    const updatedDetails = {
      ...medicalDetailsData,
      [variable]: text.trim(),
    };

    setMedicalDetailsData(updatedDetails);
    saveMedicalDetails(updatedDetails);
    
  };

  const handleOptionPress = (option, variable) => {
    if (!option || !variable) {
      console.log("Option or variable is missing!");
      return;
    }

    setSelectedOption((prevState) => ({
      ...prevState,
      [variable]: option.trim(),
    }));

    const updatedDetails = {
      ...medicalDetailsData,
      [variable]: option.trim(),
    };
    setMedicalDetailsData(updatedDetails);
    saveMedicalDetails(updatedDetails);
    setInputValue("");
  };

  const handleContinue = () => {
    if (detailsType === "MI" && currentStep < miDetails.length - 1) {
      setCurrentStep(currentStep + 1);
      setCurrentDetail(miDetails[currentStep + 1]);
    } else if (detailsType === "CHF" && currentStep < chfDetails.length - 1) {
      setCurrentStep(currentStep + 1);
      setCurrentDetail(chfDetails[currentStep + 1]);
    } else {
      handleMedicalData();
    }
  };

  const renderInput = () => {
    const details = detailsType === "MI" ? miDetails : chfDetails;
    const currentDetails = detailsType === "MI" ? miDetails : chfDetails;

    if (!currentDetail || !currentDetail.label || currentDetails.length === 0) {
      setCurrentDetail(currentDetails[currentStep]);
    }

    if (!currentDetail) {
      return null;
    }

    switch (currentDetail.type) {
      case "input":
        return (
          <View style={{ width: "100%" }}>
            <Text style={styles.questionText}>{currentDetail.question}</Text>
            <TextInput
              style={styles.input}
              placeholder={`Enter ${currentDetail.label}`}
              value={
                inputValue && inputValue[currentDetail?.variable]
                  ? inputValue[currentDetail.variable]
                  : ""
              }
                onChangeText={(text) =>
                handleInputChange(text, currentDetail?.variable || "")
              }
            />
          </View>
        );
      case "two-button":
      case "three-button":
      case "four-button":
        const options = currentDetail.options.split(",");
        const currentVariable = currentDetail?.variable || "";
        return (
          <View>
            <Text style={styles.questionText}>{currentDetail.question}</Text>
            <View style={styles.buttonContainer}>
              {options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.gridbutton,
                    selectedOption &&
                    selectedOption[currentVariable] === option.trim()
                      ? styles.selectedOption
                      : null,
                  ]}
                  onPress={() =>
                    handleOptionPress(option.trim(), currentVariable)
                  }
                >
                  <Text style={styles.gridbuttonText}>{option.trim()}</Text>
                  {selectedOption[currentVariable] === option.trim() && (
                    <Feather
                      name="check"
                      size={20}
                      color="green"
                      style={styles.checkmark}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    const fetchMedicalDetails = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userId");
        const storedMedicalDetails = await AsyncStorage.getItem("medicalDetails");
  
        if (storedUserId === null || storedUserId === undefined) {
          // Clear stored medical details for new users
          await AsyncStorage.removeItem("medicalDetails");
          return;
        }
  
        if (storedMedicalDetails !== null) {
          const parsedMedicalDetails = JSON.parse(storedMedicalDetails);
          setMedicalDetailsData(parsedMedicalDetails);
          setStoredResponses(parsedMedicalDetails);
  
          const updatedInputValues = {};
          const updatedSelectedOptions = {};
  
          // Handle MI details
          miDetails.forEach((detail) => {
            const variable = detail.variable;
            if (parsedMedicalDetails.hasOwnProperty(variable)) {
              if (detail.type === "input") {
                updatedInputValues[variable] = parsedMedicalDetails[variable];
              } else {
                updatedSelectedOptions[variable] =
                  parsedMedicalDetails[variable];
              }
            }
          });
  
          // Handle CHF details
          chfDetails.forEach((detail) => {
            const variable = detail.variable;
            if (parsedMedicalDetails.hasOwnProperty(variable)) {
              if (detail.type === "input") {
                updatedInputValues[variable] = parsedMedicalDetails[variable];
              } else {
                updatedSelectedOptions[variable] =
                  parsedMedicalDetails[variable];
              }
            }
          });
  
          setInputValue(updatedInputValues);
          setSelectedOption(updatedSelectedOptions);
        }
      } catch (error) {
        console.error("Error fetching medical details:", error);
      }
    };
  
    fetchMedicalDetails();
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              style={styles.arrow}
              onPress={() => navigation.goBack()}
            >
              <Feather name="arrow-left" size={30} color="rgba(0,88,47,1)" />
            </TouchableOpacity>
            <Text style={styles.title}>Medical Details</Text>
          </View>

          {currentStep >= 0 && currentDetail && (
            <View style={styles.pageContainer}>
              <Image source={currentDetail.image} style={styles.image} />
              {renderInput()}
              <TouchableOpacity style={styles.button} onPress={handleContinue}>
                <Text style={styles.buttonText}>
                  {detailsType === "MI" && currentStep < miDetails.length - 1 ? "Next" : detailsType === "CHF" && currentStep < chfDetails.length - 1 ? "Next" : "Save"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default MedicalDetailsScreen;
