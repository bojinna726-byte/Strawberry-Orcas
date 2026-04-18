import { useEffect, useState } from 'react';

function Toast({ message, visible, onHide }) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onHide();
      }, 2400);
      return () => clearTimeout(timer);
    }
  }, [visible, onHide]);

  return (
    <div style={{
      position: 'fixed',
      bottom: 72,
      left: '50%',
      transform: `translateX(-50%) translateY(${visible ? 0 : 6}px)`,
      background: 'var(--text-1)',
      color: 'white',
      padding: '9px 18px',
      borderRadius: 'var(--r-full)',
      fontSize: 13,
      fontWeight: 500,
      whiteSpace: 'nowrap',
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.22s ease, transform 0.22s ease',
      pointerEvents: 'none',
      zIndex: 300,
      boxShadow: 'var(--shadow-lg)',
    }}>
      {message}
    </div>
  );
}

export default Toast;

/* Hook to use toast easily from any component */
export function useToast() {
  const [toast, setToast] = useState({ message: '', visible: false });

  const showToast = (message) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 2400);
  };

  return { toast, showToast };
}
