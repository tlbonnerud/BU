'use client';

import React from 'react';
import {
  Button,
  Card,
  Avatar,
  StatusPill,
  Switch,
  Table,
  Tabs,
  Breadcrumbs,
  WeekGrid,
  ShiftBlock,
  Modal,
} from '../../ds';
import type { AvailState, StatusKind, TableColumn } from '../../ds';
import { AppIcons as AI } from '../icons';
import { AppData as DA, UserRow } from '../data';

interface HourRow extends Record<string, unknown> {
  id: number;
  dato: string;
  vakt: string;
  timer: number;
  status: StatusKind;
}

export interface BruksideProps {
  user?: UserRow;
  onBack?: () => void;
}

/** Brukerside — admin view of one user: availability, schedule, hours + actions. */
export function Brukerside({ user, onBack }: BruksideProps) {
  const u = user || DA.users[0];
  const [tab, setTab] = React.useState('tilgjengelighet');
  const [confirm, setConfirm] = React.useState(false);
  const [active, setActive] = React.useState(u.status !== 'inaktiv');

  const states: Record<string, AvailState> = {
    '1-0': 'want',
    '2-1': 'can',
    '3-1': 'can',
    '0-2': 'off',
    '4-0': 'can',
    '1-1': 'want',
  };
  const shifts: Record<string, { time: string; role: string }> = {
    '0-0': { time: '08–12', role: 'Resepsjon' },
    '2-2': { time: '12–16', role: 'Kjøkken' },
    '4-1': { time: '10–18', role: 'Salg' },
  };
  const hours: HourRow[] = [
    { id: 1, dato: 'Man 2. juni', vakt: 'Resepsjon 08–12', timer: 4, status: 'godkjent' },
    { id: 2, dato: 'Ons 4. juni', vakt: 'Kjøkken 12–16', timer: 4, status: 'godkjent' },
    { id: 3, dato: 'Fre 6. juni', vakt: 'Salg 10–18', timer: 8, status: 'venter' },
  ];

  const hourCols: TableColumn<HourRow>[] = [
    { key: 'dato', header: 'Dato', sortable: true },
    { key: 'vakt', header: 'Vakt' },
    { key: 'timer', header: 'Timer', align: 'right', render: (v) => `${v} t` },
    {
      key: 'status',
      header: 'Status',
      render: (v) => <StatusPill status={v as StatusKind} />,
    },
  ];

  return (
    <div className="app-page">
      <Breadcrumbs items={[{ label: 'Brukere', onClick: onBack }, { label: u.navn }]} />
      <div className="pg-head" style={{ marginTop: 16 }}>
        <div className="prof-head">
          <Avatar name={u.navn} size="lg" />
          <div className="prof-head__meta">
            <h2>{u.navn}</h2>
            <div className="sub">
              <StatusPill status={active ? 'aktiv' : 'inaktiv'} /> · {u.rolle} ·{' '}
              {u.epost}
            </div>
          </div>
        </div>
        <div className="pg-head__actions">
          <Switch
            label="Aktiv"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
          />
          <Button variant="tertiary" iconLeft={<AI.plus size={15} />}>
            Tildel vakt
          </Button>
          <Button
            variant="danger"
            iconLeft={<AI.trash size={15} />}
            onClick={() => setConfirm(true)}
          >
            Fjern
          </Button>
        </div>
      </div>

      <Card elevation="shadow" padded={false}>
        <div style={{ padding: '4px 18px 0' }}>
          <Tabs
            value={tab}
            onChange={setTab}
            tabs={[
              { value: 'tilgjengelighet', label: 'Tilgjengelighet' },
              { value: 'timeplan', label: 'Timeplan' },
              {
                value: 'timer',
                label: 'Timer',
                count: hours.filter((h) => h.status === 'venter').length,
              },
            ]}
          />
        </div>
        <div style={{ padding: 18 }}>
          {tab === 'tilgjengelighet' && (
            <div>
              <p
                className="muted"
                style={{ fontSize: 'var(--fs-sm)', marginBottom: 14 }}
              >
                Markert av {u.navn} for uke 23 (skrivebeskyttet).
              </p>
              <WeekGrid days={DA.days} slots={DA.slots} states={states} />
            </div>
          )}
          {tab === 'timeplan' && (
            <WeekGrid
              days={DA.days}
              slots={DA.slots}
              cell={(d, s) => {
                const sh = shifts[`${d}-${s}`];
                return sh ? <ShiftBlock time={sh.time} role={sh.role} /> : null;
              }}
            />
          )}
          {tab === 'timer' && <Table rows={hours} columns={hourCols} />}
        </div>
      </Card>

      <Modal
        open={confirm}
        onClose={() => setConfirm(false)}
        title={`Fjerne ${u.navn}?`}
        subtitle="Brukeren mister tilgang umiddelbart. Handlingen kan ikke angres."
        footer={
          <>
            <Button variant="tertiary" onClick={() => setConfirm(false)}>
              Avbryt
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                setConfirm(false);
                onBack?.();
              }}
            >
              Fjern bruker
            </Button>
          </>
        }
      >
        <p style={{ paddingBottom: 8, color: 'var(--text-body)' }}>
          Timene som allerede er registrert beholdes i timeoversikten.
        </p>
      </Modal>
    </div>
  );
}
