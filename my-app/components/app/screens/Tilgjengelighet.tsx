'use client';

import React from 'react';
import { Button, Card, Switch, WeekGrid, Toast } from '../../ds';
import type { AvailState } from '../../ds';
import { AppIcons as I } from '../icons';
import { AppData as D } from '../data';

const ORDER: (AvailState | undefined)[] = [undefined, 'can', 'want', 'off'];

/** Tilgjengelighet — clickable week grid cycling through 3 availability states. */
export function Tilgjengelighet() {
  const [states, setStates] = React.useState<Record<string, AvailState>>({
    '1-0': 'want',
    '1-1': 'want',
    '2-1': 'can',
    '3-1': 'can',
    '0-2': 'off',
    '4-0': 'can',
    '4-1': 'can',
    '2-3': 'want',
    '3-3': 'can',
    '0-0': 'can',
  });
  const [saved, setSaved] = React.useState(false);
  const [recurring, setRecurring] = React.useState(true);

  const cycle = (d: number, s: number) => {
    const k = `${d}-${s}`;
    const next = ORDER[(ORDER.indexOf(states[k]) + 1) % ORDER.length];
    setStates((p) => {
      const n = { ...p };
      if (next) n[k] = next;
      else delete n[k];
      return n;
    });
    setSaved(false);
  };

  return (
    <div className="app-page">
      <div className="pg-head">
        <div>
          <div className="pg-head__title">Tilgjengelighet</div>
          <div className="pg-head__sub">
            Marker når du kan og ønsker å jobbe. Klikk en rute for å veksle.
          </div>
        </div>
        <div className="pg-head__actions">
          <div className="week-nav">
            <button className="week-navbtn">
              <I.chevL />
            </button>
            <span className="week-nav__label">Uke 23 · 2.–8. juni</span>
            <button className="week-navbtn">
              <I.chevR />
            </button>
          </div>
          <Button onClick={() => setSaved(true)}>Lagre</Button>
        </div>
      </div>

      <Card elevation="shadow" padded={false}>
        <div style={{ padding: '16px 16px 0' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 14,
              flexWrap: 'wrap',
              gap: 12,
            }}
          >
            <div className="legend">
              <span>
                <i
                  style={{
                    background: 'var(--avail-can-bg)',
                    borderColor: 'var(--avail-can-line)',
                  }}
                />
                Kan jobbe
              </span>
              <span>
                <i
                  style={{
                    background: 'var(--avail-want-bg)',
                    borderColor: 'var(--avail-want-line)',
                  }}
                />
                Ønsker å jobbe
              </span>
              <span>
                <i
                  style={{
                    background: 'var(--avail-off-bg)',
                    borderColor: 'var(--avail-off-line)',
                  }}
                />
                Utilgjengelig
              </span>
            </div>
            <Switch
              label="Gjentas hver uke"
              checked={recurring}
              onChange={(e) => setRecurring(e.target.checked)}
            />
          </div>
        </div>
        <div style={{ padding: '0 16px 16px' }}>
          <WeekGrid
            days={D.days}
            slots={D.slots}
            states={states}
            onCellClick={cycle}
          />
        </div>
      </Card>

      <p className="muted" style={{ fontSize: 'var(--fs-sm)', marginTop: 14 }}>
        Tips: ett klikk = «kan jobbe», to = «ønsker å jobbe», tre =
        «utilgjengelig».
      </p>

      {saved && (
        <div className="toast-fixed">
          <Toast
            variant="success"
            title="Lagret"
            onClose={() => setSaved(false)}
          >
            Admin ser nå tilgjengeligheten din.
          </Toast>
        </div>
      )}
    </div>
  );
}
