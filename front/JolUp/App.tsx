import React from 'react';
import { RecoilRoot } from 'recoil';
import {View, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './src/types/RootStackParamList';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Onboarding from './src/screens/Onboarding';
import MainScreen from './src/screens/Main';
import DetailScreen from './src/screens/Detail';
import UploadScreen from './src/screens/UploadScreen';
import { CalendarIcon } from './assets/icons';
import Ionicons from 'react-native-vector-icons/Ionicons';


const RootStack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const App = () => {
    return (
      <RecoilRoot>
        {/* <NavigationContainer>
            <RootStack.Navigator screenOptions={{ headerShown: false }}>
                <RootStack.Screen name="Onboarding" component={Onboarding} />
                <RootStack.Screen name="Detail" component={DetailScreen}/>
            </RootStack.Navigator>
        </NavigationContainer> */}
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === '일정') {
                        iconName = focused
                            ? 'ios-information-circle'
                            : 'ios-information-circle-outline';
                        } else if (route.name === 'Settings') {
                        iconName = focused ? 'ios-list' : 'ios-list-outline';
                        }

                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                    })}
                >
                    <Tab.Screen name="일정" component={MainScreen} />
                    <Tab.Screen name="업로드" component={UploadScreen} />
                </Tab.Navigator>
            </NavigationContainer>
      </RecoilRoot>
    );
};

export default App;