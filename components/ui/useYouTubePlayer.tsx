import { useState, useEffect, useCallback } from "react";

export default function useYouTubePlayer(player: YT.Player | null) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  type OnReadyEvent = {
    target: YT.Player;
  };

  const togglePlay = () => {
    if (player) {
      if (isPlaying) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (player) {
      if (isMuted) {
        player.unMute();
      } else {
        player.mute();
      }
      setIsMuted(!isMuted);
    }
  };

  const seekVideo = (time: number) => {
    if (player) {
      player.seekTo(time, true);
      setCurrentTime(time);
    }
  };

  const handlePlayerReady = (event: OnReadyEvent) => {
    const ytPlayer = event.target;
    setDuration(ytPlayer.getDuration());
  };

  const handlePlayerStateChange = (event: YT.OnStateChangeEvent) => {
    switch (event.data) {
      case 1: // Playing
        setIsPlaying(true);
        break;
      case 2: // Paused
        setIsPlaying(false);
        break;
      default:
        break;
    }
  };

  const updateCurrentTime = useCallback(() => {
    if (player) {
      setCurrentTime(player.getCurrentTime());
    }
  }, [player]);

  // Use the memoized `updateCurrentTime` in the effect
  useEffect(() => {
    const interval = setInterval(updateCurrentTime, 1000);
    return () => clearInterval(interval);
  }, [updateCurrentTime]);

  return {
    isPlaying,
    isMuted,
    currentTime,
    duration,
    togglePlay,
    toggleMute,
    seekVideo,
    handlePlayerReady,
    handlePlayerStateChange,
  };
}
