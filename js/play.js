
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

//need to add 1 on the turns for the display
//starts from 0 so it works with the array
let turnCount = 0;
let grid = null;

let gs = null;

//Timer stuff
//for now timers are in seconds, may add milliseconds
let round_timer_limit = 10; //-1 is exit value
let round_counter = 0;
let overall_timer = 0;


function increment_timers()
{
  round_counter++;
  overall_timer++;

}

function check_round_timer() //simply checks if the round timer has gone to 0 or not
{
  if (round_timer_limit <= round_counter)
    {return true;}
  else
    {return false;}
}

function draw_timers()
{
  //check if there's even a round timer before starting to draw it
  //Looks like text draws from the bottom right corner? jesus

  //// TODO:
  //Center the timer text
  //better strings for each timer
  //Find a good place for the timer
  //Maybe add red warning colour as it gets the that last few seconds

  //draw round timer
  if (round_timer_limit > 0)
  {
    let s = "Round Timer";

    let t = convert_time(round_timer_limit - round_counter);

    textSize(72);
    text(s, 20, 60);

    //actual timer
    textSize(128);
    text(t, 150,175);
  }

  //draw match timer?
  //might not even be needed
  //can just be stored and displayed in a stats screen at the end

  let s = "Total Timer";
  let t = convert_time(overall_timer);

  textSize(72);
  text(s, 20, 385);

  //actual timer
  textSize(128);
  text(t, 150,500);

}

function convert_time(input_seconds)
{
  //.toString()
  //MM:SS
  let min = Math.floor(input_seconds / 60); //divide to get mins, but ROUND DOWN without decimals
  let sec = input_seconds % 60;

  if (sec.toString().length == 1) //if only 1 char long, need to buffer with 0    1 = 01   2 = 02 etc
    {sec = "0" + sec;}

  let output = (min.toString()) + ":" + (sec.toString());

  return output;
}

function resetTimers()
{
  round_counter = 0;
}


function setup() {


//use system library to get user's window dimensions.
canvasWidth = windowWidth;
canvasHeight = windowHeight;

//Create canvas based on size. Only a portion will hold the important info
createCanvas(canvasWidth, canvasHeight);

grid_pos_x = canvasWidth/2 - max_g_length/2;
grid_pos_y = canvasHeight/2 - max_g_length/2;

background(255,0,0);

createAssets();


/////TIMER stuff
//setTimeout(function, milliseconds)
//setInterval(function, milliseconds)

setInterval(increment_timers ,1000) //process the function every second




console.log(grid);
}


function draw() {

//update all relevent ingame logic that is based on time
//called "update_game" so the naming does not clash with existing update functions
update_game();

//Iterate throughout the tile array and draw them

// NEED THIS TO REDRAW BACKGROUND EVERY FRAME, OR THE TEXT JUST DRAWS ONTOP OF ITSELF
// God knows how it worked without this before
  background(220);

  grid.drawGrid();

  this.draw_timers();
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
  if (grid.getRowLength() == grid.getColLength())
  {
    isSimple = true;
  }
  else
  {
    isSimple = false;
  }
  console.log(grid.getRowLength());
}

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
  console.log(grid.getRowLength())
  console.log(grid.getColLength())
}

function update_game()
{
  if (check_round_timer())
    {resetTimers();}
}

// When the user clicks the mouse
function mousePressed() {

//remove tile length and put into grid as they'll all be the same
let currentPlayer = playerList[(turnCount % 2)];

// Pass in mouse data to check if a tile is clicked
//Pass in currentPlayer so it can simply update the tile as soon as it finds interval
//Would use pointers but javascript
if (grid.checkGridBounds(mouseX,mouseY,currentPlayer))
{
  turnCount++;
  this.checkTilesForWinCon();
}

}

function checkTilesForWinCon()
{


  if (isSimple)
  {
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


  if(turnCount == grid.getGrid().length * grid.getGrid().length && win==false){
    console.log("DRAW!");
  }

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


      //If statement to check when all the tiles are the same state then print...
      if(counter == grid.getRowLength())
      {
        console.log("A WINCON IS FOUND BY ROW");
        win = true;
        return true;

      }

    }

  }
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


      //If statement to check when all the tiles are the same state then print...
      if(counter == grid.getColLength())
      {
        console.log("A WINCON IS FOUND BY Col");
        win = true;
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

      //increment counter and if the counter hits the same size as the length of the grid then they win
      if(counter == grid.getColLength())
      {
        console.log("A WINCON IS FOUND BY DIAG");
        win = true;
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

      //Check if counter hits size of grid... If so they win.
      if(counter == grid.getColLength())
      {
        console.log("A WINCON IS FOUND BY DIAG");
        win = true;
        return true;

      }

    }
    i++;
    j--;
  }

}


function checkDiagAlt()
{
  //COPY PASTED FROM Row
  //NEED TO CHANGE
  let effColLength = grid.getColLength() - 1; //offset for arrays beginning at 0
  let effRowLength = grid.getRowLength() - 1;

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

  if (rowIndex < effRowLength  && colIndex < effColLength) //make sure it's not in bot left row/corner
  {
    //console.log("Checking lower right")
    //need to offset initial i so it starts left of the center
    let i = rowIndex + 1;
    let j = colIndex + 1;

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
