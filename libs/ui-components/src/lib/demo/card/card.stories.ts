import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { BaseCardComponent } from '../../components/card/base-card/base-card.component';
import { CourseCardComponent } from '../../components/card/course-card/course-card.component';
import { CourseProgressCardComponent } from '../../components/card/course-progress-card/course-progress-card.component';
import { ReferenceCardComponent } from '../../components/card/reference-card/reference-card.component';

const meta: Meta = {
  title: 'Components/Cards',
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        BaseCardComponent,
        CourseCardComponent,
        CourseProgressCardComponent,
        ReferenceCardComponent
      ],
    }),
  ],
  parameters: {
    layout: 'padded',
  },
};

export default meta;

// Base Card Stories
export const BaseCard: StoryObj<BaseCardComponent> = {
  name: 'Base Card',
  render: (args) => ({
    props: {
      ...args,
    },
    template: `
      <div style="width: 300px; height: 350px;">
        <sv-base-card
          [imageUrl]="imageUrl"
          [title]="title"
          [subtitle]="subtitle">
        </sv-base-card>
      </div>
    `,
  }),
  args: {
    title: 'Base Card Title',
    subtitle: 'Base card subtitle text',
    imageUrl: 'https://source.unsplash.com/random/800x400/?cityscape',
    altText: 'Cityscape'
  }
};

// Course Card Stories
export const CourseThumbnail: StoryObj<CourseCardComponent> = {
  name: 'Course Card',
  render: (args) => ({
    props: {
      ...args,
    },
    template: `
      <div style="width: 300px; height: 350px;">
        <sv-course-card
          [title]="title"
          [duration]="duration"
          [durationUnit]="durationUnit"
          [imageUrl]="imageUrl">
        </sv-course-card>
      </div>
    `,
  }),
  args: {
    title: 'Machine Learning - Introduction',
    duration: '18',
    durationUnit: 'min',
    imageUrl: 'https://source.unsplash.com/random/800x400/?cityscape',
  }
};

// Course Progress Card Stories
export const CourseInProgress: StoryObj<CourseProgressCardComponent> = {
  name: 'Course Progress Card',
  render: (args) => ({
    props: {
      ...args,
      onRestart: () => console.log('Restart course')
    },
    template: `
      <div style="width: 300px; height: 350px;">
        <sv-course-progress-card
          [title]="title"
          [duration]="duration"
          [durationUnit]="durationUnit"
          [dueDate]="dueDate"
          [showRestartButton]="showRestartButton"
          [imageUrl]="imageUrl"
          (restart)="onRestart()">
        </sv-course-progress-card>
      </div>
    `,
  }),
  args: {
    title: 'Java Basic Course',
    duration: '50',
    durationUnit: 'min',
    dueDate: '2 days',
    showRestartButton: true,
    imageUrl: 'https://source.unsplash.com/random/800x400/?java',
  }
};

// Reference Card Stories
export const ReferenceVideo: StoryObj<ReferenceCardComponent> = {
  name: 'Reference Card',
  render: (args) => ({
    props: {
      ...args,
      onPlay: () => console.log('Play reference')
    },
    template: `
      <div style="width: 300px; height: 350px;">
        <sv-reference-card
          [title]="title"
          [duration]="duration"
          [mediaType]="mediaType"
          (play)="onPlay()">
        </sv-reference-card>
      </div>
    `,
  }),
  args: {
    title: 'Test',
    duration: '10:00',
    mediaType: 'video',
  }
};

// Card Gallery - Multiple Examples of Each Type
export const CardGallery: StoryObj = {
  name: 'Card Gallery',
  render: () => ({
    props: {
      onPlay: () => console.log('Play reference'),
      onRestart: () => console.log('Restart course'),
    },
    template: `
      <div style="padding: 20px;">
        <h2 style="margin-bottom: 16px; font-family: sans-serif; color: #333;">Course Cards</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px; margin-bottom: 32px;">
          <sv-course-card 
            title="Machine Learning - Introduction" 
            duration="18" 
            imageUrl="https://source.unsplash.com/random/800x400/?cityscape">
          </sv-course-card>
          
          <sv-course-card 
            title="Data Science Fundamentals" 
            duration="42" 
            imageUrl="https://source.unsplash.com/random/800x400/?technology">
          </sv-course-card>
          
          <sv-course-card 
            title="JavaScript Essentials" 
            duration="30" 
            imageUrl="https://source.unsplash.com/random/800x400/?programming">
          </sv-course-card>
        </div>
        
        <h2 style="margin-bottom: 16px; font-family: sans-serif; color: #333;">Course Progress Cards</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px; margin-bottom: 32px;">
          <sv-course-progress-card 
            title="Java Basic Course" 
            duration="50" 
            dueDate="2 days" 
            [showRestartButton]="true" 
            imageUrl="https://source.unsplash.com/random/800x400/?java"
            (restart)="onRestart()">
          </sv-course-progress-card>
          
          <sv-course-progress-card 
            title="React Advanced Topics" 
            duration="120" 
            dueDate="3 days" 
            [showRestartButton]="true" 
            imageUrl="https://source.unsplash.com/random/800x400/?react"
            (restart)="onRestart()">
          </sv-course-progress-card>
        </div>
        
        <h2 style="margin-bottom: 16px; font-family: sans-serif; color: #333;">Reference Cards</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px; margin-bottom: 32px;">
          <sv-reference-card 
            title="Video Tutorial" 
            duration="10:00" 
            mediaType="video"
            (play)="onPlay()">
          </sv-reference-card>
          
          <sv-reference-card 
            title="Documentation" 
            duration="15:30" 
            mediaType="document"
            (play)="onPlay()">
          </sv-reference-card>
          
          <sv-reference-card 
            title="Podcast Interview" 
            duration="45:20" 
            mediaType="audio"
            (play)="onPlay()">
          </sv-reference-card>
        </div>
      </div>
    `,
  }),
};

// Mixed Card Grid
export const MixedCardGrid: StoryObj = {
  name: 'Mixed Card Grid',
  render: () => ({
    props: {
      onPlay: () => console.log('Play reference'),
      onRestart: () => console.log('Restart course'),
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px; padding: 20px;">
        <sv-course-card 
          title="Machine Learning - Introduction" 
          duration="18" 
          imageUrl="https://source.unsplash.com/random/800x400/?cityscape">
        </sv-course-card>
        
        <sv-course-progress-card 
          title="Java Basic Course" 
          duration="50" 
          dueDate="2 days" 
          [showRestartButton]="true" 
          imageUrl="https://source.unsplash.com/random/800x400/?java"
          (restart)="onRestart()">
        </sv-course-progress-card>
        
        <sv-reference-card 
          title="Test" 
          duration="10:00" 
          mediaType="video"
          (play)="onPlay()">
        </sv-reference-card>
      </div>
    `,
  }),
}; 