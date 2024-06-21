import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
      backgroundColor: "#fff",
      paddingHorizontal: 20,
      paddingTop: 70,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
    },
    arrow: {
      alignSelf: "flex-start",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#000",
      marginBottom: 20,
    },
    input: {
      width: "100%",
      height: 60,
      borderColor: "#ccc",
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 20,
      marginBottom: 20,
      borderRadius: 30,
    },
    button: {
      width: "100%",
      backgroundColor: "rgba(0,88,47,1)",
      paddingHorizontal: 130,
      paddingVertical: 20,
      borderRadius: 5,
      alignItems: "center",
      marginTop: 45,
      marginBottom: 30,
      borderRadius: 30,
    },
    buttonText: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#fff",
    },
    registerContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    registerText: {
      fontSize: 14,
      color: "#808080",
    },
    registerLink: {
      fontSize: 14,
      color: "#007bff",
      marginLeft: 5,
    },
  });
  
export default styles;