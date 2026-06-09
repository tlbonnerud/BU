'use client';

import React from 'react';
import { Button, Avatar, Toast } from '../../ds';
import { AppIcons as BI } from '../icons';
import { AppData as BD } from '../data';

interface PlannerCell {
  time?: string;
  role?: string;
  conflict?: boolean;
  avail?: boolean;
}

/** Timeplanlegger — staff-row planner with availability hints, conflicts, publish. */
export function Timeplanlegger() {
  const staff = BD.users.filter((u) => u.status === 'aktiv').slice(0, 5);
  const dayNames = ['Man', 'Tir', 'Ons', 'Tor', 'Fre'];
  const [cells, setCells] = React.useState<Record<string, PlannerCell>>({
    '0-0': { time: '08–12', role: 'Resepsjon' },
    '0-2': { time: '12–16', role: 'Kjøkken' },
    '1-1': { time: '10–18', role: 'Salg' },
    '2-0': { time: '08–16', role: 'Lager' },
    '3-3': { time: '12–20', role: 'Resepsjon', conflict: true },
    '4-4': { time: '09–15', role: 'Kjøkken' },
    '1-3': { avail: true },
    '2-2': { avail: true },
    '4-1': { avail: true },
    '0-4': { avail: true },
    '3-1': { avail: true },
  });
  const [published, setPublished] = React.useState(false);
  const conflicts = Object.values(cells).filter((c) => c.conflict).length;
  const assign = (k: string) =>
    setCells((p) => ({ ...p, [k]: { time: '10–14', role: 'Resepsjon' } }));

  return (
    <div className="app-page" style={{ maxWidth: 1180 }}>
      <div className="pg-head">
        <div>
          <div className="pg-head__title">Timeplanlegger</div>
          <div className="pg-head__sub">
            Bemann vaktene ut fra de ansattes tilgjengelighet. Klikk en grønn
            rute for å tildele.
          </div>
        </div>
        <div className="pg-head__actions">
          <div className="week-nav">
            <button className="week-navbtn">
              <BI.chevL />
            </button>
            <span className="week-nav__label">Uke 23 · 2.–8. juni</span>
            <button className="week-navbtn">
              <BI.chevR />
            </button>
          </div>
          <Button
            iconLeft={<BI.check size={16} />}
            onClick={() => setPublished(true)}
          >
            Publiser timeplan
          </Button>
        </div>
      </div>

      {conflicts > 0 && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            background: 'var(--danger-100)',
            color: 'var(--danger-600)',
            padding: '12px 16px',
            borderRadius: 'var(--radius-md)',
            marginBottom: 16,
            fontSize: 'var(--fs-sm)',
            fontWeight: 600,
          }}
        >
          <BI.alert size={18} /> {conflicts} konflikt: dobbeltbooking på torsdag.
          Løs før publisering.
        </div>
      )}

      <div className="legend" style={{ marginBottom: 14 }}>
        <span>
          <i style={{ background: 'var(--mint-100)', borderColor: 'var(--brand)' }} />
          Tildelt vakt
        </span>
        <span>
          <i
            style={{
              background: 'var(--avail-can-bg)',
              borderColor: 'var(--avail-can-line)',
            }}
          />
          Tilgjengelig
        </span>
        <span>
          <i
            style={{
              background: 'var(--danger-100)',
              borderColor: 'var(--danger-500)',
            }}
          />
          Konflikt
        </span>
      </div>

      <div className="planner">
        <div className="planner__aside">
          <div className="planner__staffhead" />
          {staff.map((s) => (
            <div key={s.id} className="planner__staff">
              <Avatar name={s.navn} size="sm" />
              <div>
                <div className="planner__staffname">{s.navn}</div>
                <div className="planner__staffhours">{s.timer} t</div>
              </div>
            </div>
          ))}
        </div>
        <div className="planner__board">
          <div
            className="planner__grid"
            style={{ gridTemplateColumns: `repeat(${dayNames.length},1fr)` }}
          >
            {dayNames.map((d) => (
              <div key={d} className="planner__dayhead">
                {d}
              </div>
            ))}
            {staff.map((s, si) => (
              <React.Fragment key={si}>
                {dayNames.map((d, di) => {
                  const c = cells[`${si}-${di}`];
                  return (
                    <div key={di} className="planner__slot planner__row">
                      {c && c.avail && (
                        <div
                          className="pblock pblock--avail"
                          onClick={() => assign(`${si}-${di}`)}
                        >
                          + Tildel
                        </div>
                      )}
                      {c && !c.avail && (
                        <div
                          className={`pblock ${c.conflict ? 'pblock--conflict' : 'pblock--filled'}`}
                        >
                          <span>{c.time}</span>
                          <span style={{ fontWeight: 500, opacity: 0.85 }}>
                            {c.role}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {published && (
        <div className="toast-fixed">
          <Toast
            variant="success"
            title="Timeplan publisert"
            onClose={() => setPublished(false)}
          >
            De ansatte ser nå vaktene under Min timeplan.
          </Toast>
        </div>
      )}
    </div>
  );
}
