import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { LineChart } from "react-native-chart-kit";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "../assets/stylesheets/HealthScreenStyles";
import {
  FetchCHFPredictionTable,
  FetchMIPredictionTable,
} from "../services/native/HealthService";
import { getUserRecords } from "../services/native/UserRecords";

const HealthScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDataPoint, setSelectedDataPoint] = useState(null);
  const [additionalInfoWithId, setAdditionalInfoWithId] = useState([]);

  const [CHFPredictionData, setCHFPredictionData] = useState([0, 0, 0, 0, 0]);
  const [MIPredictionData, setMIPredictionData] = useState([0, 0, 0, 0, 0]);

  const [MI, setMI] = useState([]);
  const [CHF, setCHF] = useState([]);

  const [latestMIPrediction, setLatestMIPrediction] = useState(null);
  const [latestCHFPrediction, setLatestCHFPrediction] = useState(null);
  const [userRecords, setUserRecords] = useState(null); // Change the initial state to null
  const [userId, setUserId] = useState(null);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleDataPointClick = ({ value, dataset }) => {
    const dataIndex = dataset.data.indexOf(value);
    if (dataset && dataset.data && dataIndex !== -1) {
      let predictionType = null;
      if (dataset.data === CHFPredictionData) {
        predictionType = "CHF";
      } else if (dataset.data === MIPredictionData) {
        predictionType = "MI";
      }

      if (predictionType) {
        const infoObject = additionalInfoWithId.find(
          (obj) => obj.type === predictionType && obj.infoIndex === dataIndex
        );

        if (infoObject) {
          setSelectedDataPoint({ value, info: infoObject.info });
          toggleModal();
        } else {
          console.error(
            "Additional information not found for the selected prediction type"
          );
        }
      } else {
        console.error("Invalid dataset or data structure");
      }
    } else {
      console.error("Invalid dataset or data structure");
    }
  };

  const generateUniqueId = () => {
    return "_" + Math.random().toString(36).substr(2, 9);
  };

  const recentPrediction = async (MI, CHF, userId) => {
    try {
      const sortedMIPredictions = MI.sort(
        (a, b) => new Date(b.prediction_date) - new Date(a.prediction_date)
      );
      const sortedCHFPredictions = CHF.sort(
        (a, b) => new Date(b.prediction_date) - new Date(a.prediction_date)
      );
      setLatestMIPrediction(sortedMIPredictions[0]);
      setLatestCHFPrediction(sortedCHFPredictions[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  function decodeMIAdditionalInfo(predictionData) {
    return [
      `Cholesterol: ${predictionData.chol}`,
      `CA: ${predictionData.ca}`,
      `CP: ${decodeChestPain(parseInt(predictionData.cp))}`,
      `FBS: ${decodeFastingBloodSugar(parseInt(predictionData.fbs))}`,
      `Thal: ${decodeThaliumStressTest(parseInt(predictionData.thal))}`,
      `Exang: ${decodeExceriseInduced(parseInt(predictionData.exang))}`,
      `Slope: ${decodeSlope(parseInt(predictionData.slope))}`,
      `Oldpeak: ${predictionData.oldpeak}`,
      `Restecg: ${decodeRestingEcg(parseInt(predictionData.restecg))}`,
      `Thalach: ${predictionData.thalach}`,
      `Trestbps: ${predictionData.trestbps}`,
    ];
  }

  function decodeCHFAdditionalInfo(predictionData) {
    return [
      `BMI: ${predictionData.BMI}`,
      `Pulse: ${predictionData.Pulse}`,
      `Smoke: ${decodeSmoke(parseInt(predictionData.Smoke))}`,
      `Active: ${decodeActive(parseInt(predictionData.Active))}`,
      `Gender: ${predictionData.Gender}`,
      `Height: ${predictionData.Height}`,
      `Weight: ${predictionData.Weight}`,
      `Alcohol: ${decodeAlcohol(parseInt(predictionData.Alcohol))}`,
      `Glucose: ${decodeGlucoseLevel(parseInt(predictionData.Glucose))}`,
      `Systolic: ${predictionData.Systolic}`,
      `Diastolic: ${predictionData.Diastolic}`,
      `Cholesterol: ${decodeCholesterolStage(
        parseInt(predictionData.Cholesterol)
      )}`,
    ];
  }

  function decodeChestPain(value) {
    switch (parseInt(value)) {
      case 0:
        return "Typical Angina";
      case 1:
        return "Atypical Angina";
      case 2:
        return "Non-anginal Pain";
      case 3:
        return "Asymptomatic";
      default:
        return "Unknown";
    }
  }

  function decodeFastingBloodSugar(value) {
    switch (parseInt(value)) {
      case 0:
        return "False";
      case 1:
        return "True";
      default:
        return "Unknown";
    }
  }

  function decodeRestingEcg(value) {
    switch (parseInt(value)) {
      case 0:
        return "Normal";
      case 1:
        return "ST-T wave normality";
      case 2:
        return "Left ventricular hypertrophy";
      default:
        return "Unknown";
    }
  }

  function decodeExceriseInduced(value) {
    switch (parseInt(value)) {
      case 0:
        return "No";
      case 1:
        return "Yes";
      default:
        return "Unknown";
    }
  }

  function decodeSlope(value) {
    switch (parseInt(value)) {
      case 0:
        return "Upsloping";
      case 1:
        return "Flat";
      case 2:
        return "Downsloping";
      default:
        return "Unknown";
    }
  }

  function decodeThaliumStressTest(value) {
    switch (parseInt(value)) {
      case 0:
        return "Unknown";
      case 1:
        return "Normal";
      case 2:
        return "Fixed Defect";
      case 3:
        return "Reversible Defect";
      default:
        return "Unknown";
    }
  }

  function decodeSmoke(value) {
    switch (parseInt(value)) {
      case 0:
        return "No";
      case 1:
        return "Yes";
      default:
        return "Unknown";
    }
  }

  function decodeAlcohol(value) {
    switch (parseInt(value)) {
      case 0:
        return "No";
      case 1:
        return "Yes";
      default:
        return "Unknown";
    }
  }

  function decodeActive(value) {
    switch (parseInt(value)) {
      case 0:
        return "No";
      case 1:
        return "Yes";
      default:
        return "Unknown";
    }
  }

  function decodeCholesterolStage(value) {
    switch (parseInt(value)) {
      case 1:
        return "Normal";
      case 2:
        return "Above Normal";
      case 3:
        return "Well Above Normal";
      default:
        return "Unknown";
    }
  }

  function decodeGlucoseLevel(value) {
    switch (parseInt(value)) {
      case 1:
        return "Normal";
      case 2:
        return "Above Normal";
      case 3:
        return "Well Above Normal";
      default:
        return "Unknown";
    }
  }

  const fetchData = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      setUserId(userId);
      const MI = await FetchMIPredictionTable(userId);
      const CHF = await FetchCHFPredictionTable(userId);
      const records = await getUserRecords(userId);
      setUserRecords(records);
      await recentPrediction(MI, CHF, userId);

      const MIInfoWithId = MI.map((item, index) => {
        const predictionData = JSON.parse(item.prediction_data);
        const info = decodeMIAdditionalInfo(predictionData);
        return { type: "MI", info, infoIndex: index, id: generateUniqueId() };
      });

      const CHFInfoWithId = CHF.map((item, index) => {
        const predictionData = JSON.parse(item.prediction_data);
        const info = decodeCHFAdditionalInfo(predictionData);
        return { type: "CHF", info, infoIndex: index, id: generateUniqueId() };
      });

      setAdditionalInfoWithId([...MIInfoWithId, ...CHFInfoWithId]);

      setCHFPredictionData(
        CHF.map((item) => parseInt(item.prediction_result) || 0)
      );
      setMIPredictionData(
        MI.map((item) => parseInt(item.prediction_result) || 0)
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    recentPrediction(MI, CHF, userId);
  }, [MI, CHF]);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Health Assessment</Text>
      </View>

      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendSquare, { backgroundColor: "black" }]} />
          <Text style={styles.legendText}>CHF</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendSquare, { backgroundColor: "red" }]} />
          <Text style={styles.legendText}>MI</Text>
        </View>
      </View>

      <View>
        <LineChart
          data={{
            datasets: [
              {
                data: CHFPredictionData,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              },
              {
                data: MIPredictionData,
                color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
              },
            ],
          }}
          width={377}
          height={300}
          yAxisSuffix="%"
          style={styles.lineChart}
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            propsForDots: {
              r: "4",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          onDataPointClick={handleDataPointClick}
        />
      </View>

      <Modal visible={isModalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Data Point Value: {selectedDataPoint?.value}%</Text>

            {selectedDataPoint?.info &&
              Array.isArray(selectedDataPoint.info) && (
                <View>
                  {selectedDataPoint.info.map((info, index) => (
                    <Text key={index}>{info}</Text>
                  ))}
                </View>
              )}
            <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
              <FontAwesome name="times" size={25} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.Rectangle1824}>
        {userRecords && (
          <View style={styles.userDataContainer}>
            <Text style={styles.userDataTitle}>User Data</Text>
            <View style={styles.userDataItem}>
              <Text style={styles.userDataLabel}>Name:</Text>
              <Text style={styles.userDataValue}>
                {userRecords.length > 0
                  ? `${userRecords[0].first_name} ${userRecords[0].last_name}`
                  : ""}
              </Text>
            </View>
            <View style={styles.userDataItem}>
              <Text style={styles.userDataLabel}>Weight:</Text>
              <Text style={styles.userDataValue}>
                {userRecords.length > 0 ? userRecords[0].weight : ""}
              </Text>
            </View>
            <View style={styles.userDataItem}>
              <Text style={styles.userDataLabel}>Height:</Text>
              <Text style={styles.userDataValue}>
                {userRecords.length > 0 ? userRecords[0].height : ""}
              </Text>
            </View>
          </View>
        )}
        {latestMIPrediction && (
          <View style={styles.predictionContainer}>
            <Text style={styles.predictionText}>
              MI Prediction: {latestMIPrediction.prediction_result}%
            </Text>
          </View>
        )}
        {latestCHFPrediction && (
          <View style={styles.predictionContainer}>
            <Text style={styles.predictionText}>
              CHF Prediction: {latestCHFPrediction.prediction_result}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default HealthScreen;
