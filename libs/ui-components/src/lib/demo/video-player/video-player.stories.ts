import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { VideoPlayerComponent } from '../../components/video-player/video-player.component';

const meta: Meta<VideoPlayerComponent> = {
  title: 'Components/Video Player',
  component: VideoPlayerComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text' },
    poster: { control: 'text' },
    title: { control: 'text' },
    autoplay: { control: 'boolean' },
    muted: { control: 'boolean' },
    loop: { control: 'boolean' },
    captions: { control: 'object' },
    qualities: { control: 'object' },
    showPlaybackSpeed: { control: 'boolean' },
    showCaptions: { control: 'boolean' },
    showFullscreen: { control: 'boolean' },
    showVolumeControl: { control: 'boolean' },
    showControls: { control: 'boolean' },
    startTime: { control: 'number' },
    play: { action: 'play' },
    pause: { action: 'pause' },
    ended: { action: 'ended' },
    timeUpdate: { action: 'timeUpdate' },
    volumeChange: { action: 'volumeChange' },
    fullscreenChange: { action: 'fullscreenChange' },
    speedChange: { action: 'speedChange' },
  },
};

export default meta;
type Story = StoryObj<VideoPlayerComponent>;

export const Basic: Story = {
  args: {
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    poster: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
    title: 'Big Buck Bunny',
    autoplay: false,
    muted: false,
    loop: false,
    showPlaybackSpeed: true,
    showCaptions: true,
    showFullscreen: true,
    showVolumeControl: true,
    showControls: true,
    startTime: 0,
  },
};

export const WithCaptions: Story = {
  args: {
    ...Basic.args,
    captions: [
      {
        label: 'English',
        srclang: 'en',
        src: 'https://example.com/captions-en.vtt',
        default: true,
      },
      {
        label: 'Spanish',
        srclang: 'es',
        src: 'https://example.com/captions-es.vtt',
      },
    ],
  },
};

export const WithQualities: Story = {
  args: {
    ...Basic.args,
    qualities: [
      {
        label: '1080p',
        src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        default: true,
      },
      {
        label: '720p',
        src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      },
      {
        label: '480p',
        src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      },
    ],
  },
};

export const Autoplay: Story = {
  args: {
    ...Basic.args,
    autoplay: true,
    muted: true, // Most browsers require muted for autoplay
  },
};

export const CustomControls: Story = {
  args: {
    ...Basic.args,
    showPlaybackSpeed: true,
    showCaptions: true,
    showFullscreen: true,
    showVolumeControl: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Example with all controls enabled'
      }
    }
  }
};

export const MinimalControls: Story = {
  args: {
    ...Basic.args,
    showPlaybackSpeed: false,
    showCaptions: false,
    showFullscreen: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Example with minimal controls'
      }
    }
  }
};

export const StartAtSpecificTime: Story = {
  args: {
    ...Basic.args,
    startTime: 30, // Start 30 seconds into the video
  },
};
 