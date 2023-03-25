import React from 'react';
import { RecoilRoot } from 'recoil';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './src/types/RootStackParamList';
import Onboarding from './src/screens/Onboarding';
import MainScreen from './src/screens/Main';
import DetailScreen from './src/screens/Detail';
import UploadScreen from './src/screens/UploadScreen';
// import { loadAsync } from 'expo-font';
import styled from 'styled-components';

const RootStack = createStackNavigator<RootStackParamList>();

const App = () => {
    // const [isFontReady, setReady] = useState(false);
	// 	useEffect(() => {
    //     async function fetchFont(){
    //         await loadAsync({
    //             "NanumGothicLight" : require('./assets/fonts/NanumGothicLight.ttf'),
    //             "NanumGothic" : require('./assets/fonts/NanumGothic.ttf'),
    //             "NanumGothicBold" : require('./assets/fonts/NanumGothicBold.ttf'),
    //             "NanumGothicExtraBold" : require('./assets/fonts/NanumGothicExtraBold.ttf'),
    //         });
    //         setReady(true);     
    //     }
    //     fetchFont();
	//    }, []);
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

// const TitleText = styled(Text)`
// 	  font-family: NanumGothic;
// `

export default App;