import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Settings, Volume2, VolumeX, X } from "lucide-react";

export const PomodoroSettings = ({
  workDuration,
  shortBreakDuration,
  longBreakDuration,
  onWorkDurationChange,
  onShortBreakDurationChange,
  onLongBreakDurationChange,
  completionSoundEnabled,
  onCompletionSoundToggle,
  backgroundMusicEnabled,
  onBackgroundMusicToggle,
  backgroundMusicType,
  onBackgroundMusicTypeChange,
  isOpen,
  onToggle,
}) => {
  if (!isOpen) {
    return (
      <Button
        onClick={onToggle}
        variant="outline"
        size="sm"
        className="shadow-lg"
      >
        <Settings className="w-4 h-4" />
      </Button>
    );
  }

  return (
    <div className="absolute top-0 right-0 bg-white rounded-lg shadow-xl border p-6 w-80 z-20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Timer Settings</h3>
        <Button onClick={onToggle} variant="ghost" size="sm">
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-6">
        {/* Duration Settings */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-700">Duration Settings</h4>

          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Focus Time: {workDuration} minutes
            </label>
            <Slider
              value={[workDuration]}
              onValueChange={(value) => onWorkDurationChange(value[0])}
              max={60}
              min={5}
              step={5}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Short Break: {shortBreakDuration} minutes
            </label>
            <Slider
              value={[shortBreakDuration]}
              onValueChange={(value) => onShortBreakDurationChange(value[0])}
              max={30}
              min={1}
              step={1}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Long Break: {longBreakDuration} minutes
            </label>
            <Slider
              value={[longBreakDuration]}
              onValueChange={(value) => onLongBreakDurationChange(value[0])}
              max={60}
              min={5}
              step={5}
              className="w-full"
            />
          </div>
        </div>

        {/* Audio Settings */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-700">Audio Settings</h4>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {completionSoundEnabled ? (
                <Volume2 className="w-4 h-4" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
              <span className="text-sm text-gray-600">Completion Sound</span>
            </div>
            <Switch
              checked={completionSoundEnabled}
              onCheckedChange={onCompletionSoundToggle}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Volume2 className="w-4 h-4" />
              <span className="text-sm text-gray-600">Background Music</span>
            </div>
            <Switch
              checked={backgroundMusicEnabled}
              onCheckedChange={onBackgroundMusicToggle}
            />
          </div>

          {backgroundMusicEnabled && (
            <div className="ml-6">
              <label className="block text-sm text-gray-600 mb-2">
                Music Type
              </label>
              <div className="flex space-x-2">
                <Button
                  onClick={() => onBackgroundMusicTypeChange("rain")}
                  variant={
                    backgroundMusicType === "rain" ? "default" : "outline"
                  }
                  size="sm"
                >
                  Rain
                </Button>
                <Button
                  onClick={() => onBackgroundMusicTypeChange("lofi")}
                  variant={
                    backgroundMusicType === "lofi" ? "default" : "outline"
                  }
                  size="sm"
                >
                  Lo-Fi
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
