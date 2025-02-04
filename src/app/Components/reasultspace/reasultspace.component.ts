import { SharedService } from './../../Services/shared.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-reasultspace',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './reasultspace.component.html',
  styleUrl: './reasultspace.component.scss',
})
export class ReasultspaceComponent {
  constructor(private SharedService: SharedService) {}

  isHidden: boolean = true;
  usermessage!: string;
  botmessage!: string;
  ngOnInit() {
    this.SharedService.inputData$.subscribe((data) => {
      this.usermessage = data;
      this.isHidden = false; // Hide the element when data is received
    });
    this.SharedService.botData$.subscribe((data) => {
      this.botmessage = data;
    });
  }
}
