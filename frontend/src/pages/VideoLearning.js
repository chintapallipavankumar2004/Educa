import React, { useEffect, useState } from 'react';
import '../styles/video.css';

export default function VideoLearning({ onBack }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    fetch('http://localhost:5000/api/videos')
      .then(r=>r.json())
      .then(data => { if(data.ok) setVideos(data.videos || []); })
      .catch(()=>{})
      .finally(()=> setLoading(false));
  },[]);

  return (
    <section className="video-learning">
      <div className="video-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <h2>Video Learning</h2>
      </div>

      {loading ? <p>Loading videos…</p> : (
        <div className="video-list">
          {videos.length === 0 ? <p>No videos yet.</p> : (
            <ul>
              {videos.map(v => (
                <li key={v.id}><a href={v.url} target="_blank" rel="noreferrer">{v.title}</a></li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}
