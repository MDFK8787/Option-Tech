var Monday = [21,22,23,24,25,26,27,28,29,30]
var Tuesday = [31,32,33,34,35,36,37,38,39,40]
var Wednesday = [41,42,43,44,45,46,47,48,49,50]
var Thursday = [1,2,3,4,5,6,7,8,9,10]
var Friday = [11,12,13,14,15,16,17,18,19,20]
var Saturday = [11,12,13,14,15,16,17,18,19,20]//六日顯示禮拜五
var Sunday = [11,12,13,14,15,16,17,18,19,20]
var chartData = [Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday]
var t = null;
var oclock = null;


function dapanChartCheck(){//一開始開網頁確認該顯示的圖表
    dt = new Date();
    var h = dt.getHours();
    var m = dt.getMinutes();
    var d = dt.getDay();
    
    if(m >= 00 && m < 30){
        if(h == 9){
            oclock = chartData[d][0]
            read_degree(oclock)
        }else if(h == 10){
            oclock = chartData[d][2]
            read_degree(oclock)
        }
        else if(h == 11){
            oclock = chartData[d][4]
            read_degree(oclock)
        }
        else if(h == 12){
            oclock = chartData[d][6]
            read_degree(oclock)
        }
        else if(h >= 13){
            oclock = chartData[d][8]
            read_degree(oclock)
        }
    }
    if(m >= 30 && m <= 59){
        if(h == 9){
            oclock = chartData[d][1]
            read_degree(oclock)
        }else if(h == 10){
            oclock = chartData[d][3]
            read_degree(oclock)
        }
        else if(h == 11){
            oclock = chartData[d][5]
            read_degree(oclock)
        }
        else if(h == 12){
            oclock = chartData[d][7]
            read_degree(oclock)
        }
        else if(h >= 13){
            oclock = chartData[d][9]
            read_degree(oclock)
        }
    }
}

function timer(){//時鐘
    dt = new Date();
    var y = dt.getFullYear();
    var month = dt.getMonth();
    var date = dt.getDate();
    var h = dt.getHours();
    var m = dt.getMinutes();
    var s = dt.getSeconds();
    var d = dt.getDay();
    if (m.toString().length == 1){
        m = "0" + m;
    }
    if (s.toString().length == 1){
        s = "0" + s;
    }
    document.getElementById("clock").innerHTML= "即時報價: " + y + "/" + (month+1) + "/" + date + " " + " " + h + ":" + m + ":" + s;

    //圖表機率半小時偵測
    if(m == '00' && s == '00'){
        if(h == 9){
            oclock = chartData[d][0]
            read_degree(oclock)
        }else if(h == 10){
            oclock = chartData[d][2]
            read_degree(oclock)
        }
        else if(h == 11){
            oclock = chartData[d][4]
            read_degree(oclock)
        }
        else if(h == 12){
            oclock = chartData[d][6]
            read_degree(oclock)
        }
        else if(h == 13){
            oclock = chartData[d][8]
            read_degree(oclock)
        }
    }
    if(m == '30' && s == '00'){
        if(h == 9){
            oclock = chartData[d][1]
            read_degree(oclock)
        }else if(h == 10){
            oclock = chartData[d][3]
            read_degree(oclock)
        }
        else if(h == 11){
            oclock = chartData[d][5]
            read_degree(oclock)
        }
        else if(h == 12){
            oclock = chartData[d][7]
            read_degree(oclock)
        }
        else if(h == 16){
            oclock = chartData[d][9]
            read_degree(oclock)
        }
    }
    t = setTimeout(timer,1000);    
} 
