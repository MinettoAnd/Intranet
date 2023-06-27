import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor() { }
  getChartData2(chartLabels1, chartData1, chartData2, title, title2, typeChart) {
    const data = {
      labels: chartLabels1,
      datasets: [
        {
          barPercentage: 0.8,
          categoryPercentage: 1,
          label: title,
          borderColor: '#28a74559',
          borderWidth: 4,
          fill: false,
          data: chartData1,
          // backgroundColor: '#28a74559',
          // backgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14', '#adb5bd','#ffc107', '#28a745', '#6610f2','#20c997'],
          // hoverBackgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14','#adb5bd', '#ffc107', '#28a745', '#6610f2', '#20c997']
          type                : typeChart,
        },
        {
          label: title2,
          borderColor: '#6610f259',
          borderWidth: 4,
          fill: false,
          data: chartData2,
          // backgroundColor     : '#6610f259',
          // borderColor         : 'rgba(33,104,163,1)',
          // backgroundColor: 'rgb(255, 164, 8, 0.7)',
          // backgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14', '#adb5bd','#ffc107', '#28a745', '#6610f2','#20c997'],
          // hoverBackgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14','#adb5bd', '#ffc107', '#28a745', '#6610f2', '#20c997']
          type                : typeChart,
        },

      ]
    }
    return data;
  }
  getChartData3(chartLabels1, chartData1, chartData2,chartData3, title, title2, title3,typeChart) {
    const data = {
      labels: chartLabels1,
      datasets: [
        {
          barPercentage: 0.8,
          categoryPercentage: 1,
          label: title,
          borderColor: '#28a74559',
          borderWidth: 4,
          fill: false,
          data: chartData1,
          // backgroundColor: '#28a74559',
          // backgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14', '#adb5bd','#ffc107', '#28a745', '#6610f2','#20c997'],
          // hoverBackgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14','#adb5bd', '#ffc107', '#28a745', '#6610f2', '#20c997']
          type                : typeChart,
        },
        {
          label: title2,
          borderColor: '#6610f259',
          borderWidth: 4,
          fill: false,
          data: chartData2,
          // backgroundColor     : '#6610f259',
          // borderColor         : 'rgba(33,104,163,1)',
          // backgroundColor: 'rgb(255, 164, 8, 0.7)',
          // backgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14', '#adb5bd','#ffc107', '#28a745', '#6610f2','#20c997'],
          // hoverBackgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14','#adb5bd', '#ffc107', '#28a745', '#6610f2', '#20c997']
          type                : typeChart,
        },
        {
          label: title3,
          borderColor: '#ffa40859',
          borderWidth: 4,
          fill: false,
          data: chartData3,
          // backgroundColor: '#ffa40859',
          // backgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14', '#adb5bd','#ffc107', '#28a745', '#6610f2','#20c997'],
          // hoverBackgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14','#adb5bd', '#ffc107', '#28a745', '#6610f2', '#20c997']
          type                : typeChart,
        },

      ]
    }
    return data;
  }
  getChartData4(chartLabels1, chartData1, chartData2,chartData3,chartData4, title, title2, title3, title4, typeChart) {
    const data = {
      labels: chartLabels1,
      datasets: [
        {
          barPercentage: 0.8,
          categoryPercentage: 1,
          label: title,
          borderColor: '#28a74559',
          borderWidth: 4,
          fill: false,
          data: chartData1,
          // backgroundColor: '#28a74559',
          // backgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14', '#adb5bd','#ffc107', '#28a745', '#6610f2','#20c997'],
          // hoverBackgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14','#adb5bd', '#ffc107', '#28a745', '#6610f2', '#20c997']
          type                : typeChart,
        },
        {
          label: title2,
          borderColor: '#6610f259',
          borderWidth: 4,
          fill: false,
          data: chartData2,
          // backgroundColor     : '#6610f259',
          // borderColor         : 'rgba(33,104,163,1)',
          // backgroundColor: 'rgb(255, 164, 8, 0.7)',
          // backgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14', '#adb5bd','#ffc107', '#28a745', '#6610f2','#20c997'],
          // hoverBackgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14','#adb5bd', '#ffc107', '#28a745', '#6610f2', '#20c997']
          type                : typeChart,
        },
        {
          label: title3,
          borderColor: '#ffa40859',
          borderWidth: 4,
          fill: false,
          data: chartData3,
          // backgroundColor: '#ffa40859',
          // backgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14', '#adb5bd','#ffc107', '#28a745', '#6610f2','#20c997'],
          // hoverBackgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14','#adb5bd', '#ffc107', '#28a745', '#6610f2', '#20c997']
          type                : typeChart,
        },
        {
          label: title4,
          borderColor: '#eb445a59',
          borderWidth: 4,
          fill: false,
          data: chartData4,
          // backgroundColor: '#eb445a59',
          // backgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14', '#adb5bd','#ffc107', '#28a745', '#6610f2','#20c997'],
          // hoverBackgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14','#adb5bd', '#ffc107', '#28a745', '#6610f2', '#20c997']
          type                : typeChart,
        },
        // {
        //   label: title5,
        //   // borderColor: 'rgba(99, 255, 132, 1)',
        //   borderWidth: 1,
        //   data: chartData5,
        //   backgroundColor: '#eb445a59'
        //   // backgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14', '#adb5bd','#ffc107', '#28a745', '#6610f2','#20c997'],
        //   // hoverBackgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14','#adb5bd', '#ffc107', '#28a745', '#6610f2', '#20c997']
        // }
      ]
    }
    return data;
  }
  getChartData7(chartLabels1, chartData1, chartData2,chartData3,chartData4,chartData5,chartData6,chartData7, title, title2, title3, title4,title5,title6,title7, typeChart) {
    const data = {
      labels: chartLabels1,
      datasets: [
        {
          barPercentage: 0.8,
          categoryPercentage: 1,
          label: title,
          borderColor: '#28a74559',
          borderWidth: 4,
          fill: false,
          data: chartData1,
          // backgroundColor: '#28a74559',
          // backgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14', '#adb5bd','#ffc107', '#28a745', '#6610f2','#20c997'],
          // hoverBackgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14','#adb5bd', '#ffc107', '#28a745', '#6610f2', '#20c997']
          type                : typeChart,
        },
        {
          label: title2,
          borderColor         : '#6610f259',
          borderWidth: 4,
          fill: false,
          data: chartData2,
          // backgroundColor     : '#6610f259',
          
          // backgroundColor: 'rgb(255, 164, 8, 0.7)',
          // backgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14', '#adb5bd','#ffc107', '#28a745', '#6610f2','#20c997'],
          // hoverBackgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14','#adb5bd', '#ffc107', '#28a745', '#6610f2', '#20c997']
          type                : typeChart,
        },
        {
          label: title3,
          borderColor: '#ffa40859',
          borderWidth: 4,
          fill: false,
          data: chartData3,
          // backgroundColor: '#ffa40859',
          // backgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14', '#adb5bd','#ffc107', '#28a745', '#6610f2','#20c997'],
          // hoverBackgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14','#adb5bd', '#ffc107', '#28a745', '#6610f2', '#20c997']
          type                : typeChart,
        },
        {
          label: title4,
          borderColor: '#eb445a59',
          borderWidth: 4,
          fill: false,
          data: chartData4,
          // backgroundColor: '#eb445a59',
          // backgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14', '#adb5bd','#ffc107', '#28a745', '#6610f2','#20c997'],
          // hoverBackgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14','#adb5bd', '#ffc107', '#28a745', '#6610f2', '#20c997']
          type                : typeChart,
        },
        {
          label: title5,
          borderColor: '#17a2b859',
          borderWidth: 4,
          fill: false,
          data: chartData5,
          // backgroundColor: '#17a2b859',
          // backgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14', '#adb5bd','#ffc107', '#28a745', '#6610f2','#20c997'],
          // hoverBackgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14','#adb5bd', '#ffc107', '#28a745', '#6610f2', '#20c997']
          type                : typeChart,
        },
        {
          label: title6,
          borderColor: '#ffc10759',
          borderWidth: 4,
          fill: false,
          data: chartData7,
          // backgroundColor: '#ffc10759',
          // backgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14', '#adb5bd','#ffc107', '#28a745', '#6610f2','#20c997'],
          // hoverBackgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14','#adb5bd', '#ffc107', '#28a745', '#6610f2', '#20c997']
          type                : typeChart,
        },
        {
          label: title7,
          borderColor: '#2266d359',
          borderWidth: 4,
          fill: false,
          data: chartData7,
          // backgroundColor: '#2266d359',
          // backgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14', '#adb5bd','#ffc107', '#28a745', '#6610f2','#20c997'],
          // hoverBackgroundColor: ['#2266d3', '#ffa408', '#eb445a', '#17a2b8', '#fd7e14','#adb5bd', '#ffc107', '#28a745', '#6610f2', '#20c997']
          type                : typeChart,
        }
      ]
    }
    return data;
  }
  getChartOptions(scaleLabel1,scaleLabel2) {
    const options = {
      // callbacks: {
      //   label: function (t, d) {
      //     var xLabel = d.datasets[t.datasetIndex].label;
      //     var yLabel = t.yLabel >= 1000 ? 'S/.' + t.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '$' + t.yLabel;
      //     return xLabel + ': ' + yLabel;
      //   }
      // },
      responsive: true,
      maintainAspectRatio: false,
      // We use these empty structures as placeholders for dynamic theming.
      // scales: {
      //   yAxes: [{
      //     ticks: {
      //       beginAtZero: true,
      //       callback: function (value, index, values) {
      //         // console.log(444,Number.isInteger(value), value,index,values);
      //         if (chartNum = 'chart-3'){
      //           return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      //         }else{
      //           if (parseInt(value) >= 1000) {
      //                           return 'S/.' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      //           } else { return 'S/.' + value; }
      //         }
              
      //       }
      //     }
      //   }]
      // },
      // legend: {
      //   display: false
      // },
      scales: {
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: scaleLabel1,
            fontSize: 18,
            fontColor: '#000',
          }
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: scaleLabel2,
            fontSize: 18,
            fontColor: '#000',
          },
          ticks: {
            beginAtZero: true,
            // max: 300,
            // min: 0
          }
        }],
      },
      plugins: {
        datalabels: {

          anchor: 'end',
          // align: 'top',
          // offset: 4,
          // clamp: true,
          color: 'black',

          // anchor: 'end',
          // align: 'start',
          // clamp: true,
          rotation: 0,
          padding: 12,
          labels: {
            clamp: true,
            value: {
              color: '#000'
            }
          },
          font: {
            size: '12',
            weight: 'bold'
          }
        }
      },
      tooltips: {
          enabled: true,
          callbacks: {
            label: function(tooltipItem:any, data) {
                var label = data.datasets[tooltipItem.datasetIndex].label || '';
              
                if (label) {
                    label += ': ';
                }
                label += Math.round(tooltipItem.yLabel * 100) / 100;
                // tooltipItem.xLabel = 'Día: ' + tooltipItem.xLabel + '   ' ;
                // tooltipItem.label = 'Día: ' + tooltipItem.Label + '   ' ;
                
                return label;
            },
            title: function(tooltipItem, data) {
             var title = 'Mes: ' + tooltipItem[0].xLabel + '   ' ;
              return title;
          }
          }
      }
      // tooltips: {
      //   enabled: true,
      //   // backgroundColor: 'rgba(255, 255, 255, 0.8)',
      //   // titleFontColor: '#000',
      //   // bodyFontColor: '#000',
      //   // titleFontSize: 14,
      //   // bodyFontSize: 12,
      //   callbacks: {
      //     label: function(tooltipItem, data) {
      //         var label = data.datasets[tooltipItem.datasetIndex].label || '';
      //       console.log(' toolti´s')
      //         if (label) {
      //             label += ': ';
      //         }
      //         // label += Math.round(tooltipItem.yLabel * 100) / 100;
      //         label += (+tooltipItem.yLabel).toFixed(2);
      //         // tooltipItem.xLabel = 'Día: ' + tooltipItem.xLabel + '   ' ;
      //         // tooltipItem.label = 'Día: ' + tooltipItem.Label + '   ' ;
              
      //         return label;
      //     },
      //     title: function(tooltipItem, data) {
      //     var title = 'Mes: ' + tooltipItem[0].xLabel + '   ' ;
      //       return title;
      //   }
      //   }
      // }
    };
    return options;
  }
}
