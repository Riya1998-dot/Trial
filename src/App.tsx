import React, { useState } from 'react';
import { 
  GraduationCap, 
  Sparkles, 
  BookOpen, 
  Cpu, 
  Layers, 
  Network, 
  Code2, 
  CheckCircle2, 
  Search, 
  SlidersHorizontal,
  ArrowRight,
  Tv,
  Award,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { Header } from './components/Header';
import { TopicCard } from './components/TopicCard';
import { CategoryView } from './components/CategoryView';
import { TopicDetail } from './components/TopicDetail';
import { TOPIC_CATEGORIES, WORKING_TOPICS } from './data/topicsData';
import { CategoryId, TopicCategory, TopicId } from './types';
import { sounds } from './utils/sound';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'category' | 'topic'>('home');
  const [selectedCategory, setSelectedCategory] = useState<TopicCategory | null>(null);
  const [selectedTopicId, setSelectedTopicId] = useState<TopicId>('ram');
  const [projectorMode, setProjectorMode] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSelectCategory = (cat: TopicCategory) => {
    setSelectedCategory(cat);
    setCurrentView('category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLaunchTopic = (topicId: TopicId) => {
    sounds.playClick();
    setSelectedTopicId(topicId);
    // Find category
    const cat = TOPIC_CATEGORIES.find((c) => c.workingTopicId === topicId);
    if (cat) setSelectedCategory(cat);
    setCurrentView('topic');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    sounds.playClick();
    setCurrentView('home');
    setSelectedCategory(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToCategory = () => {
    sounds.playClick();
    if (selectedCategory) {
      setCurrentView('category');
    } else {
      setCurrentView('home');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredCategories = TOPIC_CATEGORIES.filter((c) => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.topicsList.some(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-900 transition-all ${
      projectorMode ? 'text-lg contrast-125' : ''
    }`}>
      {/* Top Professional Educational Dashboard Header */}
      <Header
        currentView={currentView}
        onNavigateHome={handleBackToHome}
        onNavigateCategory={handleBackToCategory}
        activeCategoryTitle={selectedCategory?.title}
        activeTopicTitle={currentView === 'topic' ? WORKING_TOPICS[selectedTopicId]?.title : undefined}
        projectorMode={projectorMode}
        onToggleProjectorMode={() => setProjectorMode(!projectorMode)}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
      />

      {/* Main Content Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* VIEW 1: HOME PAGE */}
        {currentView === 'home' && (
          <div className="space-y-8">
            
            {/* Hero Header Section */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-white p-6 sm:p-10 border border-slate-800 shadow-xl">
              {/* Background ambient accents */}
              <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-1/3 -mb-8 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none"></div>

              <div className="relative z-10 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-semibold mb-4">
                  <GraduationCap className="w-4 h-4 text-blue-400" />
                  <span>Designed for Senior ITI COPA Trade Instructors (NCVT / CTS Scheme)</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
                  COPA AI TEACHING LAB
                </h1>

                <p className="text-lg sm:text-2xl text-blue-200/90 font-medium mt-3 leading-snug">
                  "Turn any COPA topic into an interactive classroom."
                </p>

                <p className="text-xs sm:text-sm text-slate-300 mt-4 leading-relaxed max-w-2xl">
                  Engage ITI trainees with live silicon simulations, relatable real-life analogies, 
                  hands-on computer lab exercises, shop-floor scenarios, and 5-question NCVT MCQ quizzes.
                </p>

                {/* Quick stats pills */}
                <div className="mt-6 flex flex-wrap items-center gap-3 pt-4 border-t border-slate-800/80 text-xs text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>8 Core COPA Modules</span>
                  </div>
                  <span className="text-slate-600">•</span>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-400" />
                    <span>4 Version 1 Live Interactive Labs</span>
                  </div>
                  <span className="text-slate-600">•</span>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    <span>Classroom Projector Mode Ready</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick-Launch Tray for Version 1 Working Topics */}
            <div className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <h2 className="text-base font-bold text-slate-900">
                      Version 1 Working Interactive Topics:
                    </h2>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Click any working topic below to launch its full 7-section teaching lab instantly:
                  </p>
                </div>
                <span className="text-xs font-mono font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  4 Interactive Labs Ready
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                
                {/* 1. RAM */}
                <div
                  onClick={() => handleLaunchTopic('ram')}
                  className="p-4 rounded-xl border border-blue-200/80 bg-blue-50/40 hover:bg-blue-50 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                      Active Lab
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    1. RAM Usage Simulator
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    Dynamic apps, DDR4 memory matrix, virtual memory thrashing.
                  </p>
                  <div className="mt-3 flex items-center text-xs font-semibold text-blue-700 gap-1">
                    <span>Launch Lab</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* 2. Operating System */}
                <div
                  onClick={() => handleLaunchTopic('os')}
                  className="p-4 rounded-xl border border-purple-200/80 bg-purple-50/40 hover:bg-purple-50 hover:border-purple-400 hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-9 h-9 rounded-lg bg-purple-600 text-white flex items-center justify-center font-bold">
                      <Layers className="w-5 h-5" />
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800">
                      Active Lab
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                    2. Operating System Diagram
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    User → Application → OS Kernel/Drivers → Hardware flow.
                  </p>
                  <div className="mt-3 flex items-center text-xs font-semibold text-purple-700 gap-1">
                    <span>Launch Lab</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* 3. IP Address */}
                <div
                  onClick={() => handleLaunchTopic('ip-address')}
                  className="p-4 rounded-xl border border-teal-200/80 bg-teal-50/40 hover:bg-teal-50 hover:border-teal-400 hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-9 h-9 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold">
                      <Network className="w-5 h-5" />
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-100 text-teal-800">
                      Active Lab
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                    3. IP Address & Network
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    Computer → Router (NAT) → Internet packet routing & octets.
                  </p>
                  <div className="mt-3 flex items-center text-xs font-semibold text-teal-700 gap-1">
                    <span>Launch Lab</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* 4. HTML Forms */}
                <div
                  onClick={() => handleLaunchTopic('html-forms')}
                  className="p-4 rounded-xl border border-amber-200/80 bg-amber-50/40 hover:bg-amber-50 hover:border-amber-400 hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-9 h-9 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold">
                      <Code2 className="w-5 h-5" />
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                      Active Lab
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                    4. HTML Forms Studio
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    Split-screen HTML code on left ⟷ Live form preview on right.
                  </p>
                  <div className="mt-3 flex items-center text-xs font-semibold text-amber-700 gap-1">
                    <span>Launch Lab</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

              </div>
            </div>

            {/* 8 Core Topic Cards (NCVT ITI COPA Curriculum) */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    All 8 COPA Curriculum Topic Modules
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Click any topic card to open its topic selection page and lesson modules:
                  </p>
                </div>

                {/* Search Bar */}
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search topics, RAM, OS, IP..."
                    className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Grid of 8 Topic Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredCategories.map((category, index) => (
                  <TopicCard
                    key={category.id}
                    category={category}
                    index={index}
                    onSelectCategory={handleSelectCategory}
                    onDirectLaunchTopic={handleLaunchTopic}
                  />
                ))}
              </div>
            </div>

            {/* Senior Instructor Classroom Delivery Advice */}
            <div className="p-6 bg-slate-100 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-5 h-5 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Instructional Methodology for Senior ITI COPA Instructors:
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-700">
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <strong className="text-blue-900 block mb-1">1. Connect to Real Life First</strong>
                  <p className="text-slate-600">
                    Always start with the <strong>Real-Life Analogy</strong> section before showing technical jargon. When students visualize a study desk or a restaurant manager, mental barriers drop.
                  </p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <strong className="text-blue-900 block mb-1">2. Interactive Demonstration on Projector</strong>
                  <p className="text-slate-600">
                    Use the <strong>Interactive Demo</strong> to simulate scenarios (e.g., launching heavy apps to fill RAM or sending ping packets). Let students predict the outcome before clicking.
                  </p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <strong className="text-blue-900 block mb-1">3. Practical Hands-on & NCVT Quiz</strong>
                  <p className="text-slate-600">
                    Transition into the <strong>Classroom Activity</strong> for student lab work, wrap up with the <strong>5 MCQ Quiz</strong>, and review the <strong>Trainer Notes</strong> for exam traps.
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* VIEW 2: CATEGORY SELECTION PAGE */}
        {currentView === 'category' && selectedCategory && (
          <CategoryView
            category={selectedCategory}
            onBackToHome={handleBackToHome}
            onSelectTopic={handleLaunchTopic}
          />
        )}

        {/* VIEW 3: TOPIC 7-SECTION INTERACTIVE LAB */}
        {currentView === 'topic' && (
          <TopicDetail
            topic={WORKING_TOPICS[selectedTopicId]}
            onBackToTopics={handleBackToHome}
            onSwitchTopic={(tid) => {
              setSelectedTopicId(tid);
              const cat = TOPIC_CATEGORIES.find((c) => c.workingTopicId === tid);
              if (cat) setSelectedCategory(cat);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

      </main>

      {/* Modern Clean Footer */}
      <footer className="mt-12 bg-white border-t border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-blue-600" />
            <span className="font-semibold text-slate-700">COPA AI TEACHING LAB</span>
            <span>• Crafting interactive vocational education for ITI instructors</span>
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <span>Aligned with NCVT CTS COPA Curriculum</span>
            <span>•</span>
            <span>Version 1.0 (Interactive Ready)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
