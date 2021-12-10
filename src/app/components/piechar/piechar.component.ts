import { Component, Input, OnInit } from '@angular/core';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { ChartOptions, ChartType } from 'chart.js';
@Component({
  selector: 'app-piechar',
  templateUrl: './piechar.component.html',
  styleUrls: ['./piechar.component.sass']
})
export class PiecharComponent implements OnInit {

  @Input() list;
  @Input() listestado;
  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          let datasets = ctx.chart.data.datasets;
          if (datasets.indexOf(ctx.dataset) === datasets.length - 1) {
            //let sum = datasets[0].data.reduce((a, b) => a + b, 0);
            //var percentage = Math.round((value / sum) * 100) + '%';
            var percentage = ((value * 100) / this.list[0]?.reclamos_registrados).toFixed(2) + '%';
            return percentage;
          } else {
            return percentage;
          }
        },

      },

    }
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(94, 208, 243, 1)', 'rgba(220, 243, 94, 1)'],

    },

  ];

  constructor() { }

  ngOnInit() {
    console.log(this.list, this.listestado)
    this.addInfo();
  }

  addInfo() {

    for (var i = 0; i < this.listestado.length; i++) {
      this.pieChartLabels.push(this.listestado[i].nombre)
      this.pieChartData.push(this.listestado[i].total);
    }
  }

}
