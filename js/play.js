let r, g, b;
let tiles = [

];

let height = 200;
let width = 200;
let canvasWidth = 900;
let canvasHeight = 900;


function setup() {
  let counter = 0;
  createCanvas(900, 900);
  // Pick colors randomly
  r = random(255);
  g = random(255);
  b = random(255);


for(let loop=1; loop<=3;loop++){
  for(let row= 1; row <=3; row++){ //constructor(Xcord,Ycord,length,states,color)
    let input_state = random(Tile_States);
    tiles.push(new Tile(row*200,loop*200,width, get_random_state() ,color(200)));
  }
}
  console.log(tiles);

}

function get_random_state()
{

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

  // Draw a circle
  strokeWeight(2);
  stroke(r, g, b);

//Iterate throughout the tile array and draw them
  for(let i = 0; i<tiles.length;i++){
    tiles[i].drawMe();
  }



}

// When the user clicks the mouse
function mousePressed() {
  // Check if mouse is inside the circle
  for(let i =0; i<tiles.length;i++){
    if (tiles[i].isInBounds(mouseX, mouseY)) {
      tiles[i].updateColour(color(random(255),random(255),random(255)))
    }
  }
}
