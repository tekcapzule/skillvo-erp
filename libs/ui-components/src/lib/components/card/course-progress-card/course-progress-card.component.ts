import { Component, Input, Output, EventEmitter, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseCardComponent } from '../base-card/base-card.component';

@Component({
  selector: 'sv-course-progress-card',
  standalone: true,
  imports: [CommonModule, BaseCardComponent],
  templateUrl: './course-progress-card.component.html',
  styleUrl: './course-progress-card.component.scss'
})
export class CourseProgressCardComponent implements AfterViewInit {
  @Input() imageUrl: string | null = null;
  @Input() title: string = '';
  @Input() duration: string = '';
  @Input() durationUnit: string = 'min';
  @Input() dueDate: string = '';
  @Input() showRestartButton: boolean = false;
  
  @Output() restart = new EventEmitter<void>();
  
  @ViewChild('imageContent') imageContentTemplate!: TemplateRef<any>;
  
  ngAfterViewInit(): void {
    console.log('Course progress card initialized', {
      hasImageTemplate: !!this.imageContentTemplate,
      title: this.title,
      imageUrl: this.imageUrl,
      showRestartButton: this.showRestartButton
    });
  }
  
  onRestart(event: MouseEvent): void {
    event.stopPropagation();
    this.restart.emit();
  }
} 