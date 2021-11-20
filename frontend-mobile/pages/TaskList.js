import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TextInput, Button, View, Pressable } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Constants from 'expo-constants';


const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   paddingTop: Constants.statusBarHeight,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection:'row',
    },
  });


const TaskList = ({ navigation }) => {
    const [activeIndex, setActiveIndex] = useState(0);  
    const [carouselItems, setCarouselItems] = useState([]);

    const fetchTaskList = async () => {
        const response = await fetch('https://us-central1-aster-38850.cloudfunctions.net/api/tasks');
        const json = await response.json();
        setCarouselItems(json);
    };

    useEffect(() => {
        fetchTaskList();
    }, []);

    const renderItem = ({item,index}) => {
        console.log("current card: ", activeIndex);
        return (
            <Pressable onPress={() => navigation.navigate('Task', {taskID: item.id})} > 
                <View style={{
                    backgroundColor:'floralwhite',
                    borderRadius: 5,
                    height: 250,
                    padding: 50,
                    marginLeft: 25,
                    marginRight: 25, }}>
                    
                    {/* <Image style = {{ width: 50, height: 50 }} source={{ uri: "https://images.unsplash.com/photo-1548041347-390744c58da6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1392&q=80" }}/> */}
                    <Text style={{fontSize: 30}}>{item.name}</Text>
                    <Text>{item.description}</Text>
                    <Text>Pay: {item.total_price / item.number_of_labelers} cUSD</Text>
                    <Text>Contract Address: {item.contract_id}</Text>
                </View> 
            </Pressable>
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
                vertical={true}
                renderItem={renderItem}
                onSnapToItem = { index => setActiveIndex(index) }
                // loop={true} 
            />
        </View>
    );
}


export default TaskList;