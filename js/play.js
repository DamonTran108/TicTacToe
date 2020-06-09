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
  for(let row= 1; row <=3; row++){
    tiles.push(new Tile(row*200,loop*200,null,null));
  }
}
  console.log(tiles);




}

function draw() {

  // Draw a circle
  strokeWeight(2);
  stroke(r, g, b);

  for(let i = 0; i<tiles.length;i++){
    rect(tiles[i].getXpos(), tiles[i].getYpos(), 200, 200);
  }



}

// When the user clicks the mouse
function mousePressed() {
  // Check if mouse is inside the circle
  for(let i =0; i<tiles.length;i++){
    if (mouseX > tiles[i].getXpos() && mouseX < (tiles[i].getXpos()+200) && mouseY > tiles[i].getYpos() && mouseY < (tiles[i].getYpos()+200)) {
      // Pick new random color values
      r = random(255);
      g = random(255);
      b = random(255);
    }
  }
}
