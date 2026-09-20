import React, { useState, useEffect } from 'react';
import { 
  Network, 
  Monitor, 
  Router as RouterIcon, 
  Globe, 
  Send, 
  RotateCcw, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  Zap, 
  Calculator,
  Server
} from 'lucide-react';
import { sounds } from '../../utils/sound';

export const IPDemo: React.FC = () => {
  const [packetPosition, setPacketPosition] = useState<number>(0); // 0: Idle, 1: PC -> Router, 2: At Router (NAT), 3: Router -> Internet, 4: Server Processing, 5: Return to Router, 6: Return to PC
  const [packetType, setPacketType] = useState<'ping' | 'http' | 'dns'>('ping');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [hostIpNumber, setHostIpNumber] = useState<number>(15);
  const [activeTab, setActiveTab] = useState<'topology' | 'subnet' | 'ipv6'>('topology');

  const pcIp = `192.168.1.${hostIpNumber}`;
  const routerLanIp = '192.168.1.1';
  const routerWanIp = '103.24.56.88';
  const serverIp = '142.250.190.46'; // Google Server IP

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSimulating) {
      timer = setInterval(() => {
        setPacketPosition((prev) => {
          if (prev >= 6) {
            setIsSimulating(false);
            sounds.playSuccess();
            return 6;
          }
          sounds.playPacket();
          return prev + 1;
        });
      }, 900);
    }
    return () => clearInterval(timer);
  }, [isSimulating]);

  const handleStartPing = (type: 'ping' | 'http' | 'dns') => {
    sounds.playClick();
    setPacketType(type);
    setPacketPosition(1);
    setIsSimulating(true);
  };

  const handleReset = () => {
    sounds.playClick();
    setIsSimulating(false);
    setPacketPosition(0);
  };

  return (
    <div id="ip-interactive-demo" className="bg-white rounded-2xl border border-slate-200 p-5 md:p-7 shadow-xs">
      {/* Demo Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold mb-2">
            <Network className="w-3.5 h-3.5" /> Interactive Networking Lab
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            End-to-End Packet Routing: Computer → Router → Internet
          </h3>
          <p className="text-sm text-slate-500 mt-0.5">
            Visualize how IP packets travel across private local networks and public internet gateways using NAT.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-lg">
          <button
            onClick={() => { sounds.playClick(); setActiveTab('topology'); }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'topology' ? 'bg-white text-teal-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Network Topology
          </button>
          <button
            onClick={() => { sounds.playClick(); setActiveTab('subnet'); }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'subnet' ? 'bg-white text-teal-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Subnet & Octet Math
          </button>
          <button
            onClick={() => { sounds.playClick(); setActiveTab('ipv6'); }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'ipv6' ? 'bg-white text-teal-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            IPv4 vs IPv6
          </button>
        </div>
      </div>

      {activeTab === 'topology' && (
        <>
          {/* Action Trigger Buttons */}
          <div className="mt-4 p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                Simulate Data Packet:
              </span>
              <button
                disabled={isSimulating}
                onClick={() => handleStartPing('ping')}
                className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-1.5 disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" /> Send ICMP Ping (8.8.8.8)
              </button>
              <button
                disabled={isSimulating}
                onClick={() => handleStartPing('http')}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-1.5 disabled:opacity-50"
              >
                <Globe className="w-3.5 h-3.5" /> HTTP GET Request (Port 80)
              </button>
            </div>

            <button
              onClick={handleReset}
              className="px-2.5 py-1.5 text-xs text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-md transition-colors flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Topology
            </button>
          </div>

          {/* Network Visual Stage: Computer -> Router -> Internet */}
          <div className="mt-6 p-6 bg-slate-900 rounded-2xl border border-slate-700 text-white relative overflow-hidden">
            {/* Background connection cables */}
            <div className="hidden md:block absolute top-[90px] left-[15%] right-[15%] h-1 bg-slate-700 -z-0">
              {/* Cable active pulse */}
              {isSimulating && (
                <div
                  className="h-full bg-teal-400 transition-all duration-300"
                  style={{
                    width: `${Math.min(packetPosition * 16.6, 100)}%`,
                  }}
                />
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              
              {/* NODE 1: Computer (Local LAN) */}
              <div className={`p-4 rounded-xl border transition-all ${
                packetPosition === 1 || packetPosition === 6
                  ? 'bg-slate-800 border-teal-400 shadow-lg shadow-teal-500/20 ring-2 ring-teal-400'
                  : 'bg-slate-800/80 border-slate-700'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 bg-teal-500/20 text-teal-300 rounded-lg">
                    <Monitor className="w-6 h-6" />
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-teal-900/60 text-teal-300 border border-teal-500/30">
                    Host Device (LAN)
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white">ITI Lab Workstation (PC-14)</h4>
                
                <div className="mt-3 space-y-1.5 font-mono text-xs text-slate-300 bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Private IPv4:</span>
                    <span className="font-bold text-teal-400">{pcIp}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Subnet Mask:</span>
                    <span className="text-slate-300">255.255.255.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Default Gateway:</span>
                    <span className="text-amber-300">{routerLanIp}</span>
                  </div>
                </div>

                <div className="mt-3 text-[11px] text-slate-400">
                  Wired Cat6 Ethernet connected to Lab Switch.
                </div>
              </div>

              {/* NODE 2: Router & NAT (The Gateway) */}
              <div className={`p-4 rounded-xl border transition-all ${
                packetPosition === 2 || packetPosition === 5
                  ? 'bg-slate-800 border-amber-400 shadow-lg shadow-amber-500/20 ring-2 ring-amber-400'
                  : 'bg-slate-800/80 border-slate-700'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 bg-amber-500/20 text-amber-300 rounded-lg">
                    <RouterIcon className="w-6 h-6" />
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-900/60 text-amber-300 border border-amber-500/30">
                    Default Gateway (NAT)
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white">Lab Dual-Band Router</h4>

                <div className="mt-3 space-y-1.5 font-mono text-xs text-slate-300 bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <div className="flex justify-between">
                    <span className="text-slate-400">LAN Interface:</span>
                    <span className="font-bold text-amber-300">{routerLanIp}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">WAN Public IP:</span>
                    <span className="font-bold text-emerald-400">{routerWanIp}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">NAT Service:</span>
                    <span className="text-teal-300">Active (Translates IP)</span>
                  </div>
                </div>

                <div className="mt-3 text-[11px] text-slate-400">
                  Converts internal Private IPs into a single ISP Public IP.
                </div>
              </div>

              {/* NODE 3: Internet & Remote Server */}
              <div className={`p-4 rounded-xl border transition-all ${
                packetPosition === 3 || packetPosition === 4
                  ? 'bg-slate-800 border-blue-400 shadow-lg shadow-blue-500/20 ring-2 ring-blue-400'
                  : 'bg-slate-800/80 border-slate-700'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 bg-blue-500/20 text-blue-300 rounded-lg">
                    <Globe className="w-6 h-6" />
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-900/60 text-blue-300 border border-blue-500/30">
                    Public Internet (WAN)
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white">Google Web Server (Cloud)</h4>

                <div className="mt-3 space-y-1.5 font-mono text-xs text-slate-300 bg-slate-950 p-3 rounded-lg border border-slate-800">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Destination IP:</span>
                    <span className="font-bold text-blue-400">{serverIp}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Domain Name:</span>
                    <span className="text-slate-300">google.com</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Port:</span>
                    <span className="text-teal-300">{packetType === 'http' ? '443 (HTTPS)' : 'ICMP Echo'}</span>
                  </div>
                </div>

                <div className="mt-3 text-[11px] text-slate-400">
                  Global root nameservers and fiber-optic backbone.
                </div>
              </div>

            </div>

            {/* Live Packet Inspection Card */}
            <div className="mt-6 p-4 bg-slate-950 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-teal-400 flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5" /> LIVE PACKET INSPECTOR (Wireshark Emulation):
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {packetPosition === 0 && 'Packet Idle. Awaiting transmit trigger.'}
                  {packetPosition === 1 && 'Packet outbound from Workstation to Gateway router.'}
                  {packetPosition === 2 && 'NAT Router replacing 192.168.1.15 with Public IP 103.24.56.88.'}
                  {packetPosition === 3 && 'Packet routing across global ISP Internet.'}
                  {packetPosition === 4 && 'Destination server received and processed packet.'}
                  {packetPosition === 5 && 'Server reply packet arriving back at router WAN.'}
                  {packetPosition === 6 && 'Reply delivered to PC-14: 0% Packet Loss (Round Trip Time: 18ms).'}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
                <div className="p-2 bg-slate-900 rounded border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Source IP:</span>
                  <span className="font-bold text-teal-300">
                    {packetPosition >= 2 && packetPosition <= 4 ? routerWanIp : pcIp}
                  </span>
                </div>
                <div className="p-2 bg-slate-900 rounded border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Destination IP:</span>
                  <span className="font-bold text-blue-300">
                    {packetPosition >= 5 ? pcIp : serverIp}
                  </span>
                </div>
                <div className="p-2 bg-slate-900 rounded border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Protocol:</span>
                  <span className="font-bold text-amber-300">
                    {packetType === 'ping' ? 'ICMP Echo (Type 8)' : 'TCP / HTTPS'}
                  </span>
                </div>
                <div className="p-2 bg-slate-900 rounded border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">TTL (Time To Live):</span>
                  <span className="font-bold text-emerald-300">64 Hops</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'subnet' && (
        <div className="mt-5 p-5 bg-slate-50 rounded-xl border border-slate-200">
          <div className="flex items-center gap-2 mb-3">
            <Calculator className="w-5 h-5 text-teal-600" />
            <h4 className="text-base font-bold text-slate-900">
              Class C Subnet & 32-Bit Octet Mathematics
            </h4>
          </div>
          <p className="text-xs text-slate-600 mb-4">
            An IPv4 address consists of 32 bits arranged in 4 octets (8 bits each). Slide the controller to change the host number and see binary translation.
          </p>

          <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
            <div className="grid grid-cols-4 gap-2 text-center mb-4">
              <div className="p-3 bg-teal-50 rounded-lg border border-teal-200">
                <span className="text-[10px] uppercase font-bold text-teal-700 block">Octet 1 (Network)</span>
                <span className="text-xl font-bold font-mono text-slate-900">192</span>
                <span className="text-[10px] font-mono text-slate-400 block mt-1">11000000</span>
              </div>
              <div className="p-3 bg-teal-50 rounded-lg border border-teal-200">
                <span className="text-[10px] uppercase font-bold text-teal-700 block">Octet 2 (Network)</span>
                <span className="text-xl font-bold font-mono text-slate-900">168</span>
                <span className="text-[10px] font-mono text-slate-400 block mt-1">10101000</span>
              </div>
              <div className="p-3 bg-teal-50 rounded-lg border border-teal-200">
                <span className="text-[10px] uppercase font-bold text-teal-700 block">Octet 3 (Network)</span>
                <span className="text-xl font-bold font-mono text-slate-900">1</span>
                <span className="text-[10px] font-mono text-slate-400 block mt-1">00000001</span>
              </div>
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                <span className="text-[10px] uppercase font-bold text-amber-700 block">Octet 4 (Host ID)</span>
                <span className="text-xl font-bold font-mono text-amber-600">{hostIpNumber}</span>
                <span className="text-[10px] font-mono text-slate-400 block mt-1">
                  {hostIpNumber.toString(2).padStart(8, '0')}
                </span>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Adjust Host Number (1 to 254):
              </label>
              <input
                type="range"
                min={1}
                max={254}
                value={hostIpNumber}
                onChange={(e) => {
                  setHostIpNumber(Number(e.target.value));
                }}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 text-xs text-slate-700">
              <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                <span className="font-bold text-slate-900 block">Reserved Network ID:</span>
                <span className="font-mono text-slate-600">192.168.1.0</span>
                <p className="text-[11px] text-slate-400 mt-0.5">Identifies the subnet; cannot be assigned to any PC.</p>
              </div>
              <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                <span className="font-bold text-slate-900 block">Usable Host Range:</span>
                <span className="font-mono text-emerald-700 font-semibold">192.168.1.1 to 192.168.1.254</span>
                <p className="text-[11px] text-slate-400 mt-0.5">Total 254 computers can connect to this lab network.</p>
              </div>
              <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                <span className="font-bold text-slate-900 block">Reserved Broadcast IP:</span>
                <span className="font-mono text-slate-600">192.168.1.255</span>
                <p className="text-[11px] text-slate-400 mt-0.5">Sends a message to every machine on the subnet simultaneously.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'ipv6' && (
        <div className="mt-5 p-5 bg-slate-50 rounded-xl border border-slate-200">
          <h4 className="text-base font-bold text-slate-900 mb-2">
            Comparison: IPv4 vs. IPv6 (NCVT Exam Core Topic)
          </h4>
          <p className="text-xs text-slate-600 mb-4">
            The global pool of 4.3 billion IPv4 addresses has been exhausted. Modern IT networks use IPv6 with 128-bit addresses.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-xl border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">IPv4 Standard</span>
                <span className="text-xs text-slate-500 font-mono">1981</span>
              </div>
              <ul className="text-xs text-slate-700 space-y-2 mt-3">
                <li>• <strong>Address Size:</strong> 32 bits (4 bytes)</li>
                <li>• <strong>Format:</strong> 4 decimal octets separated by dots (e.g. <code>192.168.1.1</code>)</li>
                <li>• <strong>Total Addresses:</strong> 2^32 ≈ 4,294,967,296 (~4.3 billion)</li>
                <li>• <strong>Configuration:</strong> Manual Static or DHCP</li>
                <li>• <strong>Security:</strong> IPsec is optional</li>
              </ul>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">IPv6 Standard</span>
                <span className="text-xs text-slate-500 font-mono">1998</span>
              </div>
              <ul className="text-xs text-slate-700 space-y-2 mt-3">
                <li>• <strong>Address Size:</strong> 128 bits (16 bytes)</li>
                <li>• <strong>Format:</strong> 8 hexadecimal blocks separated by colons (e.g. <code>2001:0db8:85a3::8a2e:0370:7334</code>)</li>
                <li>• <strong>Total Addresses:</strong> 2^128 ≈ 3.4 × 10^38 (virtually unlimited)</li>
                <li>• <strong>Configuration:</strong> SLAAC Stateless Autoconfiguration</li>
                <li>• <strong>Security:</strong> IPsec support is built-in</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
