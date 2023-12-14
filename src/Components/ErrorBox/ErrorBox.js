import React from 'react';
import './ErrorBox.css';

export default function ErrorBox({ message }) {
  return (
    <div className="cms-empty-err">
      <h1>{message}</h1>
    </div>
  );
}
