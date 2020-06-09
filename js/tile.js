const States = {
  CROSS: 'X',
  NAUGHT: 'O'
};

class Tile{


  constructor(Xcord,Ycord,length,states,color){
    this.x = Xcord;
    this.y = Ycord;
    this.length = length; //square so only need 1

    this.state = states;

    this.color = color;


  }

  drawMe()
  {
    //stroke(color);
    fill(this.color);
    rect(this.getXpos(),this.getYpos(), this.length, this.length);

  }

  isInBounds(input_x, input_y) //returns boolean
  {
    return (input_x > this.getXpos() &&
    input_x < (this.getXpos()+ this.length) &&
    input_y > this.getYpos() &&
    input_y < (this.getYpos()+this.length))
    //mouseX > tiles[i].getXpos() && mouseX < (tiles[i].getXpos()+200) && mouseY > tiles[i].getYpos() && mouseY < (tiles[i].getYpos()+200)
  }

  updateColour(input_color)
  {
      this.color = input_color;
  }

getXpos(){
  return this.x;
}


getYpos(){
  return this.y;
}
}
