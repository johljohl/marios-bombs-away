import React, { Component } from "react";
import "./App.css";
import Cell from "./Cell";
import createBoard from "./utils";
import kaBoom from "./sounds/Boom-sound.mp3";
import gameOver from "./sounds/Go.wav";
import gameWon from "./sounds/Gw.wav";
import gameWon2 from "./sounds/won.wav";

class Board extends Component {
  constructor(props) {
    super(props);

    // Skapa en ny state-variabel med ett board-objekt
    // createBoard() skapar en array med 25 objekt och sätter 9 minor på slumpmässiga platser
    this.state = { board: createBoard(25, 8) };
  }

  handleCellClick = (index) => {
    const cell = this.state.board[index];

    // Om cellen redan är synlig  avbryt
    if (cell.visible) {
      return;
    }
    if (this.state.gameOver) {
      return;
    }
    // Skapa en ny version av board-arrayen
    const updatedBoard = [...this.state.board];

    // Uppdatera den klickade cellen
    updatedBoard[index].visible = true;

    // Om den klickade cellen innehåller en mina, visa alla minor och avslutar spelet
    if (cell.hasMine) {
      updatedBoard.forEach((cell) => {
        if (cell.hasMine) {
          cell.visible = true;
        }
      });
      const sound = new Audio(kaBoom);
      sound.play();

      // Uppdatera state för att visa att spelet är över
      this.setState({ board: updatedBoard, gameOver: true });
    } else {
      // Kontrollera om alla icke-minceller har blivit synliga, i så fall har spelaren vunnit
      const nonMineCells = updatedBoard.filter((cell) => !cell.hasMine);
      const nonMineVisibleCells = nonMineCells.filter((cell) => cell.visible);
      const sound = new Audio(gameWon);
      sound.play();
      if (nonMineVisibleCells.length === nonMineCells.length) {
        this.setState({ board: updatedBoard, gameOver: true });
      } else {
        // Uppdatera state med den uppdaterade board-arrayen
        this.setState({ board: updatedBoard });
      }
    }
  };

  render() {
    let gameOverMessage, gameWonMessage;

    if (this.state.gameOver) {
      gameOverMessage = "Game Over";
      const gameOverSound = new Audio(gameOver);
      setTimeout(() => {
        gameOverSound.play();
      }, 1600);
    } else if (this.state.gameWon) {
      gameWonMessage = "Game Won";
      const gameWonSound = new Audio(gameWon2);
      gameWonSound.play();
    }

    return (
      <div className="board-container">
        <div className="message">{gameWonMessage}</div>
        <div className="board">
          {this.state.board.map((cell) => (
            <Cell key={cell.index} cell={cell} onClick={this.handleCellClick} />
          ))}
        </div>
        <div className="message">{gameOverMessage}</div>
      </div>
    );
  }
}

export default Board;
