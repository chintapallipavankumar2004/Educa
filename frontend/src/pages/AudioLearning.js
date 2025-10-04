import React from 'react';
import '../styles/audio.css';

export default function AudioLearning({ onBack }) {
  const tracks = [
    { title: 'Calm breathing (short)', url: 'https://www.youtube.com/watch?v=Z1RJmh_OqeA' },
    { title: 'Guided sleep meditation (dummy)', url: 'https://www.youtube.com/watch?v=Z1RJmh_OqeA' },
    { title: 'Nature soundscapes (dummy)', url: 'https://www.youtube.com/watch?v=Z1RJmh_OqeA' }
  ];

  return (
    <section className="audio-learning">
      <div className="audio-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <h2>Audio Learning</h2>
      </div>

      <div className="audio-list">
        {tracks.map((t, i) => (
          <div className="track" key={i}>
            <div className="track-info">
              <div className="track-title">{t.title}</div>
            </div>
            <div>
              <a className="open-link" href={t.url} target="_blank" rel="noreferrer">Open</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
