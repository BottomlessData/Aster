import React, { useState, useEffect } from 'react'
import { Image, StyleSheet, Text, TextInput, Button, View, YellowBox } from 'react-native'
import { NativeRouter } from 'react-router-native';
import Main from './pages/Main';

const App = () => {
  return (
    <>  
      <NativeRouter>
        <Main />
      </NativeRouter>
  </>
  );
  
}

export default App;