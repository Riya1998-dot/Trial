import React from 'react';
import { 
  GraduationCap, 
  Volume2, 
  VolumeX, 
  Tv, 
  BookOpen, 
  Home, 
  ArrowLeft,
  Search,
  Sparkles
} from 'lucide-react';
import { sounds } from '../utils/sound';

interface HeaderProps {
  currentView: 'home' | 'category' | 'topic';
  onNavigateHome: () => void;
  onNavigateCategory?: () => void;
  activeCategoryTitle?: string;
  activeTopicTitle?: string;
  projectorMode: boolean;
  onToggleProjectorMode: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigateHome,
  onNavigateCategory,
  activeCategoryTitle,
  activeTopicTitle,
  projectorMode,
  onToggleProjectorMode,
  soundEnabled,
  onToggleSound,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Brand & Title */}
          <div className="flex items-center gap-3.5 cursor-pointer" onClick={onNavigateHome}>
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-violet-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900">
                  COPA AI TEACHING LAB
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  ITI CTS Trade
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Turn any COPA topic into an interactive classroom.
              </p>
            </div>
          </div>

          {/* Instructor Classroom Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Projector / Presentation Mode Toggle */}
            <button
              onClick={() => {
                sounds.playClick();
                onToggleProjectorMode();
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                projectorMode
                  ? 'bg-amber-100 border-amber-300 text-amber-900 shadow-xs'
                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
              }`}
              title="Classroom Projector Mode (Enlarges font and boosts contrast)"
            >
              <Tv className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden md:inline">Projector Mode</span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={() => {
                onToggleSound();
                sounds.enabled = !soundEnabled;
                if (!soundEnabled) sounds.playClick();
              }}
              className="p-2 text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
              title={soundEnabled ? 'Mute Audio Effects' : 'Enable Audio Effects'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-blue-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            </button>

            {/* Back Button if not on home */}
            {currentView !== 'home' && (
              <button
                onClick={() => {
                  sounds.playClick();
                  onNavigateHome();
                }}
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Topics</span>
              </button>
            )}
          </div>
        </div>

        {/* Breadcrumb row if navigating topic */}
        {currentView !== 'home' && (
          <div className="py-2 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500 overflow-x-auto">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-1 hover:text-blue-600 transition-colors shrink-0"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Syllabus Home</span>
            </button>
            <span>/</span>
            {activeCategoryTitle && (
              <>
                <span className="font-medium text-slate-700 shrink-0">{activeCategoryTitle}</span>
                <span>/</span>
              </>
            )}
            {activeTopicTitle && (
              <span className="font-bold text-blue-700 shrink-0">{activeTopicTitle}</span>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
