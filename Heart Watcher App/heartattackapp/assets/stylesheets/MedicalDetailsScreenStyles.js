import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: height * 0.05,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  arrow: {
    flex: 1,
  },
  title: {
    flex: 2,
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  pageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 60,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderRadius: 30,
  },

  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },

  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },

  gridbutton: {
    width: (width + 200) / 4,
    height: 100, 
    backgroundColor: "#fff", 
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 15,
    marginBottom: 10,
    marginHorizontal: 5, 
    marginVertical: 5, 
    shadowColor: "#000", 
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.09, 
    shadowRadius: 3.84, 
    elevation: 5, 
    justifyContent: 'center', 
},

  gridbuttonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "rgba(0, 88, 47, 1)", 
    textAlign: "center",
    lineHeight: 60, 
  },
  
  selectedOption: {
    borderColor: "green",
    borderWidth: 2,
  },
  checkmark: {
    position: "absolute",
    top: 5,
    right: 5,
  },

  button: {
    width: "100%",
    backgroundColor: "rgba(0,88,47,1)",
    paddingHorizontal: 130,
    paddingVertical: 20,
    borderRadius: 5,
    alignItems: "center",
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default styles;
