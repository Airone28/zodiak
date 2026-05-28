# DECISIONI — Progetto Zodiak

## Prodotto
- **Nome**: Zodiak
- **Mercato primario**: Italia
- **Espansione futura**: Mercato spagnolo (500M persone, non presidiato)
- **Posizionamento**: Serio e psicologico, stile Co-Star — non ironico né pop
- **Target**: Donne 25-38 anni, città medio-grandi, knowledge work
- **Comparable**: Co-Star (USA) — primo mover in italiano

## Funzionalità MVP (in ordine di priorità)
1. Tema natale personalizzato — core differenziante
2. Insight giornaliero AI — motore di retention
3. Compatibilità — motore di viralità (Fase 2)

## Monetizzazione
- Modello freemium
- Gratuito: oroscopo giornaliero generico, tema natale base
- Premium: insight personalizzato sul tema natale, compatibilità dettagliata
- Prezzo target: 2,99-4,99€/mese
- Quota store: 30% Apple/Google (15% dopo primo anno)

## Metrica nord
- Day 7 retention — indicatore principale successo MVP

## Stack tecnico — perché queste scelte
- **Next.js**: standard industria, ottimo supporto Cursor, compilabile per mobile
- **TypeScript**: riduce errori, Cursor lo gestisce benissimo
- **Supabase**: database + auth tutto in uno, piano free generoso
- **Claude Haiku**: costo minimo per insight giornalieri (~€0.002/utente/giorno)
- **AstrologyAPI.com**: soluzione immediata per MVP, poi Swiss Ephemeris in Fase 3
- **Vercel**: deploy automatico da GitHub, piano free illimitato
- **PostHog**: analytics + A/B test, piano free fino a 1M eventi/mese

## Distribuzione
- Fase 1: web app (localhost → Vercel)
- Fase 2: app nativa iOS + Android tramite sviluppatore esterno
- Marketing: organico TikTok + partnership creator italiani
- Creator target: profili astrologia italiani 50-200k follower

## Costi stimati
- Fase 1: €0 sviluppo, €5-20/mese operativi
- Fase 2: €3-8K una tantum sviluppatore, €80-250/mese operativi
- Fase 3: €800-2.500/mese costi, €5-15K/mese revenue attesa

## A/B test pianificati
- Tono insight: psicologico/riflessivo vs diretto/pratico
- Orario notifica: 7:30 vs 8:30 vs 9:00
- Schermata paywall: quale feature premium mostrare per prima

## Sessioni di lavoro
- Disponibilità: 2-4 ore/settimana
- Tool: Cursor + Claude
- Flusso: apri CURSOR.md → incolla in chat Claude → descrivi obiettivo sessione

## Credenziali e API keys

### Supabase
- Project URL: https://qbnabkkjryoqfeeukjqj.supabase.co
- Publishable key: sb_publishable_... (vedi .env.local)
- Secret key: (vedi .env.local — non salvare qui)
- Database Password: (vedi .env.local — non salvare qui)

### AstrologyAPI.com
- Access Token: (vedi .env.local)
- Piano: Trial ($2.00 crediti inclusi)