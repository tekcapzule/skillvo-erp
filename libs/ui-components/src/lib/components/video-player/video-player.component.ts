import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, OnInit, OnDestroy, AfterViewInit, HostListener } from '@angular/core';
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
  @ViewChild('progressBar') progressBar!: ElementRef<HTMLInputElement>;
  @ViewChild('volumeSlider') volumeSlider!: ElementRef<HTMLInputElement>;
  
  @Input() src: string = '';
  @Input() poster: string = '';
  @Input() title: string = '';
  @Input() autoplay: boolean = false;
  @Input() muted: boolean = false;
  @Input() loop: boolean = false;
  @Input() captions: VideoCaption[] = [];
  @Input() qualities: VideoQuality[] = [];
  @Input() showPlaybackSpeed: boolean = true;
  @Input() showCaptions: boolean = true;
  @Input() showFullscreen: boolean = true;
  @Input() showVolumeControl: boolean = true;
  @Input() showControls: boolean = true;
  @Input() startTime: number = 0;
  
  @Output() play = new EventEmitter<void>();
  @Output() pause = new EventEmitter<void>();
  @Output() ended = new EventEmitter<void>();
  @Output() timeUpdate = new EventEmitter<number>();
  @Output() volumeChange = new EventEmitter<number>();
  @Output() fullscreenChange = new EventEmitter<boolean>();
  @Output() speedChange = new EventEmitter<number>();
  
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
  
  // UI state
  showQualityMenu: boolean = false;
  selectedQuality: VideoQuality | null = null;
  selectedCaption: VideoCaption | null = null;
  
  // Available playback speeds
  speedOptions: number[] = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
  
  constructor(private elementRef: ElementRef) {
    this.isMuted = this.muted;
  }
  
  ngOnInit(): void {
    this.isMuted = this.muted;
    
    if (this.qualities.length > 0) {
      this.selectedQuality = this.qualities.find(q => q.default) || this.qualities[0];
    }
    
    if (this.captions.length > 0) {
      this.selectedCaption = this.captions.find(c => c.default) || null;
    }
    
    document.addEventListener('fullscreenchange', this.handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', this.handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', this.handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', this.handleFullscreenChange);
  }
  
  ngAfterViewInit(): void {
    if (this.videoElement) {
      const video = this.videoElement.nativeElement;
      
      video.addEventListener('timeupdate', this.handleTimeUpdate);
      video.addEventListener('durationchange', this.handleDurationChange);
      video.addEventListener('ended', this.handleEnded);
      video.addEventListener('loadedmetadata', this.handleLoadedMetadata);
      video.addEventListener('waiting', this.handleBufferingStart);
      video.addEventListener('playing', this.handleBufferingEnd);

      // Apply initial settings
      video.volume = this.volume;
      video.muted = this.muted;
      video.loop = this.loop;
      video.autoplay = this.autoplay;
      
      // Set initial playback rate
      if (this.selectedSpeed !== 1) {
        video.playbackRate = this.selectedSpeed;
      }
      
      // Get available caption tracks
      if (video.textTracks) {
        this.captionsTracks = Array.from(video.textTracks);
      }
    }

    // Start with controls showing
    this.showControlsUI = true;
    this.resetControlsTimer();
  }
  
  ngOnDestroy(): void {
    if (this.videoElement) {
      const video = this.videoElement.nativeElement;
      
      video.removeEventListener('timeupdate', this.handleTimeUpdate);
      video.removeEventListener('durationchange', this.handleDurationChange);
      video.removeEventListener('ended', this.handleEnded);
      video.removeEventListener('loadedmetadata', this.handleLoadedMetadata);
      video.removeEventListener('waiting', this.handleBufferingStart);
      video.removeEventListener('playing', this.handleBufferingEnd);
    }
    
    document.removeEventListener('fullscreenchange', this.handleFullscreenChange);
    document.removeEventListener('webkitfullscreenchange', this.handleFullscreenChange);
    document.removeEventListener('mozfullscreenchange', this.handleFullscreenChange);
    document.removeEventListener('MSFullscreenChange', this.handleFullscreenChange);
    
    this.clearControlsTimer();
  }
  
  // Event handlers
  handleTimeUpdate = (): void => {
    const video = this.videoElement.nativeElement;
    this.currentTime = video.currentTime;
    this.progress = (video.currentTime / video.duration) * 100;
    this.timeUpdate.emit(video.currentTime);
  };
  
  handleDurationChange = (): void => {
    const video = this.videoElement.nativeElement;
    this.duration = video.duration;
  };
  
  handleEnded = (): void => {
    this.isPlaying = false;
    this.ended.emit();
    this.showControlsUI = true;
  };
  
  handleLoadedMetadata = (): void => {
    this.isLoaded = true;
    
    // Set initial time if provided
    if (this.startTime > 0 && this.videoElement) {
      const video = this.videoElement.nativeElement;
      if (this.startTime < video.duration) {
        video.currentTime = this.startTime;
      }
    }
  };
  
  handleBufferingStart = (): void => {
    this.buffering = true;
  };
  
  handleBufferingEnd = (): void => {
    this.buffering = false;
  };
  
  handleFullscreenChange = (): void => {
    this.isFullscreen = !!document.fullscreenElement;
    this.fullscreenChange.emit(this.isFullscreen);
  };
  
  // User interactions
  onVideoClick(): void {
    this.togglePlayPause();
  }
  
  togglePlayPause(): void {
    const video = this.videoElement.nativeElement;
    if (video.paused) {
      video.play().then(() => {
        this.isPlaying = true;
        this.play.emit();
        this.resetControlsTimer();
      }).catch(error => {
        console.error('Error playing video:', error);
      });
    } else {
      video.pause();
      this.isPlaying = false;
      this.pause.emit();
      this.showControlsUI = true;
    }
  }
  
  onVolumeChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const video = this.videoElement.nativeElement;
    const newVolume = parseFloat(input.value);
    
    video.volume = newVolume;
    this.volume = newVolume;
    this.isMuted = newVolume === 0;
    video.muted = this.isMuted;
    
    this.volumeChange.emit(newVolume);
  }
  
  toggleMute(): void {
    const video = this.videoElement.nativeElement;
    this.isMuted = !this.isMuted;
    video.muted = this.isMuted;
    
    if (this.isMuted) {
      this.previousVolume = video.volume;
      video.volume = 0;
    } else {
      video.volume = this.previousVolume;
    }
    this.volume = video.volume;
    this.volumeChange.emit(video.volume);
  }
  
  seekTo(event: MouseEvent): void {
    if (!this.isLoaded) return;
    
    const video = this.videoElement.nativeElement;
    const progressRect = this.progressBar.nativeElement.getBoundingClientRect();
    const seekPosition = (event.clientX - progressRect.left) / progressRect.width;
    
    if (seekPosition >= 0 && seekPosition <= 1) {
      video.currentTime = seekPosition * video.duration;
    }
  }
  
  startProgressDrag(): void {
    this.isDraggingProgress = true;
  }
  
  stopProgressDrag(): void {
    this.isDraggingProgress = false;
  }
  
  skipForward(): void {
    if (!this.isLoaded) return;
    const video = this.videoElement.nativeElement;
    video.currentTime = Math.min(video.currentTime + 10, video.duration);
  }
  
  skipBackward(): void {
    if (!this.isLoaded) return;
    const video = this.videoElement.nativeElement;
    video.currentTime = Math.max(video.currentTime - 10, 0);
  }
  
  toggleFullscreen(): void {
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
  
  toggleSpeedMenu(): void {
    this.showSpeedMenu = !this.showSpeedMenu;
    if (this.showSpeedMenu) {
      this.showCaptionsMenu = false;
    }
    this.clearControlsTimer();
  }
  
  setPlaybackSpeed(speed: number): void {
    if (!this.isLoaded) return;
    
    const video = this.videoElement.nativeElement;
    this.selectedSpeed = speed;
    video.playbackRate = speed;
    this.showSpeedMenu = false;
    this.speedChange.emit(speed);
    this.resetControlsTimer();
  }
  
  toggleCaptionsMenu(): void {
    this.showCaptionsMenu = !this.showCaptionsMenu;
    if (this.showCaptionsMenu) {
      this.showSpeedMenu = false;
    }
    this.clearControlsTimer();
  }
  
  toggleCaptions(): void {
    this.captionsEnabled = !this.captionsEnabled;
    
    if (this.captionsTracks.length > 0) {
      for (const track of this.captionsTracks) {
        track.mode = this.captionsEnabled ? 'showing' : 'hidden';
      }
    }
    
    this.showCaptionsMenu = false;
    this.resetControlsTimer();
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
  
  onMouseEnter(): void {
    this.showControlsUI = true;
    this.resetControlsTimer();
  }
  
  @HostListener('mousemove')
  onMouseMove(): void {
    this.showControlsUI = true;
    this.resetControlsTimer();
  }
  
  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this.isPlaying) {
      this.resetControlsTimer();
    }
  }
  
  private resetControlsTimer(): void {
    this.clearControlsTimer();
    
    if (this.isPlaying && !this.showSpeedMenu && !this.showCaptionsMenu) {
      this.hideControlsTimeout = setTimeout(() => {
        this.showControlsUI = false;
      }, 3000);
    }
  }
  
  private clearControlsTimer(): void {
    if (this.hideControlsTimeout) {
      clearTimeout(this.hideControlsTimeout);
      this.hideControlsTimeout = null;
    }
  }
  
  toggleQualityMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.showQualityMenu = !this.showQualityMenu;
    this.showSpeedMenu = false;
    this.showCaptionsMenu = false;
    this.resetControlsTimer();
  }
  
  closeAllMenus(): void {
    this.showSpeedMenu = false;
    this.showQualityMenu = false;
    this.showCaptionsMenu = false;
    this.resetControlsTimer();
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
} 