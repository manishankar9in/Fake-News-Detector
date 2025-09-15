import React, { useEffect, useState, useRef } from 'react';
import AuthService from './AuthService';
import { MagnifyingGlassIcon, GlobeAltIcon, ChartBarIcon, LanguageIcon, CheckCircleIcon, AcademicCapIcon, ShieldCheckIcon, NewspaperIcon } from '@heroicons/react/24/outline';
// Add Google Fonts for Montserrat, Poppins, Roboto, Open Sans
if (typeof document !== 'undefined') {
  const fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Poppins:wght@600&family=Roboto:wght@400;500&family=Open+Sans:wght@400;600&display=swap';
  document.head.appendChild(fontLink);
}
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  // Modal state
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const auth = AuthService();
  const user = auth.user;
  const history = auth.history;
  // Slideshow logic
  const slideImages = [
    '/slide photo.avif',
    '/slide photo 2.webp',
    '/slide photo 3.jpg',
    '/slide photo 4.jpg'
  ];
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideInterval = useRef(null);

  useEffect(() => {
    slideInterval.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slideImages.length);
    }, 3500);
    return () => clearInterval(slideInterval.current);
  }, []);
  const navigate = useNavigate();

  // Show scroll button after 15 seconds
  const [showScroll, setShowScroll] = useState(false);
  useEffect(() => {
  const timer = setTimeout(() => setShowScroll(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to features section
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features-benefits');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
          {user ? (
            <div className="relative flex items-center gap-2">
              <span className="ml-4 px-6 py-2 bg-blue-900 text-white font-bold rounded-full flex items-center gap-2" style={{ backgroundColor: '#0D47A1', fontFamily: 'Montserrat, Arial, sans-serif' }}>
                <span className="rounded-full bg-white text-blue-900 px-2 py-1 font-bold">{user.username || 'User'}</span>
                {user.emailVerified ? (
                  <span className="ml-2 px-2 py-1 rounded bg-green-100 text-green-800 text-xs font-semibold">Verified</span>
                ) : (
                  <span className="ml-2 px-2 py-1 rounded bg-yellow-100 text-yellow-800 text-xs font-semibold">Not Verified</span>
                )}
              </span>
              <button className="ml-2 px-4 py-2 bg-white text-blue-900 font-bold rounded-full border border-blue-900 hover:bg-blue-50 transition" style={{ fontFamily: 'Montserrat, Arial, sans-serif' }} onClick={auth.logout}>Logout</button>
            </div>
          ) : (
            <>
              <button className="ml-4 px-6 py-2 bg-blue-900 text-white font-bold rounded-full hover:bg-blue-800 transition" style={{ backgroundColor: '#0D47A1', fontFamily: 'Montserrat, Arial, sans-serif' }} onClick={() => setShowLogin(true)}>Login</button>
              <button className="ml-2 px-6 py-2 bg-white text-blue-900 font-bold rounded-full border border-blue-900 hover:bg-blue-50 transition" style={{ fontFamily: 'Montserrat, Arial, sans-serif' }} onClick={() => setShowSignup(true)}>Sign Up</button>
            </>
          )}
        </div>
      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fadeIn" onClick={() => setShowLogin(false)}>
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative" style={{ minWidth: '340px', maxWidth: '450px' }} onClick={e => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold" onClick={() => setShowLogin(false)}>&times;</button>
            <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: '#1E3A8A', fontFamily: 'Montserrat, Arial, sans-serif' }}>Login to Your Account</h2>
            <form className="flex flex-col gap-4" onSubmit={async e => {
              e.preventDefault();
              const email = e.target.loginEmail.value;
              const password = e.target.loginPassword.value;
              const res = await auth.login(email, password);
              if (res.success) {
                setShowLogin(false);
              } else {
                alert(res.error);
              }
            }}>
              <div>
                <input type="text" name="loginEmail" className="w-full border-b-2 border-blue-900 py-3 px-2 text-lg focus:outline-none focus:border-blue-700 bg-transparent" placeholder="Email" required />
              </div>
              <div>
                <input type="password" name="loginPassword" className="w-full border-b-2 border-blue-900 py-3 px-2 text-lg focus:outline-none focus:border-blue-700 bg-transparent" placeholder="Password" required />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="rememberMe" className="accent-blue-900" />
                  <label htmlFor="rememberMe" className="text-gray-700">Remember me</label>
                </div>
                <button
                  type="button"
                  className="text-blue-900 text-sm font-semibold hover:underline"
                  onClick={async () => {
                    const email = prompt('Enter your email to reset password:');
                    if (email) {
                      const res = await auth.forgotPassword(email);
                      if (res.success) {
                        alert(res.message);
                      } else {
                        alert(res.error);
                      }
                    }
                  }}
                >Forgot Password?</button>
              </div>
              <button type="submit" className="w-full py-3 font-bold rounded-xl text-white text-lg bg-blue-900 hover:bg-blue-700 transition">Login</button>
              <button type="button" className="w-full py-3 font-bold rounded-xl text-blue-900 border border-gray-400 bg-white hover:bg-gray-100 transition mt-2" onClick={() => setShowLogin(false)}>Cancel</button>
              <div className="flex flex-col items-center gap-2 mt-4">
                <span className="text-gray-500 text-sm">Or login with</span>
                <div className="flex gap-4">
                  <button
                    type="button"
                    className="px-4 py-2 rounded bg-red-500 text-white font-bold hover:bg-red-600 transition"
                    onClick={async () => {
                      const res = await auth.loginWithGoogle();
                      if (res.success) {
                        setShowLogin(false);
                        setShowSignup(false);
                      } else {
                        alert(res.error);
                      }
                    }}
                  >Google</button>
                </div>
              </div>
              <div className="mt-4 text-yellow-700 text-sm text-center">
                <span>Note: You must verify your email before you can log in.</span>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Signup Modal */}
      {showSignup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fadeIn" onClick={() => setShowSignup(false)}>
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative" style={{ minWidth: '340px', maxWidth: '450px' }} onClick={e => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold" onClick={() => setShowSignup(false)}>&times;</button>
            <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: '#1E3A8A', fontFamily: 'Montserrat, Arial, sans-serif' }}>Create an Account</h2>
            <form className="flex flex-col gap-4" onSubmit={async e => {
              e.preventDefault();
              const name = e.target.signupName.value;
              const email = e.target.signupEmail.value;
              const password = e.target.signupPassword.value;
              const confirm = e.target.signupConfirm.value;
              if (password !== confirm) {
                alert('Passwords do not match');
                return;
              }
              const res = await auth.signup(name, email, password);
              if (res.success) {
                alert(res.message || 'Verification email sent. Please check your inbox.');
                setShowSignup(false);
              } else {
                alert(res.error);
              }
            }}>
              <div>
                <input type="text" name="signupName" className="w-full border-b-2 border-blue-900 py-3 px-2 text-lg focus:outline-none focus:border-blue-700 bg-transparent" placeholder="Full Name" required />
              </div>
              <div>
                <input type="email" name="signupEmail" className="w-full border-b-2 border-blue-900 py-3 px-2 text-lg focus:outline-none focus:border-blue-700 bg-transparent" placeholder="Email" required />
              </div>
              <div>
                <input type="password" name="signupPassword" className="w-full border-b-2 border-blue-900 py-3 px-2 text-lg focus:outline-none focus:border-blue-700 bg-transparent" placeholder="Password" required />
              </div>
              <div>
                <input type="password" name="signupConfirm" className="w-full border-b-2 border-blue-900 py-3 px-2 text-lg focus:outline-none focus:border-blue-700 bg-transparent" placeholder="Confirm Password" required />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="terms" required className="accent-blue-900" />
                <label htmlFor="terms" className="text-gray-700">I agree to Terms & Privacy Policy</label>
              </div>
              <button type="submit" className="w-full py-3 font-bold rounded-xl text-white text-lg bg-blue-900 hover:bg-blue-700 transition">Sign Up</button>
              <button type="button" className="w-full py-3 font-bold rounded-xl text-blue-900 border border-gray-400 bg-white hover:bg-gray-100 transition mt-2" onClick={() => setShowSignup(false)}>Cancel</button>
              <div className="flex flex-col items-center gap-2 mt-4">
                <span className="text-gray-500 text-sm">Or sign up with</span>
                <div className="flex gap-4">
                  <button
                    type="button"
                    className="px-4 py-2 rounded bg-red-500 text-white font-bold hover:bg-red-600 transition"
                    onClick={async () => {
                      const res = await auth.loginWithGoogle();
                      if (res.success) {
                        setShowSignup(false);
                        setShowLogin(false);
                      } else {
                        alert(res.error);
                      }
                    }}
                  >Sign up with Google</button>
                </div>
              </div>
              <div className="mt-4 text-blue-900 text-sm text-center">
                <span>After signing up, check your email for a verification link. You must verify your email before you can log in.</span>
              </div>
            </form>
          </div>
        </div>
      )}
      </nav>
      {/* Show user history when logged in */}
      {user && history && history.length > 0 && (
        <section className="w-full max-w-3xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-900" style={{ fontFamily: 'Montserrat, Arial, sans-serif' }}>Your Recent News Checks</h2>
          <div className="grid grid-cols-1 gap-4">
            {history.map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow border border-blue-900 p-4 flex flex-col">
                <div className="font-semibold text-lg text-blue-900 mb-1">{item.headline}</div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-3 py-1 rounded-full font-bold ${item.verdict === 'FAKE' ? 'bg-red-600 text-white' : item.verdict === 'REAL' ? 'bg-green-600 text-white' : 'bg-yellow-500 text-white'}`}>{item.verdict}</span>
                  <span className="text-xs text-gray-500">{item.timestamp ? new Date(item.timestamp).toLocaleString() : ''}</span>
                </div>
                <div className="text-sm text-gray-700 mb-1">Source: {item.source_verification}</div>
              </div>
            ))}
          </div>
        </section>
      )}
      {/* HERO SECTION WITH SLIDESHOW */}
  <section className="w-full relative flex items-center justify-center text-center" style={{marginTop: '60px', minHeight: '70vh', padding: 0}}>
        {/* Slideshow background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden" style={{zIndex: 1}}>
          {slideImages.map((src, idx) => (
            <img
              key={src}
              src={src}
              alt={`Slide ${idx+1}`}
              className={`w-full h-full object-cover transition-opacity duration-1000 ${currentSlide === idx ? 'opacity-100' : 'opacity-0'}`}
              style={{position: 'absolute', top: 0, left: 0, height: '100%', width: '100%'}}
            />
          ))}
          {/* Overlay gradient for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-white/0" style={{zIndex: 2}}></div>
        </div>
        {/* Hero content overlay */}
        <div className="relative z-10 w-full flex flex-col items-center justify-center" style={{paddingTop: '80px', paddingBottom: '80px'}}>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white drop-shadow-lg" style={{ fontFamily: 'Montserrat, Poppins, Arial, sans-serif' }}>Detect Fake News Instantly with AI</h1>
          <p className="text-lg md:text-xl mb-8 text-white drop-shadow-lg" style={{ fontFamily: 'Roboto, Open Sans, Arial, sans-serif' }}>Check the credibility of news articles and headlines with real-time AI + fact-check APIs.</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
            <button
              className="px-8 py-4 bg-blue-600 text-white font-bold rounded-full shadow-lg text-xl hover:bg-blue-700 transition"
              style={{ fontFamily: 'Montserrat, Arial, sans-serif' }}
              onClick={() => {
                if (user && user.emailVerified) {
                  navigate('/app');
                } else {
                  setShowLogin(true);
                  setShowSignup(true);
                }
              }}
            >Try Now</button>
            <button className="px-8 py-4 bg-white text-blue-900 font-bold rounded-full shadow-lg text-xl hover:bg-blue-50 transition border border-blue-900" style={{ fontFamily: 'Montserrat, Arial, sans-serif' }} onClick={() => window.location.href='#about'}>Learn More</button>
          </div>
        </div>
        {/* Scroll Down Arrow at the absolute bottom of hero section, visible after 10 seconds */}
        {showScroll && (
          <div className="w-full flex justify-center absolute left-0 right-0 bottom-0 pb-2" style={{zIndex: 20}}>
            <button
              onClick={() => {
                const el = document.getElementById('how-it-works');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="animate-bounce focus:outline-none"
              aria-label="Scroll down"
              style={{ background: 'none', border: 'none' }}
            >
              <span className="flex items-center justify-center w-16 h-16 rounded-full border border-blue-900 bg-white/60" style={{ borderColor: '#1E3A8A' }}>
                <svg className="w-10 h-10" style={{ color: '#1E3A8A' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>
          </div>
        )}
      </section>
      {/* KEY FEATURES SECTION */}
      <section className="w-full max-w-5xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="bg-blue-50 rounded-xl shadow-lg p-8 flex flex-col items-center">
  <MagnifyingGlassIcon className="h-8 w-8 text-blue-900 mb-4" />
          <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Montserrat, Arial, sans-serif', color: '#1E3A8A' }}>AI-Powered Detection</h3>
          <p className="text-center text-base text-gray-700">Classifies news as Fake, Real, or Uncertain with confidence score.</p>
        </div>
        <div className="bg-blue-50 rounded-xl shadow-lg p-8 flex flex-col items-center">
  <GlobeAltIcon className="h-8 w-8 text-blue-900 mb-4" />
          <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Montserrat, Arial, sans-serif', color: '#1E3A8A' }}>Fact-Check Integration</h3>
          <p className="text-center text-base text-gray-700">Cross-verified with trusted fact-check sources.</p>
        </div>
        <div className="bg-blue-50 rounded-xl shadow-lg p-8 flex flex-col items-center">
  <ChartBarIcon className="h-8 w-8 text-blue-900 mb-4" />
  {/* Removed multi-language icon from Trending Insights for consistency */}
          <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Montserrat, Arial, sans-serif', color: '#1E3A8A' }}>Trending Insights</h3>
          <p className="text-center text-base text-gray-700">See what’s being flagged as fake in real-time.</p>
        </div>
        <div className="bg-blue-50 rounded-xl shadow-lg p-8 flex flex-col items-center">
          <LanguageIcon className="h-8 w-8 text-blue-900 mb-2" />
          <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Montserrat, Arial, sans-serif', color: '#1E3A8A' }}>Multi-Language Support</h3>
          <p className="text-center text-base text-gray-700">Check news in Indian and global languages.</p>
        </div>
      </section>
      {/* HOW IT WORKS SECTION */}
      <section className="w-full max-w-4xl mx-auto px-4 py-12" id="how-it-works">
        <h2 className="text-3xl font-bold mb-10 text-center" style={{ color: '#1E3A8A', fontFamily: 'Montserrat, Arial, sans-serif' }}>How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center">
            <MagnifyingGlassIcon className="h-10 w-10 text-blue-900 mb-4" />
            <span className="font-semibold text-lg text-blue-900">Enter news text or URL</span>
          </div>
          <div className="flex flex-col items-center">
            <ChartBarIcon className="h-10 w-10 text-blue-900 mb-4" />
            <span className="font-semibold text-lg text-blue-900">AI + APIs analyze the claim</span>
          </div>
          <div className="flex flex-col items-center">
            <CheckCircleIcon className="h-10 w-10 text-blue-900 mb-4" />
            <span className="font-semibold text-lg text-blue-900">Get result with confidence & sources</span>
          </div>
          <div className="flex flex-col items-center">
            <GlobeAltIcon className="h-10 w-10 text-blue-900 mb-4" />
            <span className="font-semibold text-lg text-blue-900">Share or explore related news</span>
          </div>
        </div>
      </section>
      {/* WHY CHOOSE US SECTION */}
      <section className="w-full max-w-4xl mx-auto px-4 py-12" id="about">
        <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: '#1E3A8A', fontFamily: 'Montserrat, Arial, sans-serif' }}>Why Choose Us?</h2>
        <p className="text-center text-lg mb-6 text-gray-700">Our system combines advanced AI with trusted fact-check APIs to deliver reliable, real-time news credibility analysis. Used by thousands to spot viral rumors fast.</p>
        <div className="flex flex-wrap justify-center items-center gap-8 mb-6">
          <AcademicCapIcon className="h-10 w-10 text-blue-900" title="AI Models" />
          <ShieldCheckIcon className="h-10 w-10 text-blue-900" title="Fact Check" />
          <NewspaperIcon className="h-10 w-10 text-blue-900" title="NewsAPI" />
          <GlobeAltIcon className="h-10 w-10 text-blue-900" title="GDELT" />
        </div>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <div className="bg-blue-50 rounded-xl shadow p-4 text-blue-900 font-semibold">“Helps identify fake viral rumors fast.”</div>
          <div className="bg-blue-50 rounded-xl shadow p-4 text-blue-900 font-semibold">“Trustworthy and easy to use.”</div>
        </div>
      </section>
      {/* TRENDING NEWS PREVIEW SECTION */}
      <section className="w-full max-w-4xl mx-auto px-4 py-12" id="trending">
        <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: '#1E3A8A', fontFamily: 'Montserrat, Arial, sans-serif' }}>Trending News Preview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center border border-blue-900">
            <span className="font-bold text-lg mb-2 text-blue-900">“New COVID variant discovered in India”</span>
            <span className="px-3 py-1 rounded-full bg-green-600 text-white font-bold">Real</span>
            <a href="#trending" className="mt-2 text-blue-900 underline">View Details</a>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center border border-blue-900">
            <span className="font-bold text-lg mb-2 text-blue-900">“Celebrity death hoax goes viral”</span>
            <span className="px-3 py-1 rounded-full bg-red-600 text-white font-bold">Fake</span>
            <a href="#trending" className="mt-2 text-blue-900 underline">View Details</a>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center border border-blue-900">
            <span className="font-bold text-lg mb-2 text-blue-900">“Government launches new health scheme”</span>
            <span className="px-3 py-1 rounded-full bg-yellow-500 text-white font-bold">Uncertain</span>
            <a href="#trending" className="mt-2 text-blue-900 underline">View Details</a>
          </div>
        </div>
      </section>
      {/* MID-PAGE CTA BANNER */}
      <section className="w-full bg-blue-900 text-white py-10 flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'Montserrat, Arial, sans-serif' }}>Don’t spread misinformation. Verify before you share.</h2>
        <button className="px-8 py-4 bg-blue-600 text-white font-bold rounded-full shadow-lg text-xl hover:bg-blue-700 transition" style={{ fontFamily: 'Montserrat, Arial, sans-serif' }} onClick={() => navigate('/app')}>Check News Now</button>
      </section>
      {/* FOOTER SECTION */}
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
