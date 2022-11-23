import { Component, OnInit, ViewChild } from '@angular/core';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { PerfectScrollbarDirective, PerfectScrollbarComponent, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { TableApiService } from '../../../_services/table-api.service';

@Component({
  selector: 'app-attention-consultation',
  templateUrl: './attention-consultation.component.html',
  styleUrls: ['./attention-consultation.component.sass']
})
export class AttentionConsultationComponent implements OnInit {
  // data: any;
  @BlockUI('addRows') blockUIAddRows: NgBlockUI;
  @BlockUI('rowSelection') blockUIRowSelection: NgBlockUI;

  public config: PerfectScrollbarConfigInterface = { wheelPropagation: true };
  @ViewChild(PerfectScrollbarComponent) componentRef?: PerfectScrollbarComponent;
  @ViewChild(PerfectScrollbarDirective, { static: true }) directiveRef?: PerfectScrollbarDirective;
  options = {
    close: true,
    expand: true,
    minimize: true,
    reload: true
  };
  temp = [];
  selected = [];
  id: number;
  loadingIndicator: true;
  rows: any;
  editing = {};
  row: any;
  public breadcrumb: any;
  data:any = {
    "rows": [
        { "id":"1","name": "Marban", "position": "Otto", "office": "@mdo", "age": "34", "salary": "16000", "startdate": "16/05/2017"},
        { "id":"2","name": "Jacob", "position": "Thornton", "office": "@fat", "age": "36", "salary": "12000", "startdate": "16/05/2017"},
        { "id":"3","name": "Albart", "position": "the Bird", "office": "@twitter", "age": "38", "salary": "12000", "startdate": "16/05/2017"},
        { "id":"4","name": "Marken", "position": "Otto", "office": "@mdo", "age": "32", "salary": "12000", "startdate": "26/05/2017"},
        {  "id":"5","name": "Jacob", "position": "Thornton", "office": "@fat", "age": "34", "salary": "67000", "startdate": "16/05/2017"},
        {  "id":"6","name": "Larry", "position": "the Bird", "office": "@twitter", "age": "39", "salary": "22000", "startdate": "16/05/2017"},
        {  "id":"7","name": "Margi", "position": "Otto", "office": "@mdo", "age": "31", "salary": "42000", "startdate": "16/05/2017"},
        {  "id":"8","name": "Jhon", "position": "Thornton", "office": "@fat", "age": "40", "salary": "52000", "startdate": "16/05/2017"},
        {  "id":"9","name": "Larry", "position": "the Bird", "office": "@twitter", "age": "48", "salary": "20000", "startdate": "16/05/2018"},
        {  "id":"10","name": "Mark", "position": "Otto", "office": "@mdo", "age": "36", "salary": "12000", "startdate": "16/05/2017"},
        {  "id":"11","name": "Jacob", "position": "Thornton", "office": "@fat", "age": "33", "salary": "12000", "startdate": "16/05/2017"},
        {  "id":"12","name": "Larry", "position": "the Bird", "office": "@twitter", "age": "34", "salary": "19000", "startdate": "16/05/2017"},
        { "id":"13", "name": "Margi", "position": "Otto", "office": "@mdo", "age": "34", "salary": "16000", "startdate": "16/05/2015"},
        { "id":"14", "name": "Jacob", "position": "Thornton", "office": "@fat", "age": "34", "salary": "12000", "startdate": "16/05/2017"}
      ],
      "row":[ 
       
          { "id":"1","name": "Marban", "position": "Otto", "office": "@mdo", "age": "34", "salary": "16000","gender":"female" },
          { "id":"2","name": "Jacob", "position": "Thornton", "office": "@fat", "age": "36", "salary": "12000","gender":"male" },
          { "id":"3","name": "Albart", "position": "the Bird", "office": "@twitter", "age": "38", "salary": "12000", "gender":"female" },
          { "id":"4","name": "Marken", "position": "Otto", "office": "@mdo", "age": "32", "salary": "12000","gender":"male" },
          {  "id":"5","name": "Jacob", "position": "Thornton", "office": "@fat", "age": "34", "salary": "67000", "gender":"female" },
          {  "id":"6","name": "Larry", "position": "the Bird", "office": "@twitter", "age": "39", "salary": "22000","gender":"female" },
          {  "id":"7","name": "Margi", "position": "Otto", "office": "@mdo", "age": "31", "salary": "42000", "gender":"male" },
          {  "id":"8","name": "Jhon", "position": "Thornton", "office": "@fat", "age": "40", "salary": "52000","gender":"female" },
          {  "id":"9","name": "Larry", "position": "the Bird", "office": "@twitter", "age": "48", "salary": "20000","gender":"female" },
          {  "id":"10","name": "Mark", "position": "Otto", "office": "@mdo", "age": "36", "salary": "12000","gender":"male" },
          {  "id":"11","name": "Jacob", "position": "Thornton", "office": "@fat", "age": "33", "salary": "12000","gender":"female" },
          {  "id":"12","name": "Larry", "position": "the Bird", "office": "@twitter", "age": "34", "salary": "19000","gender":"male" },
          { "id":"13", "name": "Margi", "position": "Otto", "office": "@mdo", "age": "34", "salary": "16000","gender":"female" },
          { "id":"14", "name": "Jacob", "position": "Thornton", "office": "@fat", "age": "34", "salary": "12000","gender":"male" }
        ]
  
  }
  constructor(private tableApiservice: TableApiService) { }

  ngOnInit() {
    this.breadcrumb = {
      'mainlabel': 'API DataTable',
      'links': [
        {
          'name': 'Home',
          'isLink': true,
          'link': '/dashboard/sales'
        },
        {
          'name': 'DataTables',
          'isLink': true,
          'link': '#'
        },
        {
          'name': 'API DataTable',
          'isLink': false
        }
      ]
    };
      // this.tableApiservice.getTableApiData().subscribe(Response => {
      // this.data = Response;
      // this.getTabledata();
      // });
      this.getTabledata();
  }
  getTabledata() {
    this.rows = this.data.rows;
    this.row = this.data.row;
  }
  updateFiltername(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.rows.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });


    this.rows = temp;

  }
  updateFilterposition(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.rows.filter(function (d) {
      return d.position.toLowerCase().indexOf(val) !== -1 || !val;
    });


    this.rows = temp;

  }
  updateFilteroffice(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.rows.filter(function (d) {
      return d.office.toLowerCase().indexOf(val) !== -1 || !val;
    });


    this.rows = temp;

  }

  updateFilterage(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.rows.filter(function (d) {
      return d.age.toLowerCase().indexOf(val) !== -1 || !val;
    });


    this.rows = temp;

  }
  updateFiltersalary(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.rows.filter(function (d) {
      return d.salary.toLowerCase().indexOf(val) !== -1 || !val;
    });


    this.rows = temp;

  }
  updateFilterstartdate(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.rows.filter(function (d) {
      return d.startdate.toLowerCase().indexOf(val) !== -1 || !val;
    });


    this.rows = temp;

  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  private newAttribute = { 'id': 15, name: 'Mark', position: 'Otto', office: '@mdo', age: '31', salary: '12000', startdate: '16/05/2017' };

  addFieldValue() {
    this.rows.push(this.newAttribute);
    this.rows = [...this.rows];
  }
  deleteFieldValue(index) {
    this.rows.splice(index, 1);
  }
  deleteRow(id) {
    let i = 0;
    for (const row of this.rows) {
      if (row.id === id) {
        break;
      }
      i++;
    }
    const temp = [...this.rows];
    temp.splice(i, 1);
    this.rows = temp;
  }
   updateValue(event, cell, rowIndex) {

    this.editing[rowIndex + '-' + cell] = false;
    this.row[rowIndex][cell] = event.target.value;
    const temp = [...this.row];
    this.row = temp;
  }

  reloadAddRows() {
    this.blockUIAddRows.start('Loading..');

    setTimeout(() => {
      this.blockUIAddRows.stop();
    }, 2500);
  }
  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }
  reloadRowSelection() {
    this.blockUIRowSelection.start('Loading..');

    setTimeout(() => {
      this.blockUIRowSelection.stop();
    }, 2500);
  }
  deleteCheckedRow() {
    let index = 0;
    const removedIndex = [];
    const temp = [...this.rows];
    for (const row of temp) {
      for (const selectedRow of this.selected) {
        if (row.id === selectedRow.id) {
          removedIndex.push(index);
        }
      }
      index++;
    }

    for (let i = removedIndex.length - 1; i >= 0; i--) {
      temp.splice(removedIndex[i], 1);
    }
    this.rows = temp;
    this.selected = [];
  }
}

