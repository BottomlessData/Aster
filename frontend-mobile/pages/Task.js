import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TextInput, Button, View, Pressable, ScrollView } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
    container: {
      paddingTop: Constants.statusBarHeight,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection:'column',
      backgroundColor: "#E8DED8",
      flex: 1,
      paddingTop: 60
    },
    submitContainer:{
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection:'column',
      margin: 40,
      backgroundColor: "#E8DED8",
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
        margin: 5,
        // padding: 30,
    },
    submitButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#FFCF00',
        margin: 5,
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    space: {
        width: 150, 
        height: 60,
    },
  });


const Task = ({ route, navigation }) => {
    const [activeIndex, setActiveIndex] = useState(0);  
    const [carouselItems, setCarouselItems] = useState([]);
    const { taskID, user_address, contract_address, labels, datasize } = route.params;
    const [message, setMessage] = useState("");
    const [userLabels, setUserLabels] = useState({
        "reviewer": user_address,
        data: { }
    });

    const fetchTaskDataset = async () => {
        const dataset_response = await fetch(`https://us-central1-aster-38850.cloudfunctions.net/api/task/data/${taskID}/${user_address}`);
        const dataset_json = await dataset_response.json();
        setCarouselItems(dataset_json);
    }

    useEffect(() => {
        fetchTaskDataset();
    }, []);

    const submitLabels = async () => {
        const response = await fetch(`https://us-central1-aster-38850.cloudfunctions.net/api/task/${taskID}/submit`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userLabels),
        });
        const json = await response.json();
        console.log(json);
        if(json == "Data submitted")
            setMessage("task completed! CELO reward on its way to your wallet!");
        else
            setMessage("submission failed!");
    };

   
    const labelButtonPressed = (answer, index) => {
        console.log(index + " " + answer);
        setUserLabels({
           ...userLabels,
           data: {
               ...userLabels.data,
               [index]: answer
           }
        });
    };

    const renderItem = ({item,index}) => {
        // console.log("current card: ", activeIndex);
        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 16,
                        fontWeight: 'bold',
                        color: 'black',
                        textAlign: 'center'
                        }}>Progress: {activeIndex+1}/{datasize}</Text>
                <Text style={{paddingBottom: 10}}>selected: {userLabels.data[activeIndex]}</Text>
                <Image style = {{ width: 300, height: 300 }} source={{ uri: carouselItems[index] }}/>
                <ScrollView style={styles.buttonContainer}>
                    {
                        labels.map((item, index) => (
                            <View key={index} style={styles.space}>
                                <Pressable style={styles.button} onPress={() => labelButtonPressed(item, activeIndex)}>
                                    <Text style={styles.text}>{item}</Text>
                                </Pressable>
                            </View>
                        ))
                    }
                </ScrollView>
            </View>
        )
    }

    return (
       
        <View style={styles.container}>
           
            <Carousel
                layout={"default"}
                data={carouselItems}
                sliderWidth={400}
                itemWidth={300}
                sliderHeight={1000}
                itemHeight={300}
                renderItem={renderItem}
                onSnapToItem = { index => setActiveIndex(index) }
                // loop={true} 
            />
             {
                (activeIndex+1) == datasize ?
                <View style={styles.submitContainer}>
                    <Pressable style={styles.submitButton} onPress={submitLabels}>
                        <Text style={styles.text}>submit</Text>
                    </Pressable>
                    <Text style={{ fontSize: 16,
                        lineHeight: 21,
                        fontWeight: 'bold',
                        letterSpacing: 0.25,
                        color: 'black',
                        textAlign: 'center'
                        }}>
                    {message}</Text>
                </View>
                :
                <></>
            }
          
        </View>
    );
}


export default Task;