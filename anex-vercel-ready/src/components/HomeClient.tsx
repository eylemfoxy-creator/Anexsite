"use client";

import { useEffect, useState } from "react";
import { ChatWidget } from "@/components/ChatWidget";
import { COPY, LANGUAGE_LABELS } from "@/lib/i18n";
import type { SiteLang } from "@/lib/types";

const LANGS: SiteLang[] = ["EN", "DE", "TR", "RU", "ZH"];

export function HomeClient() {
  const [lang, setLang] = useState<SiteLang>("EN");
  const copy = COPY[lang];

  useEffect(() => {
    const saved = window.localStorage.getItem("anex-site-lang") as SiteLang | null;
    if (saved && LANGS.includes(saved)) setLang(saved);
  }, []);

  function chooseLang(next: SiteLang) {
    setLang(next);
    window.localStorage.setItem("anex-site-lang", next);
    document.documentElement.lang = next === "ZH" ? "zh" : next.toLowerCase();
  }

  function openDesk() {
    window.dispatchEvent(new Event("anex-open-chat"));
  }

  return (
    <main className="anex-site">
      <header className="anex-nav">
        <a className="anex-wordmark" href="#top" aria-label="ANEX home">
          <img
            src="/assets/legacy/full188-p001-img01-MALI-VE-HUKUK-DANISMANLIK-LIMITED-SIRKETI-INGILTER.jpeg"
            alt=""
          />
          <span>ANEX</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#focus">{copy.nav.focus}</a>
          <a href="#digital-desk">{copy.nav.desk}</a>
          <a href="#method">{copy.nav.method}</a>
          <a href="#contact">{copy.nav.contact}</a>
        </nav>
        <div className="anex-lang" aria-label="Language">
          {LANGS.map((code) => (
            <button
              type="button"
              key={code}
              data-active={lang === code ? "true" : "false"}
              onClick={() => chooseLang(code)}
              title={COPY[code].languageName}
            >
              {LANGUAGE_LABELS[code]}
            </button>
          ))}
        </div>
        <button className="nav-contact" type="button" onClick={openDesk}>{copy.hero.cta}</button>
      </header>

      <section className="hero" id="top">
        <div className="hero__image" aria-hidden="true" />
        <div className="hero__veil" aria-hidden="true" />
        <div className="hero__grid" aria-hidden="true" />
        <div className="hero__content">
          <p className="hero__kicker">{copy.hero.kicker}</p>
          <h1>{copy.hero.title}</h1>
          <p>{copy.hero.body}</p>
          <button className="hero__cta" type="button" onClick={openDesk}>{copy.hero.cta}</button>
          <div className="hero__languages">EN · DE · TR · RU · 中文</div>
        </div>
        <div className="hero__scroll" aria-hidden="true">SCROLL ↓</div>
      </section>

      <section className="focus-section" id="focus">
        <div className="section-intro">
          <p className="section-kicker">{copy.focus.kicker}</p>
          <h2>{copy.focus.title}</h2>
          <p>{copy.focus.intro}</p>
        </div>
        <div className="service-ledger">
          {copy.focus.services.map((service, index) => (
            <article key={service[0]}>
              <span>0{index + 1}</span>
              <h3>{service[0]}</h3>
              <p>{service[1]}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="desk-section" id="digital-desk">
        <div className="desk-copy">
          <p className="section-kicker">{copy.desk.kicker}</p>
          <h2>{copy.desk.title}</h2>
          <p>{copy.desk.body}</p>
          <button className="desk-open" type="button" onClick={openDesk}>{copy.desk.cta}</button>
        </div>
        <div className="desk-visual" aria-hidden="true">
          <div className="translation-line"><span>TR</span><strong>Merhaba, nasıl yardımcı olabiliriz?</strong></div>
          <div className="translation-arrow">↓</div>
          <div className="translation-line">
            <span>{LANGUAGE_LABELS[lang]}</span>
            <strong>
              {lang === "DE" ? "Hallo, wie können wir Ihnen helfen?" :
               lang === "RU" ? "Здравствуйте, чем мы можем помочь?" :
               lang === "ZH" ? "您好，我们可以如何帮助您？" :
               lang === "TR" ? "Merhaba, nasıl yardımcı olabiliriz?" :
               "Hello, how can we help?"}
            </strong>
          </div>
          <div className="desk-points">
            {copy.desk.points.map((point) => <span key={point}>{point}</span>)}
          </div>
        </div>
      </section>

      <section className="method-section" id="method">
        <div className="method-slash" aria-hidden="true">/</div>
        <div className="method-copy">
          <h2>{copy.method.title}</h2>
          <p>{copy.method.body}</p>
        </div>
        <div className="method-steps">
          {copy.method.steps.map((step) => (
            <article key={step[0]}>
              <span>{step[0]}</span>
              <h3>{step[1]}</h3>
              <p>{step[2]}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="geography-section">
        <p className="geo-words">LONDON / EUROPE / TÜRKİYE</p>
        <div>
          <h2>{copy.geography.title}</h2>
          <p>{copy.geography.body}</p>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div>
          <h2>{copy.contact.title}</h2>
          <p>{copy.contact.body}</p>
        </div>
        <address>
          <strong>{copy.contact.office}</strong>
          <span>86-90 Paul Street</span>
          <span>London, EC2A 4NE</span>
          <a href="tel:+442039128119">+44 (0)20 3912 8119</a>
          <a href="mailto:anexconsultancy@anexglobal.uk">anexconsultancy@anexglobal.uk</a>
        </address>
      </section>

      <footer className="anex-footer">
        <div className="anex-footer__mark">ANEX</div>
        <p>{copy.notice}</p>
        <div>© 2026 ANEX. London, United Kingdom.</div>
      </footer>

      <ChatWidget lang={lang} />
    </main>
  );
}
