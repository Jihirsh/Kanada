"use client"
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, RotateCcw, Timer } from "lucide-react";
import { useAudio } from "@/hooks/useAudio";
import { PomodoroSettings } from "./PomodoroSettings";

const Pomodoro = () => {
  // State declarations
  const [workDuration, setWorkDuration] = useState(25);
  const [shortBreakDuration, setShortBreakDuration] = useState(5);
  const [longBreakDuration, setLongBreakDuration] = useState(15);
  const [completionSoundEnabled, setCompletionSoundEnabled] = useState(true);
  const [backgroundMusicEnabled, setBackgroundMusicEnabled] = useState(false);
  const [backgroundMusicType, setBackgroundMusicType] = useState("rain");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [currentMode, setCurrentMode] = useState("work");
  const [timeLeft, setTimeLeft] = useState(workDuration * 60);
  const [isActive, setIsActive] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);

  const { playCompletionSound, playBackgroundMusic, stopBackgroundMusic, isBackgroundPlaying } = useAudio();

  const modes = {
    work: { duration: workDuration * 60, label: "Focus Time", color: "bg-black" },
    shortBreak: { duration: shortBreakDuration * 60, label: "Short Break", color: "bg-gray-700" },
    longBreak: { duration: longBreakDuration * 60, label: "Long Break", color: "bg-gray-600" },
  };

  // Handle background music toggle and type change
  useEffect(() => {
    if (backgroundMusicEnabled) {
      playBackgroundMusic(backgroundMusicType);
    } else {
      stopBackgroundMusic();
    }
  }, [backgroundMusicEnabled, backgroundMusicType, playBackgroundMusic, stopBackgroundMusic]);

  // Timer logic
  useEffect(() => {
    let timer;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (completionSoundEnabled) {
        playCompletionSound();
      }
      setCompletedSessions((prev) => prev + 1);
      // Switch modes after completion
      if (currentMode === "work") {
        setCurrentMode(completedSessions % 4 === 3 ? "longBreak" : "shortBreak");
        setTimeLeft(completedSessions % 4 === 3 ? longBreakDuration * 60 : shortBreakDuration * 60);
      } else {
        setCurrentMode("work");
        setTimeLeft(workDuration * 60);
      }
      setIsActive(false);
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft, currentMode, completionSoundEnabled, playCompletionSound, completedSessions, workDuration, shortBreakDuration, longBreakDuration]);

  const switchMode = (mode) => {
    setCurrentMode(mode);
    setTimeLeft(modes[mode].duration);
    setIsActive(false);
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(modes[currentMode].duration);
  };

  const getProgress = () => {
    const total = modes[currentMode].duration;
    return ((total - timeLeft) / total) * 100;
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">

      <main className="flex-1 flex items-center justify-center px-4 py-16 relative">
        {/* Settings Button - Top Right */}
        <div className="absolute top-8 right-8 z-10">
          <PomodoroSettings
            workDuration={workDuration}
            shortBreakDuration={shortBreakDuration}
            longBreakDuration={longBreakDuration}
            onWorkDurationChange={setWorkDuration}
            onShortBreakDurationChange={setShortBreakDuration}
            onLongBreakDurationChange={setLongBreakDuration}
            completionSoundEnabled={completionSoundEnabled}
            onCompletionSoundToggle={setCompletionSoundEnabled}
            backgroundMusicEnabled={backgroundMusicEnabled}
            onBackgroundMusicToggle={setBackgroundMusicEnabled}
            backgroundMusicType={backgroundMusicType}
            onBackgroundMusicTypeChange={setBackgroundMusicType}
            isOpen={settingsOpen}
            onToggle={() => setSettingsOpen(!settingsOpen)}
          />
        </div>

        <div className="max-w-md w-full mx-auto text-center">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-center mb-4">
              <Timer className="w-8 h-8 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">Pomodoro Timer</h1>
            </div>
            <p className="text-gray-600">Stay focused and productive</p>
          </div>

          {/* Mode Selector */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-8">
            <button
              onClick={() => switchMode("work")}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                currentMode === "work" ? "bg-black text-white" : "text-gray-700 hover:text-gray-900"
              }`}
            >
              Focus ({workDuration}m)
            </button>
            <button
              onClick={() => switchMode("shortBreak")}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                currentMode === "shortBreak" ? "bg-black text-white" : "text-gray-700 hover:text-gray-900"
              }`}
            >
              Short ({shortBreakDuration}m)
            </button>
            <button
              onClick={() => switchMode("longBreak")}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                currentMode === "longBreak" ? "bg-black text-white" : "text-gray-700 hover:text-gray-900"
              }`}
            >
              Long ({longBreakDuration}m)
            </button>
          </div>

          {/* Timer Display */}
          <div className="mb-8">
            <div className="relative">
              <div className="w-64 h-64 mx-auto mb-6 relative">
                <div className="absolute inset-0 rounded-full border-8 border-gray-200"></div>
                <div
                  className="absolute inset-0 rounded-full border-8 border-black transition-all duration-1000 ease-linear"
                  style={{
                    background: `conic-gradient(black ${getProgress() * 3.6}deg, transparent ${getProgress() * 3.6}deg)`,
                  }}
                ></div>
                <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-gray-900 mb-2">{formatTime(timeLeft)}</div>
                    <div className="text-sm text-gray-600 uppercase tracking-wider">{modes[currentMode].label}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <Progress value={getProgress()} className="h-2" />
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center space-x-4 mb-8">
            <Button onClick={toggleTimer} size="lg" className="flex items-center space-x-2">
              {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              <span>{isActive ? "Pause" : "Start"}</span>
            </Button>

            <Button onClick={resetTimer} variant="outline" size="lg" className="flex items-center space-x-2">
              <RotateCcw className="w-5 h-5" />
              <span>Reset</span>
            </Button>
          </div>

          {/* Stats */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{completedSessions}</div>
                <div className="text-sm text-gray-600">Completed Sessions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{Math.floor(completedSessions / 4)}</div>
                <div className="text-sm text-gray-600">Full Cycles</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Pomodoro;