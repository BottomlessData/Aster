import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TextInput, Button, View, Pressable } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   paddingTop: Constants.statusBarHeight,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection:'column',
    },
    buttonContainer: {
      padding: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
  });


const Task = ({ route, navigation }) => {
    const { taskID } = route.params;

    return (
        <View style={styles.container}>
            <Image style = {{ width: 400, height: 400 }} source={{ uri: "https://images.unsplash.com/photo-1548041347-390744c58da6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1392&q=80" }}/>
            <View style={styles.buttonContainer}>
                <Pressable style={styles.button}>
                    <Text style={styles.text}>{"spam"}</Text>
                </Pressable>
                <Text>   </Text>
                <Pressable style={styles.button}>
                    <Text style={styles.text}>{"not spam"}</Text>
                </Pressable>
            </View>
            <Text>{ taskID }</Text>
        </View>
    );
}


export default Task;