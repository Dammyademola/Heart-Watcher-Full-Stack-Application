import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingTop: 100,
      },
      headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 40,
      },
      arrow: {
        flex: 1
      },
      title: {
        flex: 2,
        fontSize: 24,
        fontWeight: "bold",
        color: "#000",
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
});


export default styles;