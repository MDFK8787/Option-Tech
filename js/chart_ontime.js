tem = []
strike = []

const data = {
  labels: strike,
  datasets: [{
    label: 'Weekly Sales',
    data: tem,
    backgroundColor: [
      'rgba(255, 0, 0, 1)',
    ],
    fill:true,
    tension:0.4,
    pointRadius:0,
    pointHitRadius:0,
    pointHoverRadius:0,
    borderWidth:2
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
      },pl_y: {
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

function read_degree(time){//按照時間更新圖表 (半小時)
  var url_call = 'json/degree.json';
  method: 'POST',
    fetch(url_call)
      .then(function (resp){
        console.log('got chart data')
        return resp.json();
      })
      .then(function(data){
        console.log(data)
        var position = time
        var data_lengh = Object.keys(data).length
        tem.length = 0
        strike.length = 0
        for(i=0;i<data_lengh;i++){
          tem.push((data[i][position.toString()]*0.01))
          strike.push((data[i]["contract/time"]*11400))
        }
        console.log(tem)
        console.log(strike)
        myChart.update
      })
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