import React from 'react';
import { RecoilRoot } from 'recoil';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './src/types/RootStackParamList';
import Onboarding from './src/screens/Onboarding';
import MainScreen from './src/screens/Main';
import DetailScreen from './src/screens/Detail';
import UploadScreen from './src/screens/UploadScreen';

const RootStack = createStackNavigator<RootStackParamList>();

const App = () => {
    return (
      <RecoilRoot>
        <NavigationContainer>
            <RootStack.Navigator screenOptions={{ headerShown: false }}>
                <RootStack.Screen name="Onboarding" component={Onboarding} />
                <RootStack.Screen name="Main" component={MainScreen}/>
                <RootStack.Screen name="Detail" component={DetailScreen}/>
                <RootStack.Screen name="Upload" component={UploadScreen}/>
            </RootStack.Navigator>
        </NavigationContainer>
      </RecoilRoot>
    );
};

export default App;