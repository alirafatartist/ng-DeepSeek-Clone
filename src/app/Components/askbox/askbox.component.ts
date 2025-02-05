import { SharedService } from './../../Services/shared.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../Services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { marked } from 'marked';
import { KeyboardDirective } from '../../Directives/keyboard.directive';

@Component({
  selector: 'app-askbox',
  standalone: true,
  imports: [FormsModule, CommonModule,HttpClientModule,KeyboardDirective],
  templateUrl: './askbox.component.html',
  styleUrl: './askbox.component.scss',
  providers:[ApiService]
})
export class AskboxComponent {
  userMessage: string = '';
  botMessage:string=''
  chatHistory:any[]=[]
  constructor(private SharedService: SharedService,private apiService:ApiService) {}
  sendData() {
    // console.log(this.userMessage);
    // this.SharedService.sendInputData(this.userMessage);
    this.chatHistory.push({ role: 'user', parts: [{ text: this.userMessage }] });
    this.SharedService.sendInputData(this.userMessage);

    this.apiService.fetchData(this.chatHistory).subscribe(response => {
      const aiMessage = response.candidates[0].content.parts[0].text;

      // Add AI response to chat history
      this.chatHistory.push({ role: 'model', parts: [{ text: aiMessage }] });

      // Send the response to the child component
      this.SharedService.sendBotData(marked.parse(aiMessage));
      console.log(this.userMessage,aiMessage);
      this.userMessage = '';
    });
  }

}
