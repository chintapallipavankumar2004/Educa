import React, { useEffect, useState } from 'react';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
import './styles/global.css';


function App() {
  const [authed, setAuthed] = useState(null);
  useEffect(()=>{
    // check session
    fetch('http://localhost:5000/api/auth/me', { credentials: 'include' })
      .then(r => r.json())
      .then(data => setAuthed(!!data.authenticated))
      .catch(()=> setAuthed(false));
    // no theme persistence — dark mode removed
  },[]);

  if(authed === null) return <div />; // or a loader

  async function handleLogout(){
    try{
      await fetch('http://localhost:5000/api/auth/logout', { method:'POST', credentials:'include' });
    }catch(e){ /* ignore */ }
    setAuthed(false);
  }

  return (
    <div className="App">
  {authed ? <Dashboard onLogout={handleLogout} /> : <Auth onAuthenticated={()=> setAuthed(true)} /> }
    </div>
  );
}

export default App;
