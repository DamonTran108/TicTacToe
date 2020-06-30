
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

  getPlayer1()
  {
  return this.player1;
  }


}

function executes()
{
  var player1Symbol = document.getElementById('symbols1').value;
  var player2Symbol = document.getElementById('symbols2').value;

  var row = document.getElementById('rowL').value;
  var col = document.getElementById('colL').value;

  // If they have the same symbol selected then dont do the rest... Else...
  if(player1Symbol == player2Symbol)
  {
    console.log("they're the same!");
  }else{
 localStorage.setItem("colL", row);
 localStorage.setItem("rowL", col);

 localStorage.setItem("symbol1", player1Symbol);
 localStorage.setItem("symbol2", player2Symbol);
 localStorage.setItem("lastname", "Smith");

 player1 = document.getElementById('namebox1').value;
 localStorage.setItem("player1Name", player1);

 player2 = document.getElementById('namebox2').value;
 localStorage.setItem("player2Name", player2);

 roundTimer = document.getElementById('namebox1').value;

 console.log(this.roundTimer);
  }
}
