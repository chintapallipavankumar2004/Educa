import React from 'react';
import '../styles/home.css';

const FEATURES = [
  { title: 'Cross Platform', text: 'Download the app for a better mobile experience', icon: '📱' },
  { title: 'Certificate', text: 'Get a printable certificate on course completion', icon: '🎓' },
  { title: 'Offline Mode', text: 'Download courses and learn offline', icon: '☁️' },
];

const COURSES = [
  { title: 'Organic Agriculture', img: '/images/imageLearning/img1.jpg' },
  { title: 'Crop Protection', img: '/images/imageLearning/img2.jpg' },
  { title: 'Traceability', img: '/images/imageLearning/img3.jpg' },
  { title: 'Ethical Production', img: '/images/imageLearning/img4.jpg' },
];

export default function Home() {
  return (
    <main className="home-page">
      <section className="metrics container">
        <div className="metric-card surface">
          <div className="metric-value">12,482</div>
          <div className="metric-label">Learners enrolled</div>
        </div>
        <div className="metric-card surface">
          <div className="metric-value">128</div>
          <div className="metric-label">Courses available</div>
        </div>
        <div className="metric-card surface">
          <div className="metric-value">4,230</div>
          <div className="metric-label">Certificates issued</div>
        </div>
        <div className="metric-card surface">
          <div className="metric-value">342</div>
          <div className="metric-label">Active today</div>
        </div>
      </section>

      <section className="hero" style={{backgroundImage: "url('/images/imageLearning/img5.webp')"}}>
        <div className="hero-inner container">
          <div className="hero-copy">
            <h1>Vocational training for the next generation of sustainable agri-food</h1>
            <p className="lead">Practical courses, quality learning materials and certificates to support sustainable farming practices.</p>
            <div className="hero-cta">
              <a className="btn primary" href="#courses">Join Now</a>
              <button className="btn ghost" aria-label="Play Video">▶ Play Video</button>
            </div>
          </div>
        </div>
      </section>

      <section className="features container">
        {FEATURES.map((f) => (
          <div className="feature" key={f.title}>
            <div className="feature-icon">{f.icon}</div>
            <h4>{f.title}</h4>
            <p className="muted">{f.text}</p>
          </div>
        ))}
      </section>

      <section id="courses" className="courses container">
        <h2>Top courses</h2>
        <div className="courses-grid">
          {COURSES.map(c => (
            <article key={c.title} className="course-card surface">
              <div className="course-media" style={{backgroundImage:`url('${c.img}')`}} />
              <div className="course-body">
                <h5>{c.title}</h5>
                <p className="muted">Short description about this topic and what you'll learn.</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="testimonials container">
        <h2>What our users say</h2>
        <div className="testimonial-grid">
          <blockquote className="testimonial surface">
            <p>"Educa helped me learn practical techniques I use on my farm every day. The courses are clear and actionable."</p>
            <footer className="muted">— A happy learner</footer>
          </blockquote>
          <blockquote className="testimonial surface">
            <p>"The offline mode was a game changer when I was in the field with limited reception."</p>
            <footer className="muted">— Field technician</footer>
          </blockquote>
        </div>
      </section>

      <section className="faq container">
        <h2>Frequently asked Questions</h2>
        <details>
          <summary>Who can register on the platform?</summary>
          <div className="muted">Anyone interested in sustainable agriculture and food systems — learners, extension workers and organisations.</div>
        </details>
        <details>
          <summary>How do I download the courses for offline use?</summary>
          <div className="muted">Open a course, select the download icon on lessons you need, and access them from the Offline section.</div>
        </details>
      </section>

      <section className="about container surface">
        <h3>About Educa</h3>
        <p className="muted">Educa is a learning platform focused on vocational training for the agri-food sector. We provide concise, practical modules, assessments and printable certificates to support continuous professional development.</p>
      </section>
    </main>
  );
}
