
//Coded by Damon Tran and Joshua Rastall
//Simple tic tac toe game
//Simple concepts but is made to be modular so certain areas of code can be refactored and reused for other programs
//Large amount of control over the grid and stuff (4x4 or 5x5 grid)
//But is not effective for tictactoe as it is based around around a 3x3 grid

let height = 200;
let width = 200;
let canvasWidth = 900;
let canvasHeight = 900;

//player functionality
let playerList = [];

//need to add 1 on the turns for the display
//starts from 0 so it works with the array
let turnCount = 0;
let grid = null;

function setup() {
grid = new Grid(100,52,200, 4, 3);
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
{turnCount++;}

}

function checkTilesForWinCon()
{
  //iterate throughout tiles to check winning patterns

  //Determine which row and and column the new tile belongs
  // GO TO THE THE START OF THESE ROWS/COLUMNS and check for win con
  //easier than using the input tile as a pivot



}
