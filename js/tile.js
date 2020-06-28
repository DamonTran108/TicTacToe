const Tile_States = {
  CROSS: 'X',
  NAUGHT: 'O',
  EMPTY: ' '
};

class Tile{


  constructor(Xcord,Ycord,length,states,tilecolor,symbolcolor){
    this.x = Xcord;
    this.y = Ycord;
    this.length = length; //square so only need to store one

    this.state = states; //initial state will need to be empty, but for testing sake it's random
    this.Tile_color = tilecolor; // Will be player color
    this.default_color = tilecolor; //initial color before being overidden. //inefficient to store in tile so need to use it more to justify it
    this.Symbol_color = symbolcolor;


  }


  resetTile()
  {

    this.state = Tile_States.EMPTY; //reset state
    this.Tile_color = this.default_color; //back to initial colour (usually grey)
    //symbol color will be updated anyway when clicked on
    //this.Symbol_color = ;

  }

  drawMe()
  {

    fill(this.Tile_color); //set to currently stored colour
    stroke(0); //draw black outline box
    strokeWeight(4);
    //draws tile as a rect
    rect(this.getXpos(),this.getYpos(), this.length, this.length);
    this.drawSymbol(); //draw cross or naut ontop of tile

  }


  drawSymbol() //determines which symbol to draw
  {
      switch(this.getState())
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
    stroke(this.Symbol_color); //draw white - perimter of tiles
    strokeWeight(6); //how thicc the line is

    line(this.x + offset, this.y + offset, (this.x + this.length - offset), (this.y + this.length - offset));
    line((this.x + this.length - offset), this.y + offset, this.x + offset, (this.y + this.length- offset));
  }

  drawNaut()
  {
    noFill();
    stroke(this.Symbol_color); //draw white
    strokeWeight(6);
    circle(this.getCenterX(), this.getCenterY(), this.length/2); //x,y , diamater
  }


  canInsertSymbol()
  {
    return (this.getState() == Tile_States.EMPTY);
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
  }

  updateState(newState)
  {
    this.state = newState;
  }

  getState()
  {
    return this.state;
  }
  updateColour(input_color)
  {
      this.Tile_color = input_color;
  }


getXpos(){
  return this.x;
}


getYpos(){
  return this.y;
}
}
