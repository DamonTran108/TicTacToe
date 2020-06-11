let tiles = [
  [, ,],
  [, ,],
  [, ,],
];

let indexH,indexV=0;
let height = 200;
let width = 200;
let canvasWidth = 900;
let canvasHeight = 900;

//player functionality
let playerList = [];
let player = null;

//need to add 1 on the turns for the display
//starts from 0 so it works with the array
let turnCount = 0;
let grid = null;

function setup() {
grid = new Grid(200,200, 3, 3);
playerList.push(new Player(Tile_States.NAUGHT, color(0,0,255)));
playerList.push(new Player(Tile_States.CROSS, color(255,0,0)));

createCanvas(900, 900);

console.log(grid);
}



function draw() {
//Iterate throughout the tile array and draw them

  grid.drawGrid()

}

// When the user clicks the mouse
function mousePressed() {
  // Check if mouse is inside the circle


//remove tile length and put into grid as they'll all be the same

let currentPlayer = playerList[(turnCount % 2)];

// checkGridBounds(int mousex, int mousey)
  for(let i = 0; i < grid.getColLength(); i++){
    for(let j = 0; j<grid.getRowLength();j++){
      if (grid.getGrid()[i][j].isInBounds(mouseX, mouseY)) {

        if (grid.getGrid()[i][j].canInsertSymbol())
        {
          indexH = i;
          indexV= j;
      grid.getGrid()[i][j].updateColour(currentPlayer.getColor());
      grid.getGrid()[i][j].updateState(currentPlayer.getSymbol());
      console.log("State : "+ grid.getGrid()[i][j].getState());
        //need logic to make sure they haven't dont do an illegal move before incrementing
        turnCount++;
        }
      }
    }
}
console.log(indexH);
console.log(indexV);

}

function checkTilesForWinCon()
{
  //iterate throughout tiles to check winning patterns

  //Determine which row and and column the new tile belongs
  // GO TO THE THE START OF THESE ROWS/COLUMNS and check for win con
  //easier than using the input tile as a pivot



}
