import React, { useEffect } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/RootStackParamList';
import {WithLocalSvg} from 'react-native-svg';
import styled from 'styled-components';
import { MainIcon } from '../../assets/icons';

type OnboardingScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Onboarding'
>;

type Props = {
    navigation: OnboardingScreenNavigationProp;
};

const OnboardingScreen = (props: Props) => {
    const { navigation } = props;

    useEffect(() => {
        setTimeout(() => navigation.navigate('Main'), 2000);
    }, [navigation]);

    return (
        <CenterSafeAreaView>
            <WithLocalSvg
                width={80}
                height={80}
                fill={"#000000"}
                asset={MainIcon}
            />
            <StyledText style={{position: 'absolute', bottom: 40}}>
                JolUp
            </StyledText>
        </CenterSafeAreaView>
    );
};

const CenterSafeAreaView = styled(SafeAreaView)`
    flex: 1;
    justify-content: center;
    align-items: center;
`;
const StyledText = styled(Text)`
    font-size: 15;
    color: #00ABB3;
`
export default OnboardingScreen;