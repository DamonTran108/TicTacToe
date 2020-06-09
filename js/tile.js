const States = {
  CROSS: 'X',
  NAUGHT: 'O'
};

class Tile{


  constructor(Xcord,Ycord,states,color){
    this.x = Xcord;
    this.y = Ycord;

    this.state = states;

    this.color = color;


  }


getXpos(){
  return this.x;
}

getYpos(){
  return this.y;
}
}
