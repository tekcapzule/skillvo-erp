import { Component, Input, Output, EventEmitter, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseCardComponent } from '../base-card/base-card.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'sv-reference-card',
  standalone: true,
  imports: [CommonModule, BaseCardComponent],
  templateUrl: './reference-card.component.html',
  styleUrl: './reference-card.component.scss'
})
export class ReferenceCardComponent implements AfterViewInit {
  @Input() title: string = '';
  @Input() duration: string = '';
  @Input() mediaType: 'video' | 'document' | 'audio' = 'video';
  
  @Output() play = new EventEmitter<void>();
  
  @ViewChild('imageContent') imageContentTemplate!: TemplateRef<any>;
  
  constructor(private sanitizer: DomSanitizer) {}
  
  ngAfterViewInit(): void {
    console.log('Reference card initialized', {
      hasImageTemplate: !!this.imageContentTemplate,
      mediaType: this.mediaType,
      title: this.title
    });
  }
  
  onPlay(event: MouseEvent): void {
    event.stopPropagation();
    this.play.emit();
  }
  
  get mediaIcon(): SafeHtml {
    switch(this.mediaType) {
      case 'video':
        return this.sanitizer.bypassSecurityTrustHtml(`
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.6 11.6L9.6 7.6C9.33137 7.41863 9 7.61358 9 7.92821V15.0718C9 15.3864 9.33137 15.5814 9.6 15.4L15.6 11.4C15.8425 11.2354 15.8425 11.7646 15.6 11.6Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        `);
      case 'document':
        return this.sanitizer.bypassSecurityTrustHtml(`
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7 9H17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7 12H17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7 15H12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        `);
      case 'audio':
        return this.sanitizer.bypassSecurityTrustHtml(`
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4V20M8 8V16M4 10V14M16 7V17M20 10V14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        `);
      default:
        return this.sanitizer.bypassSecurityTrustHtml(``);
    }
  }
} 