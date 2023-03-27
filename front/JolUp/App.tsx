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
import UploadScreen from './src/screens/Upload';
import { CalendarIcon } from './assets/icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import { faCheckSquare, faSpinner} from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


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
                            ? 'calendar'
                            : 'calendar-outline';
                        } else if (route.name === '업로드') {
                        iconName = focused ? 'cloud-upload' : 'cloud-upload-outline';
                        }

                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={color} />;
                        // return <FontAwesomeIcon icon={faCalendar} style={{color: "#1f4151",}} />
                    },
                    tabBarActiveTintColor: '#00ABB3',
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