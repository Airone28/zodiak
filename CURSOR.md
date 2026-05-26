Perfetto. Ora copia tutto il testo qui sotto e incollalo nel file CURSOR.md aperto in Cursor — il file è vuoto, quindi incolli direttamente:
markdown# CURSOR.md — Contesto Progetto Zodiak

## Cos'è questo progetto
App di astrologia in italiano, simile a Co-Star. 
Target: donne 25-38 anni, mercato italiano (espandibile a spagnolo).
Posizionamento: serio e psicologico, non pop o ironico.

## Stack tecnico
- Next.js 15 con App Router
- TypeScript
- Tailwind CSS
- Supabase (database + autenticazione)
- Claude API / Haiku (generazione insight personalizzati)
- AstrologyAPI.com (calcolo tema natale e transiti)
- PostHog (analytics e A/B test)
- Vercel (deploy)

## Funzionalità core (MVP)
1. Onboarding — inserimento data, ora, luogo di nascita
2. Tema natale — visualizzazione pianeti, segni, case
3. Insight giornaliero — testo personalizzato generato da AI
4. Compatibilità — confronto tra due temi natali (Fase 2)

## Struttura cartelle
/app — pagine e route Next.js
/components — componenti riutilizzabili
/lib — logica business (API astrologica, Claude, Supabase)
/public — asset statici

## Stato attuale
- [x] Progetto Next.js creato
- [x] File di contesto creati
- [x] Codice su GitHub — github.com/Airone28/zodiak
- [x] Deploy su Vercel — zodiak-rho.vercel.app
- [x] Supabase configurato
- [ ] Autenticazione utenti
- [ ] Onboarding
- [ ] Integrazione API astrologica
- [ ] Integrazione Claude API
- [ ] Insight giornaliero

## Come usare questo file
All'inizio di ogni sessione di lavoro con Claude:
1. Apri questa chat
2. Scrivi "Riprendiamo il progetto Zodiak —"
3. Incolla il contenuto di questo file
4. Descrivi cosa vuoi fare oggi