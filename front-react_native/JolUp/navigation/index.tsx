import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    NavigationContainer,
    DefaultTheme,
    DarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    RootStackParamList,
    RootTabParamList,
    RootTabScreenProps,
    RootStackScreenProps,
    MainParamList,
} from '../types';
import LinkingConfiguration from './LinkingConfiguration';

import Onboarding from "../src/screens/Onboarding";
import MainScreen from "../src/screens/Main";
import DetailScreen from "../src/screens/Detail";
import UploadScreen from "../src/screens/Upload";

import { useColorScheme } from 'react-native/types';
import { UploadIcon } from '../assets/icons/index.js';

export default function Navigation(){
    return(
        <NavigationContainer
            linking={LinkingConfiguration}
            >
                <RootNavigator/>
            </NavigationContainer>
    )
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="Root"
                component={BottomTabNavigator}
            />
            <Stack.Screen
                name="Onboarding"
                component={Onboarding}
            />
            <Stack.Screen
                name="Detail"
                component={DetailScreen}
            />
        </Stack.Navigator>
    );
}

const AppStack = createNativeStackNavigator<MainParamList>();

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator(){
    return(
        <BottomTab.Navigator
            initialRouteName="Main"
        >
            <BottomTab.Screen
                name="Main"
                component={MainScreen}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    // tabBarIcon: ({ focused }) => {
                    //     return focused ? (
                    //         <MoreSelected width={30} height={30} />
                    //     ) : (
                    //         <More width={30} height={30} />
                    //     );
                    // },
                }}
            />
            <BottomTab.Screen
                name="Upload"
                component={UploadScreen}
                options={{
                    tabBarShowLabel: false,
                    headerShown: false,
                }}
            />
        </BottomTab.Navigator>
    );
}

// function TabBarIcon(props: {
//     name: React.ComponentProps<typeof FontAwesome>['name'];
//     color: string;
// }) {
//     return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
// }