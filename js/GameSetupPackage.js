
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



}

function executes()
{
  var player1Symbol = document.getElementById('symbols1').value;
  var player2Symbol = document.getElementById('symbols2').value;

  var row = document.getElementById('rowL').value;
  var col = document.getElementById('colL').value;

  var col1 = document.getElementById('ColorPicker1').value;
  var col2 = document.getElementById('ColorPicker2').value;
  // If they have the same symbol selected then dont do the rest... Else...
  //Validation checks
  if(player1Symbol == player2Symbol || row == "" || col == "")
  {
    alert("Please check you have different symbols for players OR given a row/column length");
  }else{
 localStorage.setItem("colL", row);
 localStorage.setItem("rowL", col);

 localStorage.setItem("color1", col1);
 localStorage.setItem("color2", col2);

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
