import React, { createContext, useContext, useRef, useState } from "react";

export const PlayerContext = createContext<any>(null);

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const playerRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  return (
    <PlayerContext.Provider
      value={{
        playerRef,
        isPlaying,
        setIsPlaying,
        isMuted,
        setIsMuted,
        currentTime,
        setCurrentTime,
        duration,
        setDuration,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);
