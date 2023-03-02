import React from "react";
import "./App.css";
import marioExplode from "./img/mario.png"; // import marioExplode icon
import marioFlag from "./img/mario2.png"; // import marioFlag icon

const Cell = (props) => {
  // Calls the ShowClickedCell-function from the Board-Components
  const showClickedCell = () => {
    props.onClick(props.cell.index);
  };

  return (
    <div>
      <button onClick={showClickedCell}>
        {props.cell.visible ? (
          props.cell.hasMine ? ( // Shows a bomb icon if the cell has a mine!
            <img src={marioExplode} alt="bomb" />
          ) : (
            props.cell.numberOfNeighbouringMines || (
              <img src={marioFlag} alt="empty" />
            )
          )
        ) : (
          <span style={{ color: "green" }}>?</span>
        )}
      </button>
    </div>
  );
};

export default Cell;
