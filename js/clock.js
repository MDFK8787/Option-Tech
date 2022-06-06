var t = null;
function timer(){
dt = new Date();
var y = dt.getFullYear();
var month = dt.getMonth();
var date = dt.getDate();
var h = dt.getHours();
var m = dt.getMinutes();
var s = dt.getSeconds();
if (m.toString().length == 1){
    m = "0" + m;
}
if (s.toString().length == 1){
    s = "0" + s;
}
document.getElementById("clock").innerHTML= "即時報價: " + y + "/" + (month+1) + "/" + date + " " + " " + h + ":" + m + ":" + s;
t = setTimeout(timer,1000);    
} 
