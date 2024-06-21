import { Alert } from 'react-native';

const alertService = {
  showAlert: (title, message, buttons = [{ text: 'OK' }]) => {
    return new Promise((resolve) => {
      Alert.alert(
        title,
        message,
        buttons,
        { cancelable: false },
        (buttonIndex) => resolve(buttonIndex)
      );
    });
  },
};

export default alertService;
