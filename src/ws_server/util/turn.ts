export default class CurrPlayer {
  currPlayer: 0 | 1;
  constructor() {
    this.currPlayer = 0;
  }

  getCurrPlayer() {
    return this.currPlayer;
  }

  changeCurrPlayer() {
    this.currPlayer = this.currPlayer === 0 ? 1 : 0;
    return this.currPlayer;
  }
}
