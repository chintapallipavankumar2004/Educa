import React, { useState } from 'react';
import TopNav from '../components/TopNav';
import SideNav from '../components/SideNav';
import Courses from './Courses';
import VideoLearning from './VideoLearning';
import AudioLearning from './AudioLearning';
import ImageLearning from './ImageLearning';
import Contact from './Contact';
import ComfortRoom from './ComfortRoom';
import Admin from './Admin';
import '../styles/dashboard.css';

export default function Dashboard({ onLogout }) {
  const [sideOpen, setSideOpen] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [selectedPage, setSelectedPage] = useState('dashboard');

  function toggleSide() {
    setSideOpen((s) => !s);
  }

  function toggleProfile() {
    setShowProfile((s) => !s);
  }

  return (
    <div className={`dashboard`}>
      <TopNav onProfileToggle={toggleProfile} showProfile={showProfile} onMenu={toggleSide} onLogout={onLogout} />
      <div className="dashboard-body">
        <SideNav open={sideOpen} onSelect={(page) => setSelectedPage(page)} />
        <main className={`dashboard-main ${sideOpen ? 'with-side' : 'full'}`}>
          {selectedPage === 'courses' ? (
            <Courses onOpen={(which) => { if (which === 'video') setSelectedPage('video'); if (which==='audio') setSelectedPage('audio'); if(which==='image') setSelectedPage('image'); }} />
          ) : selectedPage === 'video' ? (
            <VideoLearning onBack={() => setSelectedPage('courses')} />
          ) : selectedPage === 'audio' ? (
            <AudioLearning onBack={() => setSelectedPage('courses')} />
          ) : selectedPage === 'image' ? (
            <ImageLearning onBack={() => setSelectedPage('courses')} />
          ) : selectedPage === 'comfort' ? (
            <ComfortRoom />
          ) : selectedPage === 'contact' ? (
            <Contact />
          ) : selectedPage === 'admin' ? (
            <Admin />
          ) : (
            <>
              <h2>Dashboard</h2>
              <p>Welcome back — this is your dashboard. The side nav can be opened/closed.
              Click <strong>Home</strong> to go to the main page.</p>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
