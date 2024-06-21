import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import PersonalDetailsScreen from '../screens/PersonalDetailsScreen';
import PersonalDetailsScreen2 from '../screens/PersonalDetailsScreen2';
import PasswordManagementScreen from '../screens/PasswordManagementScreen'; 
import MedicalDetailsScreen from '../screens/MedicalDetailsScreen'; 
import PredictiveModelsScreen from '../screens/PredictiveModelsScreen';
import NotificationPanel from '../screens/NotificationPanelScreen';


const Stack = createStackNavigator();

const InsideAppNavigator = ({ route }) => {
    const { params } = route;
    const initialScreen = params ? params.screen : "Home"; 
  
    return (
        <Stack.Navigator initialRouteName={initialScreen} screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Personal" component={PersonalDetailsScreen}/>
          <Stack.Screen name="Personal2" component={PersonalDetailsScreen2}/>
          <Stack.Screen name="PasswordManagement" component={PasswordManagementScreen}/>
          <Stack.Screen name="Medical" component={MedicalDetailsScreen}/>
          <Stack.Screen name="PredictiveModels" component={PredictiveModelsScreen}/>
          <Stack.Screen name="NotificationPanel" component={NotificationPanel} />

        </Stack.Navigator>
    );
  };

export default InsideAppNavigator;
