'use client';

import React from 'react';
import { Button, Input, Tabs } from '../ds';

export interface AuthProps {
  onBack?: () => void;
  onAuthed?: () => void;
}

function GoogleMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.5 12.2c0-.7-.1-1.4-.2-2H12v3.9h5.9a5 5 0 0 1-2.2 3.3v2.7h3.5c2-1.9 3.3-4.7 3.3-7.9Z"
      />
      <path
        fill="#34A853"
        d="M12 23c3 0 5.5-1 7.3-2.7l-3.5-2.7c-1 .7-2.3 1.1-3.8 1.1-2.9 0-5.4-2-6.3-4.6H2v2.8A11 11 0 0 0 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.7 14.1a6.6 6.6 0 0 1 0-4.2V7.1H2a11 11 0 0 0 0 9.8l3.7-2.8Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.4c1.6 0 3 .6 4.2 1.6l3.1-3.1A11 11 0 0 0 2 7.1l3.7 2.8C6.6 7.4 9.1 5.4 12 5.4Z"
      />
    </svg>
  );
}

export function Auth({ onBack, onAuthed }: AuthProps) {
  const [mode, setMode] = React.useState<'login' | 'register'>('login');
  const [joinMode, setJoinMode] = React.useState<'ny' | 'invitasjon'>('ny');
  const [err] = React.useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onAuthed?.();
  };

  return (
    <div className="auth">
      <div className="auth__panel">
        <a
          className="auth__brand"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onBack?.();
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/mark.svg" width="30" height="30" alt="" />
          <span>
            Bedrift<b>Utility</b>
          </span>
        </a>
        <div className="auth__card">
          <div className="auth__tabs">
            <Tabs
              value={mode}
              onChange={(v) => setMode(v as 'login' | 'register')}
              tabs={[
                { value: 'login', label: 'Logg inn' },
                { value: 'register', label: 'Registrer' },
              ]}
            />
          </div>

          {mode === 'login' ? (
            <form className="auth__form" onSubmit={submit}>
              <h1 className="auth__title">Velkommen tilbake</h1>
              <p className="auth__sub">
                Logg inn for å se timeplanen og timene dine.
              </p>
              <Input
                label="E-post"
                type="email"
                placeholder="navn@bedrift.no"
                defaultValue="kim@bedrift.no"
                required
              />
              <Input
                label="Passord"
                type="password"
                defaultValue="hemmelig123"
                error={err ? 'Feil e-post eller passord' : undefined}
                required
              />
              <div className="auth__row">
                <label className="auth__remember">
                  <input type="checkbox" defaultChecked /> Husk meg
                </label>
                <a
                  className="auth__forgot"
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                  Glemt passord?
                </a>
              </div>
              <Button type="submit" block size="lg">
                Logg inn
              </Button>
              <div className="auth__or">
                <span>eller</span>
              </div>
              <Button
                type="button"
                variant="tertiary"
                block
                iconLeft={<GoogleMark />}
              >
                Fortsett med Google
              </Button>
            </form>
          ) : (
            <form className="auth__form" onSubmit={submit}>
              <h1 className="auth__title">Opprett konto</h1>
              <p className="auth__sub">
                Kom i gang gratis — sett opp bedriften på minutter.
              </p>
              <Input label="Fullt navn" placeholder="Kim Berge" required />
              <Input
                label="E-post"
                type="email"
                placeholder="navn@bedrift.no"
                required
              />
              <Input
                label="Passord"
                type="password"
                hint="Minst 8 tegn"
                required
              />
              <div className="auth__seg">
                <button
                  type="button"
                  className={joinMode === 'ny' ? 'is-on' : ''}
                  onClick={() => setJoinMode('ny')}
                >
                  Ny bedrift
                </button>
                <button
                  type="button"
                  className={joinMode === 'invitasjon' ? 'is-on' : ''}
                  onClick={() => setJoinMode('invitasjon')}
                >
                  Invitasjonskode
                </button>
              </div>
              {joinMode === 'ny' ? (
                <Input
                  label="Bedriftsnavn"
                  placeholder="Nordvik AS"
                  required
                />
              ) : (
                <Input
                  label="Invitasjonskode"
                  placeholder="F.eks. BEDR-4821"
                  required
                />
              )}
              <Button type="submit" block size="lg">
                Opprett konto
              </Button>
              <p className="auth__terms">
                Ved å fortsette godtar du{' '}
                <a href="#" onClick={(e) => e.preventDefault()}>
                  vilkårene
                </a>{' '}
                og{' '}
                <a href="#" onClick={(e) => e.preventDefault()}>
                  personvernerklæringen
                </a>
                .
              </p>
            </form>
          )}
        </div>
      </div>

      <aside className="auth__aside">
        <div className="auth__aside-glow" />
        <blockquote className="auth__quote">
          «Vi gikk fra regneark og SMS-kaos til én timeplan alle stoler på.
          Bedrift Utility sparer oss for timer hver uke.»
        </blockquote>
        <div className="auth__cite">
          <div className="auth__avatar">MH</div>
          <div>
            <b>Mia Holt</b>
            <span>Driftsleder · Fjord Kaffe</span>
          </div>
        </div>
      </aside>
    </div>
  );
}
