'use client';

import React from 'react';
import { Button, Select, Card, Avatar, StatusPill, Table, Toast } from '../../ds';
import type { StatusKind, TableColumn } from '../../ds';
import { AppIcons as BI } from '../icons';

interface HoursRow extends Record<string, unknown> {
  id: number;
  navn: string;
  epost: string;
  vakter: number;
  timer: number;
  status: StatusKind;
}

/** Timeoversikt — hours per user, period filter, approve/approve-all, totals. */
export function Timeoversikt() {
  const [period, setPeriod] = React.useState('uke23');
  const [toast, setToast] = React.useState('');
  const [rows, setRows] = React.useState<HoursRow[]>([
    { id: 1, navn: 'Kim Berge', epost: 'kim@bedrift.no', vakter: 4, timer: 32.5, status: 'venter' },
    { id: 2, navn: 'Mia Holt', epost: 'mia@bedrift.no', vakter: 5, timer: 40, status: 'godkjent' },
    { id: 3, navn: 'Per Sund', epost: 'per@bedrift.no', vakter: 3, timer: 27, status: 'venter' },
    { id: 4, navn: 'Nina Vik', epost: 'nina@bedrift.no', vakter: 4, timer: 34.5, status: 'godkjent' },
    { id: 5, navn: 'Tor Lie', epost: 'tor@bedrift.no', vakter: 2, timer: 12, status: 'venter' },
  ]);
  const total = rows.reduce((a, r) => a + r.timer, 0);
  const approve = (id: number) => {
    setRows((p) =>
      p.map((r) => (r.id === id ? { ...r, status: 'godkjent' } : r)),
    );
    setToast('Timer godkjent');
  };
  const approveAll = () => {
    setRows((p) => p.map((r) => ({ ...r, status: 'godkjent' })));
    setToast('Alle timer godkjent');
  };
  const pending = rows.filter((r) => r.status === 'venter').length;

  const columns: TableColumn<HoursRow>[] = [
    {
      key: 'navn',
      header: 'Bruker',
      sortable: true,
      render: (v, r) => (
        <div className="ucell">
          <Avatar name={v as string} size="sm" />
          <div>
            <div className="ucell__name">{v as string}</div>
            <div className="ucell__mail">{r.epost}</div>
          </div>
        </div>
      ),
    },
    { key: 'vakter', header: 'Vakter', align: 'right' },
    {
      key: 'timer',
      header: 'Timer',
      align: 'right',
      sortable: true,
      render: (v) => `${(v as number).toLocaleString('no')} t`,
    },
    {
      key: 'status',
      header: 'Status',
      render: (v) => <StatusPill status={v as StatusKind} />,
    },
    {
      key: 'id',
      header: '',
      align: 'right',
      render: (_, r) => (
        <span className="row-actions" onClick={(e) => e.stopPropagation()}>
          {r.status === 'venter' ? (
            <Button size="sm" variant="tertiary" onClick={() => approve(r.id)}>
              Godkjenn
            </Button>
          ) : (
            <span className="muted" style={{ fontSize: 'var(--fs-xs)' }}>
              —
            </span>
          )}
        </span>
      ),
    },
  ];

  return (
    <div className="app-page" style={{ maxWidth: 1080 }}>
      <div className="pg-head">
        <div>
          <div className="pg-head__title">Timeoversikt</div>
          <div className="pg-head__sub">
            Tell og godkjenn timer per bruker for valgt periode.
          </div>
        </div>
        <div className="pg-head__actions">
          <div style={{ width: 170 }}>
            <Select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              options={[
                { value: 'uke23', label: 'Uke 23 · 2.–8. jun' },
                { value: 'uke22', label: 'Uke 22 · 26.–1. jun' },
                { value: 'mai', label: 'Mai 2026' },
              ]}
            />
          </div>
          <Button variant="tertiary" iconLeft={<BI.download size={16} />}>
            Eksporter
          </Button>
          <Button onClick={approveAll} disabled={!pending}>
            Godkjenn alle{pending ? ` (${pending})` : ''}
          </Button>
        </div>
      </div>

      <div className="stat-grid stat-grid--3">
        <Card
          as="stat"
          elevation="shadow"
          title="Sum timer"
          value={`${total.toLocaleString('no')} t`}
          icon={<BI.clock />}
        />
        <Card
          as="stat"
          elevation="shadow"
          title="Brukere"
          value={rows.length}
          icon={<BI.users />}
        />
        <Card
          as="stat"
          elevation="shadow"
          title="Venter godkjenning"
          value={pending}
          deltaDir={pending ? 'down' : 'up'}
          delta={pending ? 'Trenger handling' : 'Alt godkjent'}
          icon={<BI.check />}
        />
      </div>

      <Card elevation="shadow" padded={false}>
        <div style={{ padding: '6px 6px 6px' }}>
          <Table rows={rows} columns={columns} />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '14px 16px',
              borderTop: '1px solid var(--border-default)',
              fontSize: 'var(--fs-sm)',
            }}
          >
            <span className="muted">Totalt for perioden</span>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 20,
                color: 'var(--text-strong)',
              }}
            >
              {total.toLocaleString('no')} t
            </span>
          </div>
        </div>
      </Card>

      {toast && (
        <div className="toast-fixed">
          <Toast variant="success" title={toast} onClose={() => setToast('')}>
            Oppdatert i timeoversikten.
          </Toast>
        </div>
      )}
    </div>
  );
}
