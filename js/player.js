class Player{
  constructor(name, symbol, color){
    this.symbol = symbol;
    this.color = color;
    this.name = name;
  }

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
