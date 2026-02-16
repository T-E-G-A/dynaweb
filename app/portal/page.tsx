"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Menu, X, Search, Calendar, GraduationCap, IdCard, Loader2, Printer, ArrowLeft } from "lucide-react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

// --- Types ---
type SchoolType = 'EarlyYear' | 'Basic' | 'College';

interface ResultData {
  Name: string;
  AdmissionNo: string;
  Class: string;
  Gender: string;
  DateOfBirth: string;
  Session: string;
  Term: string;
  NoInClass: string;
  SchoolDays: string;
  DaysAttended: string;
  DaysAbsent: string;
  StudentPicture?: string;
  StudentAverage: number;
  ClassAverage: string;
  HighestAverage: string;
  SubjectsOffered: number;
  MarksObtained: number;
  MarksObtainable: number;
  FormTeacherName: string;
  TeacherComment: string;
  ResumptionDate: string;
  SchoolType: SchoolType;
  [key: string]: any;
}

// --- Configuration ---
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyvoOmmgUb7Ucf-xyMKraavFqZrLg4c4WcROfe6mzltumoqCp4YIbNroxx2pwMZ6FBuNw/exec";

export default function ResultPortal() {
  const [view, setView] = useState<'search' | 'result'>('search');
  const [schoolType, setSchoolType] = useState<SchoolType>('EarlyYear');
  const [admissionNo, setAdmissionNo] = useState('');
  const [dob, setDob] = useState('');
  const [session, setSession] = useState('');
  const [term, setTerm] = useState('First Term');
  const [sessionsList, setSessionsList] = useState<string[]>([]);
  const [result, setResult] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  // Fetch sessions on load
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch(`${SCRIPT_URL}?action=getSessions`);
        const data = await response.json();
        setSessionsList(data);
        if (data.length > 0) setSession(data[0]);
      } catch (error) {
        console.error("Failed to fetch sessions", error);
        setSessionsList(["2025/2026"]);
        setSession("2025/2026");
      }
    };
    fetchSessions();
  }, []);

  const handleSearch = async () => {
    if (!admissionNo || !dob || !session || !term) {
      alert("Please fill all fields");
      return;
    }
    setLoading(true);
    try {
      const url = `${SCRIPT_URL}?action=search&admissionNo=${encodeURIComponent(admissionNo)}&dateOfBirth=${encodeURIComponent(dob)}&schoolType=${schoolType}&session=${encodeURIComponent(session)}&term=${encodeURIComponent(term)}`;
      const response = await fetch(url);
      const res = await response.json();
      setLoading(false);
      if (res.success) {
        setResult(res.data);
        setView('result');
        window.scrollTo(0, 0);
      } else {
        alert(res.message);
      }
    } catch (error) {
      setLoading(false);
      alert("Search failed. Please check your connection.");
    }
  };

  const getSubjects = (type: SchoolType) => {
    if (type === 'College') {
      return [
        { key: 'EnglishStudies', label: 'English Studies' },
        { key: 'Mathematics', label: 'Mathematics' },
        { key: 'Science', label: 'Science' },
        { key: 'SocialCitizenship', label: 'Social and citizenship' },
        { key: 'CulturalCreativeArt', label: 'Cultural and Creative Art' },
        { key: 'DigitalTechnology', label: 'Digital Technology' },
        { key: 'PhysicalHealthEducation', label: 'Physical Health Education' },
        { key: 'Religion', label: 'Religion (I.S/C.R.S)' },
        { key: 'AgriculturalScience', label: 'Agricultural Science' },
        { key: 'Literature', label: 'Literature' },
        { key: 'BusinessStudies', label: 'Business Studies' },
        { key: 'BasicTechnology', label: 'Basic Technology' },
        { key: 'NigerianHistory', label: 'Nigerian History' }
      ];
    } else if (type === 'EarlyYear') {
      return [
        { key: 'Literacy', label: 'Literacy' },
        { key: 'Numeracy', label: 'Numeracy' },
        { key: 'Science', label: 'Science' },
        { key: 'Cultural', label: 'Cultural' },
        { key: 'CulturalCreativeArt', label: 'Cultural and Creative Art' },
        { key: 'PracticalLifeActivities', label: 'Practical Life Activities' },
        { key: 'Sensorial', label: 'Sensorial' },
        { key: 'Religion', label: 'Religion (I.S/C.R.S)' }
      ];
    } else {
      return [
        { key: 'EnglishStudies', label: 'English Studies' },
        { key: 'Mathematics', label: 'Mathematics' },
        { key: 'Science', label: 'Science' },
        { key: 'SocialCitizenship', label: 'Social and citizenship' },
        { key: 'CulturalCreativeArt', label: 'Cultural and Creative Art' },
        { key: 'BasicDigitalLiteracy', label: 'Basic Digital Literacy' },
        { key: 'PhysicalHealthEducation', label: 'Physical Health Education' },
        { key: 'Religion', label: 'Religion (I.S/C.R.S)' },
        { key: 'Prevocational', label: 'Prevocational' },
        { key: 'QuantitativeReasoning', label: 'Quantitative Reasoning' },
        { key: 'VerbalReasoning', label: 'Verbal Reasoning' },
        { key: 'Phonics', label: 'Phonics' },
        { key: 'NigerianHistory', label: 'Nigerian History' }
      ];
    }
  };

  const affectiveItems = [
    { key: 'Attendance', label: 'ATTENDANCE' },
    { key: 'Politeness', label: 'POLITENESS' },
    { key: 'Participation', label: 'PARTICIPATION' },
    { key: 'Cooperation', label: 'COOPERATION' },
    { key: 'Handwriting', label: 'HANDWRITING' },
    { key: 'Friendliness', label: 'FRIENDLINESS' },
    { key: 'Honesty', label: 'HONESTY' },
    { key: 'Sport', label: 'SPORT' },
    { key: 'Neatness', label: 'NEATNESS' }
  ];

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
                  <style jsx global>{`
        /* Global Reset for Printing */
        @media print {
          /* Hide everything except the print container */
          body * { visibility: hidden !important; }
          .print-container, .print-container * { visibility: visible !important; }
          .print-container { 
            position: absolute !important; 
            left: 0 !important; 
            top: 0 !important; 
            width: 210mm !important; 
            height: 297mm !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          
          /* Force exact colors and backgrounds */
          * { 
            -webkit-print-color-adjust: exact !important; 
            print-color-adjust: exact !important; 
            color-adjust: exact !important;
          }
          
          @page {
            size: A4 portrait;
            margin: 0;
          }

          /* Reset potential global CSS conflicts */
          nav, footer, .no-print, button, [role="dialog"], .dialog-overlay { 
            display: none !important; 
            visibility: hidden !important;
          }
          
          body { 
            background: white !important; 
            margin: 0 !important; 
            padding: 0 !important; 
          }

          /* Ensure the card takes full page and uses its own layout */
          .result-card-print {
            width: 210mm !important;
            height: 297mm !important;
            padding: 10mm 15mm !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
            background: white !important;
            border: none !important;
            box-shadow: none !important;
            position: relative !important;
            overflow: hidden !important;
          }

          .termly-report-banner-print {
            background-color: #5dade2 !important;
            color: #000 !important;
            -webkit-print-color-adjust: exact !important;
          }

          table { page-break-inside: avoid !important; }
          
          /* Reset global font overrides from globals.css for the report */
          .report-text {
            font-family: Arial, sans-serif !important;
          }
          .report-title {
            font-family: 'ITC Eras', 'Arial Rounded MT Bold', sans-serif !important;
          }
        }
      `}</style>

      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm fixed top-0 left-0 right-0 w-full z-50 transition-opacity duration-1000">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.location.href = '/'}>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-d4iXS1NKPMEhu5xs4Y6kxw0QgWREo0.png"
                alt="Dynagrowth Schools Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="text-xl text-[#1F3A93] font-eras-bold">Dynagrowth</span>
            </div>

            <div className="hidden lg:flex items-center space-x-8">
              <a href="/" className="text-[#1F3A93] hover:underline hover:decoration-[#3BB44A] transition-all duration-300 font-eras">Home</a>
              <a href="/portal" className="text-[#1F3A93] hover:underline hover:decoration-[#3BB44A] transition-all duration-300 font-eras">Portal</a>
              <Button className="bg-[#3BB44A] hover:bg-[#2F8E3A] text-white rounded-full px-6 py-2 transition-colors duration-300 font-nirmala uppercase font-semibold" onClick={() => window.open('https://app.youform.com/forms/pe7sbw5b', '_blank')}>
                Get in touch
              </Button>
            </div>

            <div className="lg:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-[#1F3A93] hover:text-[#3BB44A] transition-colors duration-300">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="lg:hidden bg-white border-t border-gray-200 py-4">
              <div className="flex flex-col space-y-4">
                <a href="/" className="text-[#1F3A93] hover:text-[#3BB44A] transition-all duration-300 px-4 font-eras">Home</a>
                <a href="/portal" className="text-[#1F3A93] hover:text-[#3BB44A] transition-all duration-300 px-4 font-eras">Portal</a>
                <Button className="bg-[#3BB44A] mx-4" onClick={() => window.open('https://app.youform.com/forms/pe7sbw5b', '_blank')}>Get in touch</Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-12 px-4 bg-[#f8faff] min-h-[calc(100vh-80px)]">
        {view === 'search' ? (
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-white rounded-full border-4 border-[#1F3A93] flex items-center justify-center mx-auto mb-4 overflow-hidden shadow-lg">
                <Image src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-d4iXS1NKPMEhu5xs4Y6kxw0QgWREo0.png" alt="Logo" width={80} height={80} objectFit="contain" />
              </div>
              <h1 className="text-3xl font-eras-bold text-[#1F3A93]">Student Result Portal</h1>
              <p className="text-[#3BB44A] font-nirmala-italic italic">We learn and grow together in love</p>
            </div>

            <Card className="border-none shadow-xl">
              <CardContent className="p-8">
                <div className="flex gap-2 mb-6">
                  {(['EarlyYear', 'Basic', 'College'] as SchoolType[]).map(type => (
                    <button
                      key={type}
                      onClick={() => setSchoolType(type)}
                      className={`flex-1 py-3 px-2 rounded-lg text-sm font-semibold transition-all ${schoolType === type ? 'bg-[#1F3A93] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                      {type === 'EarlyYear' ? 'Early Year' : type === 'Basic' ? 'Basic' : 'College'}
                    </button>
                  ))}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-[#1F3A93] mb-1">Admission Number</label>
                    <div className="relative">
                      <IdCard className="absolute left-3 top-3 text-gray-400" size={20} />
                      <input 
                        type="text" 
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1F3A93] outline-none"
                        placeholder="e.g., 2025001"
                        value={admissionNo}
                        onChange={e => setAdmissionNo(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-[#1F3A93] mb-1">Date of Birth</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
                      <input 
                        type="date" 
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1F3A93] outline-none"
                        value={dob}
                        onChange={e => setDob(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-[#1F3A93] mb-1">Session</label>
                      <select 
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1F3A93] outline-none bg-white"
                        value={session}
                        onChange={e => setSession(e.target.value)}
                      >
                        {sessionsList.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#1F3A93] mb-1">Term</label>
                      <select 
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1F3A93] outline-none bg-white"
                        value={term}
                        onChange={e => setTerm(e.target.value)}
                      >
                        <option value="First Term">First Term</option>
                        <option value="Second Term">Second Term</option>
                        <option value="Third Term">Third Term</option>
                      </select>
                    </div>
                  </div>

                  <Button 
                    className="w-full py-6 bg-[#1F3A93] hover:bg-[#152a6b] text-white text-lg font-bold rounded-lg mt-4 shadow-lg transition-transform active:scale-95"
                    onClick={handleSearch}
                    disabled={loading}
                  >
                    {loading ? <Loader2 className="animate-spin mr-2" /> : <Search className="mr-2" />}
                    Search Result
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : result && (
                    <div className="print-container max-w-4xl mx-auto">
            <div className="no-print flex justify-between mb-6">
              <Button variant="outline" onClick={() => setView('search')} className="border-[#1F3A93] text-[#1F3A93] hover:bg-[#1F3A93] hover:text-white transition-all">
                <ArrowLeft size={18} className="mr-2" /> New Search
              </Button>
              <Button onClick={() => window.print()} className="bg-[#1F3A93] text-white hover:bg-[#152a6b] shadow-lg">
                <Printer size={18} className="mr-2" /> Print & Download Report
              </Button>
            </div>

            <Card className="result-card-print border-none shadow-2xl p-0 overflow-hidden bg-white text-black report-text" style={{ color: 'black' }}>
              <div className="h-full flex flex-col w-full">
                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="w-[80px]">
                    <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-d4iXS1NKPMEhu5xs4Y6kxw0QgWREo0.png" alt="Logo" width={80} height={80} style={{ display: 'block' }} />
                  </div>
                  <div className="text-center flex-1">
                    <h2 className="text-3xl font-black text-[#0074D9] uppercase tracking-tighter report-title" style={{ fontFamily: "'ITC Eras', sans-serif", fontWeight: 900 }}>DYNAGROWTH SCHOOLS</h2>
                    <p className="text-[14px] font-bold italic text-[#fbbc04]">We learn and grow together in love</p>
                  </div>
                  <div className="w-24 h-28 border-2 border-black flex items-center justify-center bg-gray-50 text-[10px] font-bold overflow-hidden">
                    {result.StudentPicture ? <img src={result.StudentPicture} className="w-full h-full object-cover" /> : "PASSPORT"}
                  </div>
                </div>

                <div className="border-t-2 border-black mb-2"></div>

                {/* Student Info */}
                <div className="flex mb-2">
                  <div className="w-[70%] grid grid-cols-2 gap-x-4 gap-y-0.5 text-[11px]">
                    <div className="flex"><span className="font-bold w-24">NAME:</span><span className="border-b border-gray-300 flex-1 font-semibold">{result.Name}</span></div>
                    <div className="flex"><span className="font-bold w-24">ADMISSION NO:</span><span className="border-b border-gray-300 flex-1 font-semibold">{result.AdmissionNo}</span></div>
                    <div className="flex"><span className="font-bold w-24">CLASS:</span><span className="border-b border-gray-300 flex-1 font-semibold">{result.Class}</span></div>
                    <div className="flex"><span className="font-bold w-24">GENDER:</span><span className="border-b border-gray-300 flex-1 font-semibold">{result.Gender}</span></div>
                    <div className="flex"><span className="font-bold w-24">D.O.B:</span><span className="border-b border-gray-300 flex-1 font-semibold">{result.DateOfBirth}</span></div>
                    <div className="flex"><span className="font-bold w-24">SESSION:</span><span className="border-b border-gray-300 flex-1 font-semibold">{result.Session}</span></div>
                    <div className="flex"><span className="font-bold w-24">TERM:</span><span className="border-b border-gray-300 flex-1 font-semibold">{result.Term}</span></div>
                    <div className="flex"><span className="font-bold w-24">NO. IN CLASS:</span><span className="border-b border-gray-300 flex-1 font-semibold">{result.NoInClass}</span></div>
                  </div>
                  <div className="w-[30%] border border-black ml-4">
                    <table className="w-full text-[10px] border-collapse" style={{ borderCollapse: 'collapse' }}>
                      <thead><tr><th colSpan={2} className="bg-gray-100 border-b border-black p-0.5" style={{ backgroundColor: '#f3f4f6' }}>ATTENDANCE RECORD</th></tr></thead>
                      <tbody>
                        <tr><td className="p-0.5 border-b border-black pl-1">SCHOOL DAYS:</td><td className="p-0.5 border-b border-black text-right pr-1 font-bold">{result.SchoolDays}</td></tr>
                        <tr><td className="p-0.5 border-b border-black pl-1">DAYS ATTENDED:</td><td className="p-0.5 border-b border-black text-right pr-1 font-bold">{result.DaysAttended}</td></tr>
                        <tr><td className="p-0.5 pl-1">DAYS ABSENT:</td><td className="p-0.5 text-right pr-1 font-bold">{result.DaysAbsent}</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Banner */}
                <div className="termly-report-banner-print bg-[#5dade2] text-black py-1.5 text-center font-black rounded-full text-[16px] mb-2 uppercase shadow-sm" style={{ backgroundColor: '#5dade2', borderRadius: '9999px' }}>
                  TERMLY REPORT FOR {result.Term?.toUpperCase()} {result.Session?.toUpperCase()} ACADEMIC SESSION
                </div>

                {/* Main Table */}
                <div className="flex-grow overflow-hidden">
                  <table className="w-full border-collapse border-2 border-black text-[10.5px]" style={{ borderCollapse: 'collapse', border: '2px solid black' }}>
                    <thead>
                      <tr className="bg-gray-50" style={{ backgroundColor: '#f9fafb' }}>
                        <th className="border border-black p-1 text-left w-1/3">SUBJECTS</th>
                        <th className="border border-black p-0.5 text-center">C.A<br/>(20)</th>
                        <th className="border border-black p-0.5 text-center">PRJ<br/>(10)</th>
                        <th className="border border-black p-0.5 text-center">ACT<br/>(10)</th>
                        <th className="border border-black p-0.5 text-center">EXM<br/>(60)</th>
                        <th className="border border-black p-0.5 text-center">TOT<br/>(100)</th>
                        <th className="border border-black p-0.5 text-center">GRD</th>
                        <th className="border border-black p-0.5 text-center">REMARKS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getSubjects(result.SchoolType).map(sub => (
                        <tr key={sub.key}>
                          <td className="border border-black p-0.5 pl-2 font-bold">{sub.label}</td>
                          <td className="border border-black p-0.5 text-center">{result[sub.key + '_CA'] || '-'}</td>
                          <td className="border border-black p-0.5 text-center">{result[sub.key + '_Projects'] || '-'}</td>
                          <td className="border border-black p-0.5 text-center">{result[sub.key + '_ClassActivities'] || '-'}</td>
                          <td className="border border-black p-0.5 text-center">{result[sub.key + '_Exams'] || '-'}</td>
                          <td className="border border-black p-0.5 text-center font-bold">{result[sub.key + '_Total'] || '-'}</td>
                          <td className="border border-black p-0.5 text-center font-black">{result[sub.key + '_Grade'] || '-'}</td>
                          <td className="border border-black p-0.5 text-center text-[8.5px] leading-tight">{result[sub.key + '_Remarks'] || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Analysis */}
                <div className="border-x-2 border-b-2 border-black p-1 flex justify-between text-[11px]" style={{ borderLeft: '2px solid black', borderRight: '2px solid black', borderBottom: '2px solid black' }}>
                  <div className="font-bold">ANALYSIS</div>
                  <div className="flex gap-4">
                    <div><span className="text-[#17a2b8] font-bold mr-1" style={{ color: '#17a2b8' }}>Subjects Offered:</span><span className="font-bold">{result.SubjectsOffered}</span></div>
                    <div><span className="text-[#17a2b8] font-bold mr-1" style={{ color: '#17a2b8' }}>Marks Obtainable:</span><span className="font-bold">{result.MarksObtainable}</span></div>
                    <div><span className="text-[#17a2b8] font-bold mr-1" style={{ color: '#17a2b8' }}>Marks Obtained:</span><span className="font-bold">{result.MarksObtained}</span></div>
                  </div>
                </div>
                <div className="border-x-2 border-b-2 border-black p-1 flex justify-end gap-6 text-[11px]" style={{ borderLeft: '2px solid black', borderRight: '2px solid black', borderBottom: '2px solid black' }}>
                  <div><span className="text-[#17a2b8] font-bold mr-1" style={{ color: '#17a2b8' }}>Student's Average:</span><span className="font-bold">{result.StudentAverage}%</span></div>
                  <div><span className="text-[#17a2b8] font-bold mr-1" style={{ color: '#17a2b8' }}>Class Average:</span><span className="font-bold">{result.ClassAverage}%</span></div>
                  <div><span className="text-[#17a2b8] font-bold mr-1" style={{ color: '#17a2b8' }}>Highest Average in Class:</span><span className="font-bold">{result.HighestAverage}%</span></div>
                </div>

                {/* Bottom Section */}
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="border border-black">
                    <div className="bg-gray-100 p-0.5 text-center font-bold text-[10px] border-b border-black" style={{ backgroundColor: '#f3f4f6' }}>GRADE CATEGORIES</div>
                    <table className="w-full text-[9px] border-collapse" style={{ borderCollapse: 'collapse' }}>
                      <tbody>
                        {[{r:'90-100', g:'A+', rem:'DISTINCTION'}, {r:'80-89', g:'A', rem:'EXCELLENT'}, {r:'70-79', g:'B+', rem:'VERY GOOD'}, {r:'60-69', g:'B', rem:'GOOD'}, {r:'50-59', g:'C', rem:'MERIT'}, {r:'40-49', g:'D', rem:'FAIR'}, {r:'0-39', g:'F', rem:'FAIL'}].map((row, i) => (
                          <tr key={i}><td className="border-b border-r border-black p-0.5 text-center">{row.r}</td><td className="border-b border-r border-black p-0.5 text-center font-bold">{row.g}</td><td className="border-b border-black p-0.5 text-center">{row.rem}</td></tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="border border-black">
                    <div className="bg-gray-100 p-0.5 text-center font-bold text-[10px] border-b border-black" style={{ backgroundColor: '#f3f4f6' }}>AFFECTIVE DOMAIN</div>
                    <div className="p-1">
                      <div className="grid grid-cols-2 gap-x-4">
                        {affectiveItems.map(item => (
                          <div key={item.key} className="flex justify-between text-[10px] border-b border-gray-100 py-0.5">
                            <span>{item.label}</span>
                            <span className="font-bold">{result[item.key + '_Rating'] || '-'}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Info */}
                <div className="border border-black p-1.5 mt-2 grid grid-cols-3 gap-4 text-[10.5px]">
                  <div><span className="font-bold block">FORM TEACHER'S NAME:</span><div className="border-b border-black min-h-[16px] font-semibold">{result.FormTeacherName}</div></div>
                  <div><span className="font-bold block">COMMENT:</span><div className="border-b border-black min-h-[16px] font-semibold">{result.TeacherComment}</div></div>
                  <div>
                    <span className="font-bold block">REGISTRAR SIGNATURE:</span>
                    <div className="flex items-center gap-2">
                      <img src="https://i.ibb.co/vrgztW2/signature.png" className="h-7 object-contain" alt="Signature" style={{ display: 'block' }} />
                      <div className="flex-1 text-right">Date: <span className="border-b border-black font-semibold">{new Date().toLocaleDateString('en-GB')}</span></div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-100 border border-black border-t-0 p-1.5 text-center font-black text-[13px]" style={{ backgroundColor: '#f3f4f6' }}>
                  RESUMPTION DATE: {result.ResumptionDate}
                </div>
              </div>
            </Card>
          </div>
        )} className="border-[#1F3A93] text-[#1F3A93] hover:bg-[#1F3A93] hover:text-white transition-all">
                <ArrowLeft size={18} className="mr-2" /> New Search
              </Button>
              <Button onClick={() => window.print()} className="bg-[#1F3A93] text-white hover:bg-[#152a6b] shadow-lg">
                <Printer size={18} className="mr-2" /> Print Report
              </Button>
            </div>

                        <Card className="result-card border-none shadow-2xl p-0 overflow-hidden bg-white text-black">
              <div className="h-full flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                  <Image src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-d4iXS1NKPMEhu5xs4Y6kxw0QgWREo0.png" alt="Logo" width={75} height={75} />
                  <div className="text-center flex-1">
                    <h2 className="text-3xl font-black text-[#0074D9] uppercase tracking-tighter">DYNAGROWTH SCHOOLS</h2>
                    <p className="text-[13px] font-bold italic text-[#fbbc04]">We learn and grow together in love</p>
                  </div>
                  <div className="w-24 h-28 border-2 border-black flex items-center justify-center bg-gray-50 text-[10px] font-bold overflow-hidden">
                    {result.StudentPicture ? <img src={result.StudentPicture} className="w-full h-full object-cover" /> : "PASSPORT"}
                  </div>
                </div>

                <div className="border-t-2 border-black mb-2"></div>

                {/* Student Info */}
                <div className="flex mb-2">
                  <div className="w-[70%] grid grid-cols-2 gap-x-4 gap-y-0.5 text-[10.5px]">
                    <div className="flex"><span className="font-bold w-24">NAME:</span><span className="border-b border-gray-300 flex-1 font-semibold">{result.Name}</span></div>
                    <div className="flex"><span className="font-bold w-24">ADMISSION NO:</span><span className="border-b border-gray-300 flex-1 font-semibold">{result.AdmissionNo}</span></div>
                    <div className="flex"><span className="font-bold w-24">CLASS:</span><span className="border-b border-gray-300 flex-1 font-semibold">{result.Class}</span></div>
                    <div className="flex"><span className="font-bold w-24">GENDER:</span><span className="border-b border-gray-300 flex-1 font-semibold">{result.Gender}</span></div>
                    <div className="flex"><span className="font-bold w-24">D.O.B:</span><span className="border-b border-gray-300 flex-1 font-semibold">{result.DateOfBirth}</span></div>
                    <div className="flex"><span className="font-bold w-24">SESSION:</span><span className="border-b border-gray-300 flex-1 font-semibold">{result.Session}</span></div>
                    <div className="flex"><span className="font-bold w-24">TERM:</span><span className="border-b border-gray-300 flex-1 font-semibold">{result.Term}</span></div>
                    <div className="flex"><span className="font-bold w-24">NO. IN CLASS:</span><span className="border-b border-gray-300 flex-1 font-semibold">{result.NoInClass}</span></div>
                  </div>
                  <div className="w-[30%] border border-black ml-4">
                    <table className="w-full text-[10px] border-collapse">
                      <thead><tr><th colSpan={2} className="bg-gray-100 border-b border-black p-0.5">ATTENDANCE RECORD</th></tr></thead>
                      <tbody>
                        <tr><td className="p-0.5 border-b border-black pl-1">SCHOOL DAYS:</td><td className="p-0.5 border-b border-black text-right pr-1 font-bold">{result.SchoolDays}</td></tr>
                        <tr><td className="p-0.5 border-b border-black pl-1">DAYS ATTENDED:</td><td className="p-0.5 border-b border-black text-right pr-1 font-bold">{result.DaysAttended}</td></tr>
                        <tr><td className="p-0.5 pl-1">DAYS ABSENT:</td><td className="p-0.5 text-right pr-1 font-bold">{result.DaysAbsent}</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Banner */}
                <div className="termly-report-banner bg-[#5dade2] text-black py-1.5 text-center font-black rounded-full text-md mb-2 uppercase shadow-sm">
                  TERMLY REPORT FOR {result.Term?.toUpperCase()} {result.Session?.toUpperCase()} ACADEMIC SESSION
                </div>

                {/* Main Table */}
                <div className="flex-grow">
                  <table className="w-full border-collapse border-2 border-black text-[10px]">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-black p-1 text-left w-1/3">SUBJECTS</th>
                        <th className="border border-black p-0.5 text-center">C.A<br/>(20)</th>
                        <th className="border border-black p-0.5 text-center">PRJ<br/>(10)</th>
                        <th className="border border-black p-0.5 text-center">ACT<br/>(10)</th>
                        <th className="border border-black p-0.5 text-center">EXM<br/>(60)</th>
                        <th className="border border-black p-0.5 text-center">TOT<br/>(100)</th>
                        <th className="border border-black p-0.5 text-center">GRD</th>
                        <th className="border border-black p-0.5 text-center">REMARKS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getSubjects(result.SchoolType).map(sub => (
                        <tr key={sub.key}>
                          <td className="border border-black p-0.5 pl-2 font-bold">{sub.label}</td>
                          <td className="border border-black p-0.5 text-center">{result[sub.key + '_CA'] || '-'}</td>
                          <td className="border border-black p-0.5 text-center">{result[sub.key + '_Projects'] || '-'}</td>
                          <td className="border border-black p-0.5 text-center">{result[sub.key + '_ClassActivities'] || '-'}</td>
                          <td className="border border-black p-0.5 text-center">{result[sub.key + '_Exams'] || '-'}</td>
                          <td className="border border-black p-0.5 text-center font-bold">{result[sub.key + '_Total'] || '-'}</td>
                          <td className="border border-black p-0.5 text-center font-black">{result[sub.key + '_Grade'] || '-'}</td>
                          <td className="border border-black p-0.5 text-center text-[8px] leading-tight">{result[sub.key + '_Remarks'] || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Analysis */}
                <div className="border-x-2 border-b-2 border-black p-1 flex justify-between text-[10.5px]">
                  <div className="font-bold">ANALYSIS</div>
                  <div className="flex gap-4">
                    <div><span className="text-[#17a2b8] font-bold mr-1">Subjects Offered:</span><span className="font-bold">{result.SubjectsOffered}</span></div>
                    <div><span className="text-[#17a2b8] font-bold mr-1">Marks Obtainable:</span><span className="font-bold">{result.MarksObtainable}</span></div>
                    <div><span className="text-[#17a2b8] font-bold mr-1">Marks Obtained:</span><span className="font-bold">{result.MarksObtained}</span></div>
                  </div>
                </div>
                <div className="border-x-2 border-b-2 border-black p-1 flex justify-end gap-6 text-[10.5px]">
                  <div><span className="text-[#17a2b8] font-bold mr-1">Student's Average:</span><span className="font-bold">{result.StudentAverage}%</span></div>
                  <div><span className="text-[#17a2b8] font-bold mr-1">Class Average:</span><span className="font-bold">{result.ClassAverage}%</span></div>
                  <div><span className="text-[#17a2b8] font-bold mr-1">Highest Average in Class:</span><span className="font-bold">{result.HighestAverage}%</span></div>
                </div>

                {/* Bottom Section */}
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="border border-black">
                    <div className="bg-gray-100 p-0.5 text-center font-bold text-[10px] border-b border-black">GRADE CATEGORIES</div>
                    <table className="w-full text-[9px] border-collapse">
                      <tbody>
                        {[{r:'90-100', g:'A+', rem:'DISTINCTION'}, {r:'80-89', g:'A', rem:'EXCELLENT'}, {r:'70-79', g:'B+', rem:'VERY GOOD'}, {r:'60-69', g:'B', rem:'GOOD'}, {r:'50-59', g:'C', rem:'MERIT'}, {r:'40-49', g:'D', rem:'FAIR'}, {r:'0-39', g:'F', rem:'FAIL'}].map((row, i) => (
                          <tr key={i}><td className="border-b border-r border-black p-0.5 text-center">{row.r}</td><td className="border-b border-r border-black p-0.5 text-center font-bold">{row.g}</td><td className="border-b border-black p-0.5 text-center">{row.rem}</td></tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="border border-black">
                    <div className="bg-gray-100 p-0.5 text-center font-bold text-[10px] border-b border-black">AFFECTIVE DOMAIN</div>
                    <div className="p-1">
                      <div className="grid grid-cols-2 gap-x-4">
                        {affectiveItems.map(item => (
                          <div key={item.key} className="flex justify-between text-[9.5px] border-b border-gray-100 py-0.5">
                            <span>{item.label}</span>
                            <span className="font-bold">{result[item.key + '_Rating'] || '-'}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Info */}
                <div className="border border-black p-1.5 mt-2 grid grid-cols-3 gap-4 text-[10px]">
                  <div><span className="font-bold block">FORM TEACHER'S NAME:</span><div className="border-b border-black min-h-[16px] font-semibold">{result.FormTeacherName}</div></div>
                  <div><span className="font-bold block">COMMENT:</span><div className="border-b border-black min-h-[16px] font-semibold">{result.TeacherComment}</div></div>
                  <div>
                    <span className="font-bold block">REGISTRAR SIGNATURE:</span>
                    <div className="flex items-center gap-2">
                      <img src="https://i.ibb.co/vrgztW2/signature.png" className="h-7 object-contain" alt="Signature" />
                      <div className="flex-1 text-right">Date: <span className="border-b border-black font-semibold">{new Date().toLocaleDateString('en-GB')}</span></div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-100 border border-black border-t-0 p-1.5 text-center font-black text-xs">
                  RESUMPTION DATE: {result.ResumptionDate}
                </div>
              </div>
            </Card>
          </div>
        )}
      </main>

      {/* Consistent Footer */}
      <footer className="bg-[#1F3A93] text-white py-16 px-4 sm:px-6 lg:px-8 no-print">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-d4iXS1NKPMEhu5xs4Y6kxw0QgWREo0.png"
                alt="Dynagrowth Schools Logo"
                width={60}
                height={60}
                className="rounded-full flex-shrink-0"
              />
              <div>
                <h3 className="text-2xl font-eras-bold mb-2">Dynagrowth Schools</h3>
                <p className="text-sm opacity-90 font-nirmala italic">We Learn and Grow Together</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-8 lg:ml-auto">
              <div className="flex items-center gap-4">
                <a href="https://www.facebook.com/share/1BfRM12ZcF/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg bg-[#1877F2]">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="https://www.instagram.com/dynagrowth?igsh=cjU5bTJ4eDJuNjF1&utm_source=qr" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg bg-[#E4405F]">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="https://www.linkedin.com/company/dynagrowth-schools/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg bg-[#0077B5]">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
              <nav className="flex flex-wrap justify-center gap-8">
                <a href="/" className="text-white hover:text-[#A6DCF5] transition-colors duration-300 font-eras text-sm">Home</a>
                <a href="/portal" className="text-white hover:text-[#A6DCF5] transition-colors duration-300 font-eras text-sm">Portal</a>
                <button onClick={() => setIsPrivacyOpen(true)} className="text-white hover:text-[#A6DCF5] transition-colors duration-300 font-eras text-sm bg-transparent border-none cursor-pointer">Privacy Policy</button>
                <button onClick={() => setIsTermsOpen(true)} className="text-white hover:text-[#A6DCF5] transition-colors duration-300 font-eras text-sm bg-transparent border-none cursor-pointer">Terms Of Service</button>
              </nav>
            </div>
          </div>
          <div className="border-t border-white/20 mt-12 pt-8 text-center">
            <p className="text-sm text-white/75 font-nirmala">© Dynagrowth Schools. All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <Dialog open={isTermsOpen} onOpenChange={setIsTermsOpen}>
        <DialogContent className="rounded-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader className="text-left"><DialogTitle className="text-xl font-eras-bold text-[#1F3A93]">Terms Of Service</DialogTitle></DialogHeader>
          <div className="text-[#44403D] font-nirmala space-y-4 leading-relaxed text-justify text-sm">
            <p className="text-[#1F3A93] font-semibold">Last updated: 08/10/2025</p>
            <p>Welcome to Dynagrowth Schools' official website. By accessing or using this site, you agree to the following terms of service...</p>
            {/* Full terms content truncated for brevity, same as main site */}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isPrivacyOpen} onOpenChange={setIsPrivacyOpen}>
        <DialogContent className="rounded-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader className="text-left"><DialogTitle className="text-xl font-eras-bold text-[#1F3A93]">Privacy Policy</DialogTitle></DialogHeader>
          <div className="text-[#44403D] font-nirmala space-y-4 leading-relaxed text-justify text-sm">
            <p className="text-[#1F3A93] font-semibold">Last updated: 08/10/2025</p>
            <p>At Dynagrowth Schools, we value your privacy and are committed to protecting your personal information...</p>
            {/* Full privacy content truncated for brevity, same as main site */}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
