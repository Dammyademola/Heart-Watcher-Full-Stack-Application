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
  nameContainer: {
    flexDirection: "row",
  },
  firstNameInput: {
    flex: 1,
    paddingRight: 5,
  },
  lastNameInput: {
    flex: 1,
    paddingLeft: 15,
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
    paddingVertical: 8,
    justifyContent: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  button: {
    width: "100%",
    backgroundColor: "rgba(0,88,47,1)",
    paddingHorizontal: 130,
    paddingVertical: 20,
    borderRadius: 5,
    alignItems: "center",
    borderRadius: 30,
    marginBottom:20,
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
  datePickerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  dateOfBirthContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  datePickerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 20,
  },
  closeButton: {
    backgroundColor: "rgba(0,88,47,1)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderRadius: 20,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 20,
    marginBottom: 20,
    borderRadius: 30,
  },

  measurementinput: {
    flex: 1,
    height: 60,
    justifyContent: "center",
  },

  inputbutton: {
    padding: 5,
    marginLeft: 20,
  },
  unitText: {
    color: "rgba(0,88,47,1)",
  },

  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },

  genderOption: {
    flex:1,
    paddingHorizontal: 30, 
    paddingVertical: 20, 
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10, 
  },

  selectedGenderOption: {
    backgroundColor: '#fff',
    borderColor: 'rgba(0,88,47,1)',
  },

  genderOptionText: {
    fontSize: 17, 
    color: '#ccc', 
  },

  selectedGenderOptionText: {
    color: '#000',
  },

});


export default styles;