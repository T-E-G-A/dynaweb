"use client"

import { useState, useEffect } from "react"

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

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch(`${SCRIPT_URL}?action=getSessions`);
        const data = await response.json();
        setSessionsList(data);
        if (data.length > 0) setSession(data[0]);
      } catch (error) {
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
    <div id="portal-root">
      <style dangerouslySetInnerHTML={{ __html: `
        #portal-root {
          --navy-primary: #001f3f;
          --navy-dark: #001529;
          --navy-light: #003366;
          --navy-accent: #0074D9;
          --teal-accent: #17a2b8;
          --warning: #fbbc04;
          
          font-family: Arial, Helvetica, sans-serif;
          background: linear-gradient(135deg, var(--navy-primary) 0%, var(--navy-light) 100%);
          min-height: 100vh;
          padding: 20px;
          color: white;
        }

        #portal-root * { margin: 0; padding: 0; box-sizing: border-box; }

        #portal-root .container { width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 20px; }

        /* --- SEARCH PAGE BRANDING --- */
        #portal-root .search-header {
          text-align: center;
          color: white;
          margin-bottom: 30px;
        }

        #portal-root .main-logo-circle {
          width: 120px;
          height: 120px;
          background: white;
          border-radius: 50%;
          margin: 0 auto 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 4px solid var(--navy-accent);
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
          overflow: hidden;
        }

        #portal-root .main-logo-circle img {
          width: 90%;
          height: 90%;
          object-fit: contain;
        }

        #portal-root .school-title-main {
          font-size: 36px;
          font-weight: 800;
          margin-bottom: 10px;
          letter-spacing: 1px;
        }

        #portal-root .school-motto-main {
          font-size: 18px;
          color: var(--warning);
          font-style: italic;
          font-weight: 600;
        }

        /* --- RESULT CARD --- */
        #portal-root .result-card {
          background: white;
          padding: 30px;
          margin: 20px auto;
          width: 100%;
          max-width: 850px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.2);
          color: #000;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        /* --- SINGLE PAGE PRINT OPTIMIZATION --- */
        @media print {
          @page {
            size: A4 portrait;
            margin: 5mm;
          }
          html, body { background: white !important; height: auto !important; overflow: visible !important; }
          #portal-root { background: white !important; padding: 0 !important; }
          #portal-root .container { padding: 0 !important; margin: 0 !important; width: 100% !important; max-width: 100% !important; }
          #portal-root .result-card { 
            width: 100% !important; 
            max-width: 100% !important; 
            padding: 5mm !important; 
            margin: 0 !important; 
            box-shadow: none !important; 
            border: none !important;
            height: 285mm !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
          }
          #portal-root .result-actions, #portal-root .search-header, #portal-root .search-box { display: none !important; }
          
          #portal-root .termly-report-banner {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            background-color: #5dade2 !important;
            color: #000 !important;
          }
          
          #portal-root .hd-table, #portal-root .hd-table th, #portal-root .hd-table td, 
          #portal-root .student-data-grid, #portal-root .data-col-right, #portal-root .attendance-table-hd th, #portal-root .attendance-table-hd td,
          #portal-root .legend-table-hd, #portal-root .legend-table-hd th, #portal-root .legend-table-hd td,
          #portal-root .affective-box-hd, #portal-root .teacher-box-hd, #portal-root .resumption-hd {
            border-color: #000 !important;
          }
        }

        /* Template Header */
        #portal-root .template-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        #portal-root .school-logo-img { width: 80px; height: 80px; object-fit: contain; }
        
        #portal-root .school-info-center { text-align: center; flex: 1; }
        #portal-root .school-name-hd { font-size: 28px; font-weight: 800; color: #0074D9; text-transform: uppercase; margin-bottom: 2px; }
        #portal-root .school-motto-hd { font-size: 14px; color: #fbbc04; font-style: italic; font-weight: 600; }

        #portal-root .student-photo-box {
          width: 100px;
          height: 110px;
          border: 1px solid #000;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: 700;
          background: #fff;
        }

        #portal-root .header-separator { border-top: 2px solid #000; margin: 8px 0; }

        /* Student Info Grid */
        #portal-root .student-data-grid {
          display: flex;
          flex-wrap: wrap;
          margin-bottom: 10px;
        }

        #portal-root .data-col-left { width: 70%; display: flex; flex-wrap: wrap; }
        #portal-root .data-col-right { width: 30%; border: 1px solid #000; padding: 0; }

        #portal-root .info-item { width: 50%; display: flex; font-size: 12px; margin-bottom: 5px; padding-right: 5px; }
        #portal-root .info-label-hd { font-weight: 700; min-width: 90px; }
        #portal-root .info-value-hd { border-bottom: 1px solid #ddd; flex: 1; padding-left: 5px; }

        #portal-root .attendance-table-hd { width: 100%; border-collapse: collapse; }
        #portal-root .attendance-table-hd th { background: #f5f5f5; border: 1px solid #000; font-size: 11px; padding: 3px; text-align: left; }
        #portal-root .attendance-table-hd td { border: 1px solid #000; font-size: 11px; padding: 3px; text-align: right; font-weight: 700; }

        /* Blue Banner */
        #portal-root .termly-report-banner {
          background: #5dade2;
          color: #000;
          padding: 10px;
          text-align: center;
          font-size: 16px;
          font-weight: 800;
          border-radius: 25px;
          margin: 10px 0;
          text-transform: uppercase;
          width: 100%;
          display: block;
        }

        /* Main Subject Table */
        #portal-root .hd-table { width: 100%; border-collapse: collapse; border: 2px solid #000; margin-bottom: 0; }
        #portal-root .hd-table th { border: 1px solid #000; padding: 6px 2px; font-size: 10px; font-weight: 700; text-align: center; background: #fff; }
        #portal-root .hd-table td { border: 1px solid #000; padding: 4px; font-size: 11px; text-align: center; }
        #portal-root .hd-table .subject-col { text-align: left; font-weight: 600; padding-left: 8px; }

        /* Analysis & Grade Section */
        #portal-root .analysis-section-hd { border: 1px solid #000; border-top: none; padding: 6px 10px; display: flex; justify-content: space-between; font-size: 12px; }
        #portal-root .analysis-item-hd { display: flex; gap: 5px; }
        #portal-root .analysis-label-hd { color: #17a2b8; font-weight: 700; }
        #portal-root .analysis-val-hd { font-weight: 700; }

        #portal-root .bottom-grid-hd { display: grid; grid-template-columns: 1.2fr 1fr; gap: 15px; margin-top: 10px; }
        
        #portal-root .legend-table-hd { width: 100%; border-collapse: collapse; border: 1px solid #000; }
        #portal-root .legend-table-hd th, #portal-root .legend-table-hd td { border: 1px solid #000; padding: 3px; font-size: 10px; text-align: center; }
        #portal-root .legend-table-hd th { background: #f5f5f5; }

        #portal-root .affective-box-hd { border: 1px solid #000; }
        #portal-root .affective-header-hd { background: #f5f5f5; padding: 4px; text-align: center; font-weight: 700; font-size: 11px; border-bottom: 1px solid #000; }
        #portal-root .affective-row-hd { display: flex; justify-content: space-between; padding: 3px 8px; border-bottom: 1px solid #ddd; font-size: 10px; }

        #portal-root .teacher-box-hd { margin-top: 10px; border: 1px solid #000; padding: 8px; display: grid; grid-template-columns: 1fr 1.5fr 1fr; gap: 10px; }
        #portal-root .teacher-field-hd { font-size: 11px; font-weight: 700; }
        #portal-root .teacher-val-hd { border-bottom: 1px solid #000; min-height: 18px; font-weight: 400; }

        #portal-root .resumption-hd { text-align: center; font-weight: 800; border: 1px solid #000; padding: 6px; margin-top: 8px; background: #f5f5f5; font-size: 13px; }

        /* Search UI */
        #portal-root .search-box { background: white; padding: 40px; border-radius: 8px; max-width: 600px; margin: 0 auto; box-shadow: 0 4px 20px rgba(0,0,0,0.2); color: #000; }
        #portal-root .school-type-selector { display: flex; gap: 10px; margin-bottom: 20px; }
        #portal-root .school-type-btn { flex: 1; padding: 12px; border: 2px solid var(--navy-primary); background: white; cursor: pointer; font-weight: 600; border-radius: 4px; transition: 0.3s; color: var(--navy-primary); }
        #portal-root .school-type-btn.active { background: var(--navy-primary); color: white; }
        
        #portal-root .form-group { margin-bottom: 15px; }
        #portal-root .form-label { display: block; font-weight: 700; margin-bottom: 5px; color: var(--navy-primary); font-size: 14px; }
        #portal-root .search-input { width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 4px; font-size: 16px; color: #000; }
        
        #portal-root .search-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px; }
        #portal-root .search-select { width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 4px; font-size: 16px; background: white; color: #000; }

        #portal-root .btn-search { width: 100%; padding: 15px; background: var(--navy-primary); color: white; border: none; border-radius: 4px; font-weight: 700; cursor: pointer; font-size: 18px; transition: 0.3s; }
        #portal-root .btn-search:hover { background: var(--navy-dark); }

        #portal-root .result-actions { display: flex; gap: 15px; justify-content: center; margin-top: 20px; margin-bottom: 40px; }
        #portal-root .btn-act { padding: 12px 25px; border-radius: 5px; border: none; cursor: pointer; font-weight: 600; color: white; transition: 0.3s; font-size: 16px; }
      `}} />

      <div className="container">
        {view === 'search' ? (
          <>
            <div className="search-header">
              <div className="main-logo-circle">
                <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-d4iXS1NKPMEhu5xs4Y6kxw0QgWREo0.png" alt="Logo" />
              </div>
              <h1 className="school-title-main">DYNAGROWTH SCHOOLS</h1>
              <p className="school-motto-main">We learn and grow together in love</p>
            </div>

            <div className="search-box">
              <div className="school-type-selector">
                {(['EarlyYear', 'Basic', 'College'] as SchoolType[]).map(type => (
                  <button key={type} className={`school-type-btn ${schoolType === type ? 'active' : ''}`} onClick={() => setSchoolType(type)}>
                    {type === 'EarlyYear' ? 'Early Year' : type === 'Basic' ? 'Basic' : 'College'}
                  </button>
                ))}
              </div>

              <div className="form-group">
                <label className="form-label">Admission Number</label>
                <input type="text" className="search-input" placeholder="Enter Admission Number" value={admissionNo} onChange={e => setAdmissionNo(e.target.value)} />
              </div>

              <div className="form-group">
                <label className="form-label">Date of Birth</label>
                <input type="date" className="search-input" value={dob} onChange={e => setDob(e.target.value)} />
              </div>

              <div className="search-grid">
                <div className="form-group">
                  <label className="form-label">Session</label>
                  <select className="search-select" value={session} onChange={e => setSession(e.target.value)}>
                    {sessionsList.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Term</label>
                  <select className="search-select" value={term} onChange={e => setTerm(e.target.value)}>
                    <option value="First Term">First Term</option>
                    <option value="Second Term">Second Term</option>
                    <option value="Third Term">Third Term</option>
                  </select>
                </div>
              </div>

              <button className="btn-search" onClick={handleSearch} disabled={loading}>
                {loading ? "Searching..." : "SEARCH RESULT"}
              </button>
            </div>
          </>
        ) : result && (
          <>
            <div className="result-card">
              <div className="template-header">
                <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-d4iXS1NKPMEhu5xs4Y6kxw0QgWREo0.png" className="school-logo-img" alt="Logo" />
                <div className="school-info-center">
                  <div className="school-name-hd">DYNAGROWTH SCHOOLS</div>
                  <div className="school-motto-hd">We learn and grow together in love</div>
                </div>
                <div className="student-photo-box">
                  {result.StudentPicture ? <img src={result.StudentPicture} style={{width:'100%', height:'100%', objectFit:'cover'}} /> : "PASSPORT"}
                </div>
              </div>

              <div className="header-separator"></div>

              <div className="student-data-grid">
                <div className="data-col-left">
                  <div className="info-item"><span className="info-label-hd">NAME:</span><span className="info-value-hd">{result.Name}</span></div>
                  <div className="info-item"><span className="info-label-hd">ADMISSION NO:</span><span className="info-value-hd">{result.AdmissionNo}</span></div>
                  <div className="info-item"><span className="info-label-hd">CLASS:</span><span className="info-value-hd">{result.Class}</span></div>
                  <div className="info-item"><span className="info-label-hd">GENDER:</span><span className="info-value-hd">{result.Gender}</span></div>
                  <div className="info-item"><span className="info-label-hd">D.O.B:</span><span className="info-value-hd">{result.DateOfBirth}</span></div>
                  <div className="info-item"><span className="info-label-hd">SESSION:</span><span className="info-value-hd">{result.Session}</span></div>
                  <div className="info-item"><span className="info-label-hd">TERM:</span><span className="info-value-hd">{result.Term}</span></div>
                  <div className="info-item"><span className="info-label-hd">NO. IN CLASS:</span><span className="info-value-hd">{result.NoInClass}</span></div>
                </div>
                <div className="data-col-right">
                  <table className="attendance-table-hd">
                    <thead><tr><th colSpan={2} style={{textAlign:'center'}}>ATTENDANCE RECORD</th></tr></thead>
                    <tbody>
                      <tr><td>SCHOOL DAYS:</td><td>{result.SchoolDays}</td></tr>
                      <tr><td>DAYS ATTENDED:</td><td>{result.DaysAttended}</td></tr>
                      <tr><td>DAYS ABSENT:</td><td>{result.DaysAbsent}</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="termly-report-banner">
                TERMLY REPORT FOR {result.Term?.toUpperCase()} {result.Session?.toUpperCase()} ACADEMIC SESSION
              </div>

              <table className="hd-table">
                <thead>
                  <tr>
                    <th className="subject-col">SUBJECTS</th>
                    <th>C.A<br/>(20)</th>
                    <th>PRJ<br/>(10)</th>
                    <th>ACT<br/>(10)</th>
                    <th>EXM<br/>(60)</th>
                    <th>TOT<br/>(100)</th>
                    <th>GRD</th>
                    <th>REMARKS</th>
                  </tr>
                </thead>
                <tbody>
                  {getSubjects(result.SchoolType).map(sub => (
                    <tr key={sub.key}>
                      <td className="subject-col">{sub.label}</td>
                      <td>{result[sub.key + '_CA'] || '-'}</td>
                      <td>{result[sub.key + '_Projects'] || '-'}</td>
                      <td>{result[sub.key + '_ClassActivities'] || '-'}</td>
                      <td>{result[sub.key + '_Exams'] || '-'}</td>
                      <td>{result[sub.key + '_Total'] || '-'}</td>
                      <td style={{fontWeight:'700'}}>{result[sub.key + '_Grade'] || '-'}</td>
                      <td style={{fontSize:'9px'}}>{result[sub.key + '_Remarks'] || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="analysis-section-hd">
                <div style={{fontWeight:'700'}}>ANALYSIS</div>
                <div className="analysis-item-hd"><span className="analysis-label-hd">Subjects Offered:</span><span className="analysis-val-hd">{result.SubjectsOffered}</span></div>
                <div className="analysis-item-hd"><span className="analysis-label-hd">Marks Obtainable:</span><span className="analysis-val-hd">{result.MarksObtainable}</span></div>
                <div className="analysis-item-hd"><span className="analysis-label-hd">Marks Obtained:</span><span className="analysis-val-hd">{result.MarksObtained}</span></div>
              </div>
              <div className="analysis-section-hd" style={{borderTop:'none'}}>
                <div></div>
                <div className="analysis-item-hd"><span className="analysis-label-hd">Student's Average:</span><span className="analysis-val-hd">{result.StudentAverage}%</span></div>
                <div className="analysis-item-hd"><span className="analysis-label-hd">Class Average:</span><span className="analysis-val-hd">{result.ClassAverage}%</span></div>
                <div className="analysis-item-hd"><span className="analysis-label-hd">Highest Average in Class:</span><span className="analysis-val-hd">{result.HighestAverage}%</span></div>
              </div>

              <div className="bottom-grid-hd">
                <div className="grade-box-hd">
                  <div style={{fontWeight:'700', fontSize:'11px', marginBottom:'4px'}}>GRADE CATEGORIES</div>
                  <table className="legend-table-hd">
                    <thead><tr><th>SCORE RANGE</th><th>GRADE</th><th>REMARKS</th><th>FREQUENCY</th></tr></thead>
                    <tbody>
                      {[
                        {r:'90 - 100', g:'A+', rem:'DISTINCTION'},
                        {r:'80 - 89', g:'A', rem:'EXCELLENT'},
                        {r:'70 - 79', g:'B+', rem:'VERY GOOD'},
                        {r:'60 - 69', g:'B', rem:'GOOD'},
                        {r:'50 - 59', g:'C', rem:'MERIT'},
                        {r:'40 - 49', g:'D', rem:'FAIR'},
                        {r:'0 - 39', g:'F', rem:'FAIL'}
                      ].map((row, idx) => (
                        <tr key={idx}><td>{row.r}</td><td>{row.g}</td><td>{row.rem}</td><td></td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="affective-box-hd">
                  <div className="affective-header-hd">AFFECTIVE DOMAIN</div>
                  {affectiveItems.map(item => (
                    <div className="affective-row-hd" key={item.key}>
                      <span>{item.label}</span>
                      <span style={{fontWeight:'700'}}>{result[item.key + '_Rating'] || '-'}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="teacher-box-hd">
                <div className="teacher-field-hd">FORM TEACHER'S NAME:<div className="teacher-val-hd">{result.FormTeacherName}</div></div>
                <div className="teacher-field-hd">COMMENT:<div className="teacher-val-hd">{result.TeacherComment}</div></div>
                <div className="teacher-field-hd">
                  REGISTRAR SIGNATURE:
                  <div className="teacher-val-hd" style={{borderBottom:'none', textAlign:'center'}}>
                    <img src="https://i.ibb.co/vrgztW2/signature.png" style={{maxHeight:'40px', objectFit:'contain'}} alt="Signature" />
                  </div>
                  Date:
                  <div className="teacher-val-hd">{new Date().toLocaleDateString('en-GB')}</div>
                </div>
              </div>

              <div className="resumption-hd">RESUMPTION DATE: {result.ResumptionDate}</div>
            </div>

            <div className="result-actions">
              <button onClick={() => setView('search')} className="btn-act" style={{background:'#6c757d'}}>New Search</button>
              <button onClick={() => window.print()} className="btn-act" style={{background: 'var(--navy-accent)'}}>Print Report</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
