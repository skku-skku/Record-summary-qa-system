import React from "react";

function Button({name, onClick}){
    return (
      <div style={{backgroundColor:'#00ABB3', boxShadow:'3px 3px 3px #C3C3C3', borderRadius:'20px 20px 20px 20px', margin:"1rem", width:"8rem", height:"2.5rem", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", cursor: "pointer"}}  onClick={onClick}>
          <p style={{fontSize:'1rem', fontFamily:'NanumGothicBold', color:"white"}}>{name}</p>
      </div>
    );
  }
  
  export default Button;