// import * as React from 'react';
import React, { useState } from 'react';
import { StyleSheet, Dimensions, View, Text} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/RootStackParamList';
import Calendar from 'react-calendar';
import MainCard from '../../components/MainCard';
import styled from 'styled-components';
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;


export default function MainScreen() {
  const [value, onChange] = useState(new Date());
    return (
      <Container1>
            {/* <Calendar onChange={onChange} value={value} /> */}
        <View>
            <Text style={{fontFamily: 'NanumGothic-ExtraBold', fontSize:27}}>나눔고딕 짱두꺼움</Text>
            <TitleText>나눔고딕 두꺼움</TitleText>
            <Ionicons name="calendar-outline"></Ionicons>
            <Feather name="heart" size={30} color="#ff0000" />
            <Text style={{fontFamily: 'NanumGothic-Regular', fontSize:27}}>나눔고딕 일반</Text>
            <Text style={{fontSize:27}}>나눔고딕 아님</Text>
        </View>
        <Container2>
            <MainCard title={"클라이언트 1차 미팅-1"} date={"2023년 3월 25일 토요일"} context={"주요안건은 다음과 같습니다.  상품출고일까지 기한을 지켜서 준비를 완료시켜야 합니다. 상품에 마감 처리에 좀 더 신경을 써야하며, 색상도 알맞게 나왔는지 확인하는 것이 중요합니다. 가장 중요한 것은.."}/>
            <MainCard title={"클라이언트 1차 미팅-2"} date={"2023년 3월 25일 토요일"} context={"주요안건은 다음과 같습니다.  상품출고일까지 기한을 지켜서 준비를 완료시켜야 합니다. 상품에 마감 처리에 좀 더 신경을 써야하며, 색상도 알맞게 나왔는지 확인하는 것이 중요합니다. 가장 중요한 것은.."}/>
        </Container2>
      </Container1>
    );
  }

  const TitleText = styled(Text)`
  font-size: 27;
  font-family: 'NanumGothic-Bold';
`

const Container1 = styled.View`
    flex: 1;
    flex-direction: column;
    backgroundColor: #fff;
    align-items: space-between;
    justify-content: center;
`
const Container2 = styled.View`
    backgroundColor: #F9F9F9;
    align-items: center;
    justify-content: center;
    padding-horizontal: 15;
    padding-vertical: 15;
`
const Container3 = styled.View`
    backgroundColor: #fff;
    align-items: center;
    justify-content: center;
    padding-horizontal: 15;
`