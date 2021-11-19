import React, { useState, useEffect } from 'react'
import './global'
import { web3, kit } from './root'
import { Image, StyleSheet, Text, TextInput, Button, View, YellowBox, Pressable } from 'react-native'
import { Link } from "react-router-native";
import {   
  requestTxSig,
  waitForSignedTxs,
  requestAccountAddress,
  waitForAccountAuth,
  FeeCurrency
} from '@celo/dappkit'
import * as Linking from 'expo-linking'
import CeloDAppKit from './celo-dappkit'
import Constants from 'expo-constants';



YellowBox.ignoreWarnings(['Warning: The provided value \'moz', 'Warning: The provided value \'ms-stream'])

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#35d07f',
    paddingTop: Constants.statusBarHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginVertical: 8, 
    fontSize: 20, 
    fontWeight: 'bold'
  }
});

const SignIn = () => {

  // Set the defaults for the state
  const [address, setAddress] = useState('Not logged in');
  const [phoneNumber, setPhoneNumber] = useState('Not logged in');
  const [cUSDBalance, setcUSDBalance] = useState('Not logged in');
  const [isLoadingBalance, setIsLoadingBalance] = useState(true);


  const login = async () => {
    
    // A string you can pass to DAppKit, that you can use to listen to the response for that request
    const requestId = 'login'
    
    // A string that will be displayed to the user, indicating the DApp requesting access/signature
    const dappName = 'Hello Celo'
    
    // The deeplink that the Celo Wallet will use to redirect the user back to the DApp with the appropriate payload.
    const callback = Linking.makeUrl('/my/path')
  
    // Ask the Celo Alfajores Wallet for user info
    requestAccountAddress({
      requestId,
      dappName,
      callback,
    })
  
    // Wait for the Celo Wallet response
    const dappkitResponse = await waitForAccountAuth(requestId)

    // Set the default account to the account returned from the wallet
    kit.defaultAccount = dappkitResponse.address

    // Get the stabel token contract
    const stableToken = await kit.contracts.getStableToken()

    // Get the user account balance (cUSD)
    const cUSDBalanceBig = await stableToken.balanceOf(kit.defaultAccount)
    
    // Convert from a big number to a string by rounding it to the appropriate number of decimal places
    const ERC20_DECIMALS = 18
    let cUSDBalanceDec = cUSDBalanceBig.shiftedBy(-ERC20_DECIMALS).toFixed(2)
    let cUSDBalance = cUSDBalanceDec.toString()
    
    // Update state
    setcUSDBalance(cUSDBalance);
    setIsLoadingBalance(false);
    setAddress(dappkitResponse.address);
    setPhoneNumber(dappkitResponse.phoneNumber);
  }

  return (
    <View style={styles.container}>

      {/* <CeloDAppKit /> */}
      <Text style={styles.title}>Login first</Text>
      <Button title="login()" 
        onPress={()=> login()} />
      <Text style={styles.title}>Account Info:</Text>
      <Text>Current Account Address:</Text>
      <Text>{address}</Text>
      <Text>Phone number: {phoneNumber}</Text>
      <Text>cUSD Balance: {cUSDBalance}</Text>

      <Pressable>
        <Link to="/tasklist"> 
            <Text> enter </Text>
        </Link>
      </Pressable>
    </View>
  );
  
}

export default SignIn;