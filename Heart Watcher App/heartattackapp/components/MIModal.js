import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import styles from "../assets/stylesheets/components/MIModalStyles";
import {handleRunPrediction, CheckMITable} from "../services/predictivemodels/MIPredictiveModels";

const MIModal = ({ isVisible, toggleModal }) => {
  const [loading, setLoading] = useState(false);
  const [dataComplete, setDataComplete] = useState(false);
  const [showContinueModal, setShowContinueModal] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    CheckData();
  }, []);

  const RunPrediction = async () => {
    setLoading(true);
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (dataComplete || showContinueModal) {
        await handleRunPrediction(userId);
        toggleModal();
        navigation.navigate("Health");
      } else {
        setShowContinueModal(true);
      }
    } catch (error) {
      console.error("Error running prediction:", error);
    } finally {
      setLoading(false);
      
    }
  };

  const CheckData = async () => {
    const userId = await AsyncStorage.getItem("userId");
    const isComplete = await CheckMITable(userId);
    setDataComplete(isComplete);
  };

  const screenWidth = Dimensions.get("window").width;

  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={toggleModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Heart Attack Risk Assessment</Text>
          <Text style={[styles.modalText, styles.modalText2]}>
            Our data is sourced from reliable sources and undergoes rigorous
            processing to ensure accuracy. While the predictor provides
            insights, it's not a substitute for professional medical advice.
          </Text>
          <View style={styles.section}>
            {!loading && (
              <TouchableOpacity onPress={RunPrediction}>
                <View style={styles.cardContainer}>
                  <View style={styles.contentContainer}>
                    <Text style={styles.title}>Run The Model</Text>
                    <View style={styles.contentContainer2}>
                      <FontAwesome
                        name="arrow-right"
                        size={screenWidth * 0.05}
                        color="rgba(0,88,47,1)"
                        style={styles.arrowicon}
                      />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            {/* Conditionally render the loading spinner based on the loading state */}
            {loading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="rgba(0,88,47,1)" />
                <Text style={styles.loadingText}>Running the model...</Text>
              </View>
            )}
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
            <FontAwesome name="times" size={25} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Continue Modal */}
      <Modal
        visible={showContinueModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowContinueModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Incomplete Data</Text>
            <Text style={styles.modalText2}>
              Your data is incomplete. Do you want to continue with the
              prediction?
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.continueButton]}
                onPress={() => {
                  setShowContinueModal(false);
                  RunPrediction();
                }}
              >
                <View style={styles.cardContainer}>
                  <View style={styles.contentContainer}>
                    <Text style={styles.title}>Continue with Prediction</Text>
                    <View style={styles.contentContainer2}>
                      <FontAwesome
                        name="arrow-right"
                        size={screenWidth * 0.05}
                        color="rgba(0,88,47,1)"
                        style={styles.arrowicon}
                      />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => {
                  setShowContinueModal(false);
                  navigation.navigate("Home");
                }}
              >
                <View style={styles.cardContainer}>
                  <View style={styles.contentContainer}>
                    <Text style={styles.title}>Cancel the Prediction</Text>
                    <View style={styles.contentContainer2}>
                      <FontAwesome
                        name="arrow-left"
                        size={screenWidth * 0.05}
                        color="rgba(0,88,47,1)"
                        style={styles.arrowicon}
                      />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </Modal>
  );
};

export default MIModal;