import React, { useState, useEffect } from 'react';
import { Clock, Users, ChefHat, X } from 'lucide-react';
import { TapasNightSession } from '../types';

interface TapasNightTimerProps {
  session: TapasNightSession;
  onSessionEnd: () => void;
  isMinimized: boolean;
  onToggleMinimize: () => void;
}

export const TapasNightTimer: React.FC<TapasNightTimerProps> = ({
  session,
  onSessionEnd,
  isMinimized,
  onToggleMinimize
}) => {
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [progress, setProgress] = useState<number>(100);

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const endTime = new Date(session.startTime.getTime() + session.duration * 60 * 1000);
      const remaining = Math.max(0, endTime.getTime() - now.getTime());
      
      if (remaining === 0) {
        onSessionEnd();
        return;
      }
      
      setTimeRemaining(remaining);
      setProgress((remaining / (session.duration * 60 * 1000)) * 100);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    
    return () => clearInterval(interval);
  }, [session, onSessionEnd]);

  const formatTime = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getProgressColor = () => {
    if (progress > 50) return 'bg-green-500';
    if (progress > 20) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getBackgroundColor = () => {
    if (progress > 50) return 'from-green-50 to-green-100 border-green-200';
    if (progress > 20) return 'from-yellow-50 to-yellow-100 border-yellow-200';
    return 'from-red-50 to-red-100 border-red-200';
  };

  if (isMinimized) {
    return (
      <div 
        onClick={onToggleMinimize}
        role="button"
        tabIndex={0}
        aria-label="Expand Tapas Night timer"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggleMinimize();
          }
        }}
        className={`fixed top-4 right-4 z-40 cursor-pointer transform transition-all duration-300 hover:scale-105 mt-safe-area mr-safe-area ${
          progress > 20 ? 'animate-none' : 'animate-pulse'
        }`}
      >
        <div className={`bg-gradient-to-r ${getBackgroundColor()} rounded-2xl p-4 border-2 shadow-lg backdrop-blur-sm`}>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <ChefHat size={16} className="text-white" />
            </div>
            <div>
              <div className="font-bold text-gray-900 text-lg">
                {formatTime(timeRemaining)}
              </div>
              <div className="text-xs text-gray-600">Tapas time left</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-4 right-4 z-40 transform transition-all duration-300 mt-safe-area mr-safe-area">
      <div className={`bg-gradient-to-r ${getBackgroundColor()} rounded-2xl p-6 border-2 shadow-xl backdrop-blur-sm max-w-sm`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
              <ChefHat size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Tapas Night Active</h3>
              <p className="text-sm text-gray-600">{session.paxCount} people</p>
            </div>
          </div>
          <button
            onClick={onToggleMinimize}
            aria-label="Minimize Tapas Night timer"
            className="w-6 h-6 text-gray-400 hover:text-gray-600 rounded transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Time Remaining</span>
            <span className="font-mono font-bold text-xl text-gray-900">
              {formatTime(timeRemaining)}
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ease-out ${getProgressColor()}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2 text-gray-600">
            <Clock size={14} />
            <span>Started at {session.startTime.toLocaleTimeString()}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Users size={14} />
            <span>Unlimited tapas for {session.paxCount}</span>
          </div>
        </div>

        {progress <= 20 && (
          <div className="mt-4 p-3 bg-red-100 border border-red-200 rounded-xl">
            <p className="text-sm text-red-700 font-medium">
              ⏰ Your tapas session is ending soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};