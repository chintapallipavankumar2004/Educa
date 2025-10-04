import React from 'react';
import '../styles/courses.css';

export default function Courses({ onOpen }) {
  return (
    <section className="courses-page polished" aria-label="Courses">
      <div className="courses-grid-polished">
        <article className="big-card video-card" tabIndex={0} role="button" onClick={() => onOpen && onOpen('video')} onKeyDown={(e)=>{ if(e.key==='Enter') onOpen && onOpen('video')}}>
          <h3>Video Learning</h3>
          <div className="media video-thumb" role="img" aria-label="Video thumbnail">
            <div className="play-overlay">►</div>
          </div>
          <p className="card-desc">Mindfulness through Nature Visuals</p>
        </article>

        <article className="big-card audio-card" tabIndex={0} role="button" onClick={() => onOpen && onOpen('audio')} onKeyDown={(e)=>{ if(e.key==='Enter') onOpen && onOpen('audio')}}>
          <h3>Audio Learning</h3>
          <div className="media audio-wave" role="img" aria-label="Audio waveform">
            <svg viewBox="0 0 200 40" preserveAspectRatio="none"><path d="M0 20 Q15 5 30 20 T60 20 T90 20 T120 20 T150 20 T180 20 T200 20" stroke="#4aa3a3" strokeWidth="3" fill="none"/></svg>
          </div>
          <p className="card-desc">Guided Meditations & Soundscapes</p>
        </article>

        <article className="big-card image-card" tabIndex={0} role="button" onClick={() => onOpen && onOpen('image')} onKeyDown={(e)=>{ if(e.key==='Enter') onOpen && onOpen('image')}}>
          <h3>Image Learning</h3>
          <div className="media image-collage" role="img" aria-label="Image collage">
            <div className="img-grid">
              <div className="img small" />
              <div className="img small" />
              <div className="img small" />
              <div className="img small" />
            </div>
          </div>
          <p className="card-desc">Inspirational Visuals & Art Therapy</p>
        </article>
      </div>

      <div className="help-text">Designed for easy, calming access — large targets, clear icons and soft contrast.</div>
    </section>
  );
}
