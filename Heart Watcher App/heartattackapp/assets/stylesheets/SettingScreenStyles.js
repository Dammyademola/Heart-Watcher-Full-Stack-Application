import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 70,
    paddingHorizontal: 20,
  },

  textContainer: {
    marginBottom: 40,
    position: "relative",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  
  
  profileSection: {
    marginBottom: 70,
  },

  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
  },

  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
  },

  profileTextContainer: {
    flex: 1,
  },

  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },

  subName: {
    color: "#808080",
    fontSize: 17,
    fontWeight: "thin",
  },

  section: {
    marginBottom: 35,
    
  },
  
  cardContainer: {
    width: "100%",
    maxWidth: 400,
    height: screenWidth * 0.2,
    paddingLeft: "5%",
    paddingRight: "3%",
    paddingTop: "7%",
    paddingBottom: "7%",
    borderRadius: screenWidth * 0.06,
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5, 
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
    fontSize: screenWidth * 0.04,
    fontWeight: "600",
  },
  icon: {
    marginRight:15,
  },
 
  
});

export default styles;
