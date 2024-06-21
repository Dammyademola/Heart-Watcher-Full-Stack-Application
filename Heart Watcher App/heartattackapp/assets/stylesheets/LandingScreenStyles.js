import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff",
      paddingHorizontal: 20, 
    },
    imageContainer: {
      marginTop: 200, 
      marginBottom: 100, 
    },
    image: {
      height: 200,
      resizeMode: "contain", 
    },
    title: {
      fontSize: 32,
      fontWeight: "bold",
      color: "#000",
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 18,
      color: "#808080",
      textAlign: "center",
      marginBottom: 20,
    },
    button: {
      backgroundColor: "rgba(0,88,47,1)",
      paddingHorizontal: 130,
      paddingVertical: 20,
      borderRadius: 30,
    },
    buttonText: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#fff",
    },
  });

export default styles;