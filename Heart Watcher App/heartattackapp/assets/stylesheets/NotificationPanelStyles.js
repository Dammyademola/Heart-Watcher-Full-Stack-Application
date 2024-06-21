import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  arrow: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    flex:2,
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  notificationContainer: {
    marginBottom: 20,
  },
  notificationHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "rgba(0,88,47,1)",
  },
  notificationItem: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  notificationText: {
    fontSize: 16,
    color: "#333",
  },
  button: {
    width: "100%",
    backgroundColor: "rgba(0,88,47,1)",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom:20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default styles;
