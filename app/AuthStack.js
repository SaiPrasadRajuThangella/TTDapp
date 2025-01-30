import { createContext, useEffect, useState } from "react";
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import FeedbackScreen from './screens/FeedbackScreen';
import PrasadamScreen from './screens/PrasadamScreen';
import OnlineTicketingScreen from './screens/OnlineTicketingScreen';
import RoomsScreen from './screens/RoomsScreen';
import QueLineScreen from './screens/QueLineScreen';
import VideoFeedbackScreen from './screens/VideoFeedback'
import FormFeedbackScreen from './screens/FormFeedbackScreen';
import VideoFeedbackScreen1 from './screens/VideoFeedback';
import VideoSubmitScreen from './screens/VideoSubmitScreen';

const Stack = createStackNavigator();
export const UserContext = createContext();
export default function AuthStack() {
  const [user,setUser] = useState(null);
  const [token,setToken] = useState(null)
  
  return (

    <UserContext.Provider value={{user,setUser,token,setToken}}>
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false, // Hide hreader for all screens by default
      }}
    >
      {/* Login Screen */}
      <Stack.Screen name="Login" component={LoginScreen} />
      
      {/* Home Screen */}
      <Stack.Screen name="Home" component={HomeScreen} />
      
      {/* Feedback Screen */}
      <Stack.Screen name="Feedback" component={FeedbackScreen} />
      
      {/* Category Screens */}
      <Stack.Screen name="Prasadam" component={PrasadamScreen} />
      <Stack.Screen name="OnlineTicketing" component={OnlineTicketingScreen} />
      <Stack.Screen name="Rooms" component={RoomsScreen} />
      <Stack.Screen name="QueLine" component={QueLineScreen} />
      <Stack.Screen name="FormFeedback" component={FormFeedbackScreen} />
      <Stack.Screen name="VideoSubmitScreen" component={VideoSubmitScreen} />
      <Stack.Screen name="VideoFeedback" component={VideoFeedbackScreen1} />
      {/* <Stack.Screen name="VideoFeedback" component={VideoFeedbackScreen1} />
      <Stack.Screen name="VideoFeedbackScreen" component={VideoFeedbackScreen} /> */}
    </Stack.Navigator>
    </UserContext.Provider>
  );
}
