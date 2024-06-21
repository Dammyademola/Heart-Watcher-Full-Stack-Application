import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const QuickTipModal = ({ modalVisible, selectedQuickTip, closeModal, quickTipContent }) => {
  return (
    <Modal visible={modalVisible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>{quickTipContent[selectedQuickTip - 1]}</Text>
          <TouchableOpacity onPress={closeModal}>
            <FontAwesome name="times" size={25} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default QuickTipModal;
