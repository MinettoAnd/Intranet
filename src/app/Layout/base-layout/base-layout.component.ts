import {Component, OnInit, HostListener} from '@angular/core';
import {select} from '@angular-redux/store';
import {Observable} from 'rxjs';
import {ConfigActions} from '../../ThemeOptions/store/config.actions';
import {ThemeOptions} from '../../theme-options';
import {animate, query, style, transition, trigger} from '@angular/animations';
// import { ThemeSettingsService } from '../settings/theme-settings.service';
import { Subject } from 'rxjs';
// import { AppConstants } from 'src/helpers/app.constants';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  animations: [

    trigger('architectUIAnimation', [
      transition('* <=> *', [
        query(':enter, :leave', [
          style({
            opacity: 0,
            display: 'flex',
            flex: '1',
            transform: 'translateY(-20px)',
            flexDirection: 'column'

          }),
        ]),
        query(':enter', [
          animate('600ms ease', style({opacity: 1, transform: 'translateY(0)'})),
        ]),

        query(':leave', [
          animate('600ms ease', style({opacity: 0, transform: 'translateY(-20px)'})),
         ], { optional: true })
      ]),
    ])
  ]
})

export class BaseLayoutComponent implements OnInit {

  @select('config') public config$: Observable<any>;
  layout: string;
  private _themeSettingsConfig: any;
  private _unsubscribeAll: Subject<any>;
  isMobile = false;
  constructor(public globals: ThemeOptions, public configActions: ConfigActions,
    // private _themeSettingsService: ThemeSettingsService
    ) {
      this._unsubscribeAll = new Subject();
  }
  ngOnInit() {
    const self = this;
    // this.isMobile = window.innerWidth < AppConstants.MOBILE_RESPONSIVE_WIDTH_HORIZONTAL;
    // Subscribe to config changes
    // this._themeSettingsService.config
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe((config) => {
    //     this._themeSettingsConfig = config;
    //     if (config.layout && config.layout.style &&
    //       config.layout.style === 'vertical') {
    //       self.layout = 'vertical';
    //     } else {
    //       self.layout = 'horizontal';
    //     }
    //   });
  }

  @HostListener('window:resize', ['$event'])
  // onResize(event) {
  //   if (event.target.innerWidth < AppConstants.MOBILE_RESPONSIVE_WIDTH_HORIZONTAL) {
  //     this.isMobile = true;
  //   } else {
  //     this.isMobile = false;
  //   }
  // }
  toggleSidebarMobile() {
    this.globals.toggleSidebarMobile = !this.globals.toggleSidebarMobile;
  }

}



