let emptyArray = [,,,];
let indexH = 0;
let indexV = 0;
let tile = null;
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

    //let tile_color_light = color(200);
    //let tile_color_dark = color(100);

    //will need to flip between colours create a contrasting grid
    //give the contrasting tile effect
    let col_array = [];
    let col_counter = 0;
    col_array.push(color(255)); //light
    col_array.push(color(100)); //dark


    //% 2
    for(let loop=0; loop<this.cLength;loop++){

      let tempArray = [];

      //populate new temp array with tiles
      //need to alternate colours
      for(let row= 0; row <this.rLength; row++){ //constructor(Xcord,Ycord,length,states,color)
        tempArray.push(new Tile((row*this.t_length +this.x) ,(loop*this.t_length+this.y),this.t_length, Tile_States.EMPTY,col_array[col_counter % 2], color(255)));
        col_counter++; //increment
      }
      //need to offset the grid contrasting if the grid is even
      if ((this.rLength % 2) == 0)
      {
        col_counter++;
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
            indexH = i;
            indexV = j;
            tile = this.getGrid()[i][j];
            this.getGrid()[i][j].updateColour(i_player.getColor());
            this.getGrid()[i][j].updateState(i_player.getSymbol());
            //console.log("Point X : " +  indexH);
            //console.log("Point Y : " +  indexV);
            //this.getTileChosen();
            //breaks out of the loop straight away as soon as it's found
            //Prevents algorithm from searching through other itles when the required on is already found
            return true;
          }
          else
          {
            this.clearGridStates();
          }
        }
      }
    }
  //Click doesn't find any tiles so does not do any processes
  return false;
  }

  clearGridStates()
  {
      //Resets all of the tiles back to nothing
      // could use the constructor but would require a ot of passed info

      //Iterate through the whole grid and change the symbol state to null
    for(let i = 0; i < this.getColLength(); i++)
    {
      for(let j = 0; j< this.getRowLength();j++)
      {
        //this.getGrid()[i][j].updateColour(null);
        this.getGrid()[i][j].resetTile();
      }
    }
  }

  getTileChosen()
  {
    return tile;
  }

  getIndexH()
  {
    return indexH;
  }

  getIndexV()
  {
    return indexV;
  }

  getXpos()
  {
  return this.x;
  }

  getYpos()
  {
  return this.y;
  }
}
