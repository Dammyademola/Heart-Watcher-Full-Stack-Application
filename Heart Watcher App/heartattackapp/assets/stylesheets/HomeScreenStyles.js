import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 70,
    paddingHorizontal: 20, 
  },

  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom:40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20, 
  },
  sectiontitle:{
    paddingRight: 20,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  bellContainer: {
    position: 'relative',
  },
  notificationCountContainer: {
    position: 'absolute',
    top: -7,
    right: -5,
    backgroundColor: 'rgba(0,88,47,1)',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  notificationCountText: {
    color: 'white',
    fontSize: 12,
  },


  predictiveModelContainer: {
    marginBottom: 20,
  },
  predictiveModelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  predictiveModelTitle: {
    paddingRight: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeAll: {
    color:"rgba(0,88,47,1)",
    fontWeight: 'bold',
  },
  predictiveModelGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  predictiveModelCard: {
    width: '48%', 
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,1)',
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginBottom: 10, 
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  predictiveModelImageContainer: {
    alignItems: 'center',
  },
  predictiveModelImage: {
    width: '100%',
    height: 105,
    borderRadius: 20,
    marginBottom: 10,
  },
  predictiveModelName: {
    padding:5,
    textAlign: 'left',
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  predictiveModelDetails: {
    padding:5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  predictiveModelDetailText: {
    fontSize: 12,
    fontWeight: '400',
  },
  predictiveModelPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  predictiveModelPrice: {
    padding:5,
    fontSize: 16,
    fontWeight: '600',
  },

  category: {
    height: 40, 
    paddingLeft: 20, 
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 30,
    backgroundColor: "rgba(0,88,47,1)",
    marginBottom: 10,
    marginRight: 10,
    alignSelf: 'flex-start',
  },
  group: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  text: {
    color: "white",
    fontSize: 14, 
    fontWeight: "600",
  },
  
});

export default styles;
