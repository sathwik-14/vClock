var hr=0;
var min=0;
var sec=0;
var count=0;
var timer=false;
const lapArray = [];
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const lapsBtn = document.getElementById("laps");
if (localStorage.getItem("lapArray") === null) {
  localStorage.setItem("lapArray", JSON.stringify([]));
}
// localStorage.setItem("lapArray",JSON.stringify([]));

const displayElement = document.getElementById("display");
function start(){
    timer = true;
    
    startBtn.disabled = true;
    stopBtn.disabled = false;
    lapsBtn.disabled = false;
    stopwatch();
}
function stop(){
   
    // console.log(lapArray);
   
startBtn.disabled = false;
stopBtn.disabled = true;
timer = false;
}

function reset() {
    const display = document.getElementById("display");
    // display.innerHTML='';
    
  timer = false;
  hr = 0;
  min = 0;
  sec = 0;
  count=0;
   document.getElementById("sec").innerHTML = "00";
   document.getElementById("min").innerHTML = "00";
   document.getElementById("hr").innerHTML = "00";
    document.getElementById("count").innerHTML = "00";
}
function laps() {
    var localArray;
  lapsec = document.getElementById("sec").textContent;
  lapMin = document.getElementById("min").textContent;
  lapHr = document.getElementById("hr").textContent;
  lapCount = document.getElementById("count").textContent;
  const newLap = lapHr + "hr " + lapMin + "min " + lapsec + "sec " + lapCount;
  const local = localStorage.getItem("lapArray")
    if(local==[] || local==undefined){
        localArray = [];
    }
    else{
        localArray=JSON.parse(local);
        console.log(localArray);
    }
    localArray.push(newLap);
    localStorage.setItem("lapArray",JSON.stringify(localArray));
    display();
  
}
function display() {
  const displayItem = localStorage.getItem("lapArray");
  const displayParseItem = JSON.parse(displayItem);

  if (displayParseItem == [] || displayParseItem == undefined) {
    // Handle the case when displayParseItem is empty or undefined
    return;
  }

  const ulElement = document.createElement("ul");

  // Clear existing content of displayElement
  displayElement.innerHTML = "";

  displayParseItem.forEach((element) => {
    const listItem = document.createElement("li");
    listItem.classList.add("laps");
    listItem.textContent = element;
    ulElement.appendChild(listItem);
  });

  displayElement.appendChild(ulElement);
}

function clearLap(){
    empty = localStorage.getItem("lapArray");
    emptyArray = JSON.parse(empty);
    emptyArray =[];
    localStorage.setItem("lapArray",JSON.stringify(emptyArray));
    display();
}

function stopwatch(){
if(timer == true){
    count=count+1;
    if(count==100){
        sec=sec+1;
        count=0;
    }
    if(sec == 60){
        min=min+1;
        sec=0;
    }
    if(min==60){
        hr=hr+1;
        min=0;
        sec=0;
    }
    var hrString = hr;
    var minString =min;
    var secString = sec;
    var countString = count;
    if(hr<10){
        hrString ="0"+hrString;
    }
    if(min<10){
        minString="0"+minString;
    }
    if(sec<10){
      secString ="0"+secString;
    }
    if(count<10){
        countString ="0"+countString;
    }
    document.getElementById("sec").innerHTML=secString;
    document.getElementById("min").innerHTML=minString;
    document.getElementById("hr").innerHTML=hrString;
    document.getElementById("count").innerHTML=countString;
    setTimeout("stopwatch()", 10);
}
}
display();