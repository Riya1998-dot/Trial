import React, { useState } from 'react';
import { 
  ArrowLeft, 
  BookOpen, 
  Sparkles, 
  Lightbulb, 
  Cpu, 
  Activity, 
  Briefcase, 
  Award, 
  UserCheck, 
  ChevronRight,
  Printer,
  CheckCircle2,
  Table,
  HelpCircle,
  FileText,
  Bookmark
} from 'lucide-react';
import { TopicContent, TopicId, SectionTab } from '../types';
import { RAMDemo } from './demos/RAMDemo';
import { OSDemo } from './demos/OSDemo';
import { IPDemo } from './demos/IPDemo';
import { HTMLFormsDemo } from './demos/HTMLFormsDemo';
import { QuizSection } from './QuizSection';
import { sounds } from '../utils/sound';

interface TopicDetailProps {
  topic: TopicContent;
  onBackToTopics: () => void;
  onSwitchTopic: (topicId: TopicId) => void;
}

const SECTION_TABS: { id: SectionTab; label: string; number: string; icon: React.ReactNode }[] = [
  { id: 'explanation', label: '1. Simple Explanation', number: '1', icon: <BookOpen className="w-4 h-4" /> },
  { id: 'analogy', label: '2. Real-Life Analogy', number: '2', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'demo', label: '3. Interactive Demo', number: '3', icon: <Cpu className="w-4 h-4" /> },
  { id: 'activity', label: '4. Classroom Activity', number: '4', icon: <Activity className="w-4 h-4" /> },
  { id: 'scenario', label: '5. Real-World Scenario', number: '5', icon: <Briefcase className="w-4 h-4" /> },
  { id: 'quiz', label: '6. 5 MCQ Quiz', number: '6', icon: <Award className="w-4 h-4" /> },
  { id: 'trainer-notes', label: '7. Trainer Notes', number: '7', icon: <UserCheck className="w-4 h-4" /> },
];

export const TopicDetail: React.FC<TopicDetailProps> = ({
  topic,
  onBackToTopics,
  onSwitchTopic,
}) => {
  const [activeTab, setActiveTab] = useState<SectionTab | 'all'>('all');

  const renderInteractiveDemo = () => {
    switch (topic.id) {
      case 'ram':
        return <RAMDemo />;
      case 'os':
        return <OSDemo />;
      case 'ip-address':
        return <IPDemo />;
      case 'html-forms':
        return <HTMLFormsDemo />;
      default:
        return <RAMDemo />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Navigation Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <button
                onClick={() => {
                  sounds.playClick();
                  onBackToTopics();
                }}
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Topics
              </button>
              <span className="text-slate-300">•</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                {topic.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                {topic.badge}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {topic.title}
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-3xl">
              {topic.summary}
            </p>
          </div>

          {/* Quick Working Topic Switcher */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[11px] font-bold text-slate-400 uppercase px-2 font-mono">
              Switch Topic:
            </span>
            {(['ram', 'os', 'ip-address', 'html-forms'] as TopicId[]).map((tid) => {
              const labelMap: Record<TopicId, string> = {
                ram: 'RAM',
                os: 'OS Diagram',
                'ip-address': 'IP Address',
                'html-forms': 'HTML Forms',
              };
              const isCurrent = topic.id === tid;
              return (
                <button
                  key={tid}
                  onClick={() => {
                    sounds.playClick();
                    onSwitchTopic(tid);
                  }}
                  className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all ${
                    isCurrent
                      ? 'bg-blue-600 text-white font-bold shadow-xs'
                      : 'text-slate-600 hover:bg-white hover:text-slate-900'
                  }`}
                >
                  {labelMap[tid]}
                </button>
              );
            })}
          </div>
        </div>

        {/* 7 Section Quick Tab Navigation */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto pb-1">
          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('all');
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
              activeTab === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            All 7 Sections View
          </button>

          {SECTION_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                sounds.playClick();
                setActiveTab(tab.id);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/60'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* SECTION 1: SIMPLE EXPLANATION */}
      {(activeTab === 'all' || activeTab === 'explanation') && (
        <section id="section-explanation" className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 mb-6">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-sm">
              1
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Simple Explanation</h3>
              <p className="text-xs text-slate-500">Classroom-friendly definitions and technical core points.</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Primary Definition Banner */}
            <div className="p-4 sm:p-5 bg-blue-50/70 border border-blue-200 rounded-xl text-slate-800">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 block mb-1">
                Standard COPA Definition:
              </span>
              <p className="text-sm sm:text-base leading-relaxed font-medium">
                {topic.simpleExplanation.definition}
              </p>
            </div>

            {/* Core Key Points */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Key Conceptual Pillars:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {topic.simpleExplanation.keyPoints.map((point, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Specifications Table */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Technical Specifications & NCVT Alignment:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {topic.simpleExplanation.technicalSpecifications.map((spec, idx) => (
                  <div key={idx} className="p-3 bg-white rounded-lg border border-slate-200 text-xs">
                    <span className="text-slate-400 block text-[11px]">{spec.label}</span>
                    <span className="font-semibold text-slate-900 mt-0.5 block">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Golden Rule / Summary Quote */}
            <div className="p-4 bg-amber-50/60 border border-amber-200/80 rounded-xl text-xs text-amber-900 flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-amber-950 block mb-0.5">Instructor Memory Hook for Students:</span>
                <p className="italic">{topic.simpleExplanation.summaryQuote}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 2: REAL-LIFE ANALOGY */}
      {(activeTab === 'all' || activeTab === 'analogy') && (
        <section id="section-analogy" className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 mb-6">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-sm">
              2
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Real-Life Analogy</h3>
              <p className="text-xs text-slate-500">Relate technical computing architecture to everyday experiences.</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Story Card */}
            <div className="p-5 bg-purple-50/50 border border-purple-100 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <h4 className="text-base font-bold text-purple-950">{topic.analogy.title}</h4>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                {topic.analogy.story}
              </p>
            </div>

            {/* Concept Mapping Table */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Classroom Concept Mapping:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {topic.analogy.conceptMapping.map((item, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-200/80 mb-2">
                      <span className="text-xs font-bold text-purple-700">
                        {item.realLife}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {item.computerConcept}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.why}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Teaching Tip */}
            <div className="p-4 bg-slate-100 rounded-xl text-xs text-slate-700 flex items-start gap-3">
              <HelpCircle className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 block mb-0.5">Instructor Socratic Question for Trainees:</span>
                <p>{topic.analogy.instructorTip}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 3: INTERACTIVE DEMO */}
      {(activeTab === 'all' || activeTab === 'demo') && (
        <section id="section-demo" className="space-y-3">
          <div className="flex items-center gap-2.5 px-2">
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-sm">
              3
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Interactive Demo</h3>
              <p className="text-xs text-slate-500">Live tactile simulator built for projector demonstration.</p>
            </div>
          </div>

          {renderInteractiveDemo()}
        </section>
      )}

      {/* SECTION 4: CLASSROOM ACTIVITY */}
      {(activeTab === 'all' || activeTab === 'activity') && (
        <section id="section-activity" className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 mb-6">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm">
              4
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Classroom Activity (Lab Practical)</h3>
              <p className="text-xs text-slate-500">Hands-on student exercise for the ITI computer lab.</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-emerald-50/60 rounded-xl border border-emerald-100">
              <div>
                <h4 className="text-sm font-bold text-emerald-950">{topic.activity.title}</h4>
                <p className="text-xs text-slate-600 mt-0.5">{topic.activity.objective}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="px-3 py-1 bg-white rounded-lg border border-emerald-200 text-xs font-mono font-bold text-emerald-700">
                  Duration: {topic.activity.duration}
                </span>
              </div>
            </div>

            {/* Tools Needed */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                Tools & Equipment Required:
              </span>
              <div className="flex flex-wrap gap-2">
                {topic.activity.toolsNeeded.map((tool, idx) => (
                  <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium border border-slate-200">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Step-by-Step Instructions */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Lab Execution Steps:
              </span>
              {topic.activity.steps.map((step) => (
                <div key={step.stepNumber} className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">
                      {step.stepNumber}
                    </span>
                    <span className="font-semibold text-slate-900 leading-snug">
                      {step.instruction}
                    </span>
                  </div>
                  <div className="ml-7 p-2.5 bg-white rounded-lg border border-slate-200 text-slate-600">
                    <strong className="text-emerald-800">Expected Observation: </strong>
                    <span>{step.expectedResult}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Instructor Debrief */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900">
              <span className="font-bold block mb-1">Instructor Classroom Debrief:</span>
              <p>{topic.activity.teacherDebrief}</p>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 5: REAL-WORLD SCENARIO */}
      {(activeTab === 'all' || activeTab === 'scenario') && (
        <section id="section-scenario" className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 mb-6">
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center font-bold text-sm">
              5
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Real-World Scenario</h3>
              <p className="text-xs text-slate-500">Shop-floor and enterprise troubleshooting case study.</p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-bold text-slate-900">{topic.scenario.title}</h4>
                <span className="text-[11px] text-slate-500 font-medium">{topic.scenario.companyOrContext}</span>
              </div>
              <p className="text-xs text-slate-700 mt-2 leading-relaxed">
                {topic.scenario.problem}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-rose-50/50 border border-rose-100 rounded-xl">
                <span className="font-bold text-rose-900 uppercase text-[10px] tracking-wider block mb-2">
                  Observed Symptoms & Faults:
                </span>
                <ul className="space-y-1.5 text-slate-700">
                  {topic.scenario.symptoms.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-rose-500 font-bold">•</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl">
                <span className="font-bold text-blue-900 uppercase text-[10px] tracking-wider block mb-2">
                  Diagnostic & Troubleshooting Process:
                </span>
                <ul className="space-y-1.5 text-slate-700">
                  {topic.scenario.troubleshooting.map((t, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-blue-500 font-bold">•</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs space-y-1.5">
              <div className="font-bold text-emerald-950">Engineering Solution Implemented:</div>
              <p className="text-emerald-900">{topic.scenario.solution}</p>
              <div className="pt-2 border-t border-emerald-200/60 text-slate-700">
                <strong className="text-slate-900">Key Takeaway: </strong>
                <span>{topic.scenario.lessonLearned}</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 6: 5 MCQ QUIZ */}
      {(activeTab === 'all' || activeTab === 'quiz') && (
        <section id="section-quiz">
          <QuizSection questions={topic.quiz} topicTitle={topic.title} />
        </section>
      )}

      {/* SECTION 7: TRAINER NOTES */}
      {(activeTab === 'all' || activeTab === 'trainer-notes') && (
        <section id="section-trainer-notes" className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 mb-6">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-sm">
              7
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Trainer Notes (For Senior Instructors)</h3>
              <p className="text-xs text-slate-500">Pedagogical strategies, blackboard drawings, bilingual Hindi aids & NCVT exam tips.</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Common Student Misconceptions */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Common Student Doubts & Misconceptions:
              </h4>
              <div className="space-y-2.5">
                {topic.trainerNotes.commonMisconceptions.map((item, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <div className="text-rose-700 font-semibold mb-1">
                      ❌ Student Myth: {item.myth}
                    </div>
                    <div className="text-slate-700 pl-4 border-l-2 border-emerald-500">
                      ✅ Instructor Reality: {item.reality}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Blackboard Sketch Guide */}
            <div className="p-5 bg-slate-900 text-white rounded-xl border border-slate-800">
              <div className="flex items-center gap-2 mb-2">
                <Bookmark className="w-4 h-4 text-amber-400" />
                <h4 className="text-sm font-bold text-white">Classroom Blackboard / Whiteboard Drawing Guide:</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-mono">
                {topic.trainerNotes.blackboardSketchGuide}
              </p>
            </div>

            {/* Bilingual Hindi Teaching Phrases */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Bilingual / Hindi Teaching Phrases (हिन्दी अध्यापन सहायक):
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {topic.trainerNotes.bilingualTips.map((tip, idx) => (
                  <div key={idx} className="p-3.5 bg-amber-50/50 rounded-xl border border-amber-200/80 text-xs">
                    <span className="font-bold text-slate-900 block">{tip.term}</span>
                    <span className="text-amber-900 font-medium block mt-1">
                      {tip.explanationHindi}
                    </span>
                    <p className="text-slate-500 text-[11px] mt-2 pt-2 border-t border-amber-200/60">
                      <strong>Visual Aid:</strong> {tip.teachingAid}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* NCVT CTS Exam Focus */}
            <div className="p-4 bg-blue-50/80 rounded-xl border border-blue-200">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-900 block mb-2">
                Expected NCVT / CTS Trade Theory Examination Questions:
              </span>
              <ul className="text-xs text-slate-700 space-y-1.5">
                {topic.trainerNotes.ncvtExamFocus.map((focusItem, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>{focusItem}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Footer Back Button */}
      <div className="flex justify-center pt-4 pb-8">
        <button
          onClick={() => {
            sounds.playClick();
            onBackToTopics();
          }}
          className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs rounded-xl border border-slate-300 shadow-2xs transition-all flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to COPA Syllabus Modules
        </button>
      </div>
    </div>
  );
};
