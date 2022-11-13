//半小時偵測變數
var Monday = [21,22,23,24,25,26,27,28,29,30]
var Tuesday = [31,32,33,34,35,36,37,38,39,40]
var Wednesday = [41,42,43,44,45,46,47,48,49,50]
var Thursday = [1,2,3,4,5,6,7,8,9,10]
var Friday = [11,12,13,14,15,16,17,18,19,20]
var Saturday = [11,12,13,14,15,16,17,18,19,20]//六日顯示禮拜五
var Sunday = [11,12,13,14,15,16,17,18,19,20]
var chartData = [Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday]

//時鐘變數
var t = null;
var oclock = null;

//每分鐘變圖變數
var Hours = [240,240,240,240,240,240,240,240,240,0,60,120,180,240,240,240,240,240,240,240,240,240,240,240,240,240]//除了9.~ 12.以外都顯示13.
var chartData = [Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday]



function dapanChartCheck(){//一開始開網頁確認該顯示的圖表(一次性)

    dt = new Date();
    var h = dt.getHours();
    var m = dt.getMinutes();
    var d = dt.getDay();
    
    if(d == 0 || d == 5 || d == 6){
        var data_layer1 = allday_data[1]
        if((Hours[h] + Number(m)) > 270){
            var data_layer2 = data_layer1[(Hours[h] + 30)]
        }else{
            var data_layer2 = data_layer1[(Hours[h] + Number(m))]
        }
    }else if(d == 4){
        var data_layer1 = allday_data[0]
        if((Hours[h] + Number(m)) > 270){
            var data_layer2 = data_layer1[(Hours[h] + 30)]
        }else{
            var data_layer2 = data_layer1[(Hours[h] + Number(m))]
        }        
    }else{
        var data_layer1 = allday_data[d+1]
        if((Hours[h] + Number(m)) > 270){
            var data_layer2 = data_layer1[(Hours[h] + 30)]
        }else{
            var data_layer2 = data_layer1[(Hours[h] + Number(m))]
        }
    }
    chartUpdate_perMin(data_layer2)
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

    console.log(s)
    //圖表機率每秒偵測(過一分鐘換新圖)
    if(s == '00'){
        if(d == 0 || d == 5 || d == 6){
            var data_layer1 = allday_data[1]
            if((Hours[h] + Number(m)) > 270){
                var data_layer2 = data_layer1[(Hours[h] + 30)]
            }else{
                var data_layer2 = data_layer1[(Hours[h] + Number(m))]
            }
        }else if(d == 4){
            var data_layer1 = allday_data[0]
            if((Hours[h] + Number(m)) > 270){
                var data_layer2 = data_layer1[(Hours[h] + 30)]
            }else{
                var data_layer2 = data_layer1[(Hours[h] + Number(m))]
            }        
        }else{
            var data_layer1 = allday_data[d+1]
            if((Hours[h] + Number(m)) > 270){
                var data_layer2 = data_layer1[(Hours[h] + 30)]
            }else{
                var data_layer2 = data_layer1[(Hours[h] + Number(m))]
            }
        }
        chartUpdate_perMin(data_layer2)
    }
    
    t = setTimeout(timer,1000);    
} 
