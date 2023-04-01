import { Injectable, ElementRef } from '@angular/core';
import * as FileSaver from 'file-saver';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { ExcelJson } from '../interfaces/excel-json.interface';

const EXCEL_EXTENSION = '.xlsx';
const CSV_EXTENSION = '.csv';
const CSV_TYPE = 'text/plain;charset=utf-8';
const getFileName = (name: string) => {
  let timeSpan = new Date().toISOString();
  let sheetName = "Sheet1";
  let fileName = "ExportResult" + `-${timeSpan}`;
  return {
    sheetName,
    fileName
  };
};

@Injectable()
export class ExportService {
  constructor() { }

  /**
   * Creates excel from the table element reference.
   *
   * @param element DOM table element reference.
   * @param fileName filename to save as.
   */
  public exportTableElmToExcel(rows: any[], name?: string): void {
    let { sheetName, fileName } = getFileName(name);
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(rows);
    // generate workbook and add the worksheet
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, ws, sheetName);
    // save to file
    XLSX.writeFile(workbook, `${fileName}${EXCEL_EXTENSION}`);

  }

  /**
   * Creates XLSX option from the Json data. Use this to customise the sheet by adding arbitrary rows and columns.
   *
   * @param json Json data to create xlsx.
   * @param fileName filename to save as.
   */
  public exportJsonToExcel(json: ExcelJson[], fileName: string): void {
    // inserting first blank row
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      json[0].data,
      this.getOptions(json[0])
    );

    for (let i = 1, length = json.length; i < length; i++) {
      // adding a dummy row for separation
      XLSX.utils.sheet_add_json(
        worksheet,
        [{}],
        this.getOptions(
          {
            data: [],
            skipHeader: true
          }, -1)
      );
      XLSX.utils.sheet_add_json(
        worksheet,
        json[i].data,
        this.getOptions(json[i], -1)
      );
    }
    const workbook: XLSX.WorkBook = { Sheets: { Sheet1: worksheet }, SheetNames: ['Sheet1'] };
    // save to file
    XLSX.writeFile(workbook, `${fileName}${EXCEL_EXTENSION}`);
  }

  /**
   * Creates XLSX option from the data.
   *
   * @param json Json data to create xlsx.
   * @param origin XLSX option origin.
   * @returns options XLSX options.
   */
  private getOptions(json: ExcelJson, origin?: number): any {
    // adding actual data
    const options = {
      skipHeader: true,
      origin: -1,
      header: []
    };
    options.skipHeader = json.skipHeader ? json.skipHeader : false;
    if (!options.skipHeader && json.header && json.header.length) {
      options.header = json.header;
    }
    if (origin) {
      options.origin = origin ? origin : -1;
    }
    return options;
  }

  /**
   * Saves the file on client's machine via FileSaver library.
   *
   * @param buffer The data that need to be saved.
   * @param fileName File name to save as.
   * @param fileType File type to save as.
   */
  private saveAsFile(buffer: any, fileName: string, fileType: string): void {
    const data: Blob = new Blob([buffer], { type: fileType });
    FileSaver.saveAs(data, fileName);
  }

  /**
   * Creates an array of data to csv. It will automatically generate title row based on object keys.
   *
   * @param rows array of data to be converted to CSV.
   * @param fileName filename to save as.
   * @param columns array of object properties to convert to CSV. If skipped, then all object properties will be used for CSV.
   */
  public exportToCsv(rows: object[], fileName: string, columns?: any[]): string {
    let names = [];
    let props = []
    for (let index = 0; index < columns.length; index++) {
      const element = columns[index];
      names.push(element.name);
      props.push(element.prop);
    }

    if (!rows || !rows.length) {
      return;
    }
    const separator = ',';
    const keys = Object.keys(rows[0]).filter(k => {
      if (props.length) {
        return props.includes(k);
      } else {
        return true;
      }
    });

    const csvContent =
    names.join(separator) +
      '\n' +
      rows.map(row => {
        return keys.map(k => {
          let cell = row[k] === null || row[k] === undefined ? '' : row[k];
          cell = cell instanceof Date
            ? cell.toLocaleString()
            : cell.toString().replace(/"/g, '""');
          if (cell.search(/("|,|\n)/g) >= 0) {
            cell = `"${cell}"`;
          }
          return cell;
        }).join(separator);
      }).join('\n');
      
    this.saveAsFile(csvContent, `${fileName}${CSV_EXTENSION}`, CSV_TYPE);
  }
  public exportToClipboard(rows: object[], columns?: any[]): string {
    let names = [];
    let props = []
    for (let index = 0; index < columns.length; index++) {
      const element = columns[index];
      names.push(element.name);
      props.push(element.prop);
    }

    if (!rows || !rows.length) {
      return;
    }
    const separator = '\t';
    const keys = Object.keys(rows[0]).filter(k => {
      if (props.length) {
        return props.includes(k);
      } else {
        return true;
      }
    });

    const csvContent =
    names.join(separator) +
      '\n' +
      rows.map(row => {
        return keys.map(k => {
          let cell = row[k] === null || row[k] === undefined ? '' : row[k];
          cell = cell instanceof Date
            ? cell.toLocaleString()
            : cell.toString().replace(/"/g, '""');
          if (cell.search(/("|,|\n)/g) >= 0) {
            cell = `"${cell}"`;
          }
          return cell;
        }).join(separator);
      }).join('\n');
      
    navigator.clipboard.writeText(csvContent).then( () => {
      console.log(csvContent);
      Swal.fire({
        icon: 'info',
        title: 'Copiado en el portapapeles',
        showCancelButton: false,
        confirmButtonText: `OK`,
  
      })
    }).catch( (e) => {
      console.log(e);
      Swal.fire({
        icon: 'warning',
        title: 'Fallo al copiar en el portapapeles',
        showCancelButton: false,
        confirmButtonText: `OK`,
  
      })
    });
  }
}