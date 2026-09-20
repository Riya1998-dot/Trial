import React from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles, 
  Play, 
  Clock, 
  BookOpen, 
  Cpu, 
  Layers, 
  Network, 
  Code2, 
  ChevronRight,
  GraduationCap
} from 'lucide-react';
import { TopicCategory, TopicId } from '../types';
import { sounds } from '../utils/sound';

interface CategoryViewProps {
  category: TopicCategory;
  onBackToHome: () => void;
  onSelectTopic: (topicId: TopicId) => void;
}

export const CategoryView: React.FC<CategoryViewProps> = ({
  category,
  onBackToHome,
  onSelectTopic,
}) => {
  return (
    <div className="space-y-6">
      {/* Category Hero Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <button
              onClick={() => {
                sounds.playClick();
                onBackToHome();
              }}
              className="p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors shrink-0"
              title="Back to Topics"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700">
                  COPA Module Selection
                </span>
                <span className="text-xs text-slate-400">• NCVT CTS Syllabus</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {category.title}
              </h2>
              <p className="text-sm text-slate-600 mt-1 max-w-2xl">
                {category.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sounds.playClick();
                onBackToHome();
              }}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to All 8 Topics
            </button>
          </div>
        </div>
      </div>

      {/* Subtopics Selection Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-600" />
            Select a Topic to Launch the Interactive Teaching Lab:
          </h3>
          <span className="text-xs text-slate-500">
            {category.topicsList.length} Syllabus Units
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {category.topicsList.map((topicItem, idx) => {
            const isWorking = topicItem.isWorking && topicItem.topicId;

            return (
              <div
                key={idx}
                className={`p-5 rounded-2xl border transition-all ${
                  isWorking
                    ? 'bg-white border-blue-200 hover:border-blue-400 shadow-xs hover:shadow-md ring-1 ring-blue-100'
                    : 'bg-slate-50 border-slate-200/80 opacity-80'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      {isWorking ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                          Version 1 Active Lab
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-200 text-slate-600">
                          Scheduled for V2
                        </span>
                      )}
                      <span className="text-xs font-mono text-slate-400">Unit {idx + 1}</span>
                    </div>

                    <h4 className="text-lg font-bold text-slate-900">
                      {topicItem.name}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {topicItem.description}
                    </p>
                  </div>
                </div>

                {/* Card Action Button */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  {isWorking ? (
                    <button
                      onClick={() => {
                        sounds.playClick();
                        onSelectTopic(topicItem.topicId!);
                      }}
                      className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5" /> Launch 7-Section Interactive Classroom Lab
                    </button>
                  ) : (
                    <div className="w-full py-2 px-3 bg-slate-200/60 rounded-xl text-center text-xs text-slate-500 font-medium">
                      Syllabus Overview Ready • Interactive Lab Coming Soon
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Switch to Other Active Topics Banner */}
      <div className="p-5 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl border border-blue-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div>
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-blue-600" />
              Quick Launch Other Version 1 Working Topics:
            </h4>
            <p className="text-xs text-slate-600">
              Directly jump into any interactive lab to demonstrate to ITI instructors:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            onClick={() => { sounds.playClick(); onSelectTopic('ram'); }}
            className="p-2.5 bg-white hover:bg-blue-50 rounded-xl border border-slate-200 hover:border-blue-300 text-left text-xs font-semibold text-slate-800 transition-all flex items-center gap-2"
          >
            <Cpu className="w-4 h-4 text-blue-600 shrink-0" />
            <span className="truncate">RAM Simulator</span>
          </button>
          <button
            onClick={() => { sounds.playClick(); onSelectTopic('os'); }}
            className="p-2.5 bg-white hover:bg-purple-50 rounded-xl border border-slate-200 hover:border-purple-300 text-left text-xs font-semibold text-slate-800 transition-all flex items-center gap-2"
          >
            <Layers className="w-4 h-4 text-purple-600 shrink-0" />
            <span className="truncate">Operating System</span>
          </button>
          <button
            onClick={() => { sounds.playClick(); onSelectTopic('ip-address'); }}
            className="p-2.5 bg-white hover:bg-teal-50 rounded-xl border border-slate-200 hover:border-teal-300 text-left text-xs font-semibold text-slate-800 transition-all flex items-center gap-2"
          >
            <Network className="w-4 h-4 text-teal-600 shrink-0" />
            <span className="truncate">IP Routing Lab</span>
          </button>
          <button
            onClick={() => { sounds.playClick(); onSelectTopic('html-forms'); }}
            className="p-2.5 bg-white hover:bg-amber-50 rounded-xl border border-slate-200 hover:border-amber-300 text-left text-xs font-semibold text-slate-800 transition-all flex items-center gap-2"
          >
            <Code2 className="w-4 h-4 text-amber-600 shrink-0" />
            <span className="truncate">HTML Forms Studio</span>
          </button>
        </div>
      </div>
    </div>
  );
};
