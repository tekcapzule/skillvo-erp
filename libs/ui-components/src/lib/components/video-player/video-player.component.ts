import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, OnInit, OnDestroy, AfterViewInit, HostListener, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface VideoCaption {
  label: string;
  srclang: string;
  src: string;
  default?: boolean;
}

export interface VideoQuality {
  label: string;
  src: string;
  default?: boolean;
}

export interface VideoChapter {
  id: string;
  title: string;
  startTime: number;
}

export interface Caption {
  id: string;
  text: string;
  startTime: number;
  endTime: number;
}

@Component({
  selector: 'skillvo-video-player',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.scss'
})
export class VideoPlayerComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('videoContainer') videoContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('progressBar') progressBar!: ElementRef<HTMLDivElement>;
  @ViewChild('volumeSlider') volumeSlider!: ElementRef<HTMLInputElement>;
  
  @Input() src: string = '';
  @Input() poster: string = '';
  @Input() title: string = '';
  @Input() videoId: string = '';
  @Input() autoplay: boolean = false;
  @Input() muted: boolean = false;
  @Input() loop: boolean = false;
  @Input() captions: VideoCaption[] = [];
  @Input() qualities: VideoQuality[] = [];
  @Input() chapters: VideoChapter[] = [];
  @Input() thumbnailSprite: string = '';
  @Input() thumbnailInterval: number = 10;
  @Input() showPlaybackSpeed: boolean = true;
  @Input() showCaptions: boolean = true;
  @Input() showFullscreen: boolean = true;
  @Input() showVolumeControl: boolean = true;
  @Input() showControls: boolean = true;
  @Input() showChapters: boolean = false;
  @Input() startTime: number = 0;
  @Input() rememberPlaybackPosition: boolean = false;
  @Input() autoMarkCompletion: boolean = false;
  @Input() completionThreshold: number = 0.9;
  @Input() trackProgress: boolean = false;
  @Input() saveProgressInterval: number = 5;
  @Input() isCompleted: boolean = false;
  
  @Output() play = new EventEmitter<void>();
  @Output() pause = new EventEmitter<void>();
  @Output() ended = new EventEmitter<void>();
  @Output() timeUpdate = new EventEmitter<number>();
  @Output() volumeChange = new EventEmitter<number>();
  @Output() fullscreenChange = new EventEmitter<boolean>();
  @Output() speedChange = new EventEmitter<number>();
  @Output() chapterChange = new EventEmitter<VideoChapter>();
  @Output() completion = new EventEmitter<void>();
  @Output() progressSaved = new EventEmitter<number>();
  
  // Player state
  isPlaying: boolean = false;
  currentTime: number = 0;
  duration: number = 0;
  progress: number = 0;
  volume: number = 1;
  previousVolume: number = 1;
  isMuted: boolean = false;
  isFullscreen: boolean = false;
  showControlsUI: boolean = true;
  hideControlsTimeout: any;
  isDraggingProgress: boolean = false;
  isLoaded: boolean = false;
  showSpeedMenu: boolean = false;
  selectedSpeed: number = 1;
  buffering: boolean = false;
  captionsEnabled: boolean = false;
  showCaptionsMenu: boolean = false;
  captionsTracks: TextTrack[] = [];
  currentChapter: VideoChapter | null = null;
  watchedPercentage: number = 0;
  
  // UI state
  showQualityMenu: boolean = false;
  selectedQuality: VideoQuality | null = null;
  selectedCaption: VideoCaption | null = null;
  
  // Available playback speeds
  speedOptions: number[] = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
  
  // Add playback speed properties
  playbackRate: number = 1;
  playbackSpeeds: number[] = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
  
  private progressSaveTimer: any;
  private video: HTMLVideoElement | null = null;
  
  constructor(
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    private zone: NgZone
  ) {
    this.isMuted = this.muted;
  }
  
  ngOnInit(): void {
    this.isMuted = this.muted;
    
    // Load saved playback speed if available
    if (typeof localStorage !== 'undefined') {
      const savedSpeed = localStorage.getItem('video-playback-speed');
      if (savedSpeed) {
        const speed = parseFloat(savedSpeed);
        if (!isNaN(speed) && this.playbackSpeeds.includes(speed)) {
          this.playbackRate = speed;
        }
      }
    }
    
    if (this.qualities.length > 0) {
      this.selectedQuality = this.qualities.find(q => q.default) || this.qualities[0];
    }
    
    if (this.captions.length > 0) {
      this.selectedCaption = this.captions.find(c => c.default) || null;
    }
  }
  
  ngAfterViewInit(): void {
    if (this.videoElement) {
      this.video = this.videoElement.nativeElement;
      this.setupVideoEvents();
    } else {
      console.error('Video element not found in AfterViewInit');
    }
  }
  
  setupVideoEvents(): void {
    if (!this.video) return;
    
    // Set initial properties
    this.video.volume = this.volume;
    this.video.muted = this.muted;
    this.video.loop = this.loop;
    
    // Set initial playback rate
    if (this.playbackRate !== 1) {
      this.video.playbackRate = this.playbackRate;
    }
    
    // Add event listeners
    this.video.addEventListener('loadedmetadata', () => this.zone.run(() => {
      this.isLoaded = true;
      this.duration = this.video?.duration || 0;
      
      if (this.startTime > 0) {
        this.video!.currentTime = this.startTime;
      }
      
      // Apply playback rate after video is loaded
      if (this.playbackRate !== 1) {
        this.video!.playbackRate = this.playbackRate;
      }
      
      this.cdr.detectChanges();
    }));
    
    this.video.addEventListener('timeupdate', () => this.zone.run(() => {
      if (!this.video) return;
      
      this.currentTime = this.video.currentTime;
      this.progress = (this.video.currentTime / this.video.duration) * 100 || 0;
      this.timeUpdate.emit(this.video.currentTime);
      this.cdr.detectChanges();
    }));
    
    this.video.addEventListener('play', () => this.zone.run(() => {
      this.isPlaying = true;
      this.play.emit();
      this.cdr.detectChanges();
    }));
    
    this.video.addEventListener('pause', () => this.zone.run(() => {
      this.isPlaying = false;
      this.pause.emit();
      this.cdr.detectChanges();
    }));
    
    this.video.addEventListener('ended', () => this.zone.run(() => {
      this.isPlaying = false;
      this.ended.emit();
      this.cdr.detectChanges();
    }));
    
    this.video.addEventListener('waiting', () => this.zone.run(() => {
      this.buffering = true;
      this.cdr.detectChanges();
    }));
    
    this.video.addEventListener('playing', () => this.zone.run(() => {
      this.buffering = false;
      this.cdr.detectChanges();
    }));
    
    // Listen for fullscreen changes
    document.addEventListener('fullscreenchange', () => this.zone.run(() => {
      this.isFullscreen = !!document.fullscreenElement;
      this.fullscreenChange.emit(this.isFullscreen);
      this.cdr.detectChanges();
    }));
  }
  
  ngOnDestroy(): void {
    this.clearAllTimers();
    this.removeVideoEvents();
  }
  
  removeVideoEvents(): void {
    // Remove all event listeners if video exists
    if (this.video) {
      this.video.removeEventListener('loadedmetadata', () => {});
      this.video.removeEventListener('timeupdate', () => {});
      this.video.removeEventListener('play', () => {});
      this.video.removeEventListener('pause', () => {});
      this.video.removeEventListener('ended', () => {});
      this.video.removeEventListener('waiting', () => {});
      this.video.removeEventListener('playing', () => {});
    }
    
    document.removeEventListener('fullscreenchange', () => {});
  }
  
  clearAllTimers(): void {
    if (this.hideControlsTimeout) {
      clearTimeout(this.hideControlsTimeout);
      this.hideControlsTimeout = null;
    }
    
    if (this.progressSaveTimer) {
      clearInterval(this.progressSaveTimer);
      this.progressSaveTimer = null;
    }
  }
  
  // Core video control methods
  togglePlayPause(): void {
    console.log('togglePlayPause called');
    
    if (!this.videoElement || !this.videoElement.nativeElement) {
      console.error('Video element not available');
      return;
    }
    
    const video = this.videoElement.nativeElement;
    console.log('Video state:', video.paused ? 'paused' : 'playing');
    
    if (video.paused) {
      try {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error('Error playing video:', error);
          });
        }
      } catch (error) {
        console.error('Error playing video:', error);
      }
    } else {
      try {
        video.pause();
      } catch (error) {
        console.error('Error pausing video:', error);
      }
    }
  }
  
  skipForward(): void {
    console.log('skipForward called');
    
    if (!this.videoElement || !this.videoElement.nativeElement) {
      console.error('Video element not available');
      return;
    }
    
    try {
      const video = this.videoElement.nativeElement;
      console.log('Current time before skip:', video.currentTime);
      
      const newTime = Math.min(video.currentTime + 10, video.duration || 0);
      video.currentTime = newTime;
      
      console.log('Current time after skip:', video.currentTime);
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error in skipForward:', error);
    }
  }
  
  skipBackward(): void {
    console.log('skipBackward called');
    
    if (!this.videoElement || !this.videoElement.nativeElement) {
      console.error('Video element not available');
      return;
    }
    
    try {
      const video = this.videoElement.nativeElement;
      console.log('Current time before skip:', video.currentTime);
      
      const newTime = Math.max(video.currentTime - 10, 0);
      video.currentTime = newTime;
      
      console.log('Current time after skip:', video.currentTime);
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error in skipBackward:', error);
    }
  }
  
  seekTo(event: MouseEvent): void {
    if (!this.videoElement || !this.progressBar) {
      console.error('Video or progress bar element not available');
      return;
    }
    
    try {
      const video = this.videoElement.nativeElement;
      const progressRect = this.progressBar.nativeElement.getBoundingClientRect();
      const clickX = event.clientX - progressRect.left;
      const seekPosition = clickX / progressRect.width;
      
      if (seekPosition >= 0 && seekPosition <= 1) {
        const newTime = seekPosition * video.duration;
        video.currentTime = newTime;
        this.currentTime = newTime;
        this.progress = (newTime / video.duration) * 100;
        this.cdr.detectChanges();
      }
    } catch (error) {
      console.error('Error in seekTo:', error);
    }
  }
  
  // Other methods (can be added back as needed)
  toggleMute(): void {
    if (!this.videoElement) return;
    
    const video = this.videoElement.nativeElement;
    this.isMuted = !this.isMuted;
    video.muted = this.isMuted;
    
    if (this.isMuted) {
      this.previousVolume = video.volume;
      video.volume = 0;
    } else {
      video.volume = this.previousVolume || 0.5;
    }
    
    this.volume = video.volume;
    this.volumeChange.emit(video.volume);
  }
  
  onVolumeChange(event: Event): void {
    if (!this.videoElement) return;
    
    const input = event.target as HTMLInputElement;
    const video = this.videoElement.nativeElement;
    const newVolume = parseFloat(input.value);
    
    video.volume = newVolume;
    this.volume = newVolume;
    this.isMuted = newVolume === 0;
    video.muted = this.isMuted;
    
    this.volumeChange.emit(newVolume);
  }

  formatTime(seconds: number): string {
    if (!seconds || isNaN(seconds)) return '0:00';
    
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    
    if (h > 0) {
      return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    } else {
      return `${m}:${s.toString().padStart(2, '0')}`;
    }
  }
  
  // Include other methods as needed
  
  onContainerClick(event: MouseEvent): void {
    if (event.target === this.videoContainer?.nativeElement || 
        event.target === this.videoElement?.nativeElement) {
      this.togglePlayPause();
    }
  }
  
  startProgressDrag(): void {
    this.isDraggingProgress = true;
  }
  
  stopProgressDrag(): void {
    this.isDraggingProgress = false;
  }
  
  toggleFullscreen(): void {
    if (!this.videoContainer) return;
    
    const container = this.videoContainer.nativeElement;
    
    if (!this.isFullscreen) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if ((container as any).webkitRequestFullscreen) {
        (container as any).webkitRequestFullscreen();
      } else if ((container as any).mozRequestFullScreen) {
        (container as any).mozRequestFullScreen();
      } else if ((container as any).msRequestFullscreen) {
        (container as any).msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        (document as any).mozCancelFullScreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
    }
  }
  
  @HostListener('mousemove')
  onMouseMove(): void {
    this.showControlsUI = true;
  }
  
  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this.isPlaying) {
      this.showControlsUI = false;
    }
  }
  
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    // Close all menus when clicking outside
    const speedButton = this.elementRef.nativeElement.querySelector('.speed-button');
    const speedMenu = this.elementRef.nativeElement.querySelector('.speed-menu');
    
    if (this.showSpeedMenu && speedButton && speedMenu) {
      // If neither the button nor the menu was clicked
      if (!speedButton.contains(event.target as Node) && 
          !speedMenu.contains(event.target as Node)) {
        this.showSpeedMenu = false;
        this.cdr.detectChanges();
      }
    }
  }
  
  toggleSpeedMenu(event: MouseEvent): void {
    if (event) {
      event.stopPropagation();
    }
    this.showSpeedMenu = !this.showSpeedMenu;
    
    // Close other menus when opening speed menu
    if (this.showSpeedMenu) {
      this.showCaptionsMenu = false;
      this.showQualityMenu = false;
    }
    
    this.cdr.detectChanges();
  }
  
  /**
   * Sets the playback speed of the video
   */
  setPlaybackSpeed(speed: number): void {
    if (this.videoElement && this.videoElement.nativeElement) {
      this.playbackRate = speed;
      this.videoElement.nativeElement.playbackRate = speed;
      this.showSpeedMenu = false; // Close menu after selection
      this.speedChange.emit(speed);
      
      // Store the selected speed in localStorage to remember user preference
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('video-playback-speed', speed.toString());
      }
      
      this.cdr.detectChanges();
    }
  }
  
  toggleCaptionsMenu(): void {
    this.showCaptionsMenu = !this.showCaptionsMenu;
    
    if (this.showCaptionsMenu) {
      this.showSpeedMenu = false;
      this.showQualityMenu = false;
    }
  }
  
  toggleQualityMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.showQualityMenu = !this.showQualityMenu;
    
    if (this.showQualityMenu) {
      this.showSpeedMenu = false;
      this.showCaptionsMenu = false;
    }
  }
  
  closeAllMenus(): void {
    this.showSpeedMenu = false;
    this.showQualityMenu = false;
    this.showCaptionsMenu = false;
  }
  
  getVolumeIcon(): string {
    if (this.isMuted || this.volume === 0) {
      return 'volume-mute';
    } else if (this.volume < 0.5) {
      return 'volume-down';
    } else {
      return 'volume-up';
    }
  }
  
  updateCurrentChapter(): void {
    if (!this.chapters || this.chapters.length === 0) return;
    
    // Find the current chapter based on currentTime
    let newChapter: VideoChapter | null = null;
    
    for (let i = this.chapters.length - 1; i >= 0; i--) {
      if (this.currentTime >= this.chapters[i].startTime) {
        newChapter = this.chapters[i];
        break;
      }
    }
    
    // If chapter changed, emit event
    if (newChapter && (!this.currentChapter || newChapter.id !== this.currentChapter.id)) {
      this.currentChapter = newChapter;
      this.chapterChange.emit(newChapter);
    }
  }
} 