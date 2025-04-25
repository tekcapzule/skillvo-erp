import { Component, Input, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseCardComponent } from '../base-card/base-card.component';

@Component({
  selector: 'sv-course-card',
  standalone: true,
  imports: [CommonModule, BaseCardComponent],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.scss'
})
export class CourseCardComponent implements AfterViewInit {
  @Input() imageUrl: string | null = null;
  @Input() title: string = '';
  @Input() duration: string = '';
  @Input() durationUnit: string = 'min';
  
  @ViewChild('imageContent') imageContentTemplate!: TemplateRef<any>;
  
  ngAfterViewInit(): void {
    console.log('Course card initialized', {
      hasImageTemplate: !!this.imageContentTemplate,
      title: this.title,
      imageUrl: this.imageUrl
    });
  }
} 