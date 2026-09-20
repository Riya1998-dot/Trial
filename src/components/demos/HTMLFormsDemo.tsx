import React, { useState } from 'react';
import { 
  Code2, 
  Eye, 
  Send, 
  RotateCcw, 
  Copy, 
  Check, 
  Plus, 
  AlertCircle, 
  Sparkles,
  Server,
  Layers
} from 'lucide-react';
import { sounds } from '../../utils/sound';

interface FormTemplate {
  id: string;
  name: string;
  code: string;
}

const TEMPLATES: FormTemplate[] = [
  {
    id: 'iti-admission',
    name: '1. ITI Trainee Admission Form',
    code: `<form action="/api/submit_admission" method="POST">
  <h3>NCVT ITI Trainee Registration</h3>
  
  <label for="fullName">Trainee Full Name:</label>
  <input type="text" id="fullName" name="trainee_name" placeholder="Enter full name" required />

  <label for="email">Email Address:</label>
  <input type="email" id="email" name="trainee_email" placeholder="student@iti.edu" required />

  <label for="trade">Select Trade Course:</label>
  <select id="trade" name="enrolled_trade">
    <option value="COPA">Computer Operator & Programming Assistant (COPA)</option>
    <option value="Electrician">Electrician</option>
    <option value="Fitter">Fitter</option>
    <option value="Welder">Welder</option>
  </select>

  <label>Gender:</label>
  <div class="radio-group">
    <label><input type="radio" name="gender" value="male" checked /> Male</label>
    <label><input type="radio" name="gender" value="female" /> Female</label>
  </div>

  <div class="checkbox-group">
    <label><input type="checkbox" name="hostel_required" value="yes" /> Hostel Facility Required</label>
  </div>

  <button type="submit">Submit Application</button>
</form>`,
  },
  {
    id: 'cbt-login',
    name: '2. NCVT Online CBT Exam Login',
    code: `<form action="/api/exam_auth" method="POST">
  <h3>Online CBT Examination Login</h3>

  <label for="rollno">Roll Number / Registration No:</label>
  <input type="text" id="rollno" name="roll_number" placeholder="e.g. 230827104921" required />

  <label for="dob">Date of Birth (Password):</label>
  <input type="password" id="dob" name="student_dob" placeholder="DD-MM-YYYY" required />

  <label for="examCenter">Exam Center Code:</label>
  <input type="text" id="examCenter" name="center_code" value="CBT-PUNE-04" readonly />

  <button type="submit">Login to Examination</button>
</form>`,
  },
  {
    id: 'survey',
    name: '3. Lab Computer Feedback Survey',
    code: `<form action="/api/lab_feedback" method="GET">
  <h3>Computer Lab Infrastructure Feedback</h3>

  <label for="pcNo">Workstation PC Number:</label>
  <input type="number" id="pcNo" name="pc_number" min="1" max="50" value="14" />

  <label for="condition">Hardware & Keyboard Condition:</label>
  <select id="condition" name="hardware_condition">
    <option value="excellent">Excellent - Working Smoothly</option>
    <option value="good">Good - Minor Key Stuck</option>
    <option value="faulty">Faulty - Needs Maintenance</option>
  </select>

  <label for="comments">Student Remarks:</label>
  <textarea id="comments" name="student_remarks" rows="3" placeholder="Suggest improvements..."></textarea>

  <button type="submit">Send Feedback (GET)</button>
</form>`,
  }
];

export const HTMLFormsDemo: React.FC = () => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('iti-admission');
  const [htmlCode, setHtmlCode] = useState<string>(TEMPLATES[0].code);
  const [copied, setCopied] = useState<boolean>(false);
  const [submittedData, setSubmittedData] = useState<{ [key: string]: string } | null>(null);
  const [httpMethod, setHttpMethod] = useState<string>('POST');

  // Form interactive state
  const [nameVal, setNameVal] = useState<string>('Rahul Sharma');
  const [emailVal, setEmailVal] = useState<string>('rahul.copa@iti.ac.in');
  const [tradeVal, setTradeVal] = useState<string>('COPA');
  const [genderVal, setGenderVal] = useState<string>('male');
  const [hostelVal, setHostelVal] = useState<boolean>(true);
  const [rollVal, setRollVal] = useState<string>('2308419203');
  const [dobVal, setDobVal] = useState<string>('••••••••');
  const [remarksVal, setRemarksVal] = useState<string>('All systems operating at good speed.');
  const [pcVal, setPcVal] = useState<string>('14');

  const handleTemplateChange = (templateId: string) => {
    sounds.playClick();
    setSelectedTemplateId(templateId);
    const tmpl = TEMPLATES.find((t) => t.id === templateId);
    if (tmpl) {
      setHtmlCode(tmpl.code);
      setSubmittedData(null);
      if (templateId === 'survey') {
        setHttpMethod('GET');
      } else {
        setHttpMethod('POST');
      }
    }
  };

  const handleInsertTag = (tagSnippet: string) => {
    sounds.playClick();
    setHtmlCode((prev) => prev.replace('</form>', `  ${tagSnippet}\n</form>`));
  };

  const handleCopyCode = () => {
    sounds.playClick();
    navigator.clipboard.writeText(htmlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playSuccess();

    if (selectedTemplateId === 'iti-admission') {
      setSubmittedData({
        trainee_name: nameVal,
        trainee_email: emailVal,
        enrolled_trade: tradeVal,
        gender: genderVal,
        hostel_required: hostelVal ? 'yes' : 'no',
      });
      setHttpMethod('POST');
    } else if (selectedTemplateId === 'cbt-login') {
      setSubmittedData({
        roll_number: rollVal,
        student_dob: '[ENCRYPTED_AUTH_TOKEN]',
        center_code: 'CBT-PUNE-04',
      });
      setHttpMethod('POST');
    } else {
      setSubmittedData({
        pc_number: pcVal,
        hardware_condition: 'excellent',
        student_remarks: remarksVal,
      });
      setHttpMethod('GET');
    }
  };

  return (
    <div id="html-forms-interactive-demo" className="bg-white rounded-2xl border border-slate-200 p-5 md:p-7 shadow-xs">
      {/* Demo Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold mb-2">
            <Code2 className="w-3.5 h-3.5" /> Split-Screen Web Development Studio
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            HTML Code on the Left ⟷ Live Interactive Form Preview on the Right
          </h3>
          <p className="text-sm text-slate-500 mt-0.5">
            Students see how every HTML input element, label, and name attribute directly controls form rendering and server data payload.
          </p>
        </div>

        {/* Template Quick Switcher */}
        <div className="flex items-center gap-2">
          {TEMPLATES.map((tmpl) => (
            <button
              key={tmpl.id}
              onClick={() => handleTemplateChange(tmpl.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                selectedTemplateId === tmpl.id
                  ? 'bg-amber-50 border-amber-400 text-amber-900 font-bold shadow-2xs'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
              }`}
            >
              {tmpl.name}
            </button>
          ))}
        </div>
      </div>

      {/* Code Injection Helper Toolbar */}
      <div className="mt-4 p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
          <Plus className="w-3.5 h-3.5 text-amber-600" /> Insert HTML5 Input Snippets:
        </span>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => handleInsertTag('<label for="dob">DOB:</label>\n  <input type="date" id="dob" name="birth_date" />')}
            className="px-2 py-1 text-[11px] font-mono bg-white hover:bg-amber-50 hover:text-amber-800 text-slate-700 rounded border border-slate-200"
          >
            + &lt;input type="date"&gt;
          </button>
          <button
            onClick={() => handleInsertTag('<label for="docs">Upload Photo:</label>\n  <input type="file" id="docs" name="trainee_photo" />')}
            className="px-2 py-1 text-[11px] font-mono bg-white hover:bg-amber-50 hover:text-amber-800 text-slate-700 rounded border border-slate-200"
          >
            + &lt;input type="file"&gt;
          </button>
          <button
            onClick={() => handleInsertTag('<label for="phone">Mobile:</label>\n  <input type="tel" id="phone" name="phone_no" pattern="[0-9]{10}" placeholder="10 Digits" />')}
            className="px-2 py-1 text-[11px] font-mono bg-white hover:bg-amber-50 hover:text-amber-800 text-slate-700 rounded border border-slate-200"
          >
            + &lt;input type="tel"&gt;
          </button>
        </div>
      </div>

      {/* Main Split-Screen Layout */}
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* LEFT COLUMN: HTML Code Editor */}
        <div className="flex flex-col bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-sm">
          <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
              </div>
              <span className="text-xs font-mono text-slate-400 ml-2">form_template.html</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1 px-2.5 py-1 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md transition-colors"
                title="Copy HTML to clipboard"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                onClick={() => {
                  sounds.playClick();
                  const tmpl = TEMPLATES.find((t) => t.id === selectedTemplateId);
                  if (tmpl) setHtmlCode(tmpl.code);
                }}
                className="p-1 text-slate-400 hover:text-slate-200"
                title="Reset code"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="p-4 flex-1">
            <textarea
              value={htmlCode}
              onChange={(e) => setHtmlCode(e.target.value)}
              className="w-full h-96 bg-transparent text-amber-300 font-mono text-xs leading-relaxed resize-none focus:outline-none focus:ring-0 border-0 p-0"
              spellCheck="false"
            />
          </div>

          <div className="p-3 bg-slate-950/80 border-t border-slate-800 text-[11px] text-slate-400 font-mono flex items-center justify-between">
            <span className="text-amber-400">Notice: 'name' attribute transmits data to server.</span>
            <span>Lines: {htmlCode.split('\n').length}</span>
          </div>
        </div>

        {/* RIGHT COLUMN: Live Form Preview in Mock Browser */}
        <div className="flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="px-4 py-2.5 bg-slate-100 border-b border-slate-200 flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
            </div>

            <div className="flex-1 bg-white px-3 py-1 rounded-md text-[11px] font-mono text-slate-500 border border-slate-200 flex items-center justify-between truncate">
              <span>http://iti-training-lab.local/forms/register.html</span>
              <Eye className="w-3.5 h-3.5 text-slate-400" />
            </div>
          </div>

          {/* Rendered Interactive Form */}
          <div className="p-6 flex-1 overflow-y-auto max-h-[460px]">
            <form onSubmit={handleSubmitForm} className="space-y-4">
              
              {selectedTemplateId === 'iti-admission' && (
                <>
                  <div className="border-b pb-2">
                    <h3 className="text-base font-bold text-slate-900">NCVT ITI Trainee Registration</h3>
                    <p className="text-xs text-slate-500">Government Industrial Training Institute</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Trainee Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="trainee_name"
                      required
                      value={nameVal}
                      onChange={(e) => setNameVal(e.target.value)}
                      placeholder="Enter full name"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="trainee_email"
                      required
                      value={emailVal}
                      onChange={(e) => setEmailVal(e.target.value)}
                      placeholder="student@iti.edu"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Select Trade Course
                    </label>
                    <select
                      name="enrolled_trade"
                      value={tradeVal}
                      onChange={(e) => setTradeVal(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                    >
                      <option value="COPA">Computer Operator & Programming Assistant (COPA)</option>
                      <option value="Electrician">Electrician</option>
                      <option value="Fitter">Fitter</option>
                      <option value="Welder">Welder</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Gender:</label>
                    <div className="flex items-center gap-4 text-xs text-slate-700">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="gender"
                          value="male"
                          checked={genderVal === 'male'}
                          onChange={() => setGenderVal('male')}
                          className="accent-amber-600"
                        />
                        Male
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="gender"
                          value="female"
                          checked={genderVal === 'female'}
                          onChange={() => setGenderVal('female')}
                          className="accent-amber-600"
                        />
                        Female
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        name="hostel_required"
                        checked={hostelVal}
                        onChange={(e) => setHostelVal(e.target.checked)}
                        className="accent-amber-600 rounded"
                      />
                      <span>Hostel Facility Required (Outstation Trainee)</span>
                    </label>
                  </div>
                </>
              )}

              {selectedTemplateId === 'cbt-login' && (
                <>
                  <div className="border-b pb-2">
                    <h3 className="text-base font-bold text-slate-900">Online CBT Examination Login</h3>
                    <p className="text-xs text-slate-500">Ministry of Skill Development & Entrepreneurship</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Roll Number / Registration No <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="roll_number"
                      required
                      value={rollVal}
                      onChange={(e) => setRollVal(e.target.value)}
                      placeholder="e.g. 230827104921"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Date of Birth (Password) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="password"
                      name="student_dob"
                      required
                      value={dobVal}
                      onChange={(e) => setDobVal(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Exam Center Code:</label>
                    <input
                      type="text"
                      name="center_code"
                      value="CBT-PUNE-04"
                      readOnly
                      className="w-full px-3 py-2 text-xs border border-slate-200 bg-slate-50 text-slate-500 rounded-lg cursor-not-allowed"
                    />
                  </div>
                </>
              )}

              {selectedTemplateId === 'survey' && (
                <>
                  <div className="border-b pb-2">
                    <h3 className="text-base font-bold text-slate-900">Computer Lab Infrastructure Feedback</h3>
                    <p className="text-xs text-slate-500">Continuous Assessment & Maintenance Portal</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Workstation PC Number:</label>
                    <input
                      type="number"
                      name="pc_number"
                      value={pcVal}
                      onChange={(e) => setPcVal(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Hardware & Keyboard Condition:</label>
                    <select
                      name="hardware_condition"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                    >
                      <option value="excellent">Excellent - Working Smoothly</option>
                      <option value="good">Good - Minor Key Stuck</option>
                      <option value="faulty">Faulty - Needs Maintenance</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Student Remarks:</label>
                    <textarea
                      name="student_remarks"
                      rows={3}
                      value={remarksVal}
                      onChange={(e) => setRemarksVal(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    ></textarea>
                  </div>
                </>
              )}

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" /> Submit HTML Form (Send Data)
              </button>
            </form>
          </div>
        </div>

      </div>

      {/* Live Form Submission Payload Inspector */}
      {submittedData && (
        <div className="mt-6 p-5 bg-amber-50/60 rounded-2xl border border-amber-200 animate-in fade-in duration-300">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Server className="w-5 h-5 text-amber-700" />
              <h4 className="text-sm font-bold text-amber-950">
                Server-Side HTTP Request Inspector: What the Server Received!
              </h4>
            </div>
            <span className="px-2.5 py-0.5 rounded font-mono text-xs font-bold bg-amber-200/80 text-amber-900 border border-amber-300">
              METHOD: {httpMethod}
            </span>
          </div>

          <p className="text-xs text-slate-600 mb-3">
            Notice how each key matches the exact <code className="bg-amber-100 text-amber-900 px-1 py-0.5 rounded font-mono">name="..."</code> attribute written in the HTML code:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
            {Object.entries(submittedData).map(([key, value]) => (
              <div key={key} className="p-2.5 bg-white rounded-lg border border-amber-200">
                <span className="text-[10px] uppercase font-mono text-amber-800 font-bold block">
                  name="{key}"
                </span>
                <span className="text-xs font-semibold text-slate-900 truncate block mt-0.5">
                  {value}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-3 p-2.5 bg-white/80 rounded-lg border border-amber-200 text-xs text-slate-700 font-mono">
            <strong>Raw URL-Encoded String: </strong>
            <span className="text-amber-800">
              {Object.entries(submittedData)
                .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
                .join('&')}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
