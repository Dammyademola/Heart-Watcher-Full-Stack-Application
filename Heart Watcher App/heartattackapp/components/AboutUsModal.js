// AboutUsModal.js
import React from "react";
import { Modal, View, Text, TouchableOpacity, Dimensions } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import styles from "../assets/stylesheets/components/AboutUsModalStyles";

const AboutUsModal = ({ isVisible, toggleModal }) => {
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
          <Text style={styles.modalTitle}>About Us</Text>
          <Text style={[styles.modalText, styles.modalText2]}>
            This application is a testament to Oluwadamilola Dammy Ademola's Final year project. It is an application for predicting the chances of a user having a potential heart attack in the moment. It has not yet been upgraded or developed for future predictions. Please do not take this application seriously and consult an actual medical professional about any worries you may have. Regular check-ups are the goal to having a healthy lifestyle and body.
          </Text>
          <Text style={[styles.modalText, styles.modalText2]}>
            -Dammy (Oluwadamilola) Ademola
          </Text>
          <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
            <FontAwesome name="times" size={25} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AboutUsModal;
