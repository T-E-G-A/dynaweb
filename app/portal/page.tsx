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
    <div id="portal-isolated-root" style={{
      minHeight: '100vh',
      backgroundColor: '#001f3f',
      backgroundImage: 'linear-gradient(135deg, #001f3f 0%, #003366 100%)',
      padding: '20px',
      fontFamily: 'Arial, Helvetica, sans-serif',
      color: 'white'
    }}>
      <style dangerouslySetInnerHTML={{ __html: `
        #portal-isolated-root * { box-sizing: border-box; margin: 0; padding: 0; }
        #portal-isolated-root .search-header { text-align: center; margin-bottom: 30px; }
        #portal-isolated-root .main-logo-circle { width: 120px; height: 120px; background: white; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; border: 4px solid #0074D9; box-shadow: 0 4px 15px rgba(0,0,0,0.3); overflow: hidden; }
        #portal-isolated-root .main-logo-circle img { width: 90%; height: 90%; object-fit: contain; }
        #portal-isolated-root .school-title-main { font-size: 36px; font-weight: 800; margin-bottom: 10px; letter-spacing: 1px; }
        #portal-isolated-root .school-motto-main { font-size: 18px; color: #fbbc04; font-style: italic; font-weight: 600; }
        
        #portal-isolated-root .search-box { background: white; padding: 40px; border-radius: 8px; max-width: 600px; margin: 0 auto; box-shadow: 0 4px 20px rgba(0,0,0,0.2); color: #001f3f; }
        #portal-isolated-root .school-type-selector { display: flex; gap: 10px; margin-bottom: 20px; }
        #portal-isolated-root .school-type-btn { flex: 1; padding: 12px; border: 2px solid #001f3f; background: white; cursor: pointer; font-weight: 600; border-radius: 4px; transition: 0.3s; }
        #portal-isolated-root .school-type-btn.active { background: #001f3f; color: white; }
        #portal-isolated-root .form-group { margin-bottom: 15px; text-align: left; }
        #portal-isolated-root .form-label { display: block; font-weight: 700; margin-bottom: 5px; color: #001f3f; font-size: 14px; }
        #portal-isolated-root .search-input, #portal-isolated-root .search-select { width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 4px; font-size: 16px; color: #000; }
        #portal-isolated-root .search-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px; }
        #portal-isolated-root .btn-search { width: 100%; padding: 15px; background: #001f3f; color: white; border: none; border-radius: 4px; font-weight: 700; cursor: pointer; font-size: 18px; transition: 0.3s; }
        #portal-isolated-root .btn-search:hover { background: #001529; }

        #portal-isolated-root .result-card { background: white; padding: 30px; margin: 20px auto; width: 100%; max-width: 850px; box-shadow: 0 4px 20px rgba(0,0,0,0.2); color: #000; display: flex; flex-direction: column; }
        #portal-isolated-root .template-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
        #portal-isolated-root .school-name-hd { font-size: 28px; font-weight: 800; color: #0074D9; text-transform: uppercase; }
        #portal-isolated-root .school-motto-hd { font-size: 14px; color: #fbbc04; font-style: italic; font-weight: 600; }
        #portal-isolated-root .student-photo-box { width: 100px; height: 110px; border: 1px solid #000; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; background: #fff; }
        #portal-isolated-root .header-separator { border-top: 2px solid #000; margin: 8px 0; }
        #portal-isolated-root .student-data-grid { display: flex; margin-bottom: 10px; }
        #portal-isolated-root .data-col-left { width: 70%; display: flex; flex-wrap: wrap; }
        #portal-isolated-root .data-col-right { width: 30%; border: 1px solid #000; }
        #portal-isolated-root .info-item { width: 50%; display: flex; font-size: 12px; margin-bottom: 5px; }
        #portal-isolated-root .info-label-hd { font-weight: 700; min-width: 90px; }
        #portal-isolated-root .info-value-hd { border-bottom: 1px solid #ddd; flex: 1; padding-left: 5px; }
        #portal-isolated-root .attendance-table-hd { width: 100%; border-collapse: collapse; }
        #portal-isolated-root .attendance-table-hd th { background: #f5f5f5; border: 1px solid #000; font-size: 11px; padding: 3px; text-align: left; }
        #portal-isolated-root .attendance-table-hd td { border: 1px solid #000; font-size: 11px; padding: 3px; text-align: right; font-weight: 700; }
        #portal-isolated-root .termly-report-banner { background: #5dade2; color: #000; padding: 10px; text-align: center; font-size: 16px; font-weight: 800; border-radius: 25px; margin: 10px 0; text-transform: uppercase; }
        #portal-isolated-root .hd-table { width: 100%; border-collapse: collapse; border: 2px solid #000; }
        #portal-isolated-root .hd-table th { border: 1px solid #000; padding: 6px 2px; font-size: 10px; font-weight: 700; text-align: center; background: #fff; }
        #portal-isolated-root .hd-table td { border: 1px solid #000; padding: 4px; font-size: 11px; text-align: center; }
        #portal-isolated-root .analysis-section-hd { border: 1px solid #000; border-top: none; padding: 6px 10px; display: flex; justify-content: space-between; font-size: 12px; }
        #portal-isolated-root .bottom-grid-hd { display: grid; grid-template-columns: 1.2fr 1fr; gap: 15px; margin-top: 10px; }
        #portal-isolated-root .legend-table-hd { width: 100%; border-collapse: collapse; border: 1px solid #000; }
        #portal-isolated-root .legend-table-hd th, #portal-isolated-root .legend-table-hd td { border: 1px solid #000; padding: 3px; font-size: 10px; text-align: center; }
        #portal-isolated-root .affective-box-hd { border: 1px solid #000; }
        #portal-isolated-root .affective-header-hd { background: #f5f5f5; padding: 4px; text-align: center; font-weight: 700; font-size: 11px; border-bottom: 1px solid #000; }
        #portal-isolated-root .affective-row-hd { display: flex; justify-content: space-between; padding: 3px 8px; border-bottom: 1px solid #ddd; font-size: 10px; }
        #portal-isolated-root .teacher-box-hd { margin-top: 10px; border: 1px solid #000; padding: 8px; display: grid; grid-template-columns: 1fr 1.5fr 1fr; gap: 10px; }
        #portal-isolated-root .resumption-hd { text-align: center; font-weight: 800; border: 1px solid #000; padding: 6px; margin-top: 8px; background: #f5f5f5; font-size: 13px; }
        #portal-isolated-root .result-actions { display: flex; gap: 15px; justify-content: center; margin-top: 20px; }
        #portal-isolated-root .btn-act { padding: 12px 25px; border-radius: 5px; border: none; cursor: pointer; font-weight: 600; color: white; transition: 0.3s; }
        
        @media print {
          @page { size: A4 portrait; margin: 5mm; }
          body * { visibility: hidden; }
          #portal-isolated-root, #portal-isolated-root * { visibility: visible; }
          #portal-isolated-root { background: white !important; padding: 0 !important; position: absolute; left: 0; top: 0; width: 100%; }
          .result-card { width: 100% !important; max-width: 100% !important; padding: 5mm !important; margin: 0 !important; box-shadow: none !important; border: none !important; height: 285mm !important; justify-content: space-between !important; }
          .result-actions, .search-header, .search-box { display: none !important; }
          .termly-report-banner { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; background-color: #5dade2 !important; }
        }
      `}} />

      {view === 'search' ? (
        <div className="container">
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
        </div>
      ) : result && (
        <div className="container">
          <div className="result-card">
            <div className="template-header">
              <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-d4iXS1NKPMEhu5xs4Y6kxw0QgWREo0.png" className="school-logo-img" style={{ width: '80px' }} />
              <div className="school-info-center">
                <h2 className="school-name-hd">DYNAGROWTH SCHOOLS</h2>
                <p className="school-motto-hd">We learn and grow together in love</p>
              </div>
              <div className="student-photo-box">
                {result.StudentPicture ? <img src={result.StudentPicture} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : "PASSPORT"}
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
                  <thead><tr><th colSpan={2}>ATTENDANCE RECORD</th></tr></thead>
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
                  <th style={{ width: '30%' }}>SUBJECTS</th>
                  <th>C.A (20)</th><th>PRJ (10)</th><th>ACT (10)</th><th>EXM (60)</th><th>TOT (100)</th><th>GRD</th><th>REMARKS</th>
                </tr>
              </thead>
              <tbody>
                {getSubjects(result.SchoolType).map(sub => (
                  <tr key={sub.key}>
                    <td style={{ textAlign: 'left', paddingLeft: '8px', fontWeight: 600 }}>{sub.label}</td>
                    <td>{result[sub.key + '_CA'] || '-'}</td>
                    <td>{result[sub.key + '_Projects'] || '-'}</td>
                    <td>{result[sub.key + '_ClassActivities'] || '-'}</td>
                    <td>{result[sub.key + '_Exams'] || '-'}</td>
                    <td style={{ fontWeight: 700 }}>{result[sub.key + '_Total'] || '-'}</td>
                    <td style={{ fontWeight: 800 }}>{result[sub.key + '_Grade'] || '-'}</td>
                    <td style={{ fontSize: '9px' }}>{result[sub.key + '_Remarks'] || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="analysis-section-hd">
              <div style={{ fontWeight: 700 }}>ANALYSIS</div>
              <div style={{ display: 'flex', gap: '15px' }}>
                <div><span style={{ color: '#17a2b8', fontWeight: 700 }}>Subjects:</span> <b>{result.SubjectsOffered}</b></div>
                <div><span style={{ color: '#17a2b8', fontWeight: 700 }}>Obtainable:</span> <b>{result.MarksObtainable}</b></div>
                <div><span style={{ color: '#17a2b8', fontWeight: 700 }}>Obtained:</span> <b>{result.MarksObtained}</b></div>
              </div>
            </div>
            <div className="analysis-section-hd" style={{ justifyContent: 'flex-end', gap: '20px' }}>
              <div><span style={{ color: '#17a2b8', fontWeight: 700 }}>Average:</span> <b>{result.StudentAverage}%</b></div>
              <div><span style={{ color: '#17a2b8', fontWeight: 700 }}>Class Avg:</span> <b>{result.ClassAverage}%</b></div>
              <div><span style={{ color: '#17a2b8', fontWeight: 700 }}>Highest:</span> <b>{result.HighestAverage}%</b></div>
            </div>

            <div className="bottom-grid-hd">
              <table className="legend-table-hd">
                <thead><tr><th>RANGE</th><th>GRADE</th><th>REMARKS</th></tr></thead>
                <tbody>
                  {[{r:'90-100', g:'A+', rem:'DISTINCTION'}, {r:'80-89', g:'A', rem:'EXCELLENT'}, {r:'70-79', g:'B+', rem:'VERY GOOD'}, {r:'60-69', g:'B', rem:'GOOD'}, {r:'50-59', g:'C', rem:'MERIT'}, {r:'40-49', g:'D', rem:'FAIR'}, {r:'0-39', g:'F', rem:'FAIL'}].map((row, i) => (
                    <tr key={i}><td>{row.r}</td><td style={{ fontWeight: 700 }}>{row.g}</td><td>{row.rem}</td></tr>
                  ))}
                </tbody>
              </table>
              <div className="affective-box-hd">
                <div className="affective-header-hd">AFFECTIVE DOMAIN</div>
                {affectiveItems.map(item => (
                  <div key={item.key} className="affective-row-hd">
                    <span>{item.label}</span>
                    <span style={{ fontWeight: 700 }}>{result[item.key + '_Rating'] || '-'}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="teacher-box-hd">
              <div><span style={{ fontWeight: 700, fontSize: '11px' }}>TEACHER:</span><div style={{ borderBottom: '1px solid #000', minHeight: '18px' }}>{result.FormTeacherName}</div></div>
              <div><span style={{ fontWeight: 700, fontSize: '11px' }}>COMMENT:</span><div style={{ borderBottom: '1px solid #000', minHeight: '18px' }}>{result.TeacherComment}</div></div>
              <div>
                <span style={{ fontWeight: 700, fontSize: '11px' }}>REGISTRAR:</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <img src="https://i.ibb.co/vrgztW2/signature.png" style={{ height: '25px' }} />
                  <span style={{ fontSize: '10px' }}>{new Date().toLocaleDateString('en-GB')}</span>
                </div>
              </div>
            </div>

            <div className="resumption-hd">RESUMPTION DATE: {result.ResumptionDate}</div>
          </div>

          <div className="result-actions no-print">
            <button className="btn-act" style={{ backgroundColor: '#6c757d' }} onClick={() => setView('search')}>NEW SEARCH</button>
            <button className="btn-act" style={{ backgroundColor: '#0074D9' }} onClick={() => window.print()}>PRINT REPORT</button>
          </div>
        </div>
      )}
    </div>
  );
}
