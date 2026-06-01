# PostHog post-wizard report

The wizard has completed a deep integration of PostHog into Zodiak, an Italian astrology app built on Next.js 16 App Router. PostHog is initialized client-side via `instrumentation-client.ts` (the recommended approach for Next.js 15.3+), with a reverse proxy configured in `next.config.ts` to route events through `/ingest`. A server-side PostHog client (`lib/posthog-server.ts`) was added for tracking events in API routes. User identification is performed at both login and onboarding completion, linking client-side and server-side events to the same user identity. Exception tracking (`capture_exceptions: true`) is enabled globally.

| Event | Description | File |
|---|---|---|
| `user_registered` | User successfully submitted the registration form (email confirmation sent) | `app/registrati/page.tsx` |
| `user_logged_in` | User authenticated successfully via email/password | `app/login/page.tsx` |
| `login_failed` | User attempted to log in but credentials were invalid | `app/login/page.tsx` |
| `onboarding_completed` | User submitted their birth data (top of conversion funnel) | `app/onboarding/page.tsx` |
| `insight_viewed` | User successfully loaded and viewed their daily astrological insight | `app/home/page.tsx` |
| `insight_generated` | Server-side: a new AI-generated astrological insight was created for a user | `app/api/genera-insight/route.ts` |
| `insight_generation_failed` | Server-side: the insight generation API encountered an error | `app/api/genera-insight/route.ts` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics dashboard](/dashboard/1654491)
- [New registrations over time](/insights/6YBOhWff)
- [User logins over time](/insights/LkrGJaDk)
- [User activation funnel](/insights/QMcQ1Ov4) — Registration → Onboarding → First insight view
- [Daily insights generated](/insights/fCVbeyb9)
- [Onboarding completions over time](/insights/FS0YtkcU)

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
