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
//starts from 0 so it works easier with the array
let turnCount = 0;


function setup() {

playerList.push(new Player(Tile_States.NAUGHT, color(0,0,255)));
playerList.push(new Player(Tile_States.CROSS, color(255,0,0)));


  player = new Player(Tile_States.NAUGHT);
  let counter = 0;
  createCanvas(900, 900);
  // Pick colors randomly

for(let loop=0; loop<3;loop++){
  for(let row= 0; row <3; row++){ //constructor(Xcord,Ycord,length,states,color)
    tiles[loop][row] = new Tile(row*200,loop*200,width, Tile_States.EMPTY,color(200), color(255));
  }
}
console.log(tiles);
}

function get_random_state()
{
  // brute force, use random int to determine states

  let i = Math.floor(Math.random() * Math.floor(3));
  if (i == 0)
  {
    return Tile_States.NAUGHT
  }
  else if (i == 1)
  {
    return Tile_States.CROSS
  }
  else if (i == 2)
  {
    return Tile_States.EMPTY
  }
}
function draw() {
//Iterate throughout the tile array and draw them

  for(let loop=0; loop<3;loop++){
    for(let row= 0; row <tiles[loop].length; row++){ //constructor(Xcord,Ycord,length,states,color)
      tiles[loop][row].drawMe();
    }
  }

}

// When the user clicks the mouse
function mousePressed() {
  // Check if mouse is inside the circle

let currentPlayer = playerList[(turnCount % 2)];
  for(let i = 0; i < tiles.length; i++){
    for(let j = 0; j<tiles[i].length;j++){
      if (tiles[i][j].isInBounds(mouseX, mouseY)) {

        if (tiles[i][j].canInsertSymbol())
        {
          indexH = i;
          indexV= j;
        tiles[i][j].updateColour(currentPlayer.getColor());
        tiles[i][j].updateState(currentPlayer.getSymbol());
        console.log(tiles[i][j].getState());
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

  //Find the current tile that was just mouseClicked
  //Then search wincon from that tile. We check to see the type of tile. i.e. if its a corner tile, you know win con is row,diagonal and column.
  //If tile is a middle one then check row and columns
  //If tile is actual centre piece, check row,column,diagnols.


}
