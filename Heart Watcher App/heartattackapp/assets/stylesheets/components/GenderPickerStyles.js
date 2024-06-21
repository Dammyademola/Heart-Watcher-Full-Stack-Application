import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      backgroundColor: "#fff",
      borderRadius: 10,
      padding: 20,
      width: "80%",
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 20,
      textAlign: "center",
    },
    genderOption: {
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
    },
    selectedGenderOption: {
      backgroundColor: "#f0f0f0",
    },
    genderText: {
      fontSize: 18,
      textAlign: "center",
    },
    closeButton: {
      position: "absolute",
      top: 10,
      right: 10,
    },
  });
  
export default styles;