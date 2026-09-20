import React, { useState, useEffect } from 'react';
import { 
  User, 
  Layers, 
  Cpu, 
  ArrowRight, 
  Play, 
  RotateCcw, 
  Printer, 
  Music, 
  Save, 
  Globe, 
  CheckCircle2, 
  HelpCircle,
  FileCode,
  Zap
} from 'lucide-react';
import { sounds } from '../../utils/sound';

interface SimulationScenario {
  id: string;
  title: string;
  icon: React.ReactNode;
  userAction: string;
  appDetail: {
    appName: string;
    actionDescription: string;
    codeSnippet: string;
  };
  osDetail: {
    subsystems: string[];
    systemCall: string;
    actionDescription: string;
  };
  hardwareDetail: {
    component: string;
    actionDescription: string;
    physicalResult: string;
  };
}

const SCENARIOS: SimulationScenario[] = [
  {
    id: 'print',
    title: 'Print Trainee Marksheet',
    icon: <Printer className="w-4 h-4 text-purple-600" />,
    userAction: 'Instructor clicks "Print Certificate" button in MS Word.',
    appDetail: {
      appName: 'MS Word (Application Software)',
      actionDescription: 'Formats document into standard page layout and triggers standard Windows Print API call.',
      codeSnippet: 'Windows.Graphics.Printing.PrintManager.ShowPrintUIAsync()',
    },
    osDetail: {
      subsystems: ['Print Spooler Service', 'Kernel System Call Interface', 'Printer Device Driver'],
      systemCall: 'NtGdiStartDoc() & IRQ 7 / USB Print Class Driver',
      actionDescription: 'Kernel spools the print job onto disk, checks user permissions, and invokes the manufacturer device driver to translate graphics into raw printer raster control codes.',
    },
    hardwareDetail: {
      component: 'HP LaserJet Printer (Hardware Peripheral)',
      actionDescription: 'Laser diode writes image on electrostatic drum, pickup roller feeds 80 GSM paper, fuser heats toner at 200°C.',
      physicalResult: 'Crisp physical paper marksheet exits printer output tray.',
    },
  },
  {
    id: 'music',
    title: 'Play Audio Lecture (MP3)',
    icon: <Music className="w-4 h-4 text-emerald-600" />,
    userAction: 'Trainee double-clicks "lesson1_intro.mp3" in VLC Media Player.',
    appDetail: {
      appName: 'VLC Media Player (Application Software)',
      actionDescription: 'Decompresses MPEG Audio Layer-3 binary frames into raw PCM waveform audio samples.',
      codeSnippet: 'audio_output.PlayPCMStream(buffer, 44100Hz, 16bit)',
    },
    osDetail: {
      subsystems: ['Windows Audio Service (WASAPI)', 'Realtek High Definition Audio Driver', 'DMA Controller'],
      systemCall: 'sys_write() to /dev/snd or waveOutWrite()',
      actionDescription: 'OS mixes audio with system sounds, schedules Direct Memory Access (DMA) buffer transfers directly to sound hardware without overloading the CPU.',
    },
    hardwareDetail: {
      component: 'DAC & Computer Speakers (Hardware)',
      actionDescription: 'Digital-to-Analog Converter chip converts 0s and 1s into fluctuating millivolt electrical current.',
      physicalResult: 'Speaker paper cone vibrates air molecules, producing clear audible Hindi teaching speech.',
    },
  },
  {
    id: 'save',
    title: 'Save Tally / Excel Account File',
    icon: <Save className="w-4 h-4 text-blue-600" />,
    userAction: 'Accountant presses Ctrl + S to save 10,000 ledger rows.',
    appDetail: {
      appName: 'Tally Prime / MS Excel (Application Software)',
      actionDescription: 'Converts database tables into structured binary or XML file bytes in memory.',
      codeSnippet: 'fs.writeFile("Bharat_Steel_2026.xlsx", buffer)',
    },
    osDetail: {
      subsystems: ['NTFS / ext4 File System Driver', 'Virtual Memory Manager', 'NVMe Storage Driver'],
      systemCall: 'sys_write() or NtWriteFile()',
      actionDescription: 'OS locates free clusters on partition table, updates Master File Table (MFT) record, and dispatches block write commands to SSD controller.',
    },
    hardwareDetail: {
      component: 'NVMe SSD / Hard Disk Drive (Hardware)',
      actionDescription: 'Flash memory controller pulses gate voltage to trap electrons in NAND floating gates.',
      physicalResult: 'Ledger data is permanently preserved even after turning off power.',
    },
  },
  {
    id: 'web',
    title: 'Browse ITI Examination Portal',
    icon: <Globe className="w-4 h-4 text-amber-600" />,
    userAction: 'Student types "ncvt.gov.in" and hits Enter in browser.',
    appDetail: {
      appName: 'Google Chrome / Edge (Application Software)',
      actionDescription: 'Parses URL, generates HTTP/HTTPS GET request string, and requests network socket.',
      codeSnippet: 'socket.connect("ncvt.gov.in", 443)',
    },
    osDetail: {
      subsystems: ['TCP/IP Network Stack', 'DNS Client Resolver', 'Ethernet / Wi-Fi NIC Driver'],
      systemCall: 'sys_socket(), sys_connect()',
      actionDescription: 'OS encapsulates payload with TCP and IP headers, maps router MAC via ARP, and triggers Network Interface Card transmitter interrupt.',
    },
    hardwareDetail: {
      component: 'Gigabit Ethernet Card / Wi-Fi Radio (Hardware)',
      actionDescription: 'Transceiver pulses high-frequency electromagnetic radio waves or differential voltage down Cat6 copper cable.',
      physicalResult: 'Data travels through LAN switch out to the Internet server.',
    },
  },
];

export const OSDemo: React.FC = () => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('print');
  const [activeStep, setActiveStep] = useState<number>(0); // 0: Idle, 1: User, 2: App, 3: OS, 4: Hardware, 5: Return to User
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const [inspectedLayer, setInspectedLayer] = useState<'user' | 'app' | 'os' | 'hardware' | null>('os');

  const scenario = SCENARIOS.find((s) => s.id === selectedScenarioId) || SCENARIOS[0];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAutoPlaying) {
      timer = setInterval(() => {
        setActiveStep((prev) => {
          if (prev >= 5) {
            setIsAutoPlaying(false);
            sounds.playSuccess();
            return 5;
          }
          sounds.playPacket();
          return prev + 1;
        });
      }, 1600);
    }
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const handleStartSimulation = () => {
    sounds.playClick();
    setActiveStep(1);
    setIsAutoPlaying(true);
  };

  const handleReset = () => {
    sounds.playClick();
    setIsAutoPlaying(false);
    setActiveStep(0);
  };

  const handleNextStep = () => {
    sounds.playPacket();
    setIsAutoPlaying(false);
    setActiveStep((prev) => (prev >= 5 ? 1 : prev + 1));
  };

  return (
    <div id="os-interactive-demo" className="bg-white rounded-2xl border border-slate-200 p-5 md:p-7 shadow-xs">
      {/* Demo Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold mb-2">
            <Layers className="w-3.5 h-3.5" /> Interactive Architectural Flow
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            The 4-Tier Operating System Interaction Diagram
          </h3>
          <p className="text-sm text-slate-500 mt-0.5">
            Watch how the OS securely mediates between human intentions, application logic, and silicon hardware.
          </p>
        </div>

        {/* Simulation Execution Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleStartSimulation}
            disabled={isAutoPlaying}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5" /> Auto-Play Flow
          </button>
          <button
            onClick={handleNextStep}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
          >
            Step By Step
          </button>
          <button
            onClick={handleReset}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            title="Reset Diagram"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Select Practical Classroom Scenario */}
      <div className="mt-4 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
        <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-2">
          Select Classroom Demonstration Scenario:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {SCENARIOS.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                sounds.playClick();
                setSelectedScenarioId(s.id);
                setActiveStep(0);
                setIsAutoPlaying(false);
              }}
              className={`p-2.5 rounded-lg border text-left text-xs font-medium transition-all flex items-center gap-2 ${
                selectedScenarioId === s.id
                  ? 'bg-purple-50 border-purple-400 text-purple-900 shadow-2xs'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
              }`}
            >
              {s.icon}
              <span className="truncate">{s.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main 4-Layer Interactive Diagram (User -> App -> OS -> Hardware) */}
      <div className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative">
          
          {/* Layer 1: USER */}
          <div
            onClick={() => { sounds.playClick(); setInspectedLayer('user'); }}
            className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
              activeStep === 1 || activeStep === 5
                ? 'border-blue-500 bg-blue-50/80 shadow-md ring-2 ring-blue-300'
                : 'border-slate-200 bg-white hover:border-blue-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider bg-blue-100 px-2 py-0.5 rounded">
                Tier 1
              </span>
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                <User className="w-4 h-4" />
              </div>
            </div>
            <h4 className="text-sm font-bold text-slate-900">1. Computer User</h4>
            <p className="text-[11px] text-slate-500 mt-1">
              Human operator (instructor, student, or clerk) initiates high-level intent.
            </p>

            <div className="mt-3 p-2 bg-white/80 rounded-lg border border-slate-200 text-[11px] text-slate-700">
              <span className="font-semibold text-blue-900 block mb-0.5">Current Action:</span>
              <span>{scenario.userAction}</span>
            </div>

            {(activeStep === 1 || activeStep === 5) && (
              <div className="mt-2.5 flex items-center gap-1 text-[11px] font-bold text-blue-600 animate-pulse">
                <Zap className="w-3 h-3" /> {activeStep === 1 ? 'Dispatching event...' : 'Complete! User sees result.'}
              </div>
            )}
          </div>

          {/* Layer 2: APPLICATION */}
          <div
            onClick={() => { sounds.playClick(); setInspectedLayer('app'); }}
            className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
              activeStep === 2
                ? 'border-indigo-500 bg-indigo-50/80 shadow-md ring-2 ring-indigo-300'
                : 'border-slate-200 bg-white hover:border-indigo-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider bg-indigo-100 px-2 py-0.5 rounded">
                Tier 2 (Ring 3)
              </span>
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                <FileCode className="w-4 h-4" />
              </div>
            </div>
            <h4 className="text-sm font-bold text-slate-900">2. Application Software</h4>
            <p className="text-[11px] text-slate-500 mt-1">
              User-mode program cannot touch raw electronic circuits directly.
            </p>

            <div className="mt-3 p-2 bg-white/80 rounded-lg border border-slate-200 text-[11px] text-slate-700">
              <span className="font-semibold text-indigo-900 block mb-0.5">{scenario.appDetail.appName}</span>
              <span>{scenario.appDetail.actionDescription}</span>
            </div>

            {activeStep === 2 && (
              <div className="mt-2.5 flex items-center gap-1 text-[11px] font-bold text-indigo-600 animate-pulse">
                <Zap className="w-3 h-3" /> Calling OS System Call API...
              </div>
            )}
          </div>

          {/* Layer 3: OPERATING SYSTEM */}
          <div
            onClick={() => { sounds.playClick(); setInspectedLayer('os'); }}
            className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
              activeStep === 3
                ? 'border-purple-600 bg-purple-50/90 shadow-lg ring-2 ring-purple-400'
                : 'border-slate-200 bg-white hover:border-purple-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider bg-purple-100 px-2 py-0.5 rounded">
                Tier 3 (Ring 0 Kernel)
              </span>
              <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold animate-pulse">
                <Layers className="w-4 h-4" />
              </div>
            </div>
            <h4 className="text-sm font-bold text-slate-900">3. Operating System</h4>
            <p className="text-[11px] text-slate-500 mt-1">
              Kernel & Drivers check safety, schedule tasks, and control hardware.
            </p>

            <div className="mt-3 p-2 bg-white/80 rounded-lg border border-slate-200 text-[11px] text-slate-700">
              <span className="font-semibold text-purple-900 block mb-0.5">Kernel Execution:</span>
              <span>{scenario.osDetail.actionDescription}</span>
            </div>

            {activeStep === 3 && (
              <div className="mt-2.5 flex items-center gap-1 text-[11px] font-bold text-purple-700 animate-pulse">
                <Zap className="w-3 h-3" /> Driving hardware via Device Driver...
              </div>
            )}
          </div>

          {/* Layer 4: HARDWARE */}
          <div
            onClick={() => { sounds.playClick(); setInspectedLayer('hardware'); }}
            className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
              activeStep === 4
                ? 'border-emerald-500 bg-emerald-50/80 shadow-md ring-2 ring-emerald-300'
                : 'border-slate-200 bg-white hover:border-emerald-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider bg-emerald-100 px-2 py-0.5 rounded">
                Tier 4
              </span>
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                <Cpu className="w-4 h-4" />
              </div>
            </div>
            <h4 className="text-sm font-bold text-slate-900">4. Computer Hardware</h4>
            <p className="text-[11px] text-slate-500 mt-1">
              Physical electronics, silicon gates, storage disks & peripherals.
            </p>

            <div className="mt-3 p-2 bg-white/80 rounded-lg border border-slate-200 text-[11px] text-slate-700">
              <span className="font-semibold text-emerald-900 block mb-0.5">{scenario.hardwareDetail.component}</span>
              <span>{scenario.hardwareDetail.actionDescription}</span>
            </div>

            {activeStep === 4 && (
              <div className="mt-2.5 flex items-center gap-1 text-[11px] font-bold text-emerald-600 animate-pulse">
                <Zap className="w-3 h-3" /> Physical execution complete! Sending IRQ interrupt...
              </div>
            )}
          </div>

        </div>

        {/* Dynamic Progression Bar */}
        <div className="mt-4 p-3 bg-slate-900 text-white rounded-xl flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="text-slate-400">STATUS:</span>
            <span className="font-bold text-emerald-400">
              {activeStep === 0 && 'Ready. Click "Auto-Play Flow" or "Step By Step".'}
              {activeStep === 1 && 'Step 1 of 4: User generates request in application window.'}
              {activeStep === 2 && 'Step 2 of 4: Application issues system call API to OS.'}
              {activeStep === 3 && 'Step 3 of 4: OS Kernel validates permissions & loads driver.'}
              {activeStep === 4 && 'Step 4 of 4: Physical hardware executes operation.'}
              {activeStep === 5 && 'Success: Hardware interrupt received; confirmation returned to user.'}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1">
            {[1, 2, 3, 4].map((stepNum) => (
              <div
                key={stepNum}
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  activeStep >= stepNum ? 'bg-purple-500 text-white' : 'bg-slate-800 text-slate-500'
                }`}
              >
                {stepNum}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Deep-Dive Theoretical Drawer for Senior Instructors */}
      <div className="mt-6 p-5 bg-purple-50/50 rounded-xl border border-purple-100">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-bold text-purple-950 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-purple-600" />
            Senior Instructor Theoretical Breakdown: What Really Happens in the OS?
          </h4>
          <span className="text-[11px] text-purple-700 font-mono">
            NCVT Trade Theory: Section 2.1
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-700">
          <div className="p-3 bg-white rounded-lg border border-purple-200">
            <span className="font-bold text-purple-900 block mb-1">Dual Mode Security (CPU Rings):</span>
            <p className="text-slate-600">
              Modern processors have two operational modes: <strong>User Mode (Ring 3)</strong> where applications run without direct hardware access, and <strong>Kernel Mode (Ring 0)</strong> where the OS operates with full privileges. A malicious program cannot crash the motherboard.
            </p>
          </div>

          <div className="p-3 bg-white rounded-lg border border-purple-200">
            <span className="font-bold text-purple-900 block mb-1">System Calls (The Secret Door):</span>
            <p className="text-slate-600">
              When an app needs hardware (print, disk write, audio playback), it triggers a software interrupt called a <strong>System Call</strong> (e.g., <code>{scenario.osDetail.systemCall}</code>). The CPU immediately flips into Kernel Mode.
            </p>
          </div>

          <div className="p-3 bg-white rounded-lg border border-purple-200">
            <span className="font-bold text-purple-900 block mb-1">Device Driver Translation:</span>
            <p className="text-slate-600">
              The OS does not know how every single printer or webcam in the world works. It relies on the <strong>Device Driver</strong> software provided by the manufacturer to translate generic print requests into vendor-specific electrical microcode.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
