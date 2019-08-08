import React from "react";

function Jumbotron(props) {
  // console.log(props);
  return (
    <div
      style={{ backgroundColor:"white",borderRadius: "25px",margin:"100px 100px 0px 100px", height: props.jumboHeight, width: props.jumboWidth, clear: "both", paddingTop: 60, textAlign: "center" }}
      // className={`jumbotron ${props.addClass ? props.addClass : ""}`}
      className = "jumbotron"
    >
      {props.children}
    </div>
  );
}

export default Jumbotron;
