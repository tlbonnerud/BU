'use client';

import React from 'react';

export type ToastVariant = 'success' | 'error' | 'info';

export interface ToastProps {
  variant?: ToastVariant;
  title?: React.ReactNode;
  children?: React.ReactNode;
  onClose?: () => void;
}

const ICONS: Record<ToastVariant, React.ReactNode> = {
  success: <path d="M20 6 9 17l-5-5" />,
  error: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4M12 16h.01" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </>
  ),
};

/** Toast — transient notification. Wrap multiple in <ToastStack>. */
export function Toast({
  variant = 'success',
  title,
  children,
  onClose,
}: ToastProps) {
  return (
    <div className="bdu-toast" role="status">
      <span className={`bdu-toast__icon bdu-toast__icon--${variant}`}>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {ICONS[variant]}
        </svg>
      </span>
      <div className="bdu-toast__body">
        {title && <div className="bdu-toast__title">{title}</div>}
        {children && <div className="bdu-toast__msg">{children}</div>}
      </div>
      {onClose && (
        <button className="bdu-toast__x" onClick={onClose} aria-label="Lukk">
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

/** ToastStack — fixed bottom-right container for toasts. */
export function ToastStack({ children }: { children?: React.ReactNode }) {
  return <div className="bdu-toast-stack">{children}</div>;
}
