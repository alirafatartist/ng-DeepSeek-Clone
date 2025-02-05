import { SharedService } from './../../Services/shared.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css'; // or any other style you prefer

interface Message {
  type: 'user' | 'bot';
  content: string;
  isLoading?: boolean;
  htmlContent?: SafeHtml;
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

  ngOnInit() {
    // Configure highlight.js
    hljs.configure({
      ignoreUnescapedHTML: true,
    });

    this.SharedService.inputData$.subscribe((data) => {
      if (data) {
        this.isHidden = false;
        this.messages.push({
          type: 'user',
          content: data,
        });
        this.messages.push({
          type: 'bot',
          content: 'Loading...',
          isLoading: true,
        });
      }
    });

    this.SharedService.botData$.subscribe((data) => {
      if (data) {
        this.messages = this.messages.filter((msg) => !msg.isLoading);
        this.messages.push({
          type: 'bot',
          content: data,
          htmlContent: this.sanitizer.bypassSecurityTrustHtml(data),
        });
      }
    });
  }

  ngAfterViewChecked() {
    // Find and highlight all code blocks
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightElement(block as HTMLElement);
    });
  }
}
