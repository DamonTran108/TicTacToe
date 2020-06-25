
//Coded by Damon Tran and Joshua Rastall
//Simple tic tac toe game
//Simple concepts but is made to be modular so certain areas of code can be refactored and reused for other programs
//Large amount of control over the grid and stuff (4x4 or 5x5 grid)
//But is not effective for tictactoe as it is based around around a 3x3 grid

let height = 200;
let width = 200;
let max_g_length = 700; //how long the grid can be, used to dynamically resize the tiles
let canvasWidth = 900;
let canvasHeight = 900;
let win = false;

let tilesToWin = 3; //how many tiles in a row that are needed for win condition
//player functionality
let playerList = [];

//need to add 1 on the turns for the display
//starts from 0 so it works with the array
let turnCount = 0;
let grid = null;

function setup(i_GameSetupPackage) {

createCanvas(900, 900);

if (i_GameSetupPackage != null) // has passed in a data package, custom input
{

  let dynamic_size = max_g_length / (Math.max(i_GameSetupPackage.rowLength, i_GameSetupPackage.colLength));
  //constructor(xCord,yCord,i_t_length, rowLength, colLength)
  grid = new Grid(100,52, dynamic_size , i_GameSetupPackage.rowLength ,i_GameSetupPackage.colLength);
  playerList.push(i_GameSetupPackage.player1);
  playerList.push(i_GameSetupPackage.player2);

  tilesToWin = i_GameSetupPackage.tilesToWin;
}
else //default, mainly for testing
{
  let dynamic_size = (max_g_length / 10);
  grid = new Grid(100,52,dynamic_size, 10, 10);

  //Create the players with their colours and chosen tiles
  //will be passed in from previous page, but for now will be hardcoded
  playerList.push(new Player(Tile_States.NAUGHT, color(0,0,255)));
  playerList.push(new Player(Tile_States.CROSS, color(255,0,0)));

}


console.log(grid);
}


function draw() {
//Iterate throughout the tile array and draw them

  grid.drawGrid();

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

  //this.checkRow();
  //this.checkCol();
  //this.checkDiagRight();
  //this.checkDiagLeft();

  this.checkRowAlt();
  this.checkColAlt();
  this.checkDiagAlt();

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
