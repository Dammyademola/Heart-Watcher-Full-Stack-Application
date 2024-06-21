import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalContent: {
    backgroundColor: "#f9f9f9",
    width: width,
    height: "55%",
    maxHeight: height * 0.45,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    padding: 20,
    alignSelf: "center",
    alignSelf: "stretch",
  },

  modalTitle: {
    fontSize: 21,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },

  modalText2: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
    lineHeight: 24,
    color: "#555",
    marginBottom:25,
  },

  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 20,
  },

  cardContainer: {
    width: "100%",
    maxWidth: 400,
    height: width * 0.2,
    paddingLeft: "10%",
    paddingRight: "10%",
    paddingTop: "6%",
    paddingBottom: "6%",
    borderRadius: width * 0.06,
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5, 
    marginTop: 20,
  },

  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: "100%",
  },
  contentContainer2: {
    marginLeft: "auto",
  },

  title: {
    color: "#000",
    fontSize: width * 0.04,
    fontWeight: "600",
  },
  icon: {
    marginRight: 15,
  },
});

export default styles;
