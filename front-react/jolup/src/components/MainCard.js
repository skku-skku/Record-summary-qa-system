import styled from 'styled-components';

function MainCard({title, date, context}){
  return (
    <p>Main Card Hello!</p>
    // <CardContainer>
    //   {/* <Shadow distance={2} startColor={'#00000010'} endColor={'#00000000'} offset={[0, 4]}> */}
    //     <div style={{borderRadius: 15, backgroundColor: '#fff', padding:18}}>
    //         <TitleText>{title}</TitleText>
    //             <TextDiv>
    //                 <DateText>{date}</DateText>
    //             </TextDiv>
    //         <StyledText>{context}</StyledText>
    //     </div>
    //   {/* </Shadow> */}
    // </CardContainer>
  );
}

export default MainCard;

// const StyledText = styled(Text)`
//   font-size: 15;
//   font-family: 'NanumGothic-Regular';
// `
// const TitleText = styled(Text)`
//   font-size: 20;
//   font-family: 'NanumGothic-Bold';
// `
// const DateText = styled(Text)`
//   font-size: 15;
//   color: #00ABB3;
//   font-family: 'NanumGothic-Regular';
// `
// const TextDiv = styled.View`
//   margin-top:5;
//   margin-bottom:10;
// `
// const CardContainer = styled.View`
//     backgroundColor: #F9F9F9;
//     align-items: center;
//     justify-content: center;
//     padding-vertical: 10;
// `