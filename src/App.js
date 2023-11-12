import Game from "./Game.js";

class App {
  checkResult(result) {
    if (typeof result === "string") {
      throw Error(`[ERROR]${result}`);
    }
  }

  async play() {
    const game = new Game();
    const result = await game.play();

    this.checkResult(result);
  }
}

export default App;
