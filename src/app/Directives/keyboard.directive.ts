import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appKeyboard]',
  standalone: true,
})
export class KeyboardDirective {
  constructor(private el: ElementRef) {}
  @HostListener('document:keydown', ['$event'])
  onKeyPress(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      this.el.nativeElement.click();
      console.log("test");
    }
  }
}
