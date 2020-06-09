const Tile_States = {
  CROSS: 'X',
  NAUGHT: 'O',
  EMPTY: ' '
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
    stroke(0); //draw black outline box
    strokeWeight(3);
    rect(this.getXpos(),this.getYpos(), this.length, this.length);

    this.drawSymbol(); //cross,naut etc
    console.log(this.state);
  }


  drawSymbol() //determines which symbol to draw
  {
      switch(this.state)
      {
        case Tile_States.CROSS:
          this.drawCross();
          break;
        case Tile_States.NAUGHT:
          this.drawNaut();
          break;
        case Tile_States.EMPTY:
          break;
      }
  }

  drawCross()
  {
    //draw 2 lines from each corners and cross them

    let offset = this.length/4;
    stroke(255,255,255); //draw white
    strokeWeight(6);

    line(this.x + offset, this.y + offset, (this.x + this.length - offset), (this.y + this.length - offset));
    line((this.x + this.length - offset), this.y + offset, this.x + offset, (this.y + this.length- offset));
  }

  drawNaut()
  {
    noFill();
    stroke(255,255,255); //draw white
    strokeWeight(6);
    circle(this.getCenterX(), this.getCenterY(), this.length/2); //x,y , diamater
  }

  getCenterX()
  {
    return (this.x + this.length/2);
  }

  getCenterY()
  {
      return (this.y + this.length/2);
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
