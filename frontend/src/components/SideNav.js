import React from 'react';
import './sidenav.css';

export default function SideNav({ open, onSelect }) {
  function select(name) {
    if (onSelect) onSelect(name);
  }

  return (
    <aside className={`sidenav ${open ? 'open' : 'closed'}`}>
      <nav className="sidenav-nav" aria-hidden={!open}>
        <ul>
          <li className="nav-item" onClick={() => select('home')}>Home</li>
          <li className="nav-item" onClick={() => select('courses')}>Courses</li>
          <li className="nav-item" onClick={() => select('comfort')}>Comfort Room</li>
          <li className="nav-item" onClick={() => select('contact')}>Contact</li>
          <li className="nav-item" onClick={() => select('admin')}>Admin</li>
          <li className="nav-item" onClick={() => select('settings')}>Settings</li>
        </ul>
      </nav>
    </aside>
  );
}
