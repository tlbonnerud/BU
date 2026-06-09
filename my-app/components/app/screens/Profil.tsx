'use client';

import React from 'react';
import {
  Button,
  Input,
  Switch,
  Card,
  Avatar,
  StatusPill,
  Toast,
} from '../../ds';
import { AppIcons as I } from '../icons';
import { AppData as D } from '../data';

function SettingRow({
  label,
  desc,
  on,
}: {
  label: string;
  desc: string;
  on?: boolean;
}) {
  const [v, setV] = React.useState(!!on);
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
      }}
    >
      <div>
        <div
          style={{
            fontSize: 'var(--fs-sm)',
            fontWeight: 600,
            color: 'var(--text-heading)',
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: 'var(--fs-xs)',
            color: 'var(--text-muted)',
            marginTop: 2,
          }}
        >
          {desc}
        </div>
      </div>
      <Switch checked={v} onChange={(e) => setV(e.target.checked)} />
    </div>
  );
}

/** Min profil — account details, password, notifications + period summary. */
export function Profil() {
  const [saved, setSaved] = React.useState(false);
  return (
    <div className="app-page">
      <div className="pg-head">
        <div>
          <div className="pg-head__title">Min profil</div>
          <div className="pg-head__sub">
            Administrer kontoen og varslingsvalgene dine.
          </div>
        </div>
      </div>

      <Card elevation="shadow">
        <div className="prof-head">
          <Avatar name={D.me.name} size="xl" />
          <div className="prof-head__meta">
            <h2>{D.me.name}</h2>
            <div className="sub">
              <StatusPill status="aktiv" /> · {D.me.role} hos {D.me.company}
            </div>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <Button variant="tertiary" size="sm">
              Bytt bilde
            </Button>
          </div>
        </div>
      </Card>

      <div className="prof-grid">
        <div className="field-row">
          <Card
            title="Personinformasjon"
            elevation="shadow"
            action={
              <Button size="sm" onClick={() => setSaved(true)}>
                Lagre
              </Button>
            }
          >
            <div className="form-grid">
              <Input label="Fornavn" defaultValue="Kim" />
              <Input label="Etternavn" defaultValue="Berge" />
              <Input
                label="E-post"
                type="email"
                defaultValue={D.me.email}
                icon={<I.bell size={16} />}
              />
              <Input label="Telefon" defaultValue="+47 412 34 567" />
            </div>
          </Card>

          <Card title="Bytt passord" elevation="shadow">
            <div className="form-grid">
              <Input
                label="Nåværende passord"
                type="password"
                placeholder="••••••••"
              />
              <div />
              <Input label="Nytt passord" type="password" hint="Minst 8 tegn" />
              <Input label="Gjenta nytt passord" type="password" />
            </div>
            <div style={{ marginTop: 16 }}>
              <Button
                variant="tertiary"
                size="sm"
                iconLeft={<I.lock size={15} />}
              >
                Oppdater passord
              </Button>
            </div>
          </Card>

          <Card title="Varslingsvalg" elevation="shadow">
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
            >
              <SettingRow
                label="Ny publisert timeplan"
                desc="Få beskjed når admin publiserer en timeplan."
                on
              />
              <SettingRow
                label="Påminnelse før vakt"
                desc="Varsel dagen før hver vakt."
                on
              />
              <SettingRow
                label="Endringer i vakter"
                desc="Når en vakt flyttes eller fjernes."
              />
              <SettingRow
                label="Ukentlig oppsummering"
                desc="E-post med timer hver mandag."
              />
            </div>
          </Card>
        </div>

        <div className="field-row">
          <Card
            title="Denne perioden"
            subtitle="Uke 23 · 2.–8. juni"
            elevation="shadow"
          >
            <div className="mini-stat">
              <span className="mini-stat__label">Timer denne perioden</span>
              <span className="mini-stat__value">32,5 t</span>
            </div>
            <div className="mini-stat">
              <span className="mini-stat__label">Vakter</span>
              <span className="mini-stat__value">4</span>
            </div>
            <div className="mini-stat">
              <span className="mini-stat__label">Status timer</span>
              <StatusPill status="venter">Venter</StatusPill>
            </div>
          </Card>
          <Card title="Neste vakt" elevation="shadow">
            <div className="shift-detail">
              <div className="shift-detail__line">
                <I.calendar /> Tirsdag 3. juni
              </div>
              <div className="shift-detail__line">
                <I.clock /> 08:00–12:00 · 4 t
              </div>
              <div className="shift-detail__line">
                <I.mapPin /> Resepsjon
              </div>
            </div>
          </Card>
        </div>
      </div>

      {saved && (
        <div className="toast-fixed">
          <Toast
            variant="success"
            title="Lagret"
            onClose={() => setSaved(false)}
          >
            Profilen din er oppdatert.
          </Toast>
        </div>
      )}
    </div>
  );
}
