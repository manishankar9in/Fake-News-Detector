import React from 'react';
import { PencilSquareIcon, ArrowDownCircleIcon, ChartBarIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

export default function About() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full bg-white flex flex-col" style={{ fontFamily: 'Roboto, Open Sans, Arial, sans-serif' }}>
      {/* Top Navbar - DO NOT MODIFY */}
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
      <main className="flex-1 w-full flex flex-col items-center justify-center px-4 py-8">
        {/* Section 1: Hero Intro */}
        <section className="w-full bg-blue-900 text-white py-16 px-4 flex flex-col items-center justify-center text-center relative" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="bg-blue-900 bg-opacity-80 rounded-xl p-8 shadow-lg max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ fontFamily: 'Montserrat, Arial, sans-serif' }}>About Us</h1>
            <p className="text-xl md:text-2xl font-semibold mb-2" style={{ fontFamily: 'Roboto, Open Sans, Arial, sans-serif' }}>Fighting misinformation with AI-powered fact-checking.</p>
          </div>
        </section>
        {/* Section 2: Mission */}
        <section className="w-full flex justify-center py-8">
          <div className="bg-blue-50 rounded-xl shadow-lg p-6 flex flex-col items-center max-w-xl mx-auto">
  <PencilSquareIcon className="h-8 w-8 text-blue-900 mb-2" />
  <blockquote className="text-lg text-center font-semibold mb-2" style={{ fontFamily: 'Montserrat, Arial, sans-serif' }}>
    “Fake news spreads faster than ever. Our mission is to help people verify the truth instantly by combining AI and trusted fact-checking sources.”
  </blockquote>
          </div>
        </section>
        {/* Section 3: How It Works */}
        <section className="w-full max-w-4xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-8 text-center text-blue-900" style={{ fontFamily: 'Montserrat, Arial, sans-serif' }}>How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <ArrowDownCircleIcon className="h-8 w-8 text-blue-900 mb-2" />
              <span className="font-bold mb-1">Input</span>
              <span className="text-gray-700 text-center">Enter headline / article text / URL</span>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <ChartBarIcon className="h-8 w-8 text-blue-900 mb-2" />
              <span className="font-bold mb-1">AI Detection</span>
              <span className="text-gray-700 text-center">System analyzes credibility</span>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <CheckCircleIcon className="h-8 w-8 text-blue-900 mb-2" />
              <span className="font-bold mb-1">Fact-Check</span>
              <span className="text-gray-700 text-center">Cross-verified with APIs (Google Fact Check, NewsAPI, GDELT)</span>
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              <span className="font-bold mb-1">Result</span>
              <span className="text-gray-700 text-center">Fake, Real, or Uncertain with confidence score</span>
            </div>
          </div>
        </section>
        {/* Section 4: Technology */}
        <section className="w-full max-w-4xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-8 text-center text-blue-900" style={{ fontFamily: 'Montserrat, Arial, sans-serif' }}>Technology We Use</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
            <div className="flex flex-col items-center">
              <span className="font-bold mb-1">AI Models</span>
              <span className="text-gray-700 text-center">Hugging Face pre-trained models</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold mb-1">APIs</span>
              <span className="text-gray-700 text-center">Google Fact Check, NewsAPI, GDELT</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold mb-1">Languages</span>
              <span className="text-gray-700 text-center">Google Translate API</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold mb-1">Platform</span>
              <span className="text-gray-700 text-center">React + FastAPI</span>
            </div>
          </div>
        </section>
        {/* Section 5: Why It Matters */}
        <section className="w-full bg-blue-100 py-10 flex flex-col items-center justify-center text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-blue-900" style={{ fontFamily: 'Montserrat, Arial, sans-serif' }}>Why It Matters</h2>
            <p className="text-lg mb-4 text-gray-800">Misinformation affects elections, health, and society. Our tool helps people share responsibly by making news verification easy.</p>
            <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" alt="People reading news" className="rounded-xl shadow mx-auto mb-2" style={{ maxHeight: '180px' }} />
          </div>
        </section>
        {/* Section 6: Who We Are */}
        <section className="w-full max-w-3xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-900 text-center" style={{ fontFamily: 'Montserrat, Arial, sans-serif' }}>Who We Are</h2>
          <p className="text-lg mb-4 text-gray-800 text-center">This platform is an AI-driven research project exploring real-world solutions against misinformation.</p>
          {/* Optional: Add profile cards here if needed */}
        </section>
        {/* Section 7: Disclaimer */}
        <section className="w-full max-w-2xl mx-auto px-4 py-8">
          <div className="bg-yellow-100 border-l-4 border-yellow-500 rounded-xl p-6 flex items-center gap-4">
            {/* Only Heroicons, no emoji */}
            <span className="text-gray-800 text-base font-semibold">Results are AI-assisted. While highly accurate, please cross-check with trusted sources before making decisions.</span>
          </div>
        </section>
        {/* Call to Action - Keep button unchanged */}
        <div className="flex flex-col items-center mt-8 mb-8">
          <h2 className="text-xl font-bold mb-2 text-blue-900">Take the Next Step</h2>
          <p className="mb-4 text-gray-800 text-center">Don’t let misinformation mislead you.</p>
          <button className="px-8 py-4 bg-blue-600 text-white font-bold rounded-full shadow-lg text-xl hover:bg-blue-700 transition" style={{ fontFamily: 'Montserrat, Arial, sans-serif' }} onClick={() => navigate('/app')}>Check News Credibility Now</button>
        </div>
      </main>
      <footer className="w-full py-8 bg-blue-50 text-center text-gray-700 mt-8">
        <div className="mb-2 flex flex-wrap justify-center gap-6 text-blue-900 font-bold">
          <a href="/about" className="hover:underline">About</a>
          <a href="/app" className="hover:underline">Detect</a>
          <a href="#trending" className="hover:underline">Trending</a>
          <a href="#contact" className="hover:underline">Contact</a>
        </div>
        <div className="mb-2 text-xs">This tool uses AI + fact-check APIs. Results are indicative, not absolute.</div>
        <div className="flex justify-center gap-4 mt-2">
          <a href="mailto:contact@fakenewsdetector.com" className="text-blue-900 hover:underline">Email</a>
          <a href="#" className="text-blue-900 hover:underline">Twitter</a>
          <a href="#" className="text-blue-900 hover:underline">LinkedIn</a>
        </div>
      </footer>
    </div>
  );
}
