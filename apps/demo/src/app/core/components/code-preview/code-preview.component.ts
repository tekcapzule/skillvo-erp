import { Component, Input, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import hljs from 'highlight.js/lib/core';
import xml from 'highlight.js/lib/languages/xml';
import typescript from 'highlight.js/lib/languages/typescript';
import scss from 'highlight.js/lib/languages/scss';
import javascript from 'highlight.js/lib/languages/javascript';

// Register languages
hljs.registerLanguage('html', xml);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('scss', scss);
hljs.registerLanguage('javascript', javascript);

@Component({
  selector: 'demo-code-preview',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './code-preview.component.html',
  styleUrls: ['./code-preview.component.scss']
})
export class CodePreviewComponent implements AfterViewInit {
  @Input() code: string = '';
  @Input() language: string = 'html';
  @ViewChild('codeElement') codeElement!: ElementRef;
  
  isCopied = false;
  
  ngAfterViewInit() {
    this.highlightCode();
  }
  
  highlightCode() {
    if (this.codeElement && this.codeElement.nativeElement) {
      hljs.highlightElement(this.codeElement.nativeElement);
    }
  }
  
  copyToClipboard() {
    if (navigator.clipboard && this.code) {
      navigator.clipboard.writeText(this.code)
        .then(() => {
          this.isCopied = true;
          setTimeout(() => this.isCopied = false, 2000);
        })
        .catch(err => {
          console.error('Failed to copy text: ', err);
        });
    }
  }
} 