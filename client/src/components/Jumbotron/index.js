import React from "react";

function Jumbotron(props) {
  return (
    <div
      style={{ 
        backgroundColor:"red",
        borderRadius: "25px",
        marginTop:"100px", 
        height: props.jumboHeight, 
        width: props.jumboWidth, 
        clear: "both", 
        paddingTop: 60, 
        textAlign: "center" 
      }}
      className = "jumbotron"
    >
      {props.children}
    </div>
  );
}

export default Jumbotron;
// 62cbc2