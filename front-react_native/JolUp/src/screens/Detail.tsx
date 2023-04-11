import * as React from 'react';
import { StyleSheet, Dimensions, View, Text} from 'react-native';
import { CalendarIcon, UploadIcon, MainIcon } from '../../assets/icons/index.js';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

export default function DetailScreen() {
    return (
      <View style={styles.container}>
        <UploadIcon
            width={Width * 0.2}
            />
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
  

// const Container = styled.View`
//     flex: 1;
//     backgroundColor: #fff;
//     align-items: center;
//     justify-content: center;
//     height: 100%;
// `