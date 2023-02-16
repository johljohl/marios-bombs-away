import React from "react";
import "./App.css";

function Cell(props) {
  // Kör onClick-funktionen som skickades från Board-komponenten med indexet för denna cell
  const handleClick = () => {
    props.onClick(props.cell.index);
  };

  return (
    <div>
      <button onClick={handleClick}>
        {/* Visa en bomb-ikon om cellen innehåller en mina */}
        {props.cell.visible ? (
          props.cell.hasMine ? (
            <img
              src="http://www.rw-designer.com/icon-image/1728-48x48x8.png"
              alt="bomb"
            />
          ) : (
            // Visa antalet grannminor om cellen inte innehåller en mina och är synlig
            props.cell.numberOfNeighbouringMines || ""
          )
        ) : (
          // Dölj innehållet i cellen om den inte är synlig
          ""
        )}
      </button>
    </div>
  );
}

export default Cell;
