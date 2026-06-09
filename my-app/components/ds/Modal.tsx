'use client';

import React from 'react';

export interface ModalProps {
  open?: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'md' | 'lg';
}

/** Modal — centered dialog with scrim, header, body, footer. */
export function Modal({
  open = true,
  onClose,
  title,
  subtitle,
  children,
  footer,
  size = 'md',
}: ModalProps) {
  if (!open) return null;
  return (
    <div
      className="bdu-modal__scrim"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`bdu-modal ${size === 'lg' ? 'bdu-modal--lg' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bdu-modal__head">
          <div>
            {title && <div className="bdu-modal__title">{title}</div>}
            {subtitle && <div className="bdu-modal__sub">{subtitle}</div>}
          </div>
          {onClose && (
            <button
              className="bdu-modal__x"
              onClick={onClose}
              aria-label="Lukk"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        <div className="bdu-modal__body">{children}</div>
        {footer && <div className="bdu-modal__foot">{footer}</div>}
      </div>
    </div>
  );
}
