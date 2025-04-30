import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Subject, takeUntil } from 'rxjs';
import { EventLog, EventTrackingService } from '../../services/event-tracking.service';

@Component({
  selector: 'demo-event-monitor',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatTooltipModule
  ],
  templateUrl: './event-monitor.component.html',
  styleUrls: ['./event-monitor.component.scss']
})
export class EventMonitorComponent implements OnInit, OnDestroy {
  eventLogs: EventLog[] = [];
  
  private destroy$ = new Subject<void>();
  
  constructor(private eventTracking: EventTrackingService) {}
  
  ngOnInit(): void {
    this.eventTracking.eventLogs$
      .pipe(takeUntil(this.destroy$))
      .subscribe(logs => {
        this.eventLogs = logs;
      });
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  clearEvents(): void {
    this.eventTracking.clearEvents();
  }
  
  formatTimestamp(timestamp: Date): string {
    return timestamp.toLocaleTimeString();
  }
  
  formatPayload(payload: any): string {
    if (payload === undefined || payload === null) {
      return 'undefined';
    }
    
    try {
      return JSON.stringify(payload, null, 2);
    } catch (error) {
      return String(payload);
    }
  }
} 