import { Component, HostBinding } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable, Subscription } from 'rxjs';
import { ThemeOptions } from '../../../theme-options';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  message: string;
  subscription: Subscription;
  constructor(public globals: ThemeOptions, private apiService: SharedService) {
    this.subscription = this.apiService.currentMessage.subscribe(message => this.message = message)
  }


  @HostBinding('class.isActive')
  get isActiveAsGetter() {
    return this.isActive;
  }

  isActive: boolean;

  @select('config') public config$: Observable<any>;

  toggleSidebarMobile() {
    this.globals.toggleSidebarMobile = !this.globals.toggleSidebarMobile;
  }

  toggleHeaderMobile() {
    this.globals.toggleHeaderMobile = !this.globals.toggleHeaderMobile;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
