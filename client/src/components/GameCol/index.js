import React from "react";
// import "./GameCol.css";

const style = {
    // paddingTop: "20px",
    height: "100%",
    display: "flex",
    flex: 1,
    flexWrap: "wrap",
    // flexDirection: "row",
    // padding: "20px",
    justifyContent: "space-around",
    alignContent: "flex-start",
    overflow: "auto"
}

function GameCol(props) {
    const size = props.size.split(" ").map(size => "col-" + size).join(" ");
  
    return (
      <div style={style} className={size}>
        {props.children}
      </div>
    );
  }

export default GameCol;