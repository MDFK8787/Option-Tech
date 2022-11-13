//1分鐘圖表變數
loop = 0//迴圈次數
per_min_data = 271//根據機率圖表一天組數自行更改
per_min_strike = []
allday_data = []



tem = []
strike = []
pl_array = []
//最高履約價
hstrike = 0;
hpercent = 0;
var hstrike_target = document.getElementById("target-strike-id");
var pasu_target = document.getElementById("pasu-id");

//按鈕變色變數
sc_style = null;
bc_style = null;
sp_style = null;
bp_style = null;
//損益變數
var maxP_target = document.getElementById("maxP-id");
var maxL_target = document.getElementById("maxL-id");
caculate_pl_array = []
caculate_pl_strike_array = []
caculate_pl_price_array = []
sell_call = 1
buy_call = 2
sell_put = 4
buy_put = 8


//圖表
const data = {
  labels: strike,
  datasets: [{
    label: 'Weekly Sales',
    data: tem,
    backgroundColor: [
      'rgba(152,217,242, 0.6)',
    ],
    fill:true,
    tension:0.4,
    pointRadius:0,
    pointHitRadius:0,
    pointHoverRadius:0,
    borderWidth:2,
    yAxisID: 'y',
  },{
    label: 'Profit Lost',
    data: pl_array,
    backgroundColor: [
      'rgba(255, 0, 0, 0.2)',
    ],
    fill:{
      target:'origin',
      below:'rgba(0, 255, 0, 0.2)',
      above:'rgba(255, 0, 0, 0.2)'
    },
    tension:0.4,
    pointRadius:0,
    pointHitRadius:0,
    pointHoverRadius:0,
    borderWidth:2,
    yAxisID: 'pl_y'
  }]
};

//客製化圖表細節表
const customtooltips = {
  id: 'customtooltips',
  afterDraw(chart , args , pluginOptions){
    const {ctx , chartArea:{top , bottom , left , right ,width , height} , scales:{x , y}} = chart;
    ctx.save();
    myChart.canvas.addEventListener('mousemove' , (e) => {
      tooltipPosition(e)
    });

    function tooltipPosition(mousemove){

      let xTooltip;
      let yTooltip;
      const rightside = right - mousemove.offsetX;
      const topside = bottom - mousemove.offsetY;
      if(rightside <= (right/2)){
        xTooltip = mousemove.offsetX -170;
      } else {
        xTooltip = mousemove.offsetX +20
      }
      if(topside <= (bottom/2)){
        yTooltip = mousemove.offsetY -70;
      } else {
        yTooltip = mousemove.offsetY +20
      }
      
      if(mousemove.offsetX >= left && mousemove.offsetX <= right && mousemove.offsetY >= top && mousemove.offsetY <= bottom){
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.lineJoin = 'round';
        ctx.lineWidth = 0.5;
        ctx.fillRect(xTooltip , yTooltip , 150 , 60);
        ctx.strokeRect(xTooltip , yTooltip , 150 , 60);
        ctx.closePath();
        ctx.restore();

        const dapen = data.labels[x.getValueForPixel(mousemove.offsetX)];
        const pst = y.getValueForPixel(mousemove.offsetY).toFixed(2);


        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'black';
        ctx.font = '14px Arial';
        ctx.fillText('落點 : ' + dapen , xTooltip + 74 , yTooltip + 28)
        ctx.restore();

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'black';
        ctx.font = '14px Arial';
        ctx.fillText('機率 : ' + pst , xTooltip + 74 , yTooltip + 42)
        ctx.restore();
      }
    }
    
  }
}


// config 
const config = {
  type: 'line',
  data,
  options: {
    maintainAspectRatio:false,
    scales: {
      x: {
        beginAtZero: true,
        grid:{
          color:'black'
        },
        ticks:{
          callback: function(val, index) {//讓x軸只顯示整數(四捨五入過)
            // Hide every 2nd tick label
            return Math.round(this.getLabelForValue(val));
          },
          display: true,
          stepsize: 1,
          autoSkip: true,
          maxTicksLimit: 10,
          color:'black',
          fontcolor:'black'
        }
      },
      // pl_x: {
      //   display: false,
      //   position:'bottom',
      //   beginAtZero: true,
      //   labels: [1, 2, 3, 4, 5, 6, 7, 8],
      //   grid:{
      //     color:'black'
      //   },
      //   ticks:{
      //     display: false,
      //     stepsize: 1,
      //     autoSkip: true,
      //     maxTicksLimit: 10,
      //     color:'black',
      //     fontcolor:'black'
      //   }
      // },
      y: {
        beginAtZero: true,
        grid:{
          color:'black'
        },
        ticks:{
          display: true,
          stepsize: 10,
          autoSkip: true,
          maxTicksLimit: 10,
          color:'black',
          fontcolor:'black'
        }
      },
      pl_y: {
        suggestedMin: -100,
        suggestedMax: 100,
        position:'right',
        beginAtZero: false,
        grid:{
          display:false
        },
        ticks:{
          stepsize: 10,
          display: true,
          autoSkip: true,
          maxTicksLimit: 10,
          color:'black',
          fontcolor:'black'
        }
      }
    },
    plugins:{
      legend:{
        display:false
      },
      tooltip:{
        mode: 'nearest',
        axis: 'x',
        //intersect: false
      }
    },
  },
  plugins: [customtooltips]
};

// 宣告chart.js
const myChart = new Chart(
  document.getElementById('myChart'),
  config
);

myChart.canvas.addEventListener('mousemove' , (e) => {
  crosshairline(myChart , e)
})

//鼠標虛線
function crosshairline(chart , mousemove){
  const {canvas , ctx , chartArea:{left , right , top , bottom}  } = chart;
  const corX = mousemove.offsetX;
  const corY = mousemove.offsetY;

  chart.update('none');
  ctx.restore();

  if(corX >= left && corX <= right && corY >= top && corY <= bottom){
    canvas.style.cursor = 'crosshair';
  } else {
    canvas.style.cursor = 'default';
  }
  

  ctx.lineWidth = 0.5;
  ctx.strokeStyle = 'black';
  ctx.setLineDash([4,3])

  ctx.beginPath();
  if(corY >= top && corY <= bottom && corX >= left && corX <= right){
    ctx.moveTo(corX , top);
    ctx.lineTo(corX , bottom);
    ctx.stroke();
  }
  ctx.closePath();

  ctx.beginPath();
  if(corY >= top && corY <= bottom && corX >= left && corX <= right){
    ctx.moveTo(left , corY);
    ctx.lineTo(right , corY);
    ctx.stroke();
  }
  ctx.closePath();
  crosshairLabel(chart , mousemove);
  crossHairPoint(chart , mousemove);
}

//虛線旁數值
function crosshairLabel(chart , mousemove){
  const {canvas , ctx , chartArea:{top , bottom , left , right , width , height} , scales:{x , y} } = chart;

  const corX = mousemove.offsetX;
  const corY = mousemove.offsetY;
  const textWidth = ctx.measureText(data.labels[x.getValueForPixel(corX)]).width + 10;

  ctx.font = '12px sans-serif';
  ctx.fillStyle = 'white';
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';

  ctx.beginPath();
  if(corY >= top && corY <= bottom && corX >= left && corX <= right){
    ctx.fillStyle = 'rgba(102,102,102,1)';
    ctx.fillRect(0 , corY-10 , left , 20)
  }
  ctx.closePath();

  ctx.fillStyle = 'white';
  ctx.fillText(y.getValueForPixel(corY).toFixed(2) , left/2 , corY);//toFixed(2)小數點顯示多少位

  ctx.beginPath();
  if(corY >= top && corY <= bottom && corX >= left && corX <= right){
    ctx.fillStyle = 'rgba(102,102,102,1)';
    ctx.fillRect(corX - (textWidth/2) , bottom , textWidth , 20)
  }
  ctx.closePath();

  ctx.fillStyle = 'white';
  ctx.fillText(data.labels[x.getValueForPixel(corX)], corX , bottom+10);//toFixed(2)小數點顯示多少位
}

function crossHairPoint(chart , mousemove){
  const {canvas , ctx , chartArea:{top , bottom , left , right , width , height} , scales:{x , y} } = chart;

  const corX = mousemove.offsetX;
  const corY = mousemove.offsetY;

  ctx.beginPath();
  ctx.fillStyle = 'rgba(102,102,102,1)';
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 1;
  ctx.setLineDash([])

  const angle = Math.PI / 180;

  for(let i=0;i<x._gridLineItems.length-1;i++){
    if(corX >= x._gridLineItems[i].tx1 && corX <= x._gridLineItems[i+1].tx1){
      let ystart = y.getPixelForValue(data.datasets[0].data[i]);

      ctx.arc(
        corX,
        ystart,
        5,
        angle * 0,
        angle * 360,
        false
      );
      ctx.fill();
      ctx.stroke();
    }

    

    ctx.closePath();
  }
}
load_degree_1min()

function load_degree_1min(){//按照時間更新圖表 (1min)
  var url_call = 'json/degree per minute.json';
  method: 'POST',
    fetch(url_call)
      .then(function (resp){
        console.log('got 1min data')
        return resp.json();
      })
      .then(function(data){
        console.log(data)
        var data_lengh = Object.keys(data).length
        
        per_min_strike.length = 0
        for(i=0;i<data_lengh;i++){
          strike.push(Math.round((1+data[i]["漲跌幅"])*dapan_strike));
        }

        var tem_per_min_data = per_min_data
        for(z=0;z<5;z++){
          var tem_day_data = []
          for(j=loop;j<tem_per_min_data;j++){
            var tem_data = []
            for(i=0;i<data_lengh;i++){
              tem_data.push(data[i][j.toString()])
            }
            tem_day_data.push(tem_data)
          }
          allday_data.push(tem_day_data)
          loop += per_min_data
          tem_per_min_data += per_min_data
        }
      })
}

function chartUpdate_perMin(x_data){
  myChart.data.datasets[0].data = x_data;
  myChart.update

  hstrike = 0;
  hpercent = 0;
  console.log(x_data.length)
  for(i=0;i<x_data.length;i++){
    if(x_data[i] > hpercent){
      hpercent = x_data[i]
      hstrike = i
      console.log(hpercent)
    }
    
  }
  hpercent = Math.round(hpercent*1000)/1000
  hstrike_target.innerHTML = strike[hstrike]
  pasu_target.innerHTML = hpercent.toString()+"%";
}

function read_degree(time){//按照時間更新圖表 (半小時)
  var url_call = 'json/degree.json';
  method: 'POST',
    fetch(url_call)
      .then(function (resp){
        console.log('got chart data')
        return resp.json();
      })
      .then(function(data){
        var position = time
        var data_lengh = Object.keys(data).length
        tem.length = 0
        strike.length = 0
        for(i=0;i<data_lengh;i++){
          tem.push(data[i][position.toString()]/100)
          strike.push((1+(data[i]["contract/time"]/100))*dapan_strike)
        }
        myChart.update

        hstrike = 0;
        hpercent = 0;
        for(i=0;i<data_lengh;i++){
          if(data[i][position.toString()]/100 > hpercent){
            hpercent = data[i][position.toString()]/100
            hstrike = (1+(data[i]["contract/time"]/100))*dapan_strike
          }
        }
        hpercent = Math.round(hpercent*1000)/1000
        hstrike = Math.round(hstrike)
        hstrike_target.innerHTML = hstrike.toString();
        pasu_target.innerHTML = hpercent.toString()+"%";
      })
}

//損益
function caculate(){
  var reducer = (accumulator, curr) => accumulator + curr;
  var sum = caculate_pl_array.reduce(reducer);
  
  var pmax = Math.round((caculate_pl_strike_array[1] - caculate_pl_strike_array[0] - Number(caculate_pl_price_array[0]) + Number(caculate_pl_price_array[1]))*100)/100;
  var lmax =Math.round((0-Number(caculate_pl_price_array[0]) + Number(caculate_pl_price_array[1]))*100)/100;

  if(sum == 3 || sum == 12){//多頭&空頭
    if(caculate_pl_strike_array[0] < caculate_pl_strike_array[1]){//多頭
      console.log("多頭")
      pl_array.length = 0;
      var y_length = strike.length;
      for(i=0;i<Math.round(y_length/3);i++){
        pl_array.push(lmax);
      }
      var a = lmax;
      for(i=Math.round(y_length/3);i<Math.round(y_length/3*2);i++){
        var plus = a + (Math.abs(pmax - lmax)/(Math.round(y_length/3*2)-Math.round(y_length/3)));
        pl_array.push(plus);
        a = a + (Math.abs(pmax - lmax)/(Math.round(y_length/3*2)-Math.round(y_length/3)));
      }
      for(i=(y_length-Math.round(y_length/3*2));i<y_length;i++){
        pl_array.push(pmax);
      }

      maxP_target.innerHTML = pmax
      maxL_target.innerHTML = lmax
      
      myChart.data[1] = pl_array;
      myChart.update
    }
    if(caculate_pl_strike_array[0] > caculate_pl_strike_array[1]){//空頭
      console.log("空頭")
      pl_array.length = 0;
      var y_length = strike.length;
      for(i=0;i<Math.round(y_length/3);i++){
        pl_array.push(50);
      }
      var a = 50;
      for(i=Math.round(y_length/3);i<Math.round(y_length/3*2);i++){
        var plus = a - (100/(Math.round(y_length/3*2)-Math.round(y_length/3)));
        pl_array.push(plus);
        a = a - (100/(Math.round(y_length/3*2)-Math.round(y_length/3)));
      }
      for(i=(y_length-Math.round(y_length/3*2));i<y_length;i++){
        pl_array.push(-50);
      }

      maxP_target.innerHTML = Math.round((caculate_pl_strike_array[1] - caculate_pl_strike_array[0] - Number(caculate_pl_price_array[0]) + Number(caculate_pl_price_array[1]))*100)/100;
      maxL_target.innerHTML = Math.round((0-Number(caculate_pl_price_array[0]) + Number(caculate_pl_price_array[1]))*100)/100;

      myChart.data[1] = pl_array;
      myChart.update
    }
  }
}

function buyCall(botton_id,number){

  if(bc_style != null){
    var restyle = document.getElementById("bt_call_buy_price_" + bc_style)
    restyle.style.backgroundColor = 'white';
    restyle.style.color = 'gray'
  }
  botton_id.style.backgroundColor = 'gray';
  botton_id.style.color = 'white'
  bc_style = number;

  var buyCall_strike = document.getElementById('bt_code_' + botton_id.name.toString()).textContent;
  var price = botton_id.textContent;

  if(caculate_pl_array.length == 2){
    caculate_pl_array.shift();
    caculate_pl_array.unshift(buy_call);
    caculate_pl_strike_array.shift();
    caculate_pl_strike_array.unshift(buyCall_strike);
    caculate_pl_price_array.shift();
    caculate_pl_price_array.unshift(price);
  }else{
    caculate_pl_array.unshift(buy_call);
    caculate_pl_strike_array.unshift(buyCall_strike);
    caculate_pl_price_array.unshift(price);
  }

  caculate()
  //當只點選一個按鈕才顯示純買買

  if(caculate_pl_array.length == 1){
    pl_array.length = 0;
    var y_length = strike.length;
    console.log(y_length)
    for(i=0;i<Math.round(y_length/2);i++){
      pl_array.push(-50);
    }
    var a = -50;
    for(i=Math.round(y_length/2);i<y_length;i++){
      var plus = a + (100/(y_length-Math.round(y_length/2)));
      pl_array.push(plus);
      a = a + (100/(y_length-Math.round(y_length/2)));
    }
    myChart.data[1] = pl_array;
    myChart.update
  }
  
}

function sellCall(botton_id,number){
  if(sc_style != null){
    var restyle = document.getElementById("bt_call_sell_price_" + sc_style)
    restyle.style.backgroundColor = 'white';
    restyle.style.color = 'gray'
  }
  botton_id.style.backgroundColor = 'gray';
  botton_id.style.color = 'white'
  sc_style = number;

  var sellCall_strike = document.getElementById('bt_code_' + botton_id.name.toString()).textContent;
  var price = botton_id.textContent;

  if(caculate_pl_array.length == 2){
    caculate_pl_array.pop();
    caculate_pl_array.push(sell_call);
    caculate_pl_strike_array.pop();
    caculate_pl_strike_array.push(sellCall_strike);
    caculate_pl_price_array.pop();
    caculate_pl_price_array.push(price);
  }else{
    caculate_pl_array.push(sell_call);
    caculate_pl_strike_array.push(sellCall_strike);
    caculate_pl_price_array.push(price);
  }

  caculate()

  if(caculate_pl_array.length == 1){
    pl_array.length = 0;
    var y_length = strike.length;
    for(i=0;i<Math.round(y_length/2);i++){
      pl_array.push(50);
    }
    var a = 50;
    for(i=Math.round(y_length/2);i<y_length;i++){
      var plus = a - (100/(y_length-Math.round(y_length/2)));
      pl_array.push(plus);
      a = a - (100/(y_length-Math.round(y_length/2)));
    }
    myChart.data[1] = pl_array;
    myChart.update
  }
  
}

function buyPut(botton_id,number){
  if(bp_style != null){
    var restyle = document.getElementById("bt_put_buy_price_" + bp_style)
    restyle.style.backgroundColor = 'white';
    restyle.style.color = 'gray'
  }
  botton_id.style.backgroundColor = 'gray';
  botton_id.style.color = 'white'
  bp_style = number;

  var buyPut_strike = document.getElementById('bt_code_' + botton_id.name.toString()).textContent;
  var price = botton_id.textContent;

  if(caculate_pl_array.length == 2){
    caculate_pl_array.shift();
    caculate_pl_array.unshift(buy_put);
    caculate_pl_strike_array.shift();
    caculate_pl_strike_array.unshift(buyPut_strike);
    caculate_pl_price_array.shift();
    caculate_pl_price_array.unshift(price);
  }else{
    caculate_pl_array.unshift(buy_put);
    caculate_pl_strike_array.unshift(buyPut_strike);
    caculate_pl_price_array.unshift(price);
  }
  caculate()

  if(caculate_pl_array.length == 1){
    pl_array.length = 0;
    var y_length = strike.length;
    var a = 50;
    for(i=0;i<Math.round(y_length/2);i++){
      var plus = a - (100/(y_length-Math.round(y_length/2)));
      pl_array.push(plus);
      a = a - (100/(y_length-Math.round(y_length/2)));
    }
    for(i=Math.round(y_length/2);i<y_length;i++){
      pl_array.push(-50);
    }
    myChart.data[1] = pl_array;
    myChart.update
  }
  
}

function sellPut(botton_id,number){
  if(sp_style != null){
    var restyle = document.getElementById("bt_put_sell_price_" + sp_style)
    restyle.style.backgroundColor = 'white';
    restyle.style.color = 'gray'
  }
  botton_id.style.backgroundColor = 'gray';
  botton_id.style.color = 'white'
  sp_style = number;

  var sellPut_strike = document.getElementById('bt_code_' + botton_id.name.toString()).textContent;
  var price = botton_id.textContent;

  if(caculate_pl_array.length == 2){
    caculate_pl_array.pop();
    caculate_pl_array.push(sell_put);
    caculate_pl_strike_array.pop();
    caculate_pl_strike_array.push(sellPut_strike);
    caculate_pl_price_array.pop();
    caculate_pl_price_array.push(price);
  }else{
    caculate_pl_array.push(sell_put);
    caculate_pl_strike_array.push(sellPut_strike);
    caculate_pl_price_array.push(price);
  }
  caculate()
  if(caculate_pl_array.length == 1){
    pl_array.length = 0;
    var y_length = strike.length;
    var a = -50;
    for(i=0;i<Math.round(y_length/2);i++){
      var plus = a + (100/(y_length-Math.round(y_length/2)));
      pl_array.push(plus);
      a = a + (100/(y_length-Math.round(y_length/2)));
    }
    for(i=Math.round(y_length/2);i<y_length;i++){
      pl_array.push(50);
    }
    myChart.data[1] = pl_array;
    myChart.update 
  }
}

/*

below:(context) =>{
        const chart = context.chart;
        const{ ctx , chartArea , data , scales } = chart;
        if(!chartArea){
          return null;
        }
        return belowGradient(ctx , chartArea , data , scales)
      },
      above:(context) =>{
        console.log(context);
        const chart = context.chart;
        const{ ctx , chartArea , data , scales } = chart;
        if(!chartArea){
          return null;
        }
        return aboveGradient(ctx , chartArea , data , scales)
      },

borderColor:(context) =>{
      const chart = context.chart;
      const{ ctx , chartArea , data , scales } = chart;
      if(!chartArea){
        return null;
      }
      return getGradient(ctx , chartArea , data , scales)
    },

function getGradient(ctx , chartArea , data , scales ){
  const {left , right , top , bottom , width , height} = chartArea;
  const {x , y} = scales;
  const gradientBorder = ctx.createLinearGradient(0,0,0,bottom);
  const shift = y.getPixelForValue(data.datasets[0].data[0]) / bottom;
  gradientBorder.addColorStop(0,'rgba(255,0,0,1)');
  gradientBorder.addColorStop(shift,'rgba(255,0,0,1)');
  gradientBorder.addColorStop(shift,'rgba(0,255,0,1)');
  gradientBorder.addColorStop(1,'rgba(0,255,0,1)');
  return gradientBorder;
}


function belowGradient(ctx , chartArea , data , scales){
  const {left , right , top , bottom , width , height} = chartArea;
  const {x , y} = scales;
  const gradientBackground = ctx.createLinearGradient(0 , y.getPixelForValue(data.datasets[0].data[0]), 0 , bottom);
  gradientBackground.addColorStop(0,'rgba(0,255,0,0)');
  gradientBackground.addColorStop(1,'rgba(0,255,0,0.5)');
  return gradientBackground;
}

function aboveGradient(ctx , chartArea , data , scales){
  const {left , right , top , bottom , width , height} = chartArea;
  const {x , y} = scales;
  const gradientBackground = ctx.createLinearGradient(0 , y.getPixelForValue(data.datasets[0].data[0]), 0 , top);
  gradientBackground.addColorStop(0,'rgba(255,0,0,0)');
  gradientBackground.addColorStop(1,'rgba(255,0,0,0.5)');
  return gradientBackground;
}




//虛線
const dottedLine = {
  id: 'dottedLine',
  beforeDatasetsDraw(chart , args , pluginOptions){
    const {ctx , data , chartArea:{left , right ,width} , scales:{x , y}} = chart;
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.setLineDash([4,3]);
    ctx.strokeStyle = 'rgba(102,102,102,1)';
    ctx.moveTo(left , y.getPixelForValue(data.datasets[0].data[0]));
    ctx.lineTo(right , y.getPixelForValue(data.datasets[0].data[0]));
    ctx.stroke();
    ctx.closePath();

    //虛線旁字
    ctx.beginPath();
    ctx.fillStyle = 'rgba(102,102,102,1)';
    ctx.fillRect(0 , y.getPixelForValue(data.datasets[0].data[0])-10 , left , 20)
    ctx.closePath();

    ctx.font = '12px sans-serif';
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText('9.33' , left/2 ,y.getPixelForValue(data.datasets[0].data[0]));
  }
}

*/