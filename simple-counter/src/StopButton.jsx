import React from 'react';

function StopButton({ onStop }) {
  return (
    <button onClick={onStop}>Detener</button>
  );
}

export default StopButton;
