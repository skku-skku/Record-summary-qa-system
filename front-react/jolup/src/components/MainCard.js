function MainCard({title, date, context}){
  return (
    <div style={{backgroundColor:'white', marginBottom:'1rem', boxShadow:'5px 5px 5px #EBEBEB', paddingLeft:'1rem', paddingRight:'1rem'}}>
        <p style={{fontWeight:'bold', marginBottom:'-0.6rem', fontSize:'1.1rem', fontFamily:'NanumGothicBold'}}>{title}</p>
        <p style={{color:'#00ABB3', fontSize:'0.8rem', fontFamily:'NanumGothic'}}>{date}</p>
        <p style={{fontFamily:'NanumGothic', fontSize:'0.9rem'}}>{context}</p>
    </div>
  );
}

export default MainCard;