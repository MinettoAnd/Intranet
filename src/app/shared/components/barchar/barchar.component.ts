import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-barchar',
  templateUrl: './barchar.component.html',
  styleUrls: ['./barchar.component.scss']
})
export class BarcharComponent implements OnInit {
  @Input() chartData: Chart.ChartData;
  @Input() chartOptions: Chart.ChartOptions;
  @Input() context;
    // private chartCanvas: ElementRef;
  @ViewChild('chartCanvas', { static: false }) chartCanvas: ElementRef;
  // @ViewChild("chartCanvas", { static: false }) set content(
  //   content: ElementRef
  // ) {
  //   if (content) {
  //     // initially setter gets called with undefined
  //     this.chartCanvas = content;
  //     // this.grafico1 = this.getBarChart1(this.labels, this.dataChart1, this.dataChart2, this.dataChart3,'', '','chart-1', 'Atenciones', 'Emitidas', 'Compradas','line');
  //     // this.getBarChart1(this.labels, this.dataChart1, this.dataChart2, this.dataChart3,'', '','chart-1', 'Atenciones', 'Emitidas', 'Compradas','line');
  //     // this.grafico3 = this.getBarChart1(this.barChartLabels3, this.barChartData7, this.barChartData8, this.barChartData9, '', '','chart-3', 'Lima', 'Chorrillos', 'Surco','line');
  //    } 
  // }
  private chart: Chart;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.createChart();
  }
  // private createChart() {

  //   const context = this.chartCanvas.nativeElement.getContext('2d');
  //   this.chart = new Chart(context, {
  //     type: 'line', // Especifica el tipo de gráfico que estás utilizando (por ejemplo, 'bar', 'line', etc.)
  //     data: this.chartData,
  //     options: {
  //       // callbacks: {
  //       //   label: function (t, d) {
  //       //     var xLabel = d.datasets[t.datasetIndex].label;
  //       //     var yLabel = t.yLabel >= 1000 ? 'S/.' + t.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '$' + t.yLabel;
  //       //     return xLabel + ': ' + yLabel;
  //       //   }
  //       // },
  //       responsive: true,
  //       maintainAspectRatio: false,
  //       // We use these empty structures as placeholders for dynamic theming.
  //       // scales: {
  //       //   yAxes: [{
  //       //     ticks: {
  //       //       beginAtZero: true,
  //       //       callback: function (value, index, values) {
  //       //         // console.log(444,Number.isInteger(value), value,index,values);
  //       //         if (chartNum = 'chart-3'){
  //       //           return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  //       //         }else{
  //       //           if (parseInt(value) >= 1000) {
  //       //                           return 'S/.' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  //       //           } else { return 'S/.' + value; }
  //       //         }
                
  //       //       }
  //       //     }
  //       //   }]
  //       // },
  //       // legend: {
  //       //   display: false
  //       // },
  //       scales: {
  //         xAxes: [{
  //           scaleLabel: {
  //             display: true,
  //             labelString: 'scaleLabel1',
  //             fontSize: 18,
  //             fontColor: '#000',
  //           }
  //         }],
  //         yAxes: [{
  //           scaleLabel: {
  //             display: true,
  //             labelString: 'scaleLabel2',
  //             fontSize: 18,
  //             fontColor: '#000',
  //           },
  //           ticks: {
  //             beginAtZero: true,
  //             // max: 300,
  //             // min: 0
  //           }
  //         }],
  //       },
  //       plugins: {
  //         datalabels: {
          
  //           /* anchor puede ser "start", "center" o "end" */
  //           anchor: 'center',
  //           // backgroundColor: 'auto',
  //           // backgroundColor: function(context) {
  //           //   return context.dataset.backgroundColor;
  //           // },
  //           borderRadius: 4,
  //           clip: true,
  //           color: 'white',
  //           font: {
  //             weight: 'bold'
  //           },
  //           // formatter: function(value, context) {
  //           //   let sum = 0;
              
  //           //   let dataArr = context.chart.data.datasets[context.datasetIndex].data;
                
  //           //   dataArr.map((data) => {
  //           //     return sum += parseFloat(data);
  //           //   });
  //           //   // console.log(292,value , sum );
  //           //   if (sum > 0 ){
  //           //     return ((value * 100) / sum).toFixed(2) + '%';
  //           //   }else{
  //           //     return (0 + '%');
  //           //   }
              
  //           // },
  //           /* Podemos modificar el texto a mostrar */
  //           formatter: function (dato, ctx) {
  //             return Math.round(dato * 100) / 100; 
  //           },
  //           // formatter: (dato) => ((dato * 100) / total).toFixed(2) + '%',
  //           // formatter: function (value, ctx) {
  //           //   return ((value * 100) / this.total(ctx)).toFixed(2) + '%';
  //           // },
  //           // formatter: (dato) => Math.floor((dato / totales) * 100) + '%',
  //           /* Color del texto */
  //           // color: '#ffffff',
  //           // /* Formato de la fuente */
  //           // font: {
  //           //   // family: '"Times New Roman", Times, serif',
  //           //   size: '11',
  //           //   weight: 'bold',
  //           // },
  //           /* Formato de la caja contenedora */
  //           // padding: '4',
  //           // borderWidth: 2,
  //           // borderColor: 'darkblue',
  //           // borderRadius: 8,
  //           // backgroundColor: 'lightblue'
  //         }
  //       },
  //       tooltips: {
  //         enabled: true,
  //         callbacks: {
  //           label: function(tooltipItem:any, data) {
  //               var label = data.datasets[tooltipItem.datasetIndex].label || '';
              
  //               if (label) {
  //                   label += ': ';
  //               }
  //               label += Math.round(tooltipItem.yLabel * 100) / 100;
  //               // tooltipItem.xLabel = 'Día: ' + tooltipItem.xLabel + '   ' ;
  //               // tooltipItem.label = 'Día: ' + tooltipItem.Label + '   ' ;
                
  //               return label;
  //           },
  //           title: function(tooltipItem, data) {
  //            var title = 'Mes: ' + tooltipItem[0].xLabel + '   ' ;
  //             return title;
  //         }
  //         }
  //       }
  //     },
  //     plugins: [ChartDataLabels] // Agrega otros complementos aquí si es necesario
  //   });
  // }
  
  private createChart() {

    const context = this.chartCanvas.nativeElement.getContext('2d');
    this.chart = new Chart(this.context, {
      data: this.chartData,
      options: this.chartOptions,
      plugins: [ChartDataLabels]
    });
  }

}
