import {Directive, ElementRef, inject, Input} from '@angular/core';

// @ts-ignore
import * as textMask from 'vanilla-text-mask/dist/vanillaTextMask';


@Directive({
  selector: '[appFormDate]',
  standalone: true
})
export class FormDateDirective {
  element = inject(ElementRef)
  maskedInputController: any;

  private textMask: Record<string, any> = {
    mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
    showMask: false,
    guide: false,
  };

  constructor() {
  }

  @Input('appFormDate')
  set setTextMask(mask: any) {
    if (mask) this.textMask = {...this.textMask, ...mask};
  }

  ngOnInit(): void {
    this.maskedInputController = textMask.maskInput({inputElement: this.element.nativeElement, ...this.textMask});
  }

  ngOnDestroy() {
    this.maskedInputController?.destroy?.();
  }
}
