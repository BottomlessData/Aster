import React from 'react'

import SignIn from './SignIn';
import TaskList from './pages/TaskList';

import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens'; 
import Task from './pages/Task';
enableScreens();

const Stack = createNativeStackNavigator();
 
const App = () => {
  return (
    <>  
       <NavigationContainer>
          <Stack.Navigator initialRouteName="SignIn" 
            screenOptions={{
              headerStyle: {
                backgroundColor: '#FFCF00',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}>
              <Stack.Screen name="SignIn" component={SignIn} 
              options={{
                title: 'Welcome',
              }}/>
              <Stack.Screen name="TaskList" component={TaskList} />
              <Stack.Screen name="Task" component={Task}/>
          </Stack.Navigator>
       </NavigationContainer>
    </>
  );
  
}

export default App;