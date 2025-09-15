import React, { useState } from 'react';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

export default function Contact() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', report: false });
  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };
  const handleSubmit = e => {
    e.preventDefault();
    // You can add form submission logic here
    alert('Thank you for contacting us!');
    setForm({ name: '', email: '', subject: '', message: '', report: false });
  };
  return (
    <div className="min-h-screen w-full bg-white flex flex-col" style={{ fontFamily: 'Roboto, Open Sans, Arial, sans-serif' }}>
      {/* Navbar */}
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
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center justify-center text-center py-16 px-4" style={{ background: 'linear-gradient(90deg, #e3f0ff 0%, #f8fbff 100%)', minHeight: '320px' }}>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2" style={{ fontFamily: 'Montserrat, Poppins, Arial, sans-serif', color: '#1E3A8A' }}>Get in Touch</h1>
          <p className="text-lg md:text-xl mb-2 text-gray-700" style={{ fontFamily: 'Roboto, Open Sans, Arial, sans-serif' }}>Have questions, feedback, or spotted an issue? We’d love to hear from you.</p>
        </div>
      </section>
      {/* Contact Info Cards */}
      <section className="w-full max-w-3xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
  <EnvelopeIcon className="h-8 w-8 text-blue-900 mb-2" />
          <span className="font-bold text-lg mb-1">Email</span>
          <span className="text-gray-700 text-base">support@fakenewsdetector.com</span>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
  <PhoneIcon className="h-8 w-8 text-blue-900 mb-2" />
          <span className="font-bold text-lg mb-1">Phone</span>
          <span className="text-gray-700 text-base">+91-XXXXXXXXXX</span>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
  <MapPinIcon className="h-8 w-8 text-blue-900 mb-2" />
          <span className="font-bold text-lg mb-1">Location</span>
          <span className="text-gray-700 text-base">India</span>
        </div>
      </section>
      {/* Contact Form */}
      <section className="w-full max-w-2xl mx-auto px-4 py-8">
        <form className="bg-white rounded-xl shadow-lg p-8 flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="relative">
            <input type="text" name="name" value={form.name} onChange={handleChange} required className="peer w-full border-b-2 border-blue-900 py-3 px-2 text-lg focus:outline-none focus:border-blue-700 bg-transparent" placeholder=" " />
            <label className="absolute left-2 top-3 text-gray-500 peer-focus:text-blue-900 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:text-sm">Name</label>
          </div>
          <div className="relative">
            <input type="email" name="email" value={form.email} onChange={handleChange} required className="peer w-full border-b-2 border-blue-900 py-3 px-2 text-lg focus:outline-none focus:border-blue-700 bg-transparent" placeholder=" " />
            <label className="absolute left-2 top-3 text-gray-500 peer-focus:text-blue-900 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:text-sm">Email</label>
          </div>
          <div className="relative">
            <input type="text" name="subject" value={form.subject} onChange={handleChange} required className="peer w-full border-b-2 border-blue-900 py-3 px-2 text-lg focus:outline-none focus:border-blue-700 bg-transparent" placeholder=" " />
            <label className="absolute left-2 top-3 text-gray-500 peer-focus:text-blue-900 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:text-sm">Subject</label>
          </div>
          <div className="relative">
            <textarea name="message" value={form.message} onChange={handleChange} required rows={5} className="peer w-full border-b-2 border-blue-900 py-3 px-2 text-lg focus:outline-none focus:border-blue-700 bg-transparent resize-none" placeholder=" "></textarea>
            <label className="absolute left-2 top-3 text-gray-500 peer-focus:text-blue-900 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:text-sm">Message</label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" name="report" checked={form.report} onChange={handleChange} className="accent-blue-900" id="report-fake-news" />
            <label htmlFor="report-fake-news" className="text-gray-700">Report Fake News</label>
          </div>
          <button type="submit" className="w-full py-4 px-8 font-bold rounded-xl text-white text-xl flex items-center justify-center bg-blue-900 hover:bg-blue-700 transition" style={{ fontFamily: 'Montserrat, Poppins, Arial, sans-serif', minWidth: '220px' }}>Submit</button>
        </form>
      </section>
      {/* Collaboration Section */}
      <section className="w-full max-w-2xl mx-auto px-4 py-8 flex flex-col items-center">
        <div className="bg-blue-50 rounded-xl shadow p-6 text-blue-900 font-semibold text-center mb-4">We welcome collaboration with researchers, journalists, and organizations working to fight misinformation.</div>
        <button className="px-8 py-3 bg-blue-900 text-white font-bold rounded-full shadow-lg text-lg hover:bg-blue-700 transition" style={{ fontFamily: 'Montserrat, Arial, sans-serif' }}>Partner With Us</button>
      </section>
      {/* Privacy Note */}
      <section className="w-full max-w-xl mx-auto px-4 py-4">
        <div className="bg-yellow-100 rounded-xl shadow p-4 text-gray-800 text-center text-sm font-semibold">Your contact details are safe. We only use them to respond to your queries.</div>
      </section>
      <footer className="w-full py-6 text-center text-black mt-8" style={{ color: '#111', fontFamily: 'Roboto, Open Sans, Arial, sans-serif' }}>
        &copy; {new Date().getFullYear()} Fake News Detector. All rights reserved.
      </footer>
    </div>
  );
}
