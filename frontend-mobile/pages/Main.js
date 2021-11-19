import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';
import SignIn from '../SignIn';
import TaskList from './TaskList';

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#e1e4e8",
        flexGrow: 1,
        flexShrink: 1,
    },
});

const Main = () => {
    return(
        <View style={styles.container}>
            <Switch> 
                <Route path="/" exact>
                   <SignIn />
                </Route>
                <Route path="/tasklist" exact>
                    <TaskList />
                </Route>
                <Redirect to="/" />
            </Switch>
        </View>
    )
}

export default Main;