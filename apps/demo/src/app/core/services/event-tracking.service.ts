import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface EventLog {
  eventName: string;
  timestamp: Date;
  payload: any;
}

@Injectable({
  providedIn: 'root'
})
export class EventTrackingService {
  private eventLogs = new BehaviorSubject<EventLog[]>([]);
  public eventLogs$ = this.eventLogs.asObservable();
  
  constructor() {}
  
  /**
   * Track a component event
   */
  trackEvent(eventName: string, payload: any): void {
    const eventLog: EventLog = {
      eventName,
      timestamp: new Date(),
      payload
    };
    
    // Add to the beginning for newest first
    const currentLogs = this.eventLogs.value;
    this.eventLogs.next([eventLog, ...currentLogs]);
  }
  
  /**
   * Clear all tracked events
   */
  clearEvents(): void {
    this.eventLogs.next([]);
  }
  
  /**
   * Get the current event logs
   */
  getEventLogs(): EventLog[] {
    return [...this.eventLogs.value];
  }
} 