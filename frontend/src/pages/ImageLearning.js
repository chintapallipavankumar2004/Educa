import React, { useEffect, useState } from 'react';
import '../styles/image.css';

export default function ImageLearning({ onBack }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    fetch('http://localhost:5000/api/images')
      .then(r=>r.json())
      .then(data => { if(data.ok) setImages(data.images || []); })
      .catch(()=>{})
      .finally(()=> setLoading(false));
  },[]);

  return (
    <section className="image-learning">
      <div className="image-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <h2>Image Learning</h2>
      </div>

      {loading ? <p>Loading images…</p> : (
        <div className="image-grid">
          {images.length === 0 ? <p>No images yet.</p> : (
            images.map(img => (
              <a key={img.id} className="image-thumb" href={img.url} target="_blank" rel="noreferrer" title={img.title} style={{backgroundImage:`url(${img.url})`}} />
            ))
          )}
        </div>
      )}
    </section>
  );
}
