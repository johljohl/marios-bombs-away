import "./App.css";
import Board from "./Board";

function App() {
  return (
    <>
      <h1>Mario´s Bombs Away</h1>
      <div className="hero">
        <img
          src="https://www.svg.com/img/gallery/the-unexpectedly-dark-mario-game-youve-probably-never-heard-of/l-intro-1608580225.jpg"
          alt="mario"
        />
      </div>
      <h3>Minesweeper</h3>

      <div className="App">
        <Board />
      </div>
    </>
  );
}

export default App;
