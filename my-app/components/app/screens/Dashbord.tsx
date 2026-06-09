'use client';

import React from 'react';
import {
  Button,
  IconButton,
  Input,
  Select,
  SearchField,
  Card,
  Avatar,
  StatusPill,
  Badge,
  Table,
  Modal,
  Toast,
  EmptyState,
  Tooltip,
} from '../../ds';
import type { TableColumn, StatusKind } from '../../ds';
import { AppIcons as AI } from '../icons';
import { AppData as DA, UserRow } from '../data';

function UserCell({ name, email }: { name: string; email: string }) {
  return (
    <div className="ucell">
      <Avatar name={name} size="sm" />
      <div>
        <div className="ucell__name">{name}</div>
        <div className="ucell__mail">{email}</div>
      </div>
    </div>
  );
}

export interface DashbordProps {
  onOpenUser?: (user: UserRow) => void;
}

/** Dashbord — KPI cards + searchable/filterable user table + invite modal. */
export function Dashbord({ onOpenUser }: DashbordProps) {
  const [q, setQ] = React.useState('');
  const [role, setRole] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [invite, setInvite] = React.useState(false);
  const [toast, setToast] = React.useState(false);

  const rows = DA.users.filter(
    (u) =>
      (!q || u.navn.toLowerCase().includes(q.toLowerCase())) &&
      (!role || u.rolle === role) &&
      (!status || u.status === status),
  );

  const columns: TableColumn<UserRow>[] = [
    {
      key: 'navn',
      header: 'Bruker',
      sortable: true,
      render: (v, r) => <UserCell name={v as string} email={r.epost} />,
    },
    {
      key: 'rolle',
      header: 'Rolle',
      sortable: true,
      render: (v) => (
        <Badge tone={v === 'Admin' ? 'brand' : 'neutral'}>{v as string}</Badge>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (v) => <StatusPill status={v as StatusKind} />,
    },
    {
      key: 'timer',
      header: 'Timer i perioden',
      align: 'right',
      sortable: true,
      render: (v) => `${v} t`,
    },
    {
      key: 'id',
      header: '',
      align: 'right',
      render: () => (
        <span className="row-actions" onClick={(e) => e.stopPropagation()}>
          <Tooltip label="Mer">
            <IconButton label="Mer">
              <AI.more />
            </IconButton>
          </Tooltip>
        </span>
      ),
    },
  ];

  return (
    <div className="app-page">
      <div className="pg-head">
        <div>
          <div className="pg-head__title">Dashbord</div>
          <div className="pg-head__sub">
            Oversikt over teamet for uke 23 · 2.–8. juni.
          </div>
        </div>
        <div className="pg-head__actions">
          <Button variant="tertiary" iconLeft={<AI.download size={16} />}>
            Eksporter
          </Button>
          <Button iconLeft={<AI.plus size={16} />} onClick={() => setInvite(true)}>
            Inviter bruker
          </Button>
        </div>
      </div>

      <div className="stat-grid">
        <Card
          as="stat"
          elevation="shadow"
          title="Ansatte"
          value="24"
          delta="+3 denne mnd"
          icon={<AI.users />}
        />
        <Card
          as="stat"
          elevation="shadow"
          title="Timer i perioden"
          value="612 t"
          delta="+8% vs forrige"
          icon={<AI.clock />}
        />
        <Card
          as="stat"
          elevation="shadow"
          title="Åpne vakter"
          value="5"
          delta="2 uten dekning"
          deltaDir="down"
          icon={<AI.calendar />}
        />
        <Card
          as="stat"
          elevation="shadow"
          title="Venter godkjenning"
          value="9"
          delta="3 brukere"
          icon={<AI.check />}
        />
      </div>

      <Card elevation="shadow" padded={false}>
        <div style={{ padding: '18px 18px 0' }}>
          <div className="toolbar">
            <div className="toolbar__search">
              <SearchField
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onClear={() => setQ('')}
                placeholder="Søk etter bruker"
              />
            </div>
            <div style={{ width: 150 }}>
              <Select
                placeholder="Alle roller"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                options={[
                  { value: '', label: 'Alle roller' },
                  { value: 'Ansatt', label: 'Ansatt' },
                  { value: 'Admin', label: 'Admin' },
                ]}
              />
            </div>
            <div style={{ width: 150 }}>
              <Select
                placeholder="Alle statuser"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                options={[
                  { value: '', label: 'Alle statuser' },
                  { value: 'aktiv', label: 'Aktiv' },
                  { value: 'invitert', label: 'Invitert' },
                  { value: 'inaktiv', label: 'Inaktiv' },
                ]}
              />
            </div>
            <div className="toolbar__spacer" />
            <span className="muted" style={{ fontSize: 'var(--fs-sm)' }}>
              {rows.length} brukere
            </span>
          </div>
        </div>
        <div style={{ padding: '0 6px 6px' }}>
          {rows.length ? (
            <Table
              rows={rows}
              columns={columns}
              onRowClick={(r) => onOpenUser?.(r)}
            />
          ) : (
            <EmptyState
              icon={<AI.users size={26} />}
              title="Ingen treff"
              description="Prøv et annet søk eller juster filtrene."
            />
          )}
        </div>
      </Card>

      <Modal
        open={invite}
        onClose={() => setInvite(false)}
        title="Inviter bruker"
        subtitle="Send en invitasjon på e-post."
        footer={
          <>
            <Button variant="tertiary" onClick={() => setInvite(false)}>
              Avbryt
            </Button>
            <Button
              onClick={() => {
                setInvite(false);
                setToast(true);
              }}
            >
              Send invitasjon
            </Button>
          </>
        }
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            paddingBottom: 8,
          }}
        >
          <Input label="E-post" type="email" placeholder="navn@bedrift.no" />
          <Select
            label="Rolle"
            options={['Ansatt', 'Admin']}
            defaultValue="Ansatt"
          />
        </div>
      </Modal>

      {toast && (
        <div className="toast-fixed">
          <Toast
            variant="success"
            title="Invitasjon sendt"
            onClose={() => setToast(false)}
          >
            Brukeren får en e-post med invitasjonskode.
          </Toast>
        </div>
      )}
    </div>
  );
}
