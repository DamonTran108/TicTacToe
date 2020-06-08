const States = {
  CROSS: 'X',
  NAUGHT: 'O'
};

class Tile{
  x = 0;
   y = 0;
  state = null;
  color = null;

  constructor(Xcord,Ycord,States,color){
    this.x = Xcord;
    this.y = Ycord;

    this.state = States;

    this.color = color;


  }
}
