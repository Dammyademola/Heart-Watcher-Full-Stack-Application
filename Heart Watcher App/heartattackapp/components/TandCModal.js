import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import styles from "../assets/stylesheets/components/TandCModalStyles";

const TandCModal = ({ isVisible, toggleModal }) => {
  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={toggleModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Terms and Conditions</Text>
          <Text style={styles.modalText}>
            Welcome to Heart Watcher Predictor, the mobile application designed to provide predictive insights based on your health data to assess risks related to heart failure and heart attacks. Please read these Terms and Conditions carefully before using our app, as by registering and using our app, you agree to be bound by these terms.
          </Text>
          <Text style={styles.modalText}>
            Our app does not provide medical advice and is intended for informational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Do not ignore professional medical advice because of something you have read on this app.
          </Text>
          <Text style={styles.modalText}>
            By using this app, you agree that the information provided is at your own risk and you are responsible for confirming any information before relying on it. We disclaim any liability for inaccuracies or misstatements related to the general data provided here.
          </Text>
          <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
            <FontAwesome name="times" size={25} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default TandCModal;
