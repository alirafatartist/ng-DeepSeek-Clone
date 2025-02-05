import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor() {
    this.theme$.subscribe((isLightMode) => {
      this.applyTheme(isLightMode);
    });
  }

  private inputData = new Subject<string>();
  private botData = new Subject<string>();
  private themelight = new Subject<boolean>();

  inputData$ = this.inputData.asObservable();
  botData$ = this.botData.asObservable();
  theme$ = this.themelight.asObservable();

  sendInputData(data: string, botdata: any) {
    this.inputData.next(data);
    this.botData.next(botdata);
  }
  sendTheme(data: boolean) {
    this.themelight.next(data);
  }

  private applyTheme(isLightMode: boolean) {
    if (isLightMode) {
      document.body.setAttribute('data-theme', 'light');
    } else {
      document.body.removeAttribute('data-theme');
    }
  }
}
