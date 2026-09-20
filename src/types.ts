export type TopicId = 'ram' | 'os' | 'ip-address' | 'html-forms';

export type CategoryId = 
  | 'computer-fundamentals'
  | 'operating-system'
  | 'networking'
  | 'html-css'
  | 'python'
  | 'database'
  | 'cybersecurity'
  | 'ms-office';

export type SectionTab = 
  | 'explanation'
  | 'analogy'
  | 'demo'
  | 'activity'
  | 'scenario'
  | 'quiz'
  | 'trainer-notes';

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  examTip?: string;
}

export interface TopicContent {
  id: TopicId;
  title: string;
  category: string;
  categoryId: CategoryId;
  badge: string;
  summary: string;
  simpleExplanation: {
    definition: string;
    keyPoints: string[];
    technicalSpecifications: { label: string; value: string }[];
    summaryQuote: string;
  };
  analogy: {
    title: string;
    story: string;
    conceptMapping: { realLife: string; computerConcept: string; why: string }[];
    instructorTip: string;
  };
  activity: {
    title: string;
    objective: string;
    duration: string;
    toolsNeeded: string[];
    steps: { stepNumber: number; instruction: string; expectedResult: string }[];
    teacherDebrief: string;
  };
  scenario: {
    title: string;
    companyOrContext: string;
    problem: string;
    symptoms: string[];
    troubleshooting: string[];
    solution: string;
    lessonLearned: string;
  };
  quiz: QuizQuestion[];
  trainerNotes: {
    commonMisconceptions: { myth: string; reality: string }[];
    blackboardSketchGuide: string;
    bilingualTips: { term: string; explanationHindi: string; teachingAid: string }[];
    ncvtExamFocus: string[];
  };
}

export interface TopicCategory {
  id: CategoryId;
  title: string;
  subtitle: string;
  iconName: string;
  color: string;
  borderHoverColor: string;
  accentBg: string;
  workingTopicId?: TopicId;
  topicsList: { name: string; isWorking: boolean; topicId?: TopicId; description: string }[];
}
