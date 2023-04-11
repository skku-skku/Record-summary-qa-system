import * as React from 'react';
import { StyleSheet, Dimensions, View, Text} from 'react-native';
import { CalendarIcon, UploadIcon, MainIcon } from '../../assets/icons';
import styled from 'styled-components';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

export default function UploadScreen() {
    return (
      <View style={styles.container}>
        <DateText>2023년 3월 27일 토요일</DateText>
        <Container>
            <Text>음성 파일 불러오기</Text>
        </Container>
      </View>
    );
  }
  
const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
  
const DateText = styled(Text)`
  font-size: 15;
  color: #00ABB3;
  font-family: 'NanumGothic-Regular';
`

const Container = styled.View`
    align-items: center;
    justify-content: center;
    height: 90%;
`