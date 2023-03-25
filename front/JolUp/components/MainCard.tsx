import * as React from 'react';
import { StyleSheet, Dimensions, Text, View } from 'react-native';
// import { DodumText } from '../components/StyledText';
import { Shadow } from 'react-native-shadow-2';
import styled from 'styled-components';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

export default function MainCard(props: { title: string; date: string, context: string }) {
  return (
    <CardContainer>
      <Shadow distance={2} startColor={'#00000010'} endColor={'#00000000'} offset={[0, 4]}>
        <View style={{borderRadius: 15, backgroundColor: '#fff', padding:18}}>
            <TitleText>{props.title}</TitleText>
                <TextDiv>
                    <DateText>{props.date}</DateText>
                </TextDiv>
            <StyledText>{props.context}</StyledText>
        </View>
      </Shadow>
    </CardContainer>
  );
}

const StyledText = styled(Text)`
  font-size: 15;
`
const TitleText = styled(Text)`
  font-size: 20;
  font-weight: bold;
`
const DateText = styled(Text)`
  font-size: 15;
  color: #00ABB3;
`
const TextDiv = styled.View`
  margin-top:5;
  margin-bottom:10;
`
const CardContainer = styled.View`
    backgroundColor: #F9F9F9;
    align-items: center;
    justify-content: center;
    padding-vertical: 10;
`