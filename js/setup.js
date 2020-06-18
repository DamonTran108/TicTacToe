var Page_V_Length = 800;  //Have a rectangle iand background
var Page_V_Offset = 50;
var Total_V_Length = (Page_V_Offset*2) + Page_V_Length; //for canvas and overall sizes
var Page_V_Cen = Total_V_Length /2;


var Page_H_Length = 920;
var Page_H_Offset = 500;
var Total_H_Length = (Page_H_Offset*2) + Page_H_Length;
var Page_H_Cen = Total_H_Length/2;

//var TextBox_Player1,TextBox_Player2;


function setup()
{
    //setup code here
    createCanvas(Total_H_Length, Total_V_Length);

    setupMenuBackground(); //nothing rn
    setupUsernameInput(); //create boxes and stuff to input in

}

function draw()
{
background(255,100,0)

drawMenuBackground()


}

function setupMenuBackground()
{


}
function drawMenuBackground() //no setup really needed
{
  //R G B A, set the colours
  //Maybe move to a textfile or somewhere more permenant
  //Make they be able to change so the colour scheme can be changed
  let Primary_Color = color(150,50,200);
  let Secondary_Color = color(150,50,200);
  let Background_Color = color(150,0,0);

  background(Background_Color)

  //Main menu box which will hold everything
  noStroke();
  fill(Primary_Color);
  rect(Page_H_Offset,Page_V_Offset, Page_H_Length, Page_V_Length);

  fill(Secondary_Color);

}


function setupUsernameInput()
{

  var TextBox_Player1;
  TextBox_Player1 = createInput();
  TextBox_Player1.position(Page_H_Cen,Page_V_Cen);


  var Text_PlayerSection = createElement('h2', 'damon smelss');
  Text_PlayerSection.position(Page_H_Cen,Page_V_Cen);
}

function drawUsernameInput()
{

}

function execute(){
  var value = document.getElementById("textbox1").value;
  console.log(value);
}
