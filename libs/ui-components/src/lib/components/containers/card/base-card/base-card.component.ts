import { Component, Input, ContentChild, TemplateRef, AfterContentInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sv-base-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './base-card.component.html',
  styleUrl: './base-card.component.scss'
})
export class BaseCardComponent implements AfterContentInit {
  @Input() imageUrl: string | null = null;
  @Input() altText: string = '';
  @Input() title: string = '';
  @Input() subtitle: string = '';
  
  // Allow content projection for different sections of the card
  @ContentChild('headerContent') headerContentTemplate: TemplateRef<any> | null = null;
  @ContentChild('imageContent') imageContentTemplate: TemplateRef<any> | null = null;
  @ContentChild('bodyContent') bodyContentTemplate: TemplateRef<any> | null = null;
  @ContentChild('footerContent') footerContentTemplate: TemplateRef<any> | null = null;
  
  ngAfterContentInit(): void {
    // Log for debugging
    console.log('BaseCardComponent initialized with:', {
      imageUrl: this.imageUrl,
      title: this.title,
      subtitle: this.subtitle,
      hasImageContent: !!this.imageContentTemplate,
      hasBodyContent: !!this.bodyContentTemplate,
      hasFooterContent: !!this.footerContentTemplate
    });
  }
} 