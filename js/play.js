
//Coded by Damon Tran and Joshua Rastall
//Simple tic tac toe game
//Simple concepts but is made to be modular so certain areas of code can be refactored and reused for other programs
//Large amount of control over the grid and stuff (4x4 or 5x5 grid)
//But is not effective for tictactoe as it is based around around a 3x3 grid

let height = 200;
let width = 200;
let canvasWidth = 900;
let canvasHeight = 900;
let win = false;
//player functionality
let playerList = [];

//need to add 1 on the turns for the display
//starts from 0 so it works with the array
let turnCount = 0;
let grid = null;

function setup() {
grid = new Grid(100,52,200, 3, 3);
//Create the players with their colours and chosen tiles
playerList.push(new Player(Tile_States.NAUGHT, color(0,0,255)));
playerList.push(new Player(Tile_States.CROSS, color(255,0,0)));

createCanvas(900, 900);

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
  this.checkRowAlt();
  //this.checkCol();
  //this.checkDiagRight();

  //Determine which row and and column the new tile belongs
  // GO TO THE THE START OF THESE ROWS/COLUMNS and check for win con
  //easier than using the input tile as a pivot
  this.checkDiagLeft();

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

  let tilesToWin = 3;
  let effRowLength = grid.getRowLength() - 1; //offset for arrays beginning at 0

  //recently input tile data
  let rowIndex = grid.getIndexH();
  let colIndex = grid.getIndexV();
  let sought_state = grid.getTileChosen().getState(); //need to make getting desired state cleaner
  let t_counter = 1; //starts off as 1 to include the center

  //will count tiles to the left of the 'pivot' and to the right
  //Will keep going until it meets an incorrect tile or the counter reaches the required tiles

  //each loop will need to start from the middle
  //Checking to the left of the center

  if (colIndex > 0) //make sure it's not the leftmost
  {
    console.log("Checking left side...")
    //need to offset initial i so it starts left of the center
    for (let i = colIndex - 1; i >= 0; i-- )
    {
      if(grid.getGrid()[rowIndex][i].getState() == sought_state)
      {
        console.log("Tile Found")
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
    console.log("Checking right side...")
    for (let i = colIndex + 1; i <= effRowLength; i++ )
    {
      if(grid.getGrid()[rowIndex][i].getState() == sought_state)
      {
        console.log("Tile Found")
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



  console.log("Ri " + rowIndex + "\n" +"Ci " + colIndex + "\n" + "TTW " + tilesToWin + "\n" +"TileC " + t_counter);

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

      console.log("Col matches");
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
