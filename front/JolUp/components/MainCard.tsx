import * as React from 'react';
import { StyleSheet, Dimensions, Text, View } from 'react-native';
// import { DodumText } from '../components/StyledText';
import { Shadow } from 'react-native-shadow-2';
import styled from 'styled-components';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

export default function MainCard(props: { title: string; date: string, context: string }) {
  return (
    <Shadow
      distance={5}
      startColor={'#00000010'}
      containerViewStyle={{ margin: 10 }}
    >
      <Container>
        <TitleText>{props.title}</TitleText>
        <DateText>{props.date}</DateText>
        <StyledText>{props.context}</StyledText>
      </Container>
    </Shadow>
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
const Container = styled.View`
    backgroundColor: #fff;
    justify-content: center;
    padding-vertical: 10;
    padding-horizontal: 13;
    border-radius: 20;
`