let emptyArray = [,,];
class Grid{
  constructor(xCord,yCord, rowLength, colLength){
    this.x = xCord;
    this.y = yCord;

    this.rLength = rowLength;
    this.cLength = colLength;

    this.grid = [
      [,,],
      [,,],
      [,,],
    ];
    this.grid.push(emptyArray);
    this.createGrid();
    console.log(this.grid);
  }

  getRowLength()
  {
    return this.rLength;
  }

  getColLength()
  {
    return this.cLength;
  }
  createGrid()
  {
    for(let loop=0; loop<this.rLength;loop++){
      for(let row= 0; row <this.cLength; row++){ //constructor(Xcord,Ycord,length,states,color)
        this.grid[loop][row] = new Tile(row*200,loop*200,width, Tile_States.EMPTY,color(200), color(255));
      }
    }
  }

  getGrid()
  {
  return this.grid;
  }
  drawGrid()
  {
    for(let loop=0; loop<this.cLength;loop++){
      for(let row= 0; row <this.rLength; row++){ //constructor(Xcord,Ycord,length,states,color)
      this.grid[loop][row].drawMe();
      }
    }
  }
}
