const el = document.getElementById('buttonExecute').value;
el.addEventListener("click", execute, false);
class GameSetupPackage
{

  constructor(player1, player2, matchCount, roundTimer, tilesToWin, rowLength, colLength)
  {
    //players data
    this.player1 = player1;
    this.player2 = player2;

    this.matchCount = matchCount; //1,3,5,7,9,11
    this.roundTimer = document.getElementById('roundTimerBox').value;; //if 0 just ignore

    this.tilesToWin = tilesToWin;
    this.rowLength = rowLength;
    this.colLength = colLength;

  }

  execute()
  {
    console.log(this.roundTimer);
  }
}
