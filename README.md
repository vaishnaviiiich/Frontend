# AegisShield

A minimal analyst console for Digital Risk Protection: Social & App Monitoring.

## Data mode

The app runs with a realistic local demo dataset by default. It includes seeded detections, cases, a brand profile, typosquat results, campaign links, and live-event simulation so the main workflow can be explored without a backend.

To connect an external API, set:

- `VITE_API_BASE` — REST API base URL. When empty, the app uses mock data.
- `VITE_WS_URL` — optional WebSocket feed URL. The UI remains usable with the local simulator when no socket is available.

The typed request functions live in `src/services/api.ts`. A failed request also falls back to the same mock data and keeps the Demo data indicator visible.
