import React, { useEffect } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/RootStackParamList';
import { MainIcon } from '../../assets/icons';
import styled from 'styled-components';

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
        setTimeout(() => navigation.navigate('Main'), 3000);
    }, [navigation]);

    return (
        <CenterSafeAreaView>
            <StyledText>Onboarding Screen</StyledText>
        </CenterSafeAreaView>
    );
};

const CenterSafeAreaView = styled(SafeAreaView)`
    flex: 1;
    justify-content: center;
    align-items: center;
`;
const StyledText = styled(Text)`
		font-size: 20%;
`
export default OnboardingScreen;