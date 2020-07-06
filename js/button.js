class Button
{
  constructor(Xcord, Ycord, name,text, colour)
  {
    this.Xcord = Xcord;
    this.Ycord = Ycord;
    this.name = name;
    this.text = text;
    this.colour = colour;
    var button = createButton(text);
    button.position(this.Xcord, this.Ycord);
  }
}
