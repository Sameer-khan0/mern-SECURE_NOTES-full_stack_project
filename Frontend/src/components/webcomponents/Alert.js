import React, { useEffect } from 'react';

const defaultStyle = {
  width:'8rem',
  heigth:'4rem',
  position: 'fixed',
  top: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  padding: '10px',
  borderRadius: '4px',
  boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#f44336',
  color: 'white',
  display: 'none',
};

export default function Alert(props) {
  const { message } = props;

  useEffect(() => {
    const timer = setTimeout(() => {
    }, 3000);

    return () => clearTimeout(timer);
  }, [props]);
  
  return (
    <div style={{ ...defaultStyle, display: message ? 'block' : 'none' }}>
      {message && <p style={{ margin: 0 }}>{message}</p>}
    </div>
  );
}
