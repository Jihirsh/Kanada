"use client"
import { useEffect, useRef, useState } from "react";

export const useAudio = () => {
  const completionAudioRef = useRef(null);
  const backgroundAudioRef = useRef(null);
  const [isBackgroundPlaying, setIsBackgroundPlaying] = useState(false);

  useEffect(() => {
    // Create completion sound audio element
    completionAudioRef.current = new Audio();
    completionAudioRef.current.preload = "auto";

    // Create background music audio element
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
      // Using a simple beep sound data URL for completion
      const audioContext = new AudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = 800;
      oscillator.type = "sine";

      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(
        0.3,
        audioContext.currentTime + 0.1
      );
      gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    }
  };

  const playBackgroundMusic = (type) => {
    if (backgroundAudioRef.current) {
      // For demo purposes, we'll use placeholder URLs
      // In a real app, you'd host these audio files or use a service
      const audioUrls = {
        rain: "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhDx2MzvrMbhsA",
        lofi: "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhDx2MzvrMbhsB",
      };

      backgroundAudioRef.current.src = audioUrls[type];
      backgroundAudioRef.current.play().catch(console.error);
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
