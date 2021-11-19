import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TextInput, Button, View, Pressable } from 'react-native';
import { Link } from "react-router-native";
import Carousel from 'react-native-snap-carousel';
import Constants from 'expo-constants';


const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: Constants.statusBarHeight,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection:'row',
    },
  });


const TaskList = () => {
    const [activeIndex, setActiveIndex] = useState(0);  
    const [carouselItems, setCarouselItems] = useState(
         [
          {
              title:"Item 1",
              text: "Text 1",
          },
          {
              title:"Item 2",
              text: "Text 2",
          },
          {
              title:"Item 3",
              text: "Text 3",
          },
          {
              title:"Item 4",
              text: "Text 4",
          },
          {
              title:"Item 5",
              text: "Text 5",
          },
        ]);

    const renderItem = ({item,index}) => {
        console.log("current card: ", activeIndex);
        return (
            <View style={{
                backgroundColor:'floralwhite',
                borderRadius: 5,
                height: 250,
                padding: 50,
                marginLeft: 25,
                marginRight: 25, }}>
                <Pressable> 
                    <Image
                        source={{ uri: "https://images.unsplash.com/photo-1548041347-390744c58da6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1392&q=80" }}
                    />
                    <Text style={{fontSize: 30}}>{item.title}</Text>
                    <Text>{item.text}</Text>
                </Pressable>
            </View>

        )
    }

    return (
        <View style={styles.container}>
            <Carousel
                layout={"default"}
                ref={ref => carousel = ref}
                data={carouselItems}
                sliderWidth={400}
                itemWidth={300}
                renderItem={renderItem}
                onSnapToItem = { index => setActiveIndex(index) }
                loop={true} 
            />
            <Pressable>
                <Link to="/"> 
                    <Text> enter </Text>
                </Link>
            </Pressable>
        </View>
    );
}


export default TaskList;