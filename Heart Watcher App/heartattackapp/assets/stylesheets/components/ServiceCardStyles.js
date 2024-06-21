import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  serviceContainer: {
    width: screenWidth,
    marginBottom: 20,
  },

  serviceCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginRight: 20,
    marginBottom: 30,
    width: screenWidth * 0.65,
    height: 200,
    maxHeight: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5, 
  },

  serviceTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },

  serviceDescription: {
    fontSize: 16,
    color: "#333333",
  },
 
  contentContainer2: {
    marginLeft: "auto",
  },

  inactiveCard: {
    opacity: 0.5,
    backgroundColor: '#ddd',
  },

  checkIconContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    padding:10,
  },

  stepContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    padding:10,
  },
  
  
});

export default styles;
