import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

interface MenuItem {
  name: string;
  route?: string;
  icon: string;
  children?: MenuItem[];
}

@Component({
  selector: 'demo-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule
  ]
})
export class SidenavComponent implements OnInit {
  @Output() itemClicked = new EventEmitter<void>();
  isMobile = false;
  
  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe(result => {
        this.isMobile = result.matches;
      });
  }
  
  onItemClick() {
    if (this.isMobile) {
      this.itemClicked.emit();
    }
  }

  menuItems: MenuItem[] = [
    {
      name: 'Input',
      icon: 'text_fields',
      children: [
        { name: 'Input Controls', route: '/input/controls', icon: 'input' },
        { name: 'Text fields', route: '/input/text-field', icon: 'edit' },
        { name: 'Password fields', route: '/input/password-field', icon: 'lock' },
        { name: 'Number inputs', route: '/input/number-input', icon: 'pin' },
        { name: 'Date/time pickers', route: '/input/date-time-picker', icon: 'calendar_today' },
        { name: 'Color pickers', route: '/input/color-picker', icon: 'palette' },
        { name: 'File uploads', route: '/input/file-upload', icon: 'upload_file' },
        { name: 'Search field', route: '/input/search-field', icon: 'search' }
      ]
    },
    {
      name: 'Selection',
      icon: 'check_box',
      children: [
        { name: 'Checkboxes', route: '/selection/checkbox', icon: 'check_box' },
        { name: 'Radio buttons', route: '/selection/radio-button', icon: 'radio_button_checked' },
        { name: 'Toggle switches', route: '/selection/toggle-switch', icon: 'toggle_on' },
        { name: 'Dropdown menus', route: '/selection/dropdown-menu', icon: 'arrow_drop_down' },
        { name: 'Multi-select lists', route: '/selection/multi-select-list', icon: 'checklist' }
      ]
    },
    {
      name: 'Action',
      icon: 'touch_app',
      children: [
        { name: 'Buttons', route: '/action/button', icon: 'smart_button' },
        { name: 'Icon buttons', route: '/action/icon-button', icon: 'add_circle' },
        { name: 'Floating action buttons', route: '/action/floating-action-button', icon: 'add_circle_outline' },
        { name: 'Button groups', route: '/action/button-group', icon: 'view_module' },
        { name: 'Split buttons', route: '/action/split-button', icon: 'call_split' },
        { name: 'Menu buttons', route: '/action/menu-button', icon: 'menu' }
      ]
    },
    {
      name: 'Navigation',
      icon: 'navigation',
      children: [
        { name: 'Navigation bars/menus', route: '/navigation/nav-bar', icon: 'menu' },
        { name: 'Tabs', route: '/navigation/tabs', icon: 'tab' },
        { name: 'Breadcrumbs', route: '/navigation/breadcrumbs', icon: 'chevron_right' },
        { name: 'Pagination', route: '/navigation/pagination', icon: 'last_page' },
        { name: 'Side navigation', route: '/navigation/side-nav', icon: 'menu_open' }
      ]
    },
    {
      name: 'Information',
      icon: 'info',
      children: [
        { name: 'Labels', route: '/information/label', icon: 'label' },
        { name: 'Tooltips', route: '/information/tooltip', icon: 'info' },
        { name: 'Badges', route: '/information/badge', icon: 'fiber_manual_record' },
        { name: 'Tags/chips', route: '/information/tag', icon: 'local_offer' },
        { name: 'Progress indicators', route: '/information/progress-indicator', icon: 'hourglass_bottom' },
        { name: 'Status indicators', route: '/information/status-indicator', icon: 'circle' },
        { name: 'Avatars', route: '/information/avatar', icon: 'person' }
      ]
    },
    {
      name: 'Containers',
      icon: 'dashboard',
      children: [
        { name: 'Cards', route: '/containers/card', icon: 'crop_square' },
        { name: 'Panels', route: '/containers/panel', icon: 'web_asset' },
        { name: 'Modal dialogs', route: '/containers/modal', icon: 'open_in_new' },
        { name: 'Accordions', route: '/containers/accordion', icon: 'expand_more' },
        { name: 'Tabs panels', route: '/containers/tabs-panel', icon: 'tab' },
        { name: 'Drawers', route: '/containers/drawer', icon: 'vertical_split' },
        { name: 'Sidebars', route: '/containers/sidebar', icon: 'view_sidebar' }
      ]
    },
    {
      name: 'Feedback',
      icon: 'notifications',
      children: [
        { name: 'Alert/notification banners', route: '/feedback/alert', icon: 'announcement' },
        { name: 'Toasts', route: '/feedback/toast', icon: 'notifications' },
        { name: 'Snackbars', route: '/feedback/snackbar', icon: 'speaker_notes' },
        { name: 'Popovers', route: '/feedback/popover', icon: 'chat_bubble' },
        { name: 'Dialog boxes', route: '/feedback/dialog', icon: 'question_answer' },
        { name: 'Loading indicators', route: '/feedback/loading-indicator', icon: 'sync' },
        { name: 'Error messages', route: '/feedback/error-message', icon: 'error' }
      ]
    },
    {
      name: 'Data',
      icon: 'table_chart',
      children: [
        { name: 'Tables', route: '/data/table', icon: 'table_chart' },
        { name: 'Lists', route: '/data/list', icon: 'format_list_bulleted' },
        { name: 'Grids', route: '/data/grid', icon: 'grid_on' },
        { name: 'Dashboards', route: '/data/dashboard', icon: 'dashboard' }
      ]
    }
  ];
} 