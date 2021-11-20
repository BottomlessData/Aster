import React from 'react'

import SignIn from './SignIn';
import TaskList from './pages/TaskList';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens'; 
import Task from './pages/Task';
enableScreens();

const Stack = createNativeStackNavigator();

const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});
 
const App = () => {
  return (
    <>  
       <NavigationContainer>
          <Stack.Navigator initialRouteName="SignIn" 
            screenOptions={{
              headerStyle: {
                backgroundColor: '#f4511e',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              cardStyleInterpolator: forFade
            }}>
              <Stack.Screen name="SignIn" component={SignIn} 
              options={{
                title: 'My home',
                headerStyle: {
                  backgroundColor: "#e1e4e8",
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}/>
              <Stack.Screen name="TaskList" component={TaskList} />
              <Stack.Screen name="Task" component={Task}/>
          </Stack.Navigator>
       </NavigationContainer>
    </>
  );
  
}

export default App;