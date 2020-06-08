let r, g, b;
let tiles = [

];

let height = 200;
let width = 200;
let locationX = 0;
let locationY =0;

function setup() {
  var tile1 = new Tile(22,22,null,null);
  createCanvas(720, 400);
  // Pick colors randomly
  r = random(255);
  g = random(255);
  b = random(255);
  tile.push(locationX,locationY);
  console.log(tile);
  console.log(tile[0]);


console.log(tile1);
}

function draw() {

  // Draw a circle
  strokeWeight(2);
  stroke(r, g, b);
  fill(r, g, b, 127);
  rect(240, 250, 200, 200);

}

// When the user clicks the mouse
function mousePressed() {
  // Check if mouse is inside the circle

  if (mouseX > tile[0].x && mouseX < (tile[0].x+width) && mouseY > tile[0].y && mouseY < (tile[0].y+height)) {
    // Pick new random color values
    r = random(255);
    g = random(255);
    b = random(255);
  }

}
