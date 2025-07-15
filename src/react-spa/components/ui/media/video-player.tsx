import { Stream } from '@cloudflare/stream-react';
import React, { useState } from 'react';

/**
 * Simplified VideoPlayer component for Cloudflare Stream
 *
 * A reusable video player component specifically designed for Cloudflare Stream
 * with consistent styling and sensible defaults.
 *
 * @example
 * // Basic usage
 * <VideoPlayer src="e139bd0ad61d8a3cc3500c38724d4cb9" />
 *
 * // With custom aspect ratio
 * <VideoPlayer src="e139bd0ad61d8a3cc3500c38724d4cb9" />
 */
export interface VideoPlayerProps {
  /** Cloudflare Stream video ID */
  src: string;
  /** Path to still frame image to show until video is ready */
  poster?: string;
  /** Whether to show playback controls */
  showControls?: boolean;
  /** Whether to autoplay the video */
  autoPlay?: boolean;
  /** Whether to mute the video */
  muted?: boolean;
  /** Whether to loop the video */
  loop?: boolean;
  /**
   * This enumerated attribute is intended to provide a hint to the browser about what the author thinks will lead to the best user experience.
   * You may choose to include this attribute as a boolean attribute without a value, or you may specify the value preload="auto" to preload the beginning of the video.
   * Not including the attribute or using preload="metadata" will just load the metadata needed to start video playback when requested.
   */
  preload?: 'auto' | 'metadata' | 'none' | boolean;
  /** Additional CSS classes */
  className?: string;
  /** Callback when the browser can play the media, but might still need to buffer */
  onCanPlay?: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster,
  showControls = false,
  autoPlay = true,
  muted = true,
  loop = true,
  preload = 'auto',
  onCanPlay,
}): JSX.Element => {
  const [videoReady, setVideoReady] = useState(false);

  const handleCanPlay = (): void => {
    setVideoReady(true);
    if (onCanPlay) onCanPlay();
  };

  return (
    <div className="overflow-hidden">
      {poster && !videoReady && (
        <img src={poster} alt="Video preview" className="w-full h-full object-cover" />
      )}
      <div
        className={`${videoReady ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
      >
        <Stream
          controls={showControls}
          autoplay={autoPlay}
          muted={muted}
          loop={loop}
          src={src}
          responsive={true}
          preload={preload}
          onCanPlay={handleCanPlay}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
