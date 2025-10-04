import React, { useState, useEffect } from 'react';
import '../styles/comfort.css';

const comfortMessages = [
  'Breathe deeply — you are safe in this moment.',
  'Small steps are progress. Be kind to yourself.',
  'Notice one thing that brings you calm.',
  'It’s okay to pause. You don’t have to do everything now.',
  'You are not alone. Take a gentle breath.'
];

export default function ComfortRoom() {
  const [audioSrc, setAudioSrc] = useState(null);
  const [time, setTime] = useState(new Date());
  const [message, setMessage] = useState(comfortMessages[0]);

  useEffect(()=>{
    const t = setInterval(()=> setTime(new Date()), 1000);
    return ()=> clearInterval(t);
  },[]);

  // cycle motivational messages randomly
  useEffect(()=>{
    const id = setInterval(()=>{
      setMessage(prev => {
        let next = prev;
        while(next === prev){
          next = comfortMessages[Math.floor(Math.random()*comfortMessages.length)];
        }
        return next;
      });
    }, 5000);
    return ()=> clearInterval(id);
  },[]);

  function handleFile(e){
    const file = e.target.files && e.target.files[0];
    if(!file) return;
    const url = URL.createObjectURL(file);
    setAudioSrc(url);
  }

  return (
    <section
      className="comfort-room"
      style={{
        backgroundImage: `linear-gradient(rgba(8,8,12,0.65), rgba(8,8,12,0.45)), url(${process.env.PUBLIC_URL}/images/peace.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="comfort-inner">
          <div className="comfort-left">
            <h2>Comfort Room</h2>

            <div className="audio-control">
              <label className="file-label" htmlFor="comfort-audio">Choose audio from device</label>
              <input id="comfort-audio" type="file" accept="audio/*" onChange={handleFile} />
              {audioSrc && (
                <audio controls src={audioSrc} style={{width:'100%'}} />
              )}
            </div>

            <div className="clock">Current time: {time.toLocaleTimeString()}</div>
          </div>

        <aside className="comfort-side">
        </aside>
      </div>

      {/* centered quote pill beneath the card */}
      <div style={{display:'flex', justifyContent:'center'}}>
        <div
          className="quote-pill"
          role="status"
          aria-live="polite"
          onClick={() => {
            setMessage(m => { let next = m; while(next===m) next = comfortMessages[Math.floor(Math.random()*comfortMessages.length)]; return next; });
          }}
        >
          "{message}"
        </div>
      </div>
    </section>
  );
}
