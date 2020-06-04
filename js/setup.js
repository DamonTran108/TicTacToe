var cols = 4;
var rows = 4;

function setup() {
    //setup code here

    createCanvas(600, 600);



}

function draw(){
  background(51);

  for( var i = 0 ; i < cols; i++){
    for ( var j = 0; j < rows; j++){
      var x = i * 100;
      var y = j * 100;

      stroke(0);
      fill(255);
      rect(x,y, 100, 100);
    }
  }
}
