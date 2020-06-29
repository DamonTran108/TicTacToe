
class GameSetupPackage
{
  gs = new GemsetupPackage();
  constructor(player1, player2, matchCount, roundTimer, tilesToWin, rowLength, colLength)
  {
    //players data
    this.player1 = player1;
    this.player2 = player2;

    this.matchCount = matchCount; //1,3,5,7,9,11
    this.roundTimer = roundTimer; //if 0 just ignore

    this.tilesToWin = tilesToWin;
    this.rowLength = rowLength;
    this.colLength = colLength;

  }

  getRoundTimer()
  {
  return this.roundTimer;
  }

  setRoundTimer()
  {
    this.roundTimer = document.getElementById('namebox1').value;
  }
}

function executes()
{
 roundTimer = document.getElementById('namebox1').value;

 console.log(this.roundTimer);
}
