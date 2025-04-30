import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ButtonComponent, ButtonSize, ButtonVariant } from '@skillvo-web/ui-components';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-button-demo',
  standalone: true,
  imports: [CommonModule, MatCardModule, ButtonComponent, RouterModule],
  templateUrl: './button-demo.component.html',
  styleUrls: ['./button-demo.component.scss']
})
export class ButtonDemoComponent {
  variants: ButtonVariant[] = ['primary', 'secondary', 'tertiary', 'outline', 'link', 'destructive'];
  sizes: ButtonSize[] = ['sm', 'md', 'lg', 'xl'];
  
  isLoading = false;
  
  toggleLoading() {
    this.isLoading = !this.isLoading;
    
    // Automatically turn off loading after 2 seconds for demo
    if (this.isLoading) {
      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    }
  }

  showAlert(message: string) {
    alert(message);
  }
} 