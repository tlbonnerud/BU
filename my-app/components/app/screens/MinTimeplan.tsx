'use client';

import React from 'react';
import { Button, Card, Badge, WeekGrid, ShiftBlock, Modal } from '../../ds';
import { AppIcons as I } from '../icons';
import { AppData as D } from '../data';

interface ShiftDetail {
  time: string;
  role: string;
  dur: string;
  date: string;
}

/** Min timeplan — week grid of assigned shifts with a shift-detail modal. */
export function MinTimeplan() {
  const [detail, setDetail] = React.useState<ShiftDetail | null>(null);
  const shifts: Record<string, ShiftDetail> = {
    '0-0': { time: '08–12', role: 'Resepsjon', dur: '4 t', date: 'Mandag 2. juni' },
    '1-0': { time: '08–12', role: 'Resepsjon', dur: '4 t', date: 'Tirsdag 3. juni' },
    '2-2': { time: '12–16', role: 'Kjøkken', dur: '4 t', date: 'Onsdag 4. juni' },
    '4-1': { time: '10–18', role: 'Salg', dur: '8 t', date: 'Fredag 6. juni' },
  };

  return (
    <div className="app-page">
      <div className="pg-head">
        <div>
          <div className="pg-head__title">Min timeplan</div>
          <div className="pg-head__sub">
            Vaktene dine for valgt periode. Klikk en vakt for detaljer.
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
          <Badge tone="brand">20 t denne uken</Badge>
        </div>
      </div>

      <Card elevation="shadow" padded={false}>
        <div style={{ padding: 16 }}>
          <WeekGrid
            days={D.days}
            slots={D.slots}
            cell={(d, s) => {
              const sh = shifts[`${d}-${s}`];
              return sh ? (
                <ShiftBlock
                  time={sh.time}
                  role={sh.role}
                  onClick={() => setDetail(sh)}
                />
              ) : null;
            }}
          />
        </div>
      </Card>

      <Modal
        open={!!detail}
        onClose={() => setDetail(null)}
        title="Vaktdetaljer"
        subtitle={detail?.date}
        footer={
          <>
            <Button variant="tertiary" onClick={() => setDetail(null)}>
              Lukk
            </Button>
            <Button variant="secondary">Be om bytte</Button>
          </>
        }
      >
        {detail && (
          <div className="shift-detail" style={{ paddingBottom: 8 }}>
            <div className="shift-detail__line">
              <I.clock /> {detail.time} · {detail.dur}
            </div>
            <div className="shift-detail__line">
              <I.mapPin /> {detail.role}
            </div>
            <div className="shift-detail__line">
              <I.users /> Sammen med Mia Holt
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
