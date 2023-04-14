import React from "react";

function Box({content}){
    return (
      <div style={{backgroundColor:'white', boxShadow:'3px 3px 3px #C3C3C3', borderRadius:'15px 15px 15px 15px', margin:"1rem", width:"75%", height:"7%", display:"flex", flexDirection:"column", justifyContent:"center", padding:"1.5rem"}}>
          <p style={{fontSize:'1rem', fontFamily:'NanumGothic'}}>{content}</p>
      </div>
    );
  }
  
  export default Box;