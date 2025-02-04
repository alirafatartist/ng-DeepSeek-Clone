import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor() {}

  private inputData = new Subject<string>();
  private botData = new Subject<string>();
  inputData$ = this.inputData.asObservable();
  botData$ = this.botData.asObservable();

  sendInputData(data: string,botdata:any) {
    this.inputData.next(data);
    this.botData.next(botdata);
  }
}
