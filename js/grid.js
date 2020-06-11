let emptyArray = [,,,];
class Grid{
  //WHEN DOING STUFF WITH THE ROWS AND COLUMNS
  //FIRST DO THE COLUMN ITERATION
  //THEN DO THE ROW ITERATION


  //Example
  //  for(let loop=0; loop<this.cLength;loop++)
  //  {
  //    for(let row= 0; row <this.rLength; row++)
  //    {
  //    this.grid[loop][row].drawMe();
  //    }
  //  }

  constructor(xCord,yCord,i_t_length, rowLength, colLength){
    this.x = xCord;
    this.y = yCord;
    this.t_length = i_t_length;

    this.rLength = rowLength;
    this.cLength = colLength;

    this.grid = [

    ];

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

    //Creates empty tempArray as a row
    //Populate row with tiles
    //Push

    for(let loop=0; loop<this.cLength;loop++){

      let tempArray = [];

      //populate new temp array with tiles
      for(let row= 0; row <this.rLength; row++){ //constructor(Xcord,Ycord,length,states,color)
        tempArray.push(new Tile((row*this.t_length +this.x) ,(loop*this.t_length+this.y),this.t_length, Tile_States.EMPTY,color(200), color(255)));
      }
       //push newly populated array into grid 2d array
      this.grid.push(tempArray);
    }
  }

  getGrid()
  {
  return this.grid;
  }

  drawGrid()
  {
    for(let loop=0; loop<this.cLength;loop++){
       //tile constructor(Xcord,Ycord,length,states,color)
      for(let row= 0; row <this.rLength; row++){
        this.grid[loop][row].drawMe();
      }
    }

  }


  checkGridBounds(i_mouseX, i_mouseY, i_player)
  {
    for(let i = 0; i < this.getColLength(); i++)
    {
      for(let j = 0; j< this.getRowLength();j++)
      {
        if (this.getGrid()[i][j].isInBounds(i_mouseX, i_mouseY))  //If is on one of the tiles
        {
          if (this.getGrid()[i][j].canInsertSymbol()) //check if they can insert the symbol
          {

            this.getGrid()[i][j].updateColour(i_player.getColor());
            this.getGrid()[i][j].updateState(i_player.getSymbol());
            //breaks out of the loop straight away as soon as it's found
            //Prevents algorithm from searching through other itles when the required on is already found
            return true;
          }
        }
      }
  }

  //Click doesn't find any tiles so does not do any processes
  return false;

  }

}
