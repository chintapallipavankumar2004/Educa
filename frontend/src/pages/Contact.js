import React, { useState } from 'react';
import '../styles/contact.css';

export default function Contact({ onBack }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // send to server
    fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    }).then(r => r.json()).then(data => {
      if(data && data.ok){ setSent(true); setForm({ name:'', email:'', message:'' }); setTimeout(()=> setSent(false), 3000); }
      else { alert(data && data.error ? data.error : 'Send failed'); }
    }).catch(err => { console.error(err); alert('Send failed'); });
  }

  return (
    <section className="contact-page">
      <div className="contact-inner">
        <div className="disclaimer">
          <strong>Crisis Support Disclaimer</strong>
          <p>If you are in immediate danger or require urgent help, please contact local emergency services or a crisis hotline immediately. This site is not a replacement for professional care.</p>
        </div>

        <div className="contact-main">
          <form className="contact-form" onSubmit={handleSubmit}>
            <label className="field">
              <span>Name</span>
              <input name="name" value={form.name} onChange={handleChange} />
            </label>

            <label className="field">
              <span>Email</span>
              <input name="email" value={form.email} onChange={handleChange} />
            </label>

            <label className="field">
              <span>Message</span>
              <textarea name="message" value={form.message} onChange={handleChange} rows={6} />
            </label>

            <div className="row">
              <button className="send-btn" type="submit">Send Message</button>
              <div className="reassure">We'll reply within 24 hours.</div>
            </div>

            {sent && <div className="sent">Message sent — thank you.</div>}
          </form>

          <aside className="contact-side">
            <div className="contact-info">
              <div className="info-item">📧 <a href="mailto:chintapallipavankumar2004@gmail.com">chintapallipavankumar2004@gmail.com</a></div>
              <div className="info-item">📞 <a href="tel:+1234567890">+91 7893504891</a></div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
