class Player{
  constructor(name, symbol, color){
    this.symbol = symbol;
    this.color = color;
    this.name = name;
  }

//Currently doesn't need sets as the player data will not change during gameplay
  getSymbol(){
    return this.symbol;
  }

  getColor()
  {
    return this.color;
  }

  getName()
  {
    return this.name;
  }
}
