import React, { useState } from 'react';
import { 
  Cpu, 
  Layers, 
  Plus, 
  Trash2, 
  AlertTriangle, 
  CheckCircle2, 
  RefreshCw, 
  Gauge, 
  HardDrive,
  Info
} from 'lucide-react';
import { sounds } from '../../utils/sound';

interface RunningApp {
  id: string;
  name: string;
  category: string;
  baseMb: number;
  currentMb: number;
  color: string;
  iconBg: string;
  canClose: boolean;
  extraTabs?: number;
}

const DEFAULT_APPS: RunningApp[] = [
  {
    id: 'os-kernel',
    name: 'Windows / OS Kernel & Services',
    category: 'System Core',
    baseMb: 1800,
    currentMb: 1800,
    color: 'bg-slate-700 text-white',
    iconBg: 'bg-slate-800',
    canClose: false,
  },
  {
    id: 'chrome',
    name: 'Google Chrome Browser',
    category: 'Web Browser',
    baseMb: 1400,
    currentMb: 1400,
    color: 'bg-amber-500 text-white',
    iconBg: 'bg-amber-600',
    canClose: true,
    extraTabs: 3,
  },
  {
    id: 'vscode',
    name: 'VS Code Editor (COPA Lab)',
    category: 'Development',
    baseMb: 950,
    currentMb: 950,
    color: 'bg-blue-500 text-white',
    iconBg: 'bg-blue-600',
    canClose: true,
  },
  {
    id: 'photoshop',
    name: 'Adobe Photoshop / Graphics',
    category: 'Image Editing',
    baseMb: 2400,
    currentMb: 2400,
    color: 'bg-indigo-600 text-white',
    iconBg: 'bg-indigo-700',
    canClose: true,
  }
];

const AVAILABLE_APPS = [
  {
    id: 'vlc',
    name: 'VLC Media Player (1080p Video)',
    category: 'Multimedia',
    mb: 600,
    color: 'bg-orange-500 text-white',
    iconBg: 'bg-orange-600',
  },
  {
    id: 'tally',
    name: 'Tally Prime & GST Billing',
    category: 'Accounting',
    mb: 850,
    color: 'bg-emerald-600 text-white',
    iconBg: 'bg-emerald-700',
  },
  {
    id: 'game',
    name: '3D Simulation & CAD Tool',
    category: 'Engineering',
    mb: 3200,
    color: 'bg-rose-600 text-white',
    iconBg: 'bg-rose-700',
  },
  {
    id: 'word',
    name: 'MS Word Document (50 pages)',
    category: 'Office Productivity',
    mb: 450,
    color: 'bg-sky-600 text-white',
    iconBg: 'bg-sky-700',
  }
];

export const RAMDemo: React.FC = () => {
  const [totalRamGb, setTotalRamGb] = useState<number>(8); // 8GB or 16GB
  const [runningApps, setRunningApps] = useState<RunningApp[]>(DEFAULT_APPS);
  const [selectedAppInfo, setSelectedAppInfo] = useState<string | null>(null);

  const totalRamMb = totalRamGb * 1024;
  const usedRamMb = runningApps.reduce((acc, app) => acc + app.currentMb, 0);
  const usedPercentage = Math.min(Math.round((usedRamMb / totalRamMb) * 100), 100);
  const isOverloaded = usedRamMb > totalRamMb;
  const pagingMb = isOverloaded ? usedRamMb - totalRamMb : 0;

  const handleLaunchApp = (appConfig: typeof AVAILABLE_APPS[0]) => {
    sounds.playClick();
    if (runningApps.some((a) => a.id === appConfig.id)) return;
    setRunningApps((prev) => [
      ...prev,
      {
        id: appConfig.id,
        name: appConfig.name,
        category: appConfig.category,
        baseMb: appConfig.mb,
        currentMb: appConfig.mb,
        color: appConfig.color,
        iconBg: appConfig.iconBg,
        canClose: true,
      }
    ]);
  };

  const handleCloseApp = (id: string) => {
    sounds.playClick();
    setRunningApps((prev) => prev.filter((a) => a.id !== id));
  };

  const handleAddChromeTabs = () => {
    sounds.playClick();
    setRunningApps((prev) =>
      prev.map((app) => {
        if (app.id === 'chrome') {
          const newTabs = (app.extraTabs || 0) + 2;
          return {
            ...app,
            extraTabs: newTabs,
            currentMb: app.baseMb + newTabs * 250,
          };
        }
        return app;
      })
    );
  };

  const handleResetToClean = () => {
    sounds.playClick();
    setRunningApps([DEFAULT_APPS[0]]);
  };

  const handleApplyPreset = (presetName: 'office' | 'heavy' | 'full') => {
    sounds.playClick();
    if (presetName === 'office') {
      setRunningApps([
        DEFAULT_APPS[0],
        { ...DEFAULT_APPS[1], currentMb: 1200, extraTabs: 2 },
        { ...AVAILABLE_APPS[3], baseMb: 450, currentMb: 450, canClose: true },
        { ...AVAILABLE_APPS[1], baseMb: 850, currentMb: 850, canClose: true },
      ]);
    } else if (presetName === 'heavy') {
      setRunningApps([
        DEFAULT_APPS[0],
        { ...DEFAULT_APPS[1], currentMb: 2400, extraTabs: 7 },
        DEFAULT_APPS[2],
        DEFAULT_APPS[3],
        { ...AVAILABLE_APPS[0], baseMb: 600, currentMb: 600, canClose: true },
      ]);
    } else if (presetName === 'full') {
      setRunningApps([
        DEFAULT_APPS[0],
        { ...DEFAULT_APPS[1], currentMb: 3200, extraTabs: 10 },
        DEFAULT_APPS[2],
        DEFAULT_APPS[3],
        { ...AVAILABLE_APPS[0], baseMb: 600, currentMb: 600, canClose: true },
        { ...AVAILABLE_APPS[2], baseMb: 3200, currentMb: 3200, canClose: true },
      ]);
    }
  };

  // Generate memory cells (32 blocks to represent total RAM)
  const totalBlocks = 32;
  const usedBlocks = Math.min(Math.round((usedRamMb / totalRamMb) * totalBlocks), totalBlocks);

  return (
    <div id="ram-interactive-demo" className="bg-white rounded-2xl border border-slate-200 p-5 md:p-7 shadow-xs">
      {/* Demo Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-2">
            <Cpu className="w-3.5 h-3.5" /> Interactive Lab Demo
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Real-Time Physical RAM Allocation Simulator
          </h3>
          <p className="text-sm text-slate-500 mt-0.5">
            Demonstrate how open programs fill up DRAM sticks and trigger Virtual Memory swapping.
          </p>
        </div>

        {/* Capacity Selector & Clean Button */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => { sounds.playClick(); setTotalRamGb(8); }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                totalRamGb === 8 ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              8 GB RAM
            </button>
            <button
              onClick={() => { sounds.playClick(); setTotalRamGb(16); }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                totalRamGb === 16 ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              16 GB RAM
            </button>
          </div>

          <button
            onClick={handleResetToClean}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            title="Reset to clean boot"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>
      </div>

      {/* Instructor Teaching Presets */}
      <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-blue-600" /> Instructor Classroom Presets:
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleApplyPreset('office')}
            className="px-2.5 py-1 text-xs font-medium bg-white hover:bg-blue-50 hover:text-blue-700 text-slate-700 rounded-md border border-slate-200 shadow-2xs transition-colors"
          >
            1. Light Office Work (Normal)
          </button>
          <button
            onClick={() => handleApplyPreset('heavy')}
            className="px-2.5 py-1 text-xs font-medium bg-white hover:bg-amber-50 hover:text-amber-700 text-slate-700 rounded-md border border-slate-200 shadow-2xs transition-colors"
          >
            2. Heavy Multitasking (~85%)
          </button>
          <button
            onClick={() => handleApplyPreset('full')}
            className="px-2.5 py-1 text-xs font-medium bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-md border border-rose-200 shadow-2xs transition-colors"
          >
            3. Out of Memory & Thrashing (100%+)
          </button>
        </div>
      </div>

      {/* Memory Stick Hardware Visualization */}
      <div className="mt-6 p-5 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl border border-slate-700 text-white shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-mono text-xs text-slate-300 font-semibold tracking-wider">
              DDR4 DIMM SLOT 1: {totalRamGb} GB ({(usedRamMb / 1024).toFixed(2)} GB USED / {(totalRamMb / 1024).toFixed(2)} GB TOTAL)
            </span>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className={`px-2 py-0.5 rounded font-bold ${
              usedPercentage < 70 ? 'bg-emerald-500/20 text-emerald-300' :
              usedPercentage < 90 ? 'bg-amber-500/20 text-amber-300' :
              'bg-rose-500/30 text-rose-300 animate-pulse'
            }`}>
              {usedPercentage}% OCCUPIED
            </span>
          </div>
        </div>

        {/* Visual RAM Stick Bar */}
        <div className="relative w-full h-8 bg-slate-950 rounded-lg overflow-hidden border border-slate-700 p-1 flex gap-0.5">
          {runningApps.map((app) => {
            const widthPct = (app.currentMb / totalRamMb) * 100;
            return (
              <div
                key={app.id}
                style={{ width: `${Math.min(widthPct, 100)}%` }}
                className={`h-full ${app.color} transition-all duration-300 rounded-xs flex items-center justify-center text-[10px] font-bold overflow-hidden cursor-pointer hover:opacity-90`}
                title={`${app.name}: ${(app.currentMb / 1024).toFixed(2)} GB`}
                onClick={() => setSelectedAppInfo(`${app.name} consumes ${(app.currentMb / 1024).toFixed(2)} GB (${Math.round((app.currentMb / totalRamMb) * 100)}% of total memory).`)}
              >
                <span className="truncate px-1 font-mono">{app.name.split(' ')[0]}</span>
              </div>
            );
          })}
        </div>

        {/* 32-Block Memory Cell Matrix */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mb-1.5">
            <span>Physical Semiconductor Memory Matrix (32 Memory Banks):</span>
            <span>{totalBlocks - usedBlocks} Free Banks ({Math.max(0, totalRamMb - usedRamMb)} MB)</span>
          </div>
          <div className="grid grid-cols-8 sm:grid-cols-16 gap-1 p-2 bg-slate-950/60 rounded-lg border border-slate-800">
            {Array.from({ length: totalBlocks }).map((_, idx) => {
              const isFilled = idx < usedBlocks;
              return (
                <div
                  key={idx}
                  className={`h-4 rounded-xs transition-all duration-300 ${
                    isFilled 
                      ? usedPercentage > 90 
                        ? 'bg-rose-500 shadow-xs shadow-rose-500/50' 
                        : usedPercentage > 70 
                        ? 'bg-amber-400' 
                        : 'bg-emerald-500' 
                      : 'bg-slate-800 border border-slate-700/50'
                  }`}
                  title={`Memory Bank #${idx + 1}: ${isFilled ? 'Allocated' : 'Available'}`}
                />
              );
            })}
          </div>
        </div>

        {/* Overload Warning / Pagefile Banner */}
        {isOverloaded && (
          <div className="mt-3 p-3 bg-rose-500/20 border border-rose-500/50 rounded-lg flex items-start gap-2.5 text-rose-200 text-xs">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-rose-300">CRITICAL: Physical RAM Exhausted! (+{pagingMb} MB Overflow)</span>
              <p className="mt-0.5 text-slate-300">
                The OS kernel is now executing <strong>Virtual Memory Paging (pagefile.sys)</strong> on the hard drive. 
                Because disk transfer is 100x slower than DDR RAM, the computer is experiencing severe disk thrashing and mouse lag!
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Real-Time System Metrics Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Gauge className="w-4 h-4 text-blue-600" /> System Responsiveness
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className={`text-base font-bold ${
              usedPercentage < 75 ? 'text-emerald-600' :
              usedPercentage < 90 ? 'text-amber-600' :
              'text-rose-600'
            }`}>
              {usedPercentage < 75 ? 'Ultra Responsive (0.1ms)' :
               usedPercentage < 90 ? 'Moderate Load' :
               'Sluggish / Freezing (Thrashing)'}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">CPU has instant nanosecond access to memory.</p>
        </div>

        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <HardDrive className="w-4 h-4 text-purple-600" /> Virtual Memory Swap (Pagefile)
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-base font-bold text-slate-900">
              {pagingMb > 0 ? `${(pagingMb / 1024).toFixed(2)} GB Paged` : '0 MB (Inactive)'}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            {pagingMb > 0 ? 'Secondary storage used as emergency buffer' : 'All running apps fit comfortably inside DRAM'}
          </p>
        </div>

        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Volatility Status
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-base font-bold text-slate-900">Volatile DRAM</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            If power disconnects right now, all {runningApps.length} processes vanish from RAM.
          </p>
        </div>
      </div>

      {/* Active Running Applications Manager */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            Currently Running Applications in RAM ({runningApps.length}):
          </h4>
          <span className="text-xs text-slate-400">Click to inspect or close to free memory</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {runningApps.map((app) => (
            <div
              key={app.id}
              className="p-3 rounded-xl border border-slate-200 bg-white hover:border-blue-300 transition-all flex items-center justify-between gap-3 shadow-2xs"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${app.color} shrink-0`}>
                  {app.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-900 truncate">{app.name}</span>
                    {!app.canClose && (
                      <span className="px-1.5 py-0.2 bg-slate-100 text-slate-600 rounded text-[10px] font-medium">
                        Protected OS
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500">
                    <span>{(app.currentMb / 1024).toFixed(2)} GB</span>
                    <span>•</span>
                    <span className="text-blue-600 font-medium">{app.category}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {app.id === 'chrome' && (
                  <button
                    onClick={handleAddChromeTabs}
                    className="px-2 py-1 text-[11px] font-medium bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-md border border-amber-200 flex items-center gap-1"
                    title="Open 2 more heavy browser tabs"
                  >
                    <Plus className="w-3 h-3" /> Tab (+500MB)
                  </button>
                )}
                {app.canClose && (
                  <button
                    onClick={() => handleCloseApp(app.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                    title="End Task (Free RAM)"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Launch More Software Section */}
      <div className="mt-5 p-4 bg-slate-50 rounded-xl border border-slate-200">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
          Launch Additional Applications to Test RAM Capacity:
        </h4>
        <div className="flex flex-wrap gap-2">
          {AVAILABLE_APPS.map((availApp) => {
            const isRunning = runningApps.some((a) => a.id === availApp.id);
            return (
              <button
                key={availApp.id}
                disabled={isRunning}
                onClick={() => handleLaunchApp(availApp)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all flex items-center gap-1.5 ${
                  isRunning
                    ? 'bg-slate-200 text-slate-400 border-slate-200 cursor-not-allowed'
                    : 'bg-white text-slate-700 border-slate-300 hover:border-blue-500 hover:text-blue-700 shadow-2xs'
                }`}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{availApp.name} (+{(availApp.mb / 1024).toFixed(1)} GB)</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Classroom Demonstration Tip */}
      {selectedAppInfo && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-blue-600 shrink-0" />
            <span>{selectedAppInfo}</span>
          </div>
          <button
            onClick={() => setSelectedAppInfo(null)}
            className="text-blue-500 hover:text-blue-800 font-bold ml-2"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};
