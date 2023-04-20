import React from "react";

function Box({content}){
    return (
      <div style={{backgroundColor:'white', boxShadow:'3px 3px 3px #C3C3C3', borderRadius:'15px 15px 15px 15px', margin:"1rem", width:"95%", height:"100%", display:"flex", flexDirection:"row", padding:"1rem"}}>
          <p style={{fontFamily:'NanumGothicBold', color:'#00ABB3', marginRight:"2rem"}}>A</p>
          <p style={{fontSize:'1rem', fontFamily:'NanumGothic'}}>{content}</p>
      </div>
    );
  }
  
  export default Box;