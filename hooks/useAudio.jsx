"use client";
import { useEffect, useRef, useState } from "react";

export const useAudio = () => {
  const completionAudioRef = useRef(null);
  const backgroundAudioRef = useRef(null);
  const [isBackgroundPlaying, setIsBackgroundPlaying] = useState(false);

  useEffect(() => {
    // Completion sound audio element
    completionAudioRef.current = new Audio();
    completionAudioRef.current.preload = "auto";

    // Background music audio element
    backgroundAudioRef.current = new Audio();
    backgroundAudioRef.current.preload = "auto";
    backgroundAudioRef.current.loop = true;
    backgroundAudioRef.current.volume = 0.3;

    return () => {
      if (completionAudioRef.current) {
        completionAudioRef.current.pause();
        completionAudioRef.current = null;
      }
      if (backgroundAudioRef.current) {
        backgroundAudioRef.current.pause();
        backgroundAudioRef.current = null;
      }
    };
  }, []);

  const playCompletionSound = () => {
    if (completionAudioRef.current) {
      completionAudioRef.current.src = "/audio/completion.mp3";
      completionAudioRef.current.play().catch((error) => console.error("Completion sound error:", error));
    }
  };

  const playBackgroundMusic = (type) => {
    if (backgroundAudioRef.current) {
      const audioUrls = {
        rain: "/audio/rain.mp3",
        lofi: "/audio/lofi.mp3",
      };

      backgroundAudioRef.current.src = audioUrls[type];
      backgroundAudioRef.current.play().catch((error) => console.error("Background music error:", error));
      setIsBackgroundPlaying(true);
    }
  };

  const stopBackgroundMusic = () => {
    if (backgroundAudioRef.current) {
      backgroundAudioRef.current.pause();
      backgroundAudioRef.current.currentTime = 0;
      setIsBackgroundPlaying(false);
    }
  };

  return {
    playCompletionSound,
    playBackgroundMusic,
    stopBackgroundMusic,
    isBackgroundPlaying,
  };
};