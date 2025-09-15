export default App;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Font imports for Google Fonts
const fontLink = document.createElement('link');
fontLink.rel = 'stylesheet';
fontLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Poppins:wght@600&family=Roboto:wght@400;500&family=Open+Sans:wght@400;600&display=swap';
document.head.appendChild(fontLink);

function App() {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [url, setUrl] = useState('');
  const [file, setFile] = useState(null);
  const [targetLang, setTargetLang] = useState('en');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  // Removed relatedArticles state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
  // Removed relatedArticles logic
    // Prepare form data for file upload
    let body;
    let headers = { 'Content-Type': 'application/json' };
    if (file) {
      body = new FormData();
      body.append('file', file);
      body.append('text', input);
      body.append('url', url);
      body.append('return_lang', targetLang);
      headers = {};
    } else {
      body = JSON.stringify({ text: input, url, return_lang: targetLang });
    }
    try {
      const response = await fetch('http://127.0.0.1:8000/verify', {
        method: 'POST',
        headers,
        body
      });
      const data = await response.json();
      setResult(data);
      // Removed related articles mockup
    } catch (err) {
      setResult({ error: 'Backend error or not reachable.' });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col" style={{ fontFamily: 'Roboto, Open Sans, Arial, sans-serif' }}>
      <nav className="w-full flex items-center justify-between px-8 py-4 shadow-md" style={{ backgroundColor: '#1E3A8A' }}>
        <div className="flex items-center">
          <img src="/fake news logo.png" alt="Fake News Logo" className="h-16 w-16 mr-4 rounded-full shadow-lg" style={{ objectFit: 'cover', background: '#fff' }} />
          <span className="text-2xl font-extrabold" style={{ color: '#fff', fontFamily: 'Montserrat, Poppins, Arial, sans-serif' }}>Fake News Detector</span>
        </div>
        <div className="flex items-center space-x-8">
          <button onClick={() => navigate('/')} className="text-white font-bold text-lg hover:underline bg-transparent border-none cursor-pointer" style={{ fontFamily: 'Montserrat, Arial, sans-serif' }}>Home</button>
          <button onClick={() => navigate('/app')} className="text-white font-bold text-lg hover:underline bg-transparent border-none cursor-pointer" style={{ fontFamily: 'Montserrat, Arial, sans-serif' }}>Detect News</button>
          <button onClick={() => navigate('/about')} className="text-white font-bold text-lg hover:underline bg-transparent border-none cursor-pointer" style={{ fontFamily: 'Montserrat, Arial, sans-serif' }}>About</button>
          <button onClick={() => navigate('/contact')} className="text-white font-bold text-lg hover:underline bg-transparent border-none cursor-pointer" style={{ fontFamily: 'Montserrat, Arial, sans-serif' }}>Contact</button>
          <button className="ml-4 px-6 py-2 bg-blue-900 text-white font-bold rounded-full hover:bg-blue-800 transition" style={{ backgroundColor: '#0D47A1', fontFamily: 'Montserrat, Arial, sans-serif' }}>Login / Sign Up</button>
        </div>
      </nav>
      <main className="flex-1 w-full flex flex-col items-center justify-center px-2" style={{ fontFamily: 'Roboto, Open Sans, Arial, sans-serif' }}>
        <section className="w-full max-w-2xl px-2 py-8">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg border border-blue-900 p-8 mb-8 flex flex-col gap-6">
            {/* Large textarea for news text */}
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              rows={6}
              placeholder="Paste news headline or article text here…"
              className="w-full p-4 border border-gray-300 rounded-xl mb-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-900 text-black resize-none"
              style={{ color: '#111', fontFamily: 'Roboto, Open Sans, Arial, sans-serif', minHeight: '120px' }}
            />
            {/* Optional URL input */}
            <input
              type="text"
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="Or paste a news article URL"
              className="w-full p-2 border border-gray-300 rounded mb-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-900 text-black"
              style={{ color: '#111', fontFamily: 'Roboto, Open Sans, Arial, sans-serif', maxWidth: '400px' }}
            />
            {/* Optional file upload */}
            <input
              type="file"
              accept=".pdf,.txt,image/*"
              onChange={e => setFile(e.target.files[0])}
              className="mb-2"
              style={{ maxWidth: '400px' }}
            />
            {/* Language dropdown */}
            <div className="flex items-center mb-2">
              <label htmlFor="targetLang" className="font-semibold mr-2" style={{ color: '#1E3A8A', fontFamily: 'Roboto, Open Sans, Arial, sans-serif' }}>Translate to:</label>
              <select
                id="targetLang"
                value={targetLang}
                onChange={e => setTargetLang(e.target.value)}
                className="border border-gray-300 rounded p-2 text-black"
                style={{ color: '#111', fontFamily: 'Roboto, Open Sans, Arial, sans-serif' }}
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="te">Telugu</option>
                <option value="ta">Tamil</option>
                <option value="mr">Marathi</option>
                <option value="bn">Bengali</option>
                <option value="pa">Punjabi</option>
                <option value="ur">Urdu</option>
                <option value="other">Other</option>
              </select>
            </div>
            {/* Action buttons */}
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-2">
              <button
                type="submit"
                className="w-full md:w-auto py-4 px-8 font-bold rounded-xl text-white text-xl flex items-center justify-center bg-gradient-to-r from-blue-700 via-blue-900 to-blue-800 shadow-lg hover:from-blue-800 hover:to-blue-900 transition"
                style={{ fontFamily: 'Montserrat, Poppins, Arial, sans-serif', minWidth: '220px' }}
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin mr-2 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>
                    Analyzing news with AI & fact-check sources…
                  </span>
                ) : (
                  <>Check News Credibility</>
                )}
              </button>
              <button
                type="button"
                className="w-full md:w-auto py-4 px-8 font-bold rounded-xl text-blue-900 border border-blue-900 bg-white hover:bg-blue-50 transition"
                style={{ fontFamily: 'Montserrat, Poppins, Arial, sans-serif', minWidth: '120px' }}
                onClick={() => {
                  setInput('');
                  setUrl('');
                  setFile(null);
                  setResult(null);
                }}
              >
                Clear
              </button>
            </div>
            {/* Friendly microcopy */}
            <div className="text-sm text-gray-600 text-center mt-2">Our system checks with AI + fact-check APIs.</div>
          </form>
          {/* Result Section */}
          {result && (
            <div className="rounded-xl shadow-lg border border-blue-900 p-6 mt-4 bg-blue-50" style={{ fontFamily: 'Roboto, Open Sans, Arial, sans-serif', color: '#1E3A8A' }}>
              {/* Verdict Badge */}
              {result.verdict && (
                <div className="mb-4 flex justify-center">
                  <span className={`px-6 py-2 rounded-full font-bold text-xl shadow-lg ${result.verdict === 'FAKE' ? 'bg-red-600 text-white' : result.verdict === 'REAL' ? 'bg-green-600 text-white' : 'bg-yellow-500 text-white'}`}>{result.verdict}</span>
                </div>
              )}
              {/* Headline/Input Preview */}
              <div className="mb-2 text-lg font-semibold truncate" style={{ maxWidth: '100%', color: '#1E3A8A' }}>
                {input.slice(0, 120) + (input.length > 120 ? '…' : '')}
              </div>
              {/* Translated Text */}
              {result.translated_text && (
                <div className="mb-2 text-base" style={{ color: '#1E3A8A' }}><span className="font-semibold">Translated:</span> {result.translated_text}</div>
              )}
              {/* Source Verification */}
              <div className="mb-2">
                <div className="font-semibold">Source Verification:</div>
                <div className="ml-2 text-base" style={{ color: '#1E3A8A' }}>{result.source_verification}</div>
              </div>
              {/* API Results */}
              <div className="mb-2">
                <div className="font-semibold">API Results:</div>
                <div className="mb-1 text-sm" style={{ color: '#1E3A8A' }}><span className="font-semibold">NewsAPI:</span> {result.newsapi_status === 200 ? `${result.newsapi_results.length} articles found` : 'Error'}</div>
                <div className="mb-1 text-sm" style={{ color: '#1E3A8A' }}><span className="font-semibold">Google Fact Check:</span> {result.google_fact_check_status === 200 ? `${result.google_fact_check_results.length} claims found` : 'Error'}</div>
                <div className="mb-1 text-sm" style={{ color: '#1E3A8A' }}><span className="font-semibold">GDELT:</span> {result.gdelt_status === 200 ? `${result.gdelt_results.length} articles found` : 'Error'}</div>
                <div className="mb-1 text-sm" style={{ color: '#1E3A8A' }}><span className="font-semibold">Full Fact:</span> {result.fullfact_results ? `${result.fullfact_results.length} results` : 'Error'}</div>
                <div className="mb-1 text-sm" style={{ color: '#1E3A8A' }}><span className="font-semibold">OpenFact:</span> {result.openfact_results ? `${result.openfact_results.length} results` : 'Error'}</div>
              </div>
              {/* Share Option removed */}
              {/* Related Articles removed */}
            </div>
          )}
        </section>
      </main>
      <footer className="w-full py-6 text-center text-black mt-8" style={{ color: '#111', fontFamily: 'Roboto, Open Sans, Arial, sans-serif' }}>
        &copy; {new Date().getFullYear()} Fake News Detector. All rights reserved.
      </footer>
    </div>
  );
}

