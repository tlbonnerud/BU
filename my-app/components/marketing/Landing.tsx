'use client';

import React from 'react';
import { Button, Card, AvatarGroup } from '../ds';
import {
  IcCalendar,
  IcLayers,
  IcClock,
  IcShield,
  IcCheck,
  IcArrow,
} from './icons';

export interface LandingProps {
  onLogin?: () => void;
  onStart?: () => void;
}

function MiniProductShot() {
  // A composed faux app screenshot — dogfoods the brand UI.
  const days = ['Man', 'Tir', 'Ons', 'Tor', 'Fre'];
  const shifts: Record<string, [string, string]> = {
    '00': ['Resepsjon', 'a'],
    '11': ['Kjøkken', 'b'],
    '02': ['Lager', 'c'],
    '14': ['Salg', 'a'],
    '23': ['Resepsjon', 'b'],
  };
  const open: Record<string, boolean> = { '21': true, '13': true };

  return (
    <div className="mk-shot">
      <div className="mk-shot__bar">
        <span className="mk-shot__dot" style={{ background: '#FF5F57' }} />
        <span className="mk-shot__dot" style={{ background: '#FEBC2E' }} />
        <span className="mk-shot__dot" style={{ background: '#28C840' }} />
        <span className="mk-shot__url">app.bedriftutility.no/timeplanlegger</span>
      </div>
      <div className="mk-shot__body">
        <div className="mk-shot__head">
          <div>
            <div className="mk-shot__eyebrow">Uke 23 · 2.–8. juni</div>
            <div className="mk-shot__title">Timeplanlegger</div>
          </div>
          <div className="mk-shot__actions">
            <span className="mk-chip">5 åpne vakter</span>
            <Button size="sm">Publiser timeplan</Button>
          </div>
        </div>
        <div className="mk-shot__grid">
          <div className="mk-shot__col mk-shot__col--head" />
          {days.map((d) => (
            <div key={d} className="mk-shot__col mk-shot__col--head">
              {d}
            </div>
          ))}
          {['08–12', '12–16', '16–20'].map((t, ri) => (
            <React.Fragment key={t}>
              <div className="mk-shot__time">{t}</div>
              {days.map((d, ci) => {
                const k = `${ri}${ci}`;
                const shift = shifts[k];
                const isOpen = open[k];
                return (
                  <div key={ci} className="mk-shot__cell">
                    {shift && (
                      <div className={`mk-shift mk-shift--${shift[1]}`}>
                        {shift[0]}
                      </div>
                    )}
                    {isOpen && (
                      <div className="mk-shift mk-shift--open">+ Tildel</div>
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

const FEATURES = [
  {
    icon: <IcCalendar />,
    title: 'Marker tilgjengelighet',
    body: 'Ansatte markerer når de kan og ønsker å jobbe i et enkelt ukerutenett — admin ser det umiddelbart.',
  },
  {
    icon: <IcLayers />,
    title: 'Smart timeplanlegging',
    body: 'Bygg timeplanen ut fra faktisk tilgjengelighet. Konfliktvarsel fanger dobbeltbooking før den skjer.',
  },
  {
    icon: <IcClock />,
    title: 'Automatisk timetelling',
    body: 'Timer telles opp per bruker og periode. Godkjenn, juster og eksporter uten regneark.',
  },
  {
    icon: <IcShield />,
    title: 'Roller og tilgang',
    body: 'Ansatt og admin ser hver sin arbeidsflate. Inviter, deaktiver og styr tilgang på sekunder.',
  },
];

const STEPS = [
  {
    n: '01',
    title: 'Inviter teamet',
    body: 'Legg til ansatte med e-post eller invitasjonskode. Alle får riktig rolle fra start.',
  },
  {
    n: '02',
    title: 'Samle tilgjengelighet',
    body: 'Ansatte markerer ukene sine. Du ser hvem som kan jobbe når — samlet på ett sted.',
  },
  {
    n: '03',
    title: 'Bygg og publiser',
    body: 'Sett opp vaktene, løs konflikter, og publiser. Teamet ser timeplanen sin med en gang.',
  },
  {
    n: '04',
    title: 'Tell og godkjenn',
    body: 'Timene telles automatisk. Godkjenn perioden og eksporter til lønn.',
  },
];

const AVAIL_STATES = [
  '',
  'can',
  'want',
  'off',
] as const;
const AVAIL_PATTERN = [1, 2, 3, 2, 0, 0, 1, 2, 3, 1, 2, 0, 1, 1, 0, 3, 2, 1, 0, 0];

interface Plan {
  name: string;
  price: string;
  unit: string;
  per: string;
  desc: string;
  feats: string[];
  cta: string;
  variant: 'primary' | 'tertiary';
  featured?: boolean;
}

const PLANS: Plan[] = [
  {
    name: 'Start',
    price: '0',
    unit: 'kr',
    per: '/ mnd',
    desc: 'For små team som vil i gang.',
    feats: ['Opptil 5 ansatte', 'Tilgjengelighet', 'Timeplan'],
    cta: 'Kom i gang',
    variant: 'tertiary',
  },
  {
    name: 'Team',
    price: '49',
    unit: 'kr',
    per: '/ ansatt / mnd',
    desc: 'For voksende bedrifter.',
    feats: [
      'Ubegrenset ansatte',
      'Timetelling & eksport',
      'Konfliktvarsel',
      'Roller og tilgang',
    ],
    cta: 'Prøv gratis',
    variant: 'primary',
    featured: true,
  },
  {
    name: 'Bedrift',
    price: 'Ta kontakt',
    unit: '',
    per: '',
    desc: 'For større organisasjoner.',
    feats: ['Alt i Team', 'SSO & sikkerhet', 'Egen kundekontakt'],
    cta: 'Snakk med oss',
    variant: 'tertiary',
  },
];

export function Landing({ onLogin, onStart }: LandingProps) {
  return (
    <div className="mk">
      {/* NAV */}
      <header className="mk-nav">
        <div className="mk-nav__inner">
          <a
            className="mk-brand"
            href="#"
            onClick={(e) => e.preventDefault()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/mark.svg" width="30" height="30" alt="" />
            <span className="mk-brand__word">
              Bedrift<b>Utility</b>
            </span>
          </a>
          <nav className="mk-nav__links">
            <a href="#funksjoner">Funksjoner</a>
            <a href="#slik">Slik fungerer det</a>
            <a href="#priser">Priser</a>
          </nav>
          <div className="mk-nav__cta">
            <button className="mk-link" onClick={onLogin}>
              Logg inn
            </button>
            <Button size="sm" onClick={onStart}>
              Kom i gang
            </Button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="mk-hero">
        <div className="mk-hero__glow" />
        <div className="mk-eyebrow">Timeplaner &amp; timeregnskap</div>
        <h1 className="mk-hero__title">
          Tell timer og bygg
          <br />
          timeplaner — <span className="bd-mark">uten kaos</span>
        </h1>
        <p className="mk-hero__sub">
          Bedrift Utility samler tilgjengelighet, vaktplanlegging og timetelling
          på ett sted — så du bruker tiden på teamet, ikke på regnearket.
        </p>
        <div className="mk-hero__cta">
          <Button variant="secondary" size="lg" onClick={onStart}>
            Prøv gratis
          </Button>
          <Button
            variant="primary"
            size="lg"
            iconRight={<IcArrow size={18} />}
            onClick={onLogin}
          >
            Book en demo
          </Button>
        </div>
        <div className="mk-hero__proof">
          <AvatarGroup
            max={4}
            users={[
              { name: 'Kim Berge' },
              { name: 'Ola Nord' },
              { name: 'Liv Aas' },
              { name: 'Per Sund' },
              { name: 'Mia Holt' },
            ]}
          />
          <span>
            Brukt av <b>240+</b> norske bedrifter
          </span>
        </div>
        <div className="mk-hero__shot">
          <MiniProductShot />
        </div>
      </section>

      {/* LOGOS */}
      <section className="mk-logos">
        <span className="mk-logos__label">Stoler på Bedrift Utility</span>
        <div className="mk-logos__row">
          {[
            'Nordvik',
            'Fjord Kaffe',
            'Bergen Helse',
            'Polarfrakt',
            'Studio Sør',
            'Kvist & Co',
          ].map((n) => (
            <span key={n} className="mk-logo">
              {n}
            </span>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="mk-section" id="funksjoner">
        <div className="mk-section__head">
          <div className="mk-eyebrow">Alt på ett sted</div>
          <h2 className="mk-section__title">
            Alt du trenger, ingenting du ikke trenger
          </h2>
          <p className="mk-section__sub">
            Fire byggeklosser som dekker hele flyten fra tilgjengelighet til
            lønnsklare timer.
          </p>
        </div>
        <div className="mk-features">
          {FEATURES.map((f) => (
            <Card key={f.title} elevation="border" className="mk-feature">
              <span className="mk-feature__icon">{f.icon}</span>
              <h3 className="mk-feature__title">{f.title}</h3>
              <p className="mk-feature__body">{f.body}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* SPLIT — availability */}
      <section className="mk-split">
        <div className="mk-split__text">
          <div className="mk-eyebrow">For ansatte</div>
          <h2 className="mk-split__title">
            Marker når du kan jobbe — på sekunder
          </h2>
          <p className="mk-split__body">
            Ett klikk per rute. Tre tydelige tilstander: kan jobbe, ønsker å
            jobbe, utilgjengelig. Admin ser det med en gang du lagrer.
          </p>
          <ul className="mk-list">
            <li>
              <span className="mk-list__ic">
                <IcCheck size={15} />
              </span>
              Gjentakende tilgjengelighet per uke
            </li>
            <li>
              <span className="mk-list__ic">
                <IcCheck size={15} />
              </span>
              Notat per dag for spesielle behov
            </li>
            <li>
              <span className="mk-list__ic">
                <IcCheck size={15} />
              </span>
              Se egen timeplan og timer samme sted
            </li>
          </ul>
        </div>
        <div className="mk-split__art">
          <Card elevation="shadow" className="mk-availcard">
            <div className="mk-availcard__head">
              Min tilgjengelighet · uke 23
            </div>
            <div className="mk-availgrid">
              {AVAIL_PATTERN.map((p, i) => {
                const s = AVAIL_STATES[p];
                return (
                  <div
                    key={i}
                    className={`mk-acell ${s ? `mk-acell--${s}` : ''}`}
                  />
                );
              })}
            </div>
            <div className="mk-availcard__legend">
              <span>
                <i className="mk-dot mk-dot--can" />
                Kan
              </span>
              <span>
                <i className="mk-dot mk-dot--want" />
                Ønsker
              </span>
              <span>
                <i className="mk-dot mk-dot--off" />
                Utilgj.
              </span>
            </div>
          </Card>
        </div>
      </section>

      {/* STEPS */}
      <section className="mk-section mk-section--wash" id="slik">
        <div className="mk-section__head">
          <div className="mk-eyebrow">Slik fungerer det</div>
          <h2 className="mk-section__title">
            Fra kaos til klar timeplan i fire steg
          </h2>
        </div>
        <div className="mk-steps">
          {STEPS.map((s) => (
            <div key={s.n} className="mk-step">
              <span className="mk-step__n">{s.n}</span>
              <h3 className="mk-step__title">{s.title}</h3>
              <p className="mk-step__body">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="mk-section" id="priser">
        <div className="mk-section__head">
          <div className="mk-eyebrow">Priser</div>
          <h2 className="mk-section__title">
            Enkel pris, hele teamet inkludert
          </h2>
        </div>
        <div className="mk-pricing">
          {PLANS.map((p) => (
            <Card
              key={p.name}
              elevation={p.featured ? 'shadow' : 'border'}
              className={`mk-plan ${p.featured ? 'mk-plan--featured' : ''}`}
            >
              {p.featured && <span className="mk-plan__tag">Mest populær</span>}
              <div className="mk-plan__name">{p.name}</div>
              <div className="mk-plan__price">
                {p.unit && <span className="mk-plan__unit">{p.unit}</span>}
                {p.price}
                <span className="mk-plan__per">{p.per}</span>
              </div>
              <p className="mk-plan__desc">{p.desc}</p>
              <Button variant={p.variant} block onClick={onStart}>
                {p.cta}
              </Button>
              <ul className="mk-plan__feats">
                {p.feats.map((f) => (
                  <li key={f}>
                    <span className="mk-list__ic">
                      <IcCheck size={14} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mk-cta">
        <div className="mk-cta__inner">
          <h2 className="mk-cta__title">Kom i gang med Bedrift Utility</h2>
          <p className="mk-cta__sub">
            Sett opp teamet på under fem minutter. Ingen kortinformasjon
            nødvendig.
          </p>
          <div className="mk-cta__btns">
            <Button variant="primary" size="lg" onClick={onStart}>
              Prøv gratis
            </Button>
            <button className="mk-cta__link" onClick={onLogin}>
              Book en demo →
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mk-footer">
        <div className="mk-footer__inner">
          <div className="mk-footer__brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo-white.svg" width="180" alt="Bedrift Utility" />
            <p>Timeplaner og timeregnskap for norske bedrifter.</p>
          </div>
          <div className="mk-footer__cols">
            <div>
              <h4>Produkt</h4>
              <a href="#funksjoner">Funksjoner</a>
              <a href="#priser">Priser</a>
              <a href="#">Integrasjoner</a>
            </div>
            <div>
              <h4>Selskap</h4>
              <a href="#">Om oss</a>
              <a href="#">Kontakt</a>
              <a href="#">Jobb</a>
            </div>
            <div>
              <h4>Ressurser</h4>
              <a href="#">Hjelp</a>
              <a href="#">Personvern</a>
              <a href="#">Vilkår</a>
            </div>
          </div>
        </div>
        <div className="mk-footer__bottom">
          © 2026 Bedrift Utility AS · Org.nr 925 123 456
        </div>
      </footer>
    </div>
  );
}
