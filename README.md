# ImageTrust AI: frontend

React + Tailwind CSS v4 (Vite). Uploads an image to the ImageTrust API and shows the verdict, the confidence and each model's result.

## Run locally

```
npm install
npm run dev
```

Open http://localhost:5173. Needs Node 20.19 or newer.

## Configuration

| Setting | Where | Meaning |
|---------|-------|---------|
| `VITE_API_URL` | `.env` locally, Environment Variables on Vercel | Address of the API, no trailing slash. Defaults to the Hugging Face Space. |
| Footer text and links | `src/lib/site.js` | Course, team, and the Source code / Report / Team links. Empty values are hidden. |

## Design review states

Add `?demo=` to the address to freeze a state: `real`, `fake`, `uncertain`, `loading`, `selected`, `drag-over`, `error-type`, `error-size`, `error-server`.

## Deploy

Push to GitHub, import the repository in Vercel (framework: Vite), and set `VITE_API_URL` if your API address differs from the default.
