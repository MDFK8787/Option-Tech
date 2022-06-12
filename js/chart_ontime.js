Chart.defaults.plugins.legend = false

const ctx = document.getElementById('myChart');
const myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, ],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
      ],
      borderWidth: 1,
      fill:true,
      tension:0.4,
      pointRadius:0,
      pointHitRadius:0,
      pointHoverRadius:0,
    }]
  },
  options: {
    maintainAspectRatio:false,
    scales: {
      x: {
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
        suggestedMin: -70,
        suggestedMax: 70,
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
    Plugins:{
      
    }
  },
});

myChart.canvas.addEventListener('mousemove' , (e) => {
  crosshairline(myChart , e)
})

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
  ctx.strokeStyle = '#666';
  ctx.setLineDash([4,3])

  ctx.beginPath();
  if(corX >= left && corX <= right){
    ctx.moveTo(corX , top);
    ctx.lineTo(corX , bottom);
    ctx.stroke();
  }
  ctx.closePath();

  ctx.beginPath();
  if(corY >= top && corY <= bottom){
    ctx.moveTo(left , corY);
    ctx.lineTo(right , corY);
    ctx.stroke();
  }
  ctx.closePath();
  crosshairLabel(chart , mousemove);
}

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
  if(corY >= top && corY <= bottom){
    ctx.fillStyle = 'rgba(102,102,102,1)';
    ctx.fillRect(0 , corY-10 , left , 20)
  }
  ctx.closePath();

  ctx.fillStyle = 'white';
  ctx.fillText(y.getValueForPixel(corY).toFixed(2) , left/2 , corY);//toFixed(2)小數點顯示多少位

  ctx.beginPath();
  if(corX >= left && corX <= right){
    ctx.fillStyle = 'rgba(102,102,102,1)';
    ctx.fillRect(corX - (textWidth/2) , bottom , textWidth , 20)
  }
  ctx.closePath();

  ctx.fillStyle = 'white';
  ctx.fillText(data.labels[x.getValueForPixel(corX)], corX , bottom+10);//toFixed(2)小數點顯示多少位

}