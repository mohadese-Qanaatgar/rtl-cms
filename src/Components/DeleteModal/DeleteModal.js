import React, { useEffect } from 'react';
import './DeleteModal.css';
import ReactDOM from 'react-dom';

export default function DeleteModal({ cancelAction, submitAction, title }) {
  useEffect(() => {
    const checkkey = (event) => {
      if (event.keyCode == 27) {
        cancelAction();
      }
    };
    window.addEventListener('keydown', checkkey);
    return () => window.removeEventListener('keydown', checkkey);
  });

  return ReactDOM.createPortal(
    <div className="modal-parent active">
      <div className="delete-modal">
        <h1 className="delete-modal-title">{title}</h1>
        <div className="btn-wrapper">
          <button className="modal-btn accept-btn" onClick={submitAction}>
            بله
          </button>
          <button className="modal-btn reject-btn" onClick={cancelAction}>
            خیر
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('modals-parent')
  );
}
