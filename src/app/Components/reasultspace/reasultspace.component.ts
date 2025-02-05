import { SharedService } from './../../Services/shared.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

interface Message {
  type: 'user' | 'bot';
  content: string;
  isLoading?: boolean;
  htmlContent?: SafeHtml;
  isTyping?: boolean;
  displayContent?: string;
}

@Component({
  selector: 'app-reasultspace',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './reasultspace.component.html',
  styleUrl: './reasultspace.component.scss',
})
export class ReasultspaceComponent implements OnInit, AfterViewChecked {
  constructor(
    private SharedService: SharedService,
    private sanitizer: DomSanitizer
  ) {}

  isHidden: boolean = true;
  messages: Message[] = [];

  typeMessage(message: Message, content: string) {
    message.isTyping = true;
    message.displayContent = '';
    let index = 0;

    const typeChar = () => {
      if (index < content.length) {
        message.displayContent += content[index];
        index++;
        setTimeout(typeChar, 10);
      } else {
        message.isTyping = false;
        message.htmlContent = this.sanitizer.bypassSecurityTrustHtml(content);
        setTimeout(() => {
          document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightElement(block as HTMLElement);
          });
        }, 0);
      }
    };

    typeChar();
  }

  ngOnInit() {
    hljs.configure({
      ignoreUnescapedHTML: true,
    });

    this.SharedService.inputData$.subscribe((data) => {
      if (data) {
        this.isHidden = false;
        // Add user message
        this.messages.push({
          type: 'user',
          content: data,
        });
        // Add bot message with loading state
        const botMessage: Message = {
          type: 'bot',
          content: 'Loading...',
          isLoading: true,
          displayContent: 'Loading...',
          htmlContent: this.sanitizer.bypassSecurityTrustHtml('Loading...'),
        };
        this.messages.push(botMessage);
      }
    });

    this.SharedService.botData$.subscribe((data) => {
      if (data) {
        // Find and update the loading message
        const loadingMessage = this.messages.find((msg) => msg.isLoading);
        if (loadingMessage) {
          // Update the existing message with new content
          loadingMessage.isLoading = false;
          loadingMessage.content = data;
          this.typeMessage(loadingMessage, data);
        }
      }
    });
  }

  ngAfterViewChecked() {
    document.querySelectorAll('pre code').forEach((block) => {
      if (!block.classList.contains('highlighted')) {
        hljs.highlightElement(block as HTMLElement);
        block.classList.add('highlighted');
      }
    });
  }
}
