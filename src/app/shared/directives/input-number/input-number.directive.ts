import {Directive, ElementRef, forwardRef, HostListener, Input, Renderer2} from '@angular/core';
import {DefaultValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {getAllExceptNumberPatternValidator} from "@app-shared/format.functions";


@Directive({
  selector: '[appInputNumber]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputNumberDirective),
      multi: true
    }
  ]
})
export class InputNumberDirective extends DefaultValueAccessor {
  @Input() inputEl;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    super(renderer, el, false);
  }

  @HostListener('input', ['$event.target.value'])
  input(value) {
    let elementPos: number;
    let element;
    if (this.inputEl) {
      element = this.inputEl;
    } else {
      element = this.el.nativeElement;
    }
    if (element) {
      elementPos = element.selectionStart;
      const startLength = element.value.length;
      while (element.value.search(getAllExceptNumberPatternValidator()) !== -1) {
        element.value = element.value.replace(getAllExceptNumberPatternValidator(), '');
      }
      this.change(element.value);
      if (element.value != null && element.value !== '') {
        const endLength = element.value.length;
        elementPos = elementPos + (endLength - startLength);
        element.setSelectionRange(elementPos, elementPos);
      }
    }
  }

  @HostListener('blur', ['$event'])
  onBlur() {
    this.touch();
  }

  writeValue(value: any): void {
    let element;
    if (this.inputEl) {
      element = this.inputEl;
    } else {
      element = this.el.nativeElement;
    }
    this.renderer.setProperty(element, 'value', value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  change($event) {
    this.onChange($event);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  touch() {
    this.onTouched();
  }
}
