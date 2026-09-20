import { TopicCategory, TopicContent, TopicId } from '../types';

export const TOPIC_CATEGORIES: TopicCategory[] = [
  {
    id: 'computer-fundamentals',
    title: 'Computer Fundamentals',
    subtitle: 'Hardware architecture, memory hierarchy, bus architecture & CPU cycles',
    iconName: 'Cpu',
    color: 'from-blue-600 to-indigo-600',
    borderHoverColor: 'hover:border-blue-500',
    accentBg: 'bg-blue-50 text-blue-700',
    workingTopicId: 'ram',
    topicsList: [
      { name: 'RAM (Random Access Memory)', isWorking: true, topicId: 'ram', description: 'Volatile high-speed working memory and active process allocation.' },
      { name: 'ROM & BIOS/UEFI', isWorking: false, description: 'Non-volatile firmware, POST sequence, and bootloader stages.' },
      { name: 'CPU Architecture & ALU', isWorking: false, description: 'Instruction cycle, clock speed, registers, and cache levels.' },
      { name: 'Secondary Storage (HDD vs SSD)', isWorking: false, description: 'Magnetic platters vs NAND flash, IOPS and bus interfaces.' },
    ],
  },
  {
    id: 'operating-system',
    title: 'Operating System',
    subtitle: 'Kernel, system calls, process scheduling, memory & file management',
    iconName: 'Layers',
    color: 'from-violet-600 to-purple-600',
    borderHoverColor: 'hover:border-purple-500',
    accentBg: 'bg-purple-50 text-purple-700',
    workingTopicId: 'os',
    topicsList: [
      { name: 'Operating System Architecture', isWorking: true, topicId: 'os', description: 'User → Application → OS (Kernel/Drivers) → Hardware interaction.' },
      { name: 'Process Scheduling (Round Robin & FCFS)', isWorking: false, description: 'Context switching, process states, PCB, and CPU burst times.' },
      { name: 'File System (FAT32 vs NTFS vs ext4)', isWorking: false, description: 'Directories, inode tables, permissions, and clustering.' },
      { name: 'Device Drivers & Interrupt Handling', isWorking: false, description: 'Hardware interrupt vectors, ISRs, and peripheral control.' },
    ],
  },
  {
    id: 'networking',
    title: 'Networking',
    subtitle: 'OSI 7 layers, TCP/IP protocol suite, IP addressing, routers & topologies',
    iconName: 'Network',
    color: 'from-emerald-600 to-teal-600',
    borderHoverColor: 'hover:border-teal-500',
    accentBg: 'bg-teal-50 text-teal-700',
    workingTopicId: 'ip-address',
    topicsList: [
      { name: 'IP Address & Subnetting', isWorking: true, topicId: 'ip-address', description: 'IPv4 32-bit dotted decimal, Classes A/B/C, NAT & Default Gateway.' },
      { name: 'OSI Reference Model (7 Layers)', isWorking: false, description: 'Physical through Application layers with protocol mapping.' },
      { name: 'Network Topologies & Cables', isWorking: false, description: 'Star, Mesh, Bus topologies, Cat6 UTP pinouts (T568A/B).' },
      { name: 'DNS & DHCP Workflow', isWorking: false, description: 'Domain name resolution flow and automatic IP lease allocation.' },
    ],
  },
  {
    id: 'html-css',
    title: 'HTML & CSS',
    subtitle: 'Web structure, semantics, form inputs, styling & responsive CSS layout',
    iconName: 'Code2',
    color: 'from-amber-600 to-orange-600',
    borderHoverColor: 'hover:border-amber-500',
    accentBg: 'bg-amber-50 text-amber-700',
    workingTopicId: 'html-forms',
    topicsList: [
      { name: 'HTML Forms & Inputs', isWorking: true, topicId: 'html-forms', description: 'Interactive forms, action, method, inputs, labels & validation.' },
      { name: 'HTML5 Semantic Tags', isWorking: false, description: 'Header, nav, main, article, section, and accessibility.' },
      { name: 'CSS Box Model & Flexbox', isWorking: false, description: 'Margin, border, padding, content box and 1D flex containers.' },
      { name: 'CSS Grid & Media Queries', isWorking: false, description: 'Two-dimensional grid layouts and responsive breakpoints.' },
    ],
  },
  {
    id: 'python',
    title: 'Python',
    subtitle: 'Syntax, data types, control flow, loops, functions and modules',
    iconName: 'Terminal',
    color: 'from-cyan-600 to-blue-700',
    borderHoverColor: 'hover:border-cyan-500',
    accentBg: 'bg-cyan-50 text-cyan-700',
    topicsList: [
      { name: 'Variables & Data Types', isWorking: false, description: 'Integers, floats, strings, booleans, and dynamic typing.' },
      { name: 'Control Structures (if/else, loops)', isWorking: false, description: 'Conditional branching, for and while loops with range().' },
      { name: 'Python Lists, Tuples & Dictionaries', isWorking: false, description: 'Indexed collections, key-value mappings and methods.' },
      { name: 'Functions & File Handling', isWorking: false, description: 'def syntax, return values, and open() read/write operations.' },
    ],
  },
  {
    id: 'database',
    title: 'Database (DBMS / SQL)',
    subtitle: 'Relational model, primary keys, SQL queries, normalization and indexing',
    iconName: 'Database',
    color: 'from-rose-600 to-pink-600',
    borderHoverColor: 'hover:border-rose-500',
    accentBg: 'bg-rose-50 text-rose-700',
    topicsList: [
      { name: 'Relational Database Concepts & Keys', isWorking: false, description: 'Primary keys, foreign keys, candidates, and unique constraints.' },
      { name: 'SQL DDL vs DML Queries', isWorking: false, description: 'CREATE, ALTER, DROP vs SELECT, INSERT, UPDATE, DELETE.' },
      { name: 'Table Joins (INNER, LEFT, RIGHT)', isWorking: false, description: 'Connecting multiple relational tables with ON conditions.' },
      { name: 'Database Normalization (1NF to 3NF)', isWorking: false, description: 'Eliminating data redundancy and update anomalies.' },
    ],
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    subtitle: 'CIA triad, malware types, phishing, firewalls, encryption & cyber safety',
    iconName: 'ShieldAlert',
    color: 'from-red-600 to-amber-700',
    borderHoverColor: 'hover:border-red-500',
    accentBg: 'bg-red-50 text-red-700',
    topicsList: [
      { name: 'Cyber Threats & Malware Types', isWorking: false, description: 'Viruses, worms, trojans, ransomware, spyware and rootkits.' },
      { name: 'Phishing & Social Engineering', isWorking: false, description: 'Fake URLs, spear phishing, credential harvesting and red flags.' },
      { name: 'Firewalls & Network Security', isWorking: false, description: 'Packet filtering, stateful inspection, and DMZ configuration.' },
      { name: 'Password Security & 2FA/MFA', isWorking: false, description: 'Entropy, salting, hashing algorithms and authenticator apps.' },
    ],
  },
  {
    id: 'ms-office',
    title: 'MS Office',
    subtitle: 'Word processing, Excel formulas & pivot tables, PowerPoint & Outlook',
    iconName: 'FileSpreadsheet',
    color: 'from-emerald-700 to-green-600',
    borderHoverColor: 'hover:border-emerald-500',
    accentBg: 'bg-emerald-50 text-emerald-700',
    topicsList: [
      { name: 'Excel Formulas & Functions', isWorking: false, description: 'SUM, AVERAGE, IF, VLOOKUP/XLOOKUP, and conditional formatting.' },
      { name: 'Excel Pivot Tables & Charts', isWorking: false, description: 'Summarizing large datasets, slicers, and trend graphs.' },
      { name: 'MS Word Mail Merge', isWorking: false, description: 'Automating batch letters, certificates and envelope printing.' },
      { name: 'PowerPoint Master Slides & Animations', isWorking: false, description: 'Consistent slide hierarchy, transitions and presentation timing.' },
    ],
  },
];

export const WORKING_TOPICS: Record<TopicId, TopicContent> = {
  ram: {
    id: 'ram',
    title: 'RAM (Random Access Memory)',
    category: 'Computer Fundamentals',
    categoryId: 'computer-fundamentals',
    badge: 'Hardware & Architecture',
    summary: 'The high-speed, volatile electronic scratchpad that holds active programs and data for the CPU.',
    simpleExplanation: {
      definition: 'RAM (Random Access Memory) is the primary internal memory of a computer that temporarily stores the operating system, currently open applications, and data being actively worked on by the CPU.',
      keyPoints: [
        'Volatile Memory: RAM needs continuous electrical power. When the computer is switched off or restarted, everything inside RAM is instantly wiped clean.',
        'High Speed: Reading and writing to RAM happens in nanoseconds (ns), which is thousands of times faster than SSDs and hard drives.',
        'Direct Access: The CPU can read any memory byte directly and in any order without having to scan from the beginning (hence "Random Access").',
        'Capacity & Units: Common sizes today are 8 GB, 16 GB, or 32 GB. Measured in Megabytes (MB) and Gigabytes (GB).',
        'Virtual Memory / Paging: When RAM runs completely full, Windows swaps inactive memory pages into a file on disk called "pagefile.sys", which noticeably slows down the machine.'
      ],
      technicalSpecifications: [
        { label: 'Classification', value: 'Primary Semiconductor Memory (DRAM / SDRAM)' },
        { label: 'Speed Range', value: '2400 MHz to 6400+ MHz (DDR4 / DDR5)' },
        { label: 'Typical Latency', value: '~10 - 15 nanoseconds (CAS Latency)' },
        { label: 'Form Factor', value: 'DIMM for Desktop PCs, SO-DIMM for Laptops' },
        { label: 'Role in CTS COPA', value: 'Mandatory Module in Trade Theory: Computer Hardware' }
      ],
      summaryQuote: 'Remember the golden rule for students: Hard disk stores your files permanently like a steel almirah; RAM keeps your open files right on your study desk while you work!'
    },
    analogy: {
      title: 'The Study Desk vs. The Library Book Cupboard',
      story: 'Imagine an ITI student studying for the NCVT final exam in a library. In the corner of the room stands a massive steel cupboard containing 50 heavy reference textbooks. The student sits at a study desk that can only hold 3 open textbooks at once.',
      conceptMapping: [
        {
          realLife: 'The Study Desk surface',
          computerConcept: 'RAM (Random Access Memory)',
          why: 'You put only the 2-3 books you are currently reading on the desk. You can glance at them instantly without walking anywhere.'
        },
        {
          realLife: 'Steel Library Cupboard',
          computerConcept: 'Hard Disk / SSD Storage',
          why: 'Holds thousands of books safely for years, even when the lights are turned off, but it takes several seconds to walk over and fetch a book.'
        },
        {
          realLife: 'Student reading lines',
          computerConcept: 'CPU (Processor)',
          why: 'The CPU does the actual thinking and reading. It wants books placed directly in front of it on the desk.'
        },
        {
          realLife: 'Desk runs out of space',
          computerConcept: 'RAM Full & Virtual Memory Swapping',
          why: 'If you try to open 10 books at once, you must put some on the floor or walk back to the cupboard. Your studying slows down dramatically.'
        }
      ],
      instructorTip: 'Ask the students: "What happens to the papers on your desk if a sudden gust of wind blows or the cleaner clears the desk at night?" That is volatility!'
    },
    activity: {
      title: 'Lab Exercise: Investigating Real-Time RAM with Windows Task Manager',
      objective: 'Enable ITI COPA trainees to monitor real-time memory usage, identify heavy processes, and observe memory allocation in Windows 10/11.',
      duration: '25 Minutes',
      toolsNeeded: ['Windows 10/11 Computer Lab Workstation', 'Web Browser (Chrome/Edge)', 'MS Word / Notepad', 'Windows Task Manager'],
      steps: [
        {
          stepNumber: 1,
          instruction: 'Press Ctrl + Shift + Esc on the keyboard to launch Windows Task Manager. Click on "More details" if in compact view.',
          expectedResult: 'The Processes tab shows CPU, Memory, Disk, and Network columns with active percentages.'
        },
        {
          stepNumber: 2,
          instruction: 'Click on the "Performance" tab and select "Memory". Note down the Total Physical Memory, In Use (GB), and Available (GB).',
          expectedResult: 'Students record their baseline RAM usage before opening extra software (e.g. 3.2 GB in use out of 8.0 GB).'
        },
        {
          stepNumber: 3,
          instruction: 'Open Google Chrome and open 5 separate tabs (YouTube, Wikipedia, ITI Portal, Google Maps, News). Watch the Memory graph in Task Manager.',
          expectedResult: 'Memory usage increases by ~1.2 GB to 1.8 GB. Multiple "Google Chrome" sub-processes appear.'
        },
        {
          stepNumber: 4,
          instruction: 'Close Google Chrome. Observe the Performance graph immediately.',
          expectedResult: 'Memory drops back down as the operating system reclaims the freed RAM pages.'
        }
      ],
      teacherDebrief: 'Demonstrate to the class how Windows manages "Cached Memory" and explain why having free RAM does not mean wasted RAM—Windows uses idle RAM to cache frequently accessed programs.'
    },
    scenario: {
      title: 'The Freezing Accounting Station at Bharat Metal Works',
      companyOrContext: 'Accounts Department at Bharat Metal Works (Small & Medium Enterprise)',
      problem: 'An accountant uses an office PC equipped with 4 GB RAM. Every afternoon when running Tally Prime, MS Excel with 50,000 inventory rows, WhatsApp Web, and 12 Chrome tabs, the computer completely freezes, the hard disk light blinks continuously, and the mouse pointer stutters.',
      symptoms: [
        'Mouse cursor freezing or lagging behind movement',
        'Hard disk activity LED glowing solid red/orange',
        'Applications showing "(Not Responding)" in title bar',
        'Task Manager reports Memory Usage at 98% - 99%'
      ],
      troubleshooting: [
        'Checked Task Manager: 3.9 GB of 4.0 GB physical RAM occupied.',
        'Observed Disk Usage at 100%: System was thrashing—heavily reading and writing the pagefile.sys virtual memory on a mechanical 5400 RPM hard drive.',
        'No malware or virus was found; the workload simply exceeded available hardware capacity.'
      ],
      solution: 'Upgraded the system RAM from 4 GB to 16 GB (Dual Channel DDR4 3200MHz) and installed a SATA SSD for Windows. Total RAM utilization settled at 7.2 GB with 8.8 GB headroom, eliminating disk swapping completely.',
      lessonLearned: 'Slow computer performance is often a memory bottleneck rather than a slow processor. Adding RAM allows all active apps to reside concurrently in high-speed DRAM.'
    },
    quiz: [
      {
        id: 1,
        question: 'Why is RAM referred to as "Volatile" memory in computer terminology?',
        options: [
          'It can be infected easily by computer viruses',
          'Its contents are permanently lost when power supply is switched off',
          'It is made of delicate magnetic glass material',
          'It can only store numeric values and not alphabets'
        ],
        correctIndex: 1,
        explanation: 'Volatile memory requires electrical current to maintain its state. When power is disconnected, capacitive charges in DRAM dissipate and all data is lost.',
        examTip: 'Frequent CTS NCVT question: Always pair RAM with Volatile and ROM with Non-Volatile!'
      },
      {
        id: 2,
        question: 'What does the term "Random Access" in RAM actually signify?',
        options: [
          'Data is saved in random random order without any addresses',
          'Any memory location can be accessed directly in the same amount of time regardless of its physical position',
          'The CPU guesses which memory cell to read randomly',
          'It can only be accessed during random intervals of time'
        ],
        correctIndex: 1,
        explanation: 'Unlike sequential access devices (like magnetic tapes) that must rewind or fast-forward, RAM allows instant direct access to any memory address using memory row/column decoders.',
        examTip: 'Contrasted with Sequential Access in exam papers.'
      },
      {
        id: 3,
        question: 'Which of the following units is commonly used to measure modern desktop RAM capacity?',
        options: [
          'Kilohertz (KHz)',
          'Gigabytes (GB)',
          'Dots Per Inch (DPI)',
          'Bits Per Second (bps)'
        ],
        correctIndex: 1,
        explanation: 'Modern personal computers typically feature 8 GB, 16 GB, 32 GB, or 64 GB of RAM. Clock frequency is in MHz/MT/s, but capacity is measured in Gigabytes (GB).',
        examTip: '1 GB = 1024 MB = 1,048,576 KB.'
      },
      {
        id: 4,
        question: 'What happens when a computer runs out of available physical RAM while executing multiple heavy applications?',
        options: [
          'The computer permanently destroys the processor chip',
          'The operating system uses a portion of the storage drive as "Virtual Memory", slowing down performance',
          'The monitor automatically switches to black and white mode',
          'All files on the hard disk are deleted automatically'
        ],
        correctIndex: 1,
        explanation: 'When physical RAM is exhausted, the OS memory manager pages out inactive memory blocks to secondary storage (paging file / virtual memory), leading to disk thrashing and noticeable slowdowns.',
        examTip: 'Known as "Paging" or "Virtual Memory" in OS and Hardware papers.'
      },
      {
        id: 5,
        question: 'Which type of RAM does NOT need periodic refresh cycles and is used inside high-speed CPU Cache memory?',
        options: [
          'DRAM (Dynamic RAM)',
          'SRAM (Static RAM)',
          'SDRAM (Synchronous DRAM)',
          'DDR5 RAM'
        ],
        correctIndex: 1,
        explanation: 'SRAM uses flip-flop circuits (6 transistors per bit) and does not need constant refreshing like DRAM (which uses 1 transistor + 1 capacitor). SRAM is faster and more expensive, ideal for L1/L2/L3 CPU cache.',
        examTip: 'High-probability ITI theory exam question on SRAM vs DRAM comparison.'
      }
    ],
    trainerNotes: {
      commonMisconceptions: [
        {
          myth: '"If I install 16 GB RAM, I can save 16 GB of songs and movies permanently."',
          reality: 'Clarify that RAM is not for saving files. Files saved on Desktop/Documents reside on the HDD/SSD. RAM only holds what is running right now.'
        },
        {
          myth: '"More RAM makes a single simple program run twice as fast."',
          reality: 'RAM does not speed up the arithmetic calculation itself; it prevents slowdowns when switching between multiple programs and handling large files.'
        },
        {
          myth: '"100% Free RAM is ideal."',
          reality: 'Modern operating systems intentionally keep frequently used code in RAM cache to open things faster. Unused RAM is wasted opportunity.'
        }
      ],
      blackboardSketchGuide: 'Draw two rectangles on the blackboard: Left: "Study Desk" labeled RAM (Fast, Small, Cleared at night). Right: "Steel Almirah" labeled Hard Disk (Slow, Huge, Permanent). In between, draw an arrow showing files being fetched onto the desk to work on.',
      bilingualTips: [
        {
          term: 'Volatile Memory',
          explanationHindi: 'अस्थायी मेमोरी (बिजली कटते ही डाटा गायब हो जाता है)',
          teachingAid: 'Switch off a desk lamp suddenly to show how light disappears instantly.'
        },
        {
          term: 'Virtual Memory (Paging)',
          explanationHindi: 'आभासी मेमोरी (जब रैम भर जाए तो हार्ड डिस्क का कुछ हिस्सा इस्तेमाल होता है)',
          teachingAid: 'Show Task Manager -> Performance -> Committed memory.'
        },
        {
          term: 'Read/Write Speed',
          explanationHindi: 'पढ़ने और लिखने की गति (नैनो-सेकंड में)',
          teachingAid: 'Compare walking to the blackboard (RAM) vs walking to another classroom (HDD).'
        }
      ],
      ncvtExamFocus: [
        'Differentiate between SRAM (Static RAM) and DRAM (Dynamic RAM) with refresh cycle comparison.',
        'Definition of Volatile vs Non-Volatile memory with examples (RAM vs ROM).',
        'Calculation of Byte hierarchy: 1 Byte = 8 bits, 1 KB = 1024 Bytes, 1 MB = 1024 KB, 1 GB = 1024 MB.',
        'Explain DDR generations (DDR3, DDR4, DDR5 - Double Data Rate).'
      ]
    }
  },
  os: {
    id: 'os',
    title: 'Operating System (OS)',
    category: 'Operating System',
    categoryId: 'operating-system',
    badge: 'System Software',
    summary: 'The master software manager that bridges human users, software applications, and raw computer hardware.',
    simpleExplanation: {
      definition: 'An Operating System (OS) is system software that acts as an intermediary between computer hardware and the computer user. It controls and coordinates the execution of application programs and manages all hardware resources (CPU, memory, disk drives, and peripherals).',
      keyPoints: [
        'The Master Controller: Without an OS, computer hardware is just lifeless electronic silicon and copper. The OS brings it to life.',
        'Hardware Abstraction: Applications don’t need to know the electronic circuit details of your printer or display—they simply ask the OS via standard APIs.',
        'Core Responsibilities: Process Management (multitasking), Memory Management (allocating RAM), File System Management (folders and files), and Device Management (via drivers).',
        'Two Key Layers: Kernel (the core heart that communicates with hardware) and User Interface/Shell (GUI like Windows Desktop or CLI like Linux Bash).',
        'Prominent Examples: Microsoft Windows, Linux (Ubuntu, RedHat), macOS, Android, and iOS.'
      ],
      technicalSpecifications: [
        { label: 'Classification', value: 'System Software (Fundamental Layer)' },
        { label: 'Architecture', value: 'Monolithic / Microkernel / Hybrid Kernels' },
        { label: 'Interface Modes', value: 'GUI (Graphical User Interface) & CLI (Command Line)' },
        { label: 'Execution Mode', value: 'Dual Mode: User Mode (Ring 3) & Kernel Mode (Ring 0)' },
        { label: 'Role in CTS COPA', value: 'Major Core Subject: Windows & Linux Administration' }
      ],
      summaryQuote: 'The Operating System is like the conductor of a grand orchestra: the musicians are the hardware chips, the sheet music is the software, and the conductor makes sure they play in perfect harmony!'
    },
    analogy: {
      title: 'The Busy Restaurant Manager & Kitchen Staff',
      story: 'Consider a bustling 5-star restaurant. A customer sits at a table and orders Butter Paneer. The customer never enters the hot kitchen, never touches the gas stove, and never commands the knife directly.',
      conceptMapping: [
        {
          realLife: 'The Customer dining at table',
          computerConcept: 'The Computer User',
          why: 'Decides what they want to achieve (e.g. click print, play video, type text).'
        },
        {
          realLife: 'The Menu Card & Waiter',
          computerConcept: 'Application Software (e.g. MS Word / VLC)',
          why: 'Provides the options and records the customer request in a structured format.'
        },
        {
          realLife: 'The Restaurant Head Manager',
          computerConcept: 'The Operating System (Kernel)',
          why: 'Takes the order, schedules which chef cooks it, allocates stove burners, and ensures no two dishes collide.'
        },
        {
          realLife: 'Stove, Oven, Knives, Refrigerator',
          computerConcept: 'Computer Hardware (CPU, RAM, Disk, Printer)',
          why: 'The raw physical machinery that executes the actual work.'
        }
      ],
      instructorTip: 'Point out: What would happen if all 50 customers ran into the kitchen to cook simultaneously? Total chaos and crash! That is why applications cannot touch hardware directly without the OS.'
    },
    activity: {
      title: 'Lab Exercise: Exploring Windows OS Architecture via Administrative Tools',
      objective: 'Help students inspect the OS acting as process manager, memory allocator, and hardware interface using Windows built-in diagnostic tools.',
      duration: '30 Minutes',
      toolsNeeded: ['Windows 10/11 Lab PC', 'Notepad', 'Device Manager', 'Task Manager'],
      steps: [
        {
          stepNumber: 1,
          instruction: 'Open Notepad. Open Task Manager (Ctrl + Shift + Esc). Find "Notepad" under the Processes tab.',
          expectedResult: 'Notice the Process ID (PID), memory allocated by the OS, and status "Running".'
        },
        {
          stepNumber: 2,
          instruction: 'Right-click Start button and click "Device Manager" (or run devmgmt.msc).',
          expectedResult: 'Students see the complete hardware tree (Display Adapters, Keyboards, Network Adapters, Disk Drives) managed by OS device drivers.'
        },
        {
          stepNumber: 3,
          instruction: 'Open Command Prompt (cmd) and type "ver" and "systeminfo".',
          expectedResult: 'Inspect the OS Kernel version number, build number, and total physical memory recognized by the kernel.'
        },
        {
          stepNumber: 4,
          instruction: 'In Task Manager, right-click Notepad and select "End task".',
          expectedResult: 'The OS kernel forcibly terminates the process, immediately freeing its RAM and CPU time slice.'
        }
      ],
      teacherDebrief: 'Ask students: Who allowed Notepad to take 15 MB of RAM? Who took that RAM back when Notepad closed? The OS memory manager!'
    },
    scenario: {
      title: 'The Factory Barcode Scanner That Refused to Beep',
      companyOrContext: 'Central Warehousing Logistics Hub',
      problem: 'A newly recruited inventory clerk connected a brand-new laser barcode scanner to a USB port on a Windows 10 workstation. When scanned across a carton barcode, the laser lit up, but nothing typed into the inventory software on screen.',
      symptoms: [
        'Scanner hardware was physically receiving electrical power via USB cable',
        'Laser diode flashed red on barcode pass',
        'Windows Device Manager showed a yellow exclamation mark ⚠️ next to "Unknown USB Peripheral"',
        'Application software reported "No input device registered"'
      ],
      troubleshooting: [
        'Verified hardware connection: Hardware was working.',
        'Inspected the OS role: The OS recognized that an electrical device was plugged in (via USB Plug and Play interrupt), but lacked the specific "Device Driver" translator to convert the scanner signals into standard keyboard keystrokes.'
      ],
      solution: 'Downloaded and installed the certified manufacturer Device Driver package into the OS. The OS immediately loaded the driver into kernel space, mapped the USB input stream to the standard HID keyboard stack, and barcode numbers started streaming smoothly.',
      lessonLearned: 'Hardware cannot communicate with applications without the Operating System and its matching device driver translation software.'
    },
    quiz: [
      {
        id: 1,
        question: 'Which component of an Operating System remains continuously active in memory (RAM) and directly interacts with the computer hardware?',
        options: [
          'The Web Browser',
          'The Kernel',
          'The Screen Saver',
          'The Compiler'
        ],
        correctIndex: 1,
        explanation: 'The Kernel is the central core of an operating system. It has complete control over everything in the system and handles hardware interrupts, process scheduling, and memory mapping.',
        examTip: 'High-frequency NCVT COPA question: "Kernel is the heart/core of an Operating System."'
      },
      {
        id: 2,
        question: 'In the 4-layer computer architecture, what sits directly between Application Software and Computer Hardware?',
        options: [
          'The Human End User',
          'The Operating System',
          'The Internet Router',
          'The Power Supply Unit (SMPS)'
        ],
        correctIndex: 1,
        explanation: 'The correct hierarchy is: User → Application Software → Operating System → Hardware. The OS acts as the protective bridge.',
        examTip: 'Draw this 4-block diagram in your theory examination answer sheet!'
      },
      {
        id: 3,
        question: 'What is a "Device Driver" in the context of an Operating System?',
        options: [
          'A physical person who drives a company delivery truck',
          'A specialized software program that allows the OS to communicate with a specific hardware device',
          'A screwdriver tool used to open the CPU cabinet',
          'A hardware cable connecting the motherboard to the power socket'
        ],
        correctIndex: 1,
        explanation: 'Device drivers act as translators between the hardware device and the OS kernel, converting high-level OS commands into raw hardware commands.',
        examTip: 'CTS question: "Print driver, Graphics driver, Sound driver are examples of device drivers."'
      },
      {
        id: 4,
        question: 'Which of the following functions is NOT performed by a standard Operating System?',
        options: [
          'Processor / CPU Scheduling',
          'Compiling human C++ source code into machine language',
          'Memory and storage allocation',
          'File management and directory indexing'
        ],
        correctIndex: 1,
        explanation: 'Compiling source code is done by language translators/compilers (application/developer tools like GCC, MSVC), not the operating system itself.',
        examTip: 'Distinguish between System Software (OS) and Language Processors (Compiler, Interpreter, Assembler).'
      },
      {
        id: 5,
        question: 'Which Operating System is an open-source, Unix-like operating system originally created by Linus Torvalds in 1991?',
        options: [
          'Microsoft Windows 11',
          'Linux',
          'macOS Sonoma',
          'MS-DOS 6.22'
        ],
        correctIndex: 1,
        explanation: 'Linux is a freely distributable, cross-platform operating system kernel created by Linus Torvalds, widely taught in the ITI COPA syllabus alongside Ubuntu.',
        examTip: 'Remember: Linux kernel + GNU utilities = Linux Operating System.'
      }
    ],
    trainerNotes: {
      commonMisconceptions: [
        {
          myth: '"Operating system and Application software are basically the same thing."',
          reality: 'Explain the difference between purpose-built end-user tools (Word, Photoshop) and the fundamental platform (OS) that enables them to run.'
        },
        {
          myth: '"If my PC has high hardware specs, it will run fine without an OS."',
          reality: 'Hardware without an OS cannot even read keystrokes or display letters on the screen beyond basic BIOS text.'
        },
        {
          myth: '"Operating systems only exist on desktop computers."',
          reality: 'Highlight that Android phones, Smart TVs, ATM machines, and microwave ovens all run operating systems or embedded RTOS.'
        }
      ],
      blackboardSketchGuide: 'Draw 4 concentric circles or stacked blocks: Innermost circle: "Hardware" (CPU, RAM, Disk). Next circle: "Operating System (Kernel & Drivers)". Next circle: "Applications" (Chrome, Tally, Word). Outermost circle: "User" (Human). Draw bidirectional arrows showing requests passing through the OS.',
      bilingualTips: [
        {
          term: 'Kernel',
          explanationHindi: 'ऑपरेटिंग सिस्टम का मुख्य केंद्र (हार्ट / दिमाग जो हार्डवेयर से बात करता है)',
          teachingAid: 'Compare to the engine inside a motor car.'
        },
        {
          term: 'System Call',
          explanationHindi: 'जब कोई ऍप्लिकेश़न ऑपरेटिंग सिस्टम से हार्डवेयर इस्तेमाल करने की इजाजत मांगती है',
          teachingAid: 'Analogy of raising hand in class to ask permission from teacher.'
        },
        {
          term: 'Multitasking',
          explanationHindi: 'एक साथ कई प्रोग्राम्स को प्रोसेस करना (टाइम शेयरिंग द्वारा)',
          teachingAid: 'Juggling 3 balls in the air—handling each for a split second.'
        }
      ],
      ncvtExamFocus: [
        'List 5 primary functions of an Operating System (Processor, Memory, File, Device, Security management).',
        'Compare GUI (Graphical User Interface) vs CLI (Command Line Interface) with 3 advantages and disadvantages each.',
        'Cold Booting vs Warm Booting definition.',
        'Explain the role of spooling in printer management (Simultaneous Peripheral Operations On-Line).'
      ]
    }
  },
  'ip-address': {
    id: 'ip-address',
    title: 'IP Address & Networking',
    category: 'Networking',
    categoryId: 'networking',
    badge: 'Protocols & Routing',
    summary: 'The unique numerical logical address that identifies every node on a computer network.',
    simpleExplanation: {
      definition: 'An IP (Internet Protocol) Address is a unique numerical label assigned to each device connected to a computer network that uses the Internet Protocol for communication. It serves two principal functions: host or network interface identification and location addressing.',
      keyPoints: [
        'Logical vs Physical: A MAC address is burned permanently into the network card (hardware). An IP address is logical and changes depending on which network you connect to.',
        'IPv4 Structure: Composed of 32 bits divided into 4 octets (8 bits each), separated by dots (e.g., 192.168.1.10). Each octet ranges from 0 to 255.',
        'Network ID vs Host ID: The first portion of the IP identifies the network street/neighborhood; the remaining portion identifies the specific computer house on that street.',
        'Subnet Mask: Tells the computer where the Network ID ends and the Host ID begins (e.g., 255.255.255.0 for standard Class C).',
        'Public vs Private IP: Private IPs (like 192.168.x.x, 10.x.x.x) are used inside your home/ITI lab; a Router uses NAT (Network Address Translation) to share a single Public IP to communicate with the world wide web.'
      ],
      technicalSpecifications: [
        { label: 'Standard Versions', value: 'IPv4 (32-bit, ~4.3 billion) & IPv6 (128-bit hexadecimal)' },
        { label: 'Default Classes', value: 'Class A (1-126), Class B (128-191), Class C (192-223)' },
        { label: 'Loopback Address', value: '127.0.0.1 (Used to test local TCP/IP stack)' },
        { label: 'Private Range (Class C)', value: '192.168.0.0 to 192.168.255.255' },
        { label: 'Role in CTS COPA', value: 'Core Trade Practical: LAN Setup & IP Configuration' }
      ],
      summaryQuote: 'If a letter has no sender or receiver postal address, the postman cannot deliver it. Similarly, every data packet on the Internet must carry a Source IP and a Destination IP!'
    },
    analogy: {
      title: 'The Postal Letter & Apartment House Number',
      story: 'Imagine writing a formal letter to your friend Rajesh who lives in "Room 402, Shivam Heights, MG Road, Pune - 411001".',
      conceptMapping: [
        {
          realLife: 'Pune City + PIN Code 411001',
          computerConcept: 'Network ID (Network Portion of IP)',
          why: 'Guides the national postal truck to the correct town and regional sorting office (just like routers route across the global internet).'
        },
        {
          realLife: 'Room 402 inside the building',
          computerConcept: 'Host ID (Device Portion of IP)',
          why: 'Once inside the building, this identifies Rajesh’s specific flat door among all the rooms.'
        },
        {
          realLife: 'Building Security Guard / Main Mailbox',
          computerConcept: 'Default Gateway (Router)',
          why: 'Collects outgoing letters from all residents and hands incoming letters to the postman at the front gate.'
        },
        {
          realLife: 'National Postal Envelope Format',
          computerConcept: 'TCP/IP Packet Header',
          why: 'Has Source address on back and Destination address on front so the reply comes back accurately.'
        }
      ],
      instructorTip: 'Ask the trainees: "Can two different houses on the same MG Road have the exact same flat number 402?" No! That creates an address conflict where the postman gets confused!'
    },
    activity: {
      title: 'Lab Exercise: Hands-On Networking Commands in Windows Command Prompt',
      objective: 'Instruct ITI trainees to discover their workstation IP, ping the local gateway, test loopback, and verify internet connectivity via CLI.',
      duration: '30 Minutes',
      toolsNeeded: ['Windows 10/11 Workstation in ITI Lab', 'Command Prompt (CMD)', 'Ethernet Cable / Wi-Fi Connection'],
      steps: [
        {
          stepNumber: 1,
          instruction: 'Press Windows Key + R, type "cmd", and press Enter to launch Command Prompt.',
          expectedResult: 'Black console window opens ready for network diagnostic commands.'
        },
        {
          stepNumber: 2,
          instruction: 'Type "ipconfig" and press Enter. Note down IPv4 Address, Subnet Mask, and Default Gateway.',
          expectedResult: 'Students observe e.g. IPv4: 192.168.1.45, Mask: 255.255.255.0, Gateway: 192.168.1.1.'
        },
        {
          stepNumber: 3,
          instruction: 'Type "ping 127.0.0.1" and press Enter.',
          expectedResult: '4 replies with 0% packet loss. Trainees understand this tests whether their own computer NIC and TCP/IP protocol stack is working properly.'
        },
        {
          stepNumber: 4,
          instruction: 'Type "ping 192.168.1.1" (your default gateway router).',
          expectedResult: 'Replies under 2ms proving local LAN connection to the router is alive.'
        },
        {
          stepNumber: 5,
          instruction: 'Type "ping 8.8.8.8" (Google Public DNS) to test external internet routing.',
          expectedResult: 'Replies returning with TTL proving packets traversed the router into the global Internet.'
        }
      ],
      teacherDebrief: 'Demonstrate how to run "ipconfig /all" to reveal the hardware MAC address and DHCP server IP.'
    },
    scenario: {
      title: 'The Exam Lab Emergency: "IP Address Conflict Detected"',
      companyOrContext: 'Government ITI Computer Testing Lab (NCVT Online CBT Exam Center)',
      problem: 'During morning CBT exam preparation, 20 lab computers were turned on. Suddenly, Computer No. 07 and Computer No. 14 popped up a Windows warning: "Another computer on this network has the same IP address. Contact your network administrator." Both systems lost Internet and local network access.',
      symptoms: [
        'Windows networking icon showing a yellow exclamation mark triangle ⚠️',
        'Pinging the router returned "Destination host unreachable"',
        'Exam software refused to connect to the central server',
        'Windows event log recorded Event ID 4199: System detected an address conflict for IP address 192.168.1.50'
      ],
      troubleshooting: [
        'Ran "ipconfig" on Computer 07: Manually set to Static IP 192.168.1.50.',
        'Ran "ipconfig" on Computer 14: A student from yesterday had also manually configured 192.168.1.50 instead of using DHCP.',
        'The router switch ARP table became confused as two distinct MAC addresses claimed the exact same logical IP.'
      ],
      solution: 'Changed both computers to "Obtain an IP address automatically" (DHCP) in IPv4 Adapter Properties. The router DHCP pool leased 192.168.1.107 and 192.168.1.114 with unique addresses. Network immediately restored.',
      lessonLearned: 'Every active device on a subnet must have a strictly unique IP address. DHCP prevents accidental duplicate conflicts.'
    },
    quiz: [
      {
        id: 1,
        question: 'How many total bits make up a standard IPv4 (Internet Protocol Version 4) address?',
        options: [
          '16 bits',
          '32 bits',
          '64 bits',
          '128 bits'
        ],
        correctIndex: 1,
        explanation: 'IPv4 addresses are 32 bits long, divided into four 8-bit octets (4 x 8 = 32 bits). IPv6 addresses are 128 bits long.',
        examTip: 'Standard CTS exam question: Compare 32-bit IPv4 with 128-bit IPv6.'
      },
      {
        id: 2,
        question: 'Which of the following IP addresses represents a private Class C IP address commonly used in home and lab LANs?',
        options: [
          '8.8.8.8',
          '192.168.1.25',
          '256.100.1.1',
          '12.0.0.1'
        ],
        correctIndex: 1,
        explanation: '192.168.0.0 to 192.168.255.255 is the designated private Class C range reserved by RFC 1918. Note that 256.100.1.1 is invalid because an octet cannot exceed 255.',
        examTip: 'Remember: Valid octet range is strictly 0 to 255.'
      },
      {
        id: 3,
        question: 'What is the primary function of a "Subnet Mask" in an IP network configuration?',
        options: [
          'To hide your computer from hackers like a mask',
          'To distinguish which portion of the IP is the Network ID and which is the Host ID',
          'To increase the download speed of broadband internet',
          'To encrypt password strings in web browsers'
        ],
        correctIndex: 1,
        explanation: 'A subnet mask (like 255.255.255.0) performs a bitwise AND operation with the IP to separate the network portion from the host portion.',
        examTip: 'Standard Class C default subnet mask is 255.255.255.0 (/24).'
      },
      {
        id: 4,
        question: 'Which IP address is globally reserved as the "Loopback" address to test your own local network adapter card?',
        options: [
          '192.168.0.1',
          '127.0.0.1',
          '0.0.0.0',
          '255.255.255.255'
        ],
        correctIndex: 1,
        explanation: '127.0.0.1 (or localhost) is reserved for loopback testing. Pinging 127.0.0.1 tests whether the local TCP/IP stack is functioning without sending packets out to the physical wire.',
        examTip: 'Frequent CTS viva question: "How do you test your own NIC without a cable? Ping 127.0.0.1!"'
      },
      {
        id: 5,
        question: 'What network command in Windows is used to view your IP address, subnet mask, and default gateway in the command line?',
        options: [
          'show-ip',
          'ipconfig',
          'netstat -a',
          'getmac'
        ],
        correctIndex: 1,
        explanation: 'ipconfig displays all current TCP/IP network configuration values. On Linux, the equivalent legacy command is ifconfig, or modern "ip addr".',
        examTip: 'Add "/all" (ipconfig /all) to see MAC address, DNS, and DHCP lease times.'
      }
    ],
    trainerNotes: {
      commonMisconceptions: [
        {
          myth: '"Can an IP address have a number like 192.168.1.300?"',
          reality: 'Teach the binary math: 8 bits = 2^8 = 256 possible values (0 to 255). Therefore, 300 is mathematically impossible in an IPv4 octet.'
        },
        {
          myth: '"IP address and MAC address are the same thing."',
          reality: 'MAC address is permanent physical hardware identity (like your Aadhaar number/fingerprint). IP address is logical location (like your current room address in a hostel).'
        },
        {
          myth: '"My computer talks directly to google.com servers with my 192.168.1.15 address."',
          reality: 'Explain NAT (Network Address Translation). Your private IP gets converted into your router’s public IP before heading out to the Internet.'
        }
      ],
      blackboardSketchGuide: 'Draw 3 boxes horizontally: [PC: 192.168.1.10] ───cable───> [Router: LAN 192.168.1.1 | WAN 103.25.14.8] ───cloud───> [Google: 142.250.190.46]. Highlight the Router acting as the Gateway door between Private LAN and Public WAN.',
      bilingualTips: [
        {
          term: 'Default Gateway',
          explanationHindi: 'डिफ़ॉल्ट गेटवे (राउटर का पता—लोकल नेटवर्क से बाहर दुनिया में जाने का मुख्य दरवाजा)',
          teachingAid: 'Compare to the main entry gate of the ITI campus.'
        },
        {
          term: 'Packet',
          explanationHindi: 'डाटा पैकेट (इंटरनेट पर जाने वाले डाटा का छोटा लिफाफा)',
          teachingAid: 'Hold up an envelope with TO and FROM written on it.'
        },
        {
          term: 'Subnet Mask',
          explanationHindi: 'सबनेट मास्क (यह तय करता है कि नेटवर्क कितना बड़ा है और कितने कंप्यूटर जुड़ सकते हैं)',
          teachingAid: 'Explain /24 giving 254 usable computers (1 to 254).'
        }
      ],
      ncvtExamFocus: [
        'Classify IPv4 address classes: Class A (1-126), Class B (128-191), Class C (192-223), Class D (224-239 Multicast), Class E (240-255 Experimental).',
        'Explain purpose of Default Gateway and DNS (Domain Name System).',
        'Compare IPv4 (32-bit dotted decimal) vs IPv6 (128-bit hexadecimal).',
        'What is DHCP (Dynamic Host Configuration Protocol)?'
      ]
    }
  },
  'html-forms': {
    id: 'html-forms',
    title: 'HTML Forms & Inputs',
    category: 'HTML & CSS',
    categoryId: 'html-css',
    badge: 'Web Development',
    summary: 'The standard web interface mechanism that collects user input and transmits data to a server.',
    simpleExplanation: {
      definition: 'An HTML Form (`<form>`) is a dedicated section of an HTML document containing interactive controls such as text boxes, checkboxes, radio buttons, dropdown lists, and submit buttons that allow a user to enter data and send it to a web server for processing.',
      keyPoints: [
        'The Container Tag: The `<form>` tag encapsulates all input elements. It uses two crucial attributes: `action` (where data is sent) and `method` (how data is sent: GET or POST).',
        'The `<input>` Element: The most versatile form tag, varied by the `type` attribute: `text`, `password`, `email`, `number`, `date`, `checkbox`, `radio`, `file`, and `submit`.',
        'The Critical `name` Attribute: If an input element lacks a `name` attribute (e.g. `name="student_name"`), its value is NEVER transmitted to the server upon submission!',
        'Labels & Accessibility: The `<label for="id">` tag provides descriptive text for inputs and allows users to click the text to focus the input field.',
        'GET vs POST: `method="GET"` appends data visibly in the URL query string (good for searches). `method="POST"` sends data securely inside the HTTP request body (required for passwords, registrations, and payments).'
      ],
      technicalSpecifications: [
        { label: 'HTML Standard', value: 'HTML5 Form Controls & Client-side Validation' },
        { label: 'Key Attributes', value: 'action, method, enctype, autocomplete, novalidate' },
        { label: 'Common Types', value: 'text, email, password, tel, number, date, radio, checkbox' },
        { label: 'Payload Formats', value: 'application/x-www-form-urlencoded & multipart/form-data' },
        { label: 'Role in CTS COPA', value: 'Essential Practical: Module 4 Web Design (HTML/CSS)' }
      ],
      summaryQuote: 'Every time you register for an ITI admission, log into your email, or buy a train ticket, you are filling out an HTML Form!'
    },
    analogy: {
      title: 'The Paper Railway Ticket Reservation Slip',
      story: 'Imagine walking into an Indian Railway reservation counter. The clerk cannot read your mind. You are handed a printed paper reservation form.',
      conceptMapping: [
        {
          realLife: 'The printed paper slip itself',
          computerConcept: '`<form>` tag container',
          why: 'Holds all the related fields together as one complete submission document.'
        },
        {
          realLife: 'Blank box for "Passenger Name"',
          computerConcept: '`<input type="text" name="passenger_name">`',
          why: 'The blank box where the traveller writes their custom text.'
        },
        {
          realLife: 'Choice circles: ( ) Male ( ) Female',
          computerConcept: '`<input type="radio" name="gender">`',
          why: 'Radio buttons allow selecting strictly one option out of a mutually exclusive group.'
        },
        {
          realLife: 'Checkbox: [ ] Senior Citizen Concession',
          computerConcept: '`<input type="checkbox" name="concession">`',
          why: 'Checkboxes allow multiple independent yes/no choices.'
        },
        {
          realLife: 'Handing slip through window to booking clerk',
          computerConcept: '`<button type="submit">Submit</button>`',
          why: 'Transfers the entered data to the backend system for booking processing.'
        }
      ],
      instructorTip: 'Emphasize the `name` attribute: If a reservation paper form has no printed heading above the box, the railway clerk will not know whether the number written is age, train number, or mobile number!'
    },
    activity: {
      title: 'Lab Exercise: Building an ITI Trainee Registration Form from Scratch',
      objective: 'Guide ITI COPA students to write a complete semantic HTML form using Notepad/VS Code and test input types and form submission.',
      duration: '35 Minutes',
      toolsNeeded: ['Computer with Notepad or VS Code', 'Any Web Browser (Chrome/Edge/Firefox)'],
      steps: [
        {
          stepNumber: 1,
          instruction: 'Open Notepad. Write the basic HTML boilerplate (`<!DOCTYPE html><html><body>...`).',
          expectedResult: 'Clean HTML skeleton file created.'
        },
        {
          stepNumber: 2,
          instruction: 'Create a `<form>` element. Add `<label>` and `<input type="text" id="tname" name="trainee_name" placeholder="Full Name" required>`.',
          expectedResult: 'Trainee creates an accessible text box with a required validation attribute.'
        },
        {
          stepNumber: 3,
          instruction: 'Add `<input type="email" name="trainee_email">` and `<input type="password" name="trainee_pass">`. Notice how password masks keystrokes with dots.',
          expectedResult: 'Browser automatically validates email format with @ symbol and masks password.'
        },
        {
          stepNumber: 4,
          instruction: 'Add a `<select name="trade">` with `<option>COPA</option>`, `<option>Electrician</option>`, `<option>Fitter</option>`.',
          expectedResult: 'A dropdown menu showing trade options.'
        },
        {
          stepNumber: 5,
          instruction: 'Add `<input type="submit" value="Register Trainee">`. Save as "form.html" and double-click to open in browser.',
          expectedResult: 'Students can fill in the form and click submit, seeing the query parameters appear in the browser address bar.'
        }
      ],
      teacherDebrief: 'Show students what happens if they try to submit with an empty required field: the browser shows a native validation bubble "Please fill out this field".'
    },
    scenario: {
      title: 'The Mystery of the Missing Phone Number on the Job Portal',
      companyOrContext: 'SkillIndia Trainee Placement Portal',
      problem: 'An ITI student built a candidate registration web page for campus recruitment. 50 students registered online. However, when the recruitment officer downloaded the applicant database, every single candidate’s mobile number column was completely blank, even though students swore they had typed it in!',
      symptoms: [
        'The mobile number box was visible on the screen and accepted 10 digits',
        'No visual error appeared on form submission',
        'All other fields (Name, Trade, Email) were saved in the database',
        'Only the mobile number was missing from the server payload'
      ],
      troubleshooting: [
        'The instructor inspected the HTML source code using browser "Inspect Element":',
        'Found: `<input type="tel" id="mobile" placeholder="Enter Mobile">`',
        'Root Cause Identified: The student forgot to include the `name` attribute! The browser had no parameter key to send.'
      ],
      solution: 'Updated the input tag to: `<input type="tel" id="mobile" name="mobile_number" placeholder="Enter Mobile">`. On re-submitting, `mobile_number=9876543210` was immediately received by the server.',
      lessonLearned: 'The `id` attribute is for CSS styling and JavaScript DOM selection; the `name` attribute is strictly required for sending data to the server upon form submission!'
    },
    quiz: [
      {
        id: 1,
        question: 'Which HTML attribute is MANDATORY on an `<input>` tag so that its value is actually sent to the server on submission?',
        options: [
          'class',
          'id',
          'name',
          'style'
        ],
        correctIndex: 2,
        explanation: 'The `name` attribute provides the variable key for the submitted data (e.g. `name=John`). Without `name`, the browser ignores the input value during submission.',
        examTip: 'Extremely popular ITI COPA examination trap question: "id vs name attribute".'
      },
      {
        id: 2,
        question: 'Which HTTP method should be used in `<form method="...">` when submitting sensitive information like user passwords?',
        options: [
          'GET',
          'POST',
          'PUT',
          'HEAD'
        ],
        correctIndex: 1,
        explanation: 'POST transmits form data inside the HTTP request body without exposing values in the visible browser URL bar or server access logs.',
        examTip: 'GET puts parameters in the URL (visible); POST puts parameters in the HTTP body (hidden).'
      },
      {
        id: 3,
        question: 'Which input type should be used when you want a user to pick ONLY ONE option out of a list of multiple choices?',
        options: [
          'checkbox',
          'radio',
          'dropdown',
          'button'
        ],
        correctIndex: 1,
        explanation: 'Radio buttons (`<input type="radio">`) with identical `name` attributes form a mutually exclusive group where only one choice can be active.',
        examTip: 'Remember: Checkbox = Multiple selections; Radio = Single selection.'
      },
      {
        id: 4,
        question: 'Which HTML5 attribute ensures that an input field cannot be submitted blank by the user?',
        options: [
          'validate="true"',
          'mandatory',
          'required',
          'checked'
        ],
        correctIndex: 2,
        explanation: 'The `required` boolean attribute enables client-side browser validation, stopping submission if the field is empty.',
        examTip: 'Introduced in HTML5 specification.'
      },
      {
        id: 5,
        question: 'What is the purpose of the `<label for="student_id">` tag in an HTML form?',
        options: [
          'It provides a sticky price tag on the web page',
          'It pairs descriptive text with an input field and improves usability and accessibility',
          'It automatically translates the form into 10 languages',
          'It encrypts the form data with a secret key'
        ],
        correctIndex: 1,
        explanation: 'The `<label>` element represents a caption for an item in a user interface. Clicking the label focuses or toggles its associated input control via matching `for` and `id` attributes.',
        examTip: 'Best practice for web accessibility (WCAG).'
      }
    ],
    trainerNotes: {
      commonMisconceptions: [
        {
          myth: '"`<input type="password">` encrypts the password securely before sending it across the internet."',
          reality: 'No! `type="password"` only masks the characters on the screen so shoulder-surfers cannot see it. Encryption requires HTTPS (SSL/TLS).'
        },
        {
          myth: '"Can I put a `<form>` tag inside another `<form>` tag?"',
          reality: 'Nested forms are invalid in HTML standards and cause erratic browser behavior. Each form must be separate.'
        },
        {
          myth: '"The `action` attribute is optional and does not matter."',
          reality: 'Explain that `action="process.php"` directs the browser where to submit the data. If left blank, it submits to the current page.'
        }
      ],
      blackboardSketchGuide: 'Draw a rectangle representing a browser window. Inside draw: 1. Text input with label [Name: |________|], 2. Password input with dots [PIN: |••••••|], 3. Radio buttons (•) Male ( ) Female, 4. Blue button [ SUBMIT ]. Draw an arrow pointing from the submit button to a server cloud labeled `action="save.php" method="POST"`.',
      bilingualTips: [
        {
          term: 'Form Action & Method',
          explanationHindi: 'एक्शन (डाटा कहाँ भेजना है) और मेथड (डाटा कैसे भेजना है: GET या POST)',
          teachingAid: 'Compare GET to a postcard (open) and POST to a sealed envelope.'
        },
        {
          term: 'Radio vs Checkbox',
          explanationHindi: 'रेडियो बटन (सिर्फ 1 विकल्प चुन सकते हैं) बनाम चेकबॉक्स (1 से अधिक विकल्प चुन सकते हैं)',
          teachingAid: 'Radio button = Gender/Exam center choice; Checkbox = Known languages/hobbies.'
        },
        {
          term: 'Placeholder',
          explanationHindi: 'प्लेसहोल्डर (हल्के अक्षरों में दिखने वाला निर्देश जो टाइप करते ही गायब हो जाता है)',
          teachingAid: 'Show grey text "उदा. 9876543210" inside the input box.'
        }
      ],
      ncvtExamFocus: [
        'Differentiate between GET and POST methods with minimum 3 comparison points.',
        'List 6 different `type` attribute values of `<input>` tag with their purpose.',
        'Explain `<textarea>` vs `<input type="text">`.',
        'How to create dropdown menu using `<select>` and `<option>` tags.'
      ]
    }
  }
};
