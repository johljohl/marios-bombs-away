import React from "react";
import "./App.css";
import Cell from "./Cell";
import createBoard from "./utils"; // imported function from utils.js
import kaBoom from "./sounds/Boom-sound.mp3"; // gameSound
import yeahSound from "./sounds/Gw.wav"; // gameSound
import gameWon from "./sounds/won.mp3"; // gameSound
import gameOver from "./sounds/you-lose.mp3"; // gameSound

class Board extends React.Component {
  constructor(props) {
    super(props);

    // createBoard function creates an array with 25 cellsButtons and sets 7 mines at random positions
    this.state = { board: createBoard(25, 7) };
  }

  // Below showClickedCell function handles when a cell gets clicked

  showClickedCell = (index) => {
    const newBoard = [...this.state.board]; // Create a new version of the board array with  the spreadoperator

    const cell = this.state.board[index]; // Get the cell a cellindex from the board array

    if (this.state.gameOver || this.state.gameWon || cell.visible) {
      // If the game is over, if the game is won or the cell is visible dont do anything!
      return;
    }

    // Update the clicked cell
    newBoard[index].visible = true;

    // If the clicked cell contains a mine, it will show it and end the game and plays the sound of an explosion!
    if (cell.hasMine) {
      newBoard[index].visible = true;
      const sound = new Audio(kaBoom);
      sound.play();

      // Update the state to show that the game is over!
      this.setState({ board: newBoard, gameOver: true });
    } else {
      // Check if all non-mine cells have been made visible, in which case the player has won
      const nonMineCells = newBoard.filter((cell) => !cell.hasMine);
      const nonMineVisibleCells = nonMineCells.filter((cell) => cell.visible);
      const sound = new Audio(yeahSound);
      sound.play();

      if (nonMineVisibleCells.length === nonMineCells.length) {
        this.setState({ board: newBoard, gameWon: true });
      } else {
        // Update the state with the updated board array
        this.setState({ board: newBoard });
      }
    }
  };

  render() {
    const gameOverStatus = this.state.gameOver;
    const gameWonStatus = this.state.gameWon;
    let gameOverMessage, gameWonMessage;

    if (gameOverStatus) {
      gameOverMessage = "You lose!";
      const gameOverSound = new Audio(gameOver);
      setTimeout(() => {
        //Plays the sound of a voice that you lose!
        gameOverSound.play();
      }, 1600);
    } else if (gameWonStatus) {
      gameWonMessage = "You win!"; //Plays the sound of a voice that you win!
      const gameWonSound = new Audio(gameWon);
      setTimeout(() => {
        gameWonSound.play();
      }, 1300);
    }

    return (
      <div className="board-container">
        <div className="message">{gameWonMessage}</div>
        <div className="board">
          {this.state.board.map((cell) => (
            <Cell key={cell.index} cell={cell} onClick={this.showClickedCell} />
          ))}
        </div>
        <div className="message">{gameOverMessage}</div>
      </div>
    );
  }
}

export default Board;
