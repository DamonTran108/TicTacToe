let tiles = [

];

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

for(let loop=1; loop<=3;loop++){
  for(let row= 1; row <=3; row++){ //constructor(Xcord,Ycord,length,states,color)
    tiles.push(new Tile(row*200,loop*200,width, Tile_States.EMPTY,color(200), color(255)));
  }
}

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
  for(let i = 0; i<tiles.length;i++){
    tiles[i].drawMe();
  }



}

// When the user clicks the mouse
function mousePressed() {
  // Check if mouse is inside the circle

let currentPlayer = playerList[(turnCount % 2)];

  for(let i = 0; i<tiles.length;i++){
    if (tiles[i].isInBounds(mouseX, mouseY)) {

      if (tiles[i].canInsertSymbol())
      {
      tiles[i].updateColour(currentPlayer.getColor());
      tiles[i].updateState(currentPlayer.getSymbol());
      console.log(tiles[i].getState());
      //need logic to make sure they haven't dont do an illegal move before incrementing
      turnCount++;
    }
  }
  }

}

function checkTilesForWinCon()
{
  //iterate throughout tiles to check winning patterns


  
}
