import React from 'react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">© {new Date().getFullYear()} euca</div>
    </footer>
  );
}
