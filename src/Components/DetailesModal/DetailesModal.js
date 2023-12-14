import React, { useEffect } from 'react';
import './DetailesModal.css';

export default function DetailesModal({ onHide, children }) {
  useEffect(() => {
    const checkkey = (event) => {
      if (event.keyCode == 27) {
        onHide();
      }
    };
    window.addEventListener('keydown', checkkey);
    return () => window.removeEventListener('keydown', checkkey);
  });
  return (
    <div className="modal-parent active">
      <div className="detailes-modal ">{children}</div>
    </div>
  );
}
