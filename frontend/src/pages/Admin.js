import React, { useState, useEffect } from 'react';
import '../styles/admin.css';

export default function Admin(){
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminResp, setAdminResp] = useState(null);
  const [video, setVideo] = useState({ title:'', url:'' });
  const [image, setImage] = useState({ title:'', url:'' });
  const [promote, setPromote] = useState({ email:'', secret:'' });
  const [videosList, setVideosList] = useState([]);
  const [imagesList, setImagesList] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:5000/api/admin/me', { credentials: 'include' }).then(r=>r.json()).then(d=>{ setAdminResp(d); if(d && d.is_admin) setIsAdmin(true); });
  },[]);

  function addVideo(e){
    e.preventDefault();
    fetch('http://localhost:5000/api/admin/videos', { method:'POST', credentials:'include', headers:{'Content-Type':'application/json'}, body:JSON.stringify(video) })
      .then(r=>r.json()).then(d=>{ if(d.ok) { alert('Video added'); setVideo({title:'',url:''}); } else alert(d.error||'Failed'); }).catch(()=>alert('Failed'));
  }

  function addImage(e){
    e.preventDefault();
    fetch('http://localhost:5000/api/admin/images', { method:'POST', credentials:'include', headers:{'Content-Type':'application/json'}, body:JSON.stringify(image) })
      .then(r=>r.json()).then(d=>{ if(d.ok) { alert('Image added'); setImage({title:'',url:''}); } else alert(d.error||'Failed'); }).catch(()=>alert('Failed'));
  }

  function doPromote(e){
    e.preventDefault();
    fetch('http://localhost:5000/api/admin/promote', { method:'POST', credentials:'include', headers:{'Content-Type':'application/json'}, body:JSON.stringify(promote) })
      .then(r=>r.json()).then(d=>{ if(d.ok) { alert('User promoted'); setPromote({email:'',secret:''}); } else alert(d.error||'Failed'); }).catch(()=>alert('Failed'));
  }

  function loadLists(){
    fetch('http://localhost:5000/api/videos').then(r=>r.json()).then(d=>setVideosList(d || []));
    fetch('http://localhost:5000/api/images').then(r=>r.json()).then(d=>setImagesList(d || []));
  }

  if(!isAdmin) return (
    <div className="admin-page">
      <p>You must be an admin to access this page.</p>
      <pre className="admin-debug">{JSON.stringify(adminResp, null, 2)}</pre>
    </div>
  );

  return (
    <div className="admin-page">
      <h2>Admin — Add Content</h2>

      <section className="admin-section">
        <h3>Add Video</h3>
        <form onSubmit={addVideo} className="admin-form">
          <input placeholder="Title" value={video.title} onChange={e=>setVideo({...video,title:e.target.value})} required />
          <input placeholder="YouTube URL" value={video.url} onChange={e=>setVideo({...video,url:e.target.value})} required />
          <button type="submit">Add Video</button>
        </form>
      </section>

      <section className="admin-section">
        <h3>Add Image</h3>
        <form onSubmit={addImage} className="admin-form">
          <input placeholder="Title" value={image.title} onChange={e=>setImage({...image,title:e.target.value})} required />
          <input placeholder="Image URL" value={image.url} onChange={e=>setImage({...image,url:e.target.value})} required />
          <button type="submit">Add Image</button>
        </form>
      </section>

      <section className="admin-section">
        <h3>Promote user (admin secret)</h3>
        <form onSubmit={doPromote} className="admin-form">
          <input placeholder="User email" value={promote.email} onChange={e=>setPromote({...promote,email:e.target.value})} required />
          <input placeholder="Admin secret" value={promote.secret} onChange={e=>setPromote({...promote,secret:e.target.value})} required />
          <button type="submit">Promote</button>
        </form>
      </section>

      <section className="admin-section">
        <h3>Content lists</h3>
        <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
          <button className="btn" onClick={loadLists}>Load lists</button>
        </div>
        <div style={{marginTop:12}}>
          <h4>Videos</h4>
          <ul>{videosList.map((v,i)=>(<li key={i}>{v.title || v.url}</li>))}</ul>
          <h4>Images</h4>
          <ul>{imagesList.map((v,i)=>(<li key={i}>{v.title || v.url}</li>))}</ul>
        </div>
      </section>
    </div>
  );
}
