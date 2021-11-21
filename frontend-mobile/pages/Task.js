import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TextInput, Button, View, Pressable } from 'react-native';
import Carousel from 'react-native-snap-carousel';

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
    const [activeIndex, setActiveIndex] = useState(0);  
    const [carouselItems, setCarouselItems] = useState([]);
    const [datasetSize, setDatasetSize] = useState(0);
    const { taskID, address } = route.params;
    const [labels, setLabels] = useState([{}]); // array of {filename -> label}, also use this to track progress? 

    const fetchTaskDataset = async () => {
        const response = await fetch(`https://us-central1-aster-38850.cloudfunctions.net/api/task/data/${taskID}/${address}`);
        const json = await response.json();
        setCarouselItems(json);
        setDatasetSize(json.length);
    }

    useEffect(() => {
        fetchTaskDataset();
    }, []);

    const renderItem = ({item,index}) => {
        console.log("current card: ", activeIndex);
        return (
            <View style={styles.container}>
                <Text>Progress: {activeIndex+1}/{datasetSize}</Text>
                <Image style = {{ width: 400, height: 400 }} source={{ uri: carouselItems[index] }}/>
                <View style={styles.buttonContainer}>
                    <Pressable style={styles.button}>
                        <Text style={styles.text}>{"spam"}</Text>
                    </Pressable>
                    <Text>   </Text>
                    <Pressable style={styles.button}>
                        <Text style={styles.text}>{"not spam"}</Text>
                    </Pressable>
                </View>
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
        </View>
    );
}


export default Task;