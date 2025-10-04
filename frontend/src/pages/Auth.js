import React, { useState, useEffect } from 'react';
import '../styles/auth.css';

export default function Auth({ onAuthenticated }) {
  const [tab, setTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(()=>{
    setMessage(null);
  },[tab]);

  async function doLogin(e){
    e.preventDefault();
    setLoading(true); setMessage(null);
    try{
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if(res.ok && data.ok){
        setMessage('Logged in');
        if(onAuthenticated) onAuthenticated();
      }else{
        setMessage(data.error || 'Invalid email or password');
      }
    }catch(err){
      setMessage('Server error');
    }finally{ setLoading(false); }
  }

  async function doRegister(e){
    e.preventDefault();
    setLoading(true); setMessage(null);
    if(password !== confirm){ setMessage('Passwords do not match'); setLoading(false); return; }
    try{
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if(res.ok && data.ok){
        setMessage('Account created successfully! Please log in.');
        setTab('login');
      }else{
        setMessage(data.error || 'Unable to create account');
      }
    }catch(err){ setMessage('Server error'); }
    finally{ setLoading(false); }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Welcome</h1>
        <div className="tabs">
          <button className={tab==='login'? 'active':''} onClick={()=>setTab('login')}>Log In</button>
          <button className={tab==='signup'? 'active':''} onClick={()=>setTab('signup')}>Sign Up</button>
        </div>

        {message && <div className="auth-message">{message}</div>}

        {tab === 'login' ? (
          <form onSubmit={doLogin} className="auth-form">
            <label>Email Address<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/></label>
            <label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required/></label>
            <button type="submit" className="primary" disabled={loading}>Log In</button>
            <button type="button" className="forgot" onClick={()=>alert('Password reset flow not implemented')}>Forgot Password?</button>
          </form>
        ) : (
          <form onSubmit={doRegister} className="auth-form">
            <label>Email Address<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/></label>
            <label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required/></label>
            <label>Confirm Password<input type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} required/></label>
            <button type="submit" className="primary" disabled={loading}>Create Account</button>
          </form>
        )}

      </div>
    </div>
  );
}
