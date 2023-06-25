import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[tabContent]'
})
export class TabContentDirective {
  @Input() tabId: number;
  constructor(public templateRef: TemplateRef<any>) {}
}

  