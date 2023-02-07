import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-seti-ipress',
  templateUrl: './seti-ipress.component.html',
  styleUrls: ['./seti-ipress.component.sass']
})
export class SetiIpressComponent implements OnInit {
  name = 'Set iframe source';
  // url: string = "http://webserver.maisondesante.org.pe/html2/oswtest/censo_hospitalizacion/frmSETIIPRESSv.php?id=292";
  url: string = "http://192.168.15.149:8080/MaisonSante-sst-web/comun/paginas/login.jsf";
  urlSafe: SafeResourceUrl;
  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

}
