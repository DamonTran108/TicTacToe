
//Coded by Damon Tran and Joshua Rastall
//Simple tic tac toe game
//Simple concepts but is made to be modular so certain areas of code can be refactored and reused for other programs
//Large amount of control over the grid and stuff (4x4 or 5x5 grid)
//But is not effective for tictactoe as it is based around around a 3x3 grid

//1280,720
//testing, will dynamically create board absed on monitor size
//Will start as 0 and set in setup
let canvasWidth, canvasHeight = 0;
let grid_pos_x , grid_pos_y = 0;

let max_g_length = 500; //how long the grid can be, used to dynamically resize the tiles

let win = false;
let isSimple = true;

let tilesToWin = 3; //how many tiles in a row that are needed for win condition
//player functionality
let playerList = [];
let currentPlayer = null;

//need to add 1 on the turns for the display
//starts from 0 so it works with the array
let turnCount = 0;
let grid = null;

let gs = null;
let winner  = null;
//Timer stuff
//for now timers are in seconds, may add milliseconds
let round_timer_limit = 10; //-1 is exit value
let round_counter = 0;
let overall_timer = 0;
let winConArr =null;
let timerRefreshID = null;
resetBtn = null;
surrBtn = null;
rematchBtn = null;



function setup() {

winConArr = [];
//use system library to get user's window dimensions.
canvasWidth = windowWidth;
canvasHeight = windowHeight;

//Create canvas based on size. Only a portion will hold the important info

createCanvas(canvasWidth, canvasHeight);




grid_pos_x = canvasWidth/2 - max_g_length/2;
grid_pos_y = canvasHeight/2 - max_g_length/2;

background(255,0,0);

createAssets(); //get stuff from html
createBtns();

/////TIMER stuff
//setTimeout(function, milliseconds)
//setInterval(function, milliseconds)

timerRefreshID = setInterval(increment_timers ,1000) //process the function every second



currentPlayer = playerList[0]; //INITIAL
currentPlayer = playerList[(turnCount % 2)];
console.log(playerList);
console.log(grid);
}

function change_background() {

    // Pick a random number for r value
    r = random(255);

    // Pick a random number for g value
    g = random(255);

    // Pick a random number for b value
    b = random(255);

    // Set a random background-color
    background(r, g, b);
}

function reset()
{
  turnCount = 0;
  window.alert("resetting match...");
  playerList = [];
  createAssets();
  winner = null;
  turnCount = 0;
  currentPlayer = playerList[0];
  winConArr = [];

  //timers
  hardTimerReset()

  console.log(winConArr)

}

function surrender()
{
  let surrenderer = currentPlayer.getSymbol();
  let Pname =  currentPlayer.getName();
  let Pname2 =  playerList[1].getName();
  let winningState = null;

for(let i = 0; i < playerList.length; i++)
{
  if(Pname != playerList[i].getName())
  {
    winner = playerList[i];
    winningState = playerList[i].getSymbol();

  }
}
  console.log(Pname + " - " + " Symbol: " + surrenderer + " forfeited the game!");
  console.log(winner + " - " +" Symbol: " + winningState +  " WINS");
}

function createBtns()
{
  resetBtn = createButton("Reset");
  resetBtn.mouseClicked(reset);
  resetBtn.position(100,700);
  resetBtn.size(100,100);

  surrBtn = createButton("Surrender");
  surrBtn.mouseClicked(surrender);
  surrBtn.position(100,800);
  surrBtn.size(100,100);

  rematchBtn = createButton("Rematch?");
  rematchBtn.mouseClicked(reset);
  rematchBtn.position(grid.getXpos()+700,grid.getYpos()+100);
  rematchBtn.size(100,100);
  rematchBtn.hide();


}



function draw() {

//called "update_game" so the naming does not clash with existing update functions
update_game();

//Iterate throughout the tile array and draw them

// NEED THIS TO REDRAW BACKGROUND EVERY FRAME, OR THE TEXT JUST DRAWS ONTOP OF ITSELF
// God knows how it worked without this before
  background(220);

  grid.drawGrid();

  this.drawTimers();
  this.drawHUD();



}

function createAssets(i_GameSetupPackage)
{
  if (i_GameSetupPackage != null) // has passed in a data package, custom input
  {

    let dynamic_size = max_g_length / (Math.max(i_GameSetupPackage.rowLength, i_GameSetupPackage.colLength));

    //constructor(xCord,yCord,i_t_length, rowLength, colLength)
    grid = new Grid(grid_pos_x,grid_pos_y, dynamic_size , i_GameSetupPackage.rowLength ,i_GameSetupPackage.colLength);
    playerList.push(i_GameSetupPackage.player1);
    playerList.push(i_GameSetupPackage.player2);

    tilesToWin = i_GameSetupPackage.tilesToWin;
  }
  else //default, mainly for testing
  {
    createGrid();

    //Create the players with their colours and chosen tiles
    addPlayers();
    //will be passed in from previous page, but for now will be hardcoded

    console.log(playerList[0].getName());
    console.log(playerList[1].getName());
  }

  //check which algorithm to use


function addPlayers()
{
  console.log("adding players..")
  playerList.push(new Player(document.getElementById("P1Name").innerHTML = localStorage.getItem("player1Name"),document.getElementById("S1Name").innerHTML = localStorage.getItem("symbol1"), localStorage.getItem("color1")));
  playerList.push(new Player(document.getElementById("P2Name").innerHTML = localStorage.getItem("player2Name"),document.getElementById("S2Name").innerHTML = localStorage.getItem("symbol2"),  localStorage.getItem("color2")));

}

function createGrid()
{
  let dynamic_size = (max_g_length / 5);
  grid = new Grid(grid_pos_x,grid_pos_y,dynamic_size, document.getElementById("row").innerHTML = localStorage.getItem("rowL"),document.getElementById("col").innerHTML = localStorage.getItem("colL"));

  //Sets what win con algorithms to use
  if (grid.getRowLength() == grid.getColLength())
  {isSimple = true;}
  else
  {isSimple = false;}
  }
  console.log(grid.getRowLength());
  console.log(grid.getColLength());
  console.log(isSimple);
}

function update_game()
{
  //Updates the realtime game logic
  //Tictactoe is technically a Turn Based Strategy game which relies on user input to update game logic
  //Due to this a large portion of the updates happen in mouse click

  //However for real time based logic such as timers and animation ticking, this function will be used
  //It is placed at the beginning of the draw function for now unless a more streamlined, already integrated method is found
  //

  //Check round timer
  //if (check_round_timer())
    //{s();}

}

// When the user clicks the mouse
function mousePressed() {
  if(winner == null)
  {

    if (grid.checkGridBounds(mouseX,mouseY,currentPlayer))
    {
      turnCount++;
      roundTimerReset();
      this.checkTilesForWinCon();
      console.log("Turn Count : " + turnCount)
    }
    //next player
      currentPlayer = playerList[(turnCount % 2)];
    }

}



function checkTilesForWinCon()
{


  //DIFFERENCE BETWEEN THE CHECKS
  // Simple: Row and column count are the same, so it is a square instead of an iregular rectangle
  //These functions rely on the board being regular and and tiles required the length of the board

  //This results in a much lower number of win conditions as a line needs to go from one side of the board to the other.

  // e.g Only 2 possible diagonal wins, as there is not enough room unless they go through the center.
  // The require tiles to win are different to the size of the board.
  // Simple games Examples
  //    3x3 board with 3 tiles to win
  //    5x5 board with 5 tiles to win.
  //    100x100 board with 100 tiles to win


  // Complex
  // The row and column counts are not the same, AND/OR the number of tiles to win is less than the board length
  // These alt functions explore from the last input tile
  // To fufill the win con the entire line does not need to be a certain symbol, but have enough adjacent tiles
  // Complex game Examples
  //    3x3 board with 2 tiles to win
  //    4x5 board with 4 tiles to win
  //    100x100 board with 99 tiles to win


  if (isSimple)
  {
    if(this.checkRow() || this.checkCol()|| this.checkDiagRight()|| this.checkDiagLeft())
    {
      winner = currentPlayer;
      console.log(winner.getName() + "  wins");
    }
    this.checkRow();
    this.checkCol();
    this.checkDiagRight();
    this.checkDiagLeft();
  }
  else
  {
    this.checkRowAlt();
    this.checkColAlt();
    this.checkDiagAlt();
  }




}

function endGameStuff()
{

}

function checkRow()
{
  //Finds whether the row is all the same state.
  let counter = 0;
  let rowIndex = grid.getIndexH();
  console.log(rowIndex);
  //Loop to iterate over the row of the last tile chosen
  for(let i = 0; i < grid.getGrid()[rowIndex].length;i++)
  {
    //If the tiles in this row are all the same state then....
    if(grid.getGrid()[rowIndex][i].getState() == grid.getTileChosen().getState())
    {

      console.log("Row matches");
      counter++; //Counter variable to count how many states are the same

      winConArr[i] =  grid.getGrid()[rowIndex][i];
      //If statement to check when all the tiles are the same state then print...
      if(counter == grid.getRowLength())
      {
        console.log("A WINCON IS FOUND BY ROW");
        win = true;

        highlightWin();
        return true;

      }

    }

  }
  console.log(winConArr);
}



function checkRowAlt(i_sought_state) //alternatitve way to check row win, uses last tile as a pivot andcan be used for bigger grids
{
  //2 checks required for row
  // From the center: checks both sides

  //While the normal check function is enough for standard 3x3 games, a more comple, longer one is required for
  //the irregular games such as 3 tiles to win on a 5x5 board.
  //Canot be assumed so it requires more manuel checking and direct exploration of the tile array.

  let effRowLength = grid.getRowLength() - 1; //offset for arrays beginning at 0

  //recently input tile data
  let rowIndex = grid.getIndexH();
  let colIndex = grid.getIndexV();
  let sought_state = grid.getTileChosen().getState(); //need to make getting desired state cleaner
  let t_counter = 1; //starts off as 1 to include the center

  //////PROCESS/////
  // Will scan outwards of the placed tile
  // WEill first need to check that is not an edge tile and will not go out of bounds
  // And then will iterate


  if (colIndex > 0) //make sure it's not the leftmost
  {
    //console.log("Checking left side...")
    //need to offset initial i so it starts left of the center
    for (let i = colIndex - 1; i >= 0; i-- )
    {
      if(grid.getGrid()[rowIndex][i].getState() == sought_state)
      {
        //console.log("Tile Found")
        t_counter++;
      }
      else
      {
        break; //break out of loop
      }
    }
  }


  if (colIndex < (effRowLength)) //-1 for array offset
  {
    //console.log("Checking right side...")
    for (let i = colIndex + 1; i <= effRowLength; i++ )
    {
      if(grid.getGrid()[rowIndex][i].getState() == sought_state)
      {
        //console.log("Tile Found")
        t_counter++;
      }
      else
      {
        break; //break out of loop
      }
    }
  }

  //WIN CONDITIONAL
  if (t_counter >= tilesToWin)
  {
    console.log(sought_state + " WINS!");
  }

  console.log("Coord (" + rowIndex + "," + colIndex + ")" + "\n" +"TileCount in row: (" + t_counter + ")");

}

function checkCol()
{

  let counter = 0; // Counter to count how many tiles are same state
  let colIndex = grid.getIndexV(); // Local variable set to the vertical index of the last tile chosen
  console.log(colIndex);
  //Loop to iterate over the row of the last tile chosen
  for(let i = 0; i < grid.getGrid()[colIndex].length;i++)
  {
    //If the tiles in this row are all the same state then....
    if(grid.getGrid()[i][colIndex].getState() == grid.getTileChosen().getState())
    {

      counter++; //Counter variable to count how many states are the same
      winConArr[i] =  grid.getGrid()[i][colIndex];

      //If statement to check when all the tiles are the same state then print...
      if(counter == grid.getColLength())
      {
        console.log("A WINCON IS FOUND BY Col");
        win = true;
        highlightWin();
        return true;

      }

    }

  }

}

function checkColAlt()
{
  //COPY PASTED FROM Row
  //NEED TO CHANGE
  let effColLength = grid.getColLength() - 1; //offset for arrays beginning at 0

  //recently input tile data
  let rowIndex = grid.getIndexH();
  let colIndex = grid.getIndexV();
  let sought_state = grid.getTileChosen().getState(); //need to make getting desired state cleaner
  let t_counter = 1; //starts off as 1 to include the center

  //will count tiles to the left of the 'pivot' and to the right
  //Will keep going until it meets an incorrect tile or the counter reaches the required tiles

  //each loop will need to start from the middle
  //Checking to the left of the center

  if (rowIndex > 0) //make sure it's not the bottom
  {
    //need to offset initial i so it starts left of the center
    for (let i = rowIndex - 1; i >= 0; i-- )
    {
      if(grid.getGrid()[i][colIndex].getState() == sought_state)
      {
        //console.log("Tile Found")
        t_counter++;
      }
      else
      {
        break; //break out of loop
      }
    }
  }


  if (rowIndex < (effColLength)) //-1 for array offset
  {
    //console.log("Checking right side...")
    for (let i = rowIndex + 1; i <= effColLength; i++ )
    {
      if(grid.getGrid()[i][colIndex].getState() == sought_state)
      {
        //console.log("Tile Found")
        t_counter++;
      }
      else
      {
        break; //break out of loop
      }
    }
  }

  //WIN CONDITIONAL
  if (t_counter >= tilesToWin)
  {
    console.log(sought_state + " WINS!");
  }

  console.log("Coord (" + rowIndex + "," + colIndex + ")" + "\n" +"TileCount in Col: (" + t_counter + ")");

}

function checkDiagRight()
{
  let counter = 0; // Counter to count how many tiles are same state

  //Loop to iterate over grid and check whether all tiles are same state in the diagonal going right
  for(let i =0; i < grid.getGrid().length; i++)
  {
    //If the tiles are the same state then...
    if(grid.getGrid()[i][i].getState() == grid.getTileChosen().getState())
    {
      counter++
      winConArr[i] =  grid.getGrid()[i][i];
      //increment counter and if the counter hits the same size as the length of the grid then they win
      if(counter == grid.getColLength())
      {
        console.log("A WINCON IS FOUND BY DIAG");
        win = true;
        highlightWin();
        return true;

      }
    }

  }


}

function checkDiagLeft()
{
  let counter = 0;//Counter to count how many tiles are the same
  let i = 0; //Need these loop variables to increment and decrement in the loop to find the diagonal going left
  let j = grid.getGrid().length-1;

  //Loop to find if the tiles are the same state
  while(i < grid.getGrid().length){
    //If the tiles match... then increment counter
    if(grid.getGrid()[i][j].getState() == grid.getTileChosen().getState())
    {
      counter++
      winConArr[i] =  grid.getGrid()[i][j];
      //Check if counter hits size of grid... If so they win.
      if(counter == grid.getColLength())
      {
        console.log("A WINCON IS FOUND BY DIAG");
        win = true;
        highlightWin();
        return true;

      }

    }
    i++;
    j--;

  }
}

function highlightWin()
{
  for(let i = 0 ; i < grid.getRowLength(); i++)
  {
    winConArr[i].updateSymbolColor(color(0,255,0));
  }
}

function checkDiagAlt()
{
  //COPY PASTED FROM Row
  //NEED TO CHANGE
  let effColLength = grid.getColLength() - 1; //offset for arrays beginning at 0
  let effRowLength = grid.getRowLength() - 1;

  //console.log("effCOlLength:" + effColLength);
  //console.log("effRowLength:" + effRowLength);

  //recently input tile data
  let rowIndex = grid.getIndexH();
  let colIndex = grid.getIndexV();
  let sought_state = grid.getTileChosen().getState(); //need to make getting desired state cleaner
  let t_counter = 1; //starts off as 1 to include the center

  //will count tiles to the left of the 'pivot' and to the right
  //Will keep going until it meets an incorrect tile or the counter reaches the required tiles


  //First need to check if the position can even have a diagonal win con
  //need to do some fatty math

  /////   check \   //////
  if (rowIndex > 0 && colIndex > 0) //make sure it's not in top left row/corner
  {
    //console.log("Checking upper left ")
    //need to offset initial i so it starts left of the center
    let i = rowIndex - 1;
    let j = colIndex - 1;

    for (let x = 0; i >= 0 && j >=0; i--, j-- )
    {
      if((grid.getGrid()[i][j].getState() == sought_state) && ((i < effRowLength) && (j < effColLength)))
      {
        //console.log("Tile Found")
        t_counter++;
      }
      else
      {
        break; //break out of loop
      }
    }
  }

  if (rowIndex < effRowLength  && colIndex < effColLength) //make sure it's not in bot left row/corner
  {
    //console.log("Checking lower right")
    //need to offset initial i so it starts left of the center
    let i = rowIndex + 1;
    let j = colIndex + 1;

    console.log("i:" + i);
    console.log("j:" + j);

    for (let x = 0; i <= effRowLength && j <= effColLength; i++, j++ )
    {
      if(grid.getGrid()[i][j].getState() == sought_state)
      {
        t_counter++;
      }
      else
      {
        break; //break out of loop
      }
    }
  }


  //////////////////////////////////////////////////
  //////////////////////////////////////////////////
  //////////////////////////////////////////////////

  if (rowIndex > 0 && colIndex < effColLength) //make sure it's not in top right row/corner
  {
    //console.log("Checking upper right")
    //need to offset initial i so it starts left of the center
    let i = rowIndex - 1;
    let j = colIndex + 1;

    for (let x = 0; i >= 0 && j <= effColLength; i--, j++ )
    {
      if(grid.getGrid()[i][j].getState() == sought_state)
      {
        //console.log("Tile Found")
        t_counter++;
      }
      else
      {
        break; //break out of loop
      }
    }
  }

  if (rowIndex < effRowLength && colIndex > 0) //make sure it's not in bot left row/corner
  {
    //console.log("Checking lower left")
    //need to offset initial i so it starts left of the center
    let i = rowIndex + 1;
    let j = colIndex - 1;

    for (let x = 0; i <= effRowLength && j >= 0; i++, j-- )
    {
      if(grid.getGrid()[i][j].getState() == sought_state)
      {
        t_counter++;
      }
      else
      {
        break; //break out of loop
      }
    }
  }


  //WIN CONDITIONAL
  if (t_counter >= tilesToWin)
  {
    console.log(sought_state + " WINS!");
  }

  console.log("Coord (" + rowIndex + "," + colIndex + ")" + "\n" +"TileCount in diag: (" + t_counter + ")");


}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////// TIMER STUFF //////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function increment_timers()
{
  round_counter++;
  overall_timer++;


  if (check_round_timer())
    {roundTimerReset();}

}

function check_round_timer() //simply checks if the round timer has gone to 0 or not
{
  if (round_timer_limit <= round_counter)
    {return true;}
  else
    {return false;}
}

function drawTimers()
{


  //// TODO:
  //Center the timer text
  //better strings for each timer
  //Find a good place for the timer
  //Maybe add red warning colour as it gets the that last few seconds

  //drawing data
  stroke(255);//color
  strokeWeight(5);
  fill(0);
  textSize(72);



  let s = "Total Timer";
  let rawt = overall_timer; //before conversion
  let t = convert_time(rawt);

  textSize(72);
  text(s, 20, 385);

  //actual timer
  textSize(128);
  text(t, 150,500);



  s = "Round Timer";
  rawt = round_timer_limit - round_counter;
  t = convert_time(rawt);

  //warning colours, can be remove if doesn't mesh with the background
  if (rawt < 6)
  {
    let warningColor = color(240,0,0); //So it's easy to change whenver

    //stroke(warningColor - color(50,0,0));//color
    fill(warningColor);
    textSize(72);
  }

  //timer text
  textSize(72);
  text(s, 20, 60);

  //actual timer
  textSize(128);
  text(t, 150,175);

}

function convert_time(input_seconds)
{
  //Turns seconds to minutes and seconds
  //S -> M:S

  //Done using math

  let min = Math.floor(input_seconds / 60); //divide to get mins, but ROUND DOWN to remove decimals
  let sec = input_seconds % 60; //Gets the remainder

  //Example
  //If 80 is put into it then   min = 1 and sec = 20
  // They then get squashed together into 1:20


  if (sec.toString().length == 1) //if only 1 char long, need to buffer withan extra 0    1 = 01   2 = 02 etc
    {sec = "0" + sec;}

  let output = (min.toString()) + ":" + (sec.toString());

  return output;
}

function roundTimerReset()
{
  round_counter = 0;

  //refresh the interval stuff
  //get the full seconds
  clearInterval(timerRefreshID);
  timerRefreshID = setInterval(increment_timers ,1000);
}

function hardTimerReset()
{
  roundTimerReset();
  round_counter = -1;
  overall_timer = 0; //need to compensate and overshoot

  //refresh the interval stuff
  //starts the second all over again

}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////// HUD Stuff ////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function drawHUD()
{


  //Draws name above the board of the current player
  //If game is over will draw "player x has won" instead

  if(winner !=null) //PLATER WINS
  {
    drawGameWinHUD();

  }
  else if (turnCount == grid.getRowLength() * grid.getColLength() && winner==null)//DRAW
  {
      text("Draw", grid.getXpos()+300, grid.getYpos());
      fill(currentPlayer.getColor());
      textSize(128);
      surrBtn.hide();
      rematchBtn.show();

  }
  else //DEFAULT GAME STILL RUNNING
  {
    drawCurrentPlayer();
  }





}

function drawCurrentPlayer()
{
  stroke(255);//color
  strokeWeight(5);


  //text presets
  fill(currentPlayer.getColor());
  textSize(72);

  let s = (currentPlayer.getName() + "  turn");
  let player_text_x = 700; //used to 'stick' the symbol to the front of text
  let player_text_y = 150;

  text(s, player_text_x, player_text_y); //DRAW


  //Presets
  fill(currentPlayer.getColor());
  textSize(128);

  let symbol_s = currentPlayer.getSymbol(); //new string to to keep everything seperate
  let player_text_width = textWidth(s)/2;
  //let player_text_height = textAscent(s);
  let symbol_text_off = textWidth(symbol_s);

  //draw symbols either side
  text(symbol_s,player_text_x - symbol_text_off,player_text_y);
  text(symbol_s,player_text_x + symbol_text_off + player_text_width,player_text_y);
  //text(symbol_s,(player_text_x + player_text_width + symbol_text_off),player_text_y);
}

function drawGameWinHUD()
{
  text(winner.getName() + " Wins" , grid.getXpos()+300, grid.getYpos()); //DRAW

  //Presets
  fill(currentPlayer.getColor());
  textSize(128);
  rematchBtn.show();
  surrBtn.hide();
}
