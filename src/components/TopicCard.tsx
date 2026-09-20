import React from 'react';
import { 
  Cpu, 
  Layers, 
  Network, 
  Code2, 
  Terminal, 
  Database, 
  ShieldAlert, 
  FileSpreadsheet, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Sparkles 
} from 'lucide-react';
import { TopicCategory, TopicId } from '../types';
import { sounds } from '../utils/sound';

interface TopicCardProps {
  category: TopicCategory;
  index: number;
  onSelectCategory: (category: TopicCategory) => void;
  onDirectLaunchTopic?: (topicId: TopicId) => void;
}

export const TopicCard: React.FC<TopicCardProps> = ({
  category,
  index,
  onSelectCategory,
  onDirectLaunchTopic,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-blue-600" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-purple-600" />;
      case 'Network':
        return <Network className="w-5 h-5 text-teal-600" />;
      case 'Code2':
        return <Code2 className="w-5 h-5 text-amber-600" />;
      case 'Terminal':
        return <Terminal className="w-5 h-5 text-cyan-600" />;
      case 'Database':
        return <Database className="w-5 h-5 text-rose-600" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5 text-red-600" />;
      case 'FileSpreadsheet':
        return <FileSpreadsheet className="w-5 h-5 text-emerald-600" />;
      default:
        return <Cpu className="w-5 h-5 text-blue-600" />;
    }
  };

  const hasWorkingTopic = !!category.workingTopicId;

  return (
    <div
      id={`topic-card-${category.id}`}
      onClick={() => {
        sounds.playClick();
        onSelectCategory(category);
      }}
      className={`group relative bg-white rounded-2xl border border-slate-200/90 p-5 md:p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer flex flex-col justify-between ${category.borderHoverColor}`}
    >
      <div>
        {/* Card Header: Icon + Status Badge */}
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform">
              {getIcon(category.iconName)}
            </div>
            <span className="text-xs font-bold text-slate-400 font-mono">
              0{index + 1}
            </span>
          </div>

          {hasWorkingTopic ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Lab Active
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-500 border border-slate-200">
              <Clock className="w-3 h-3 text-slate-400" />
              Syllabus Roadmap
            </span>
          )}
        </div>

        {/* Title & Subtitle */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
          {category.title}
        </h3>
        <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
          {category.subtitle}
        </p>

        {/* Subtopic Previews */}
        <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Curriculum Topics ({category.topicsList.length}):
          </span>
          <div className="space-y-1">
            {category.topicsList.slice(0, 2).map((subtopic, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs text-slate-700 truncate">
                {subtopic.isWorking ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0 ml-1"></span>
                )}
                <span className={`truncate ${subtopic.isWorking ? 'font-semibold text-slate-900' : 'text-slate-600'}`}>
                  {subtopic.name}
                </span>
                {subtopic.isWorking && (
                  <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded text-[9px] font-bold">
                    V1 Ready
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="mt-5 pt-3 flex items-center justify-between text-xs font-semibold">
        <span className="text-slate-500 group-hover:text-slate-900 transition-colors">
          Explore Module Topics
        </span>
        <div className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center text-slate-500 transition-all">
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};
