# Voyager — Travel Advisory App

> **Live demo:** _coming soon_  
> **Screenshot:** _add a screenshot of the deployed app here_

Voyager is a responsive travel-planning companion that brings together country essentials and current travel-advisory data. Search a destination to see its advisory level, practical country information, and save it to a personal watchlist.

## Features

- Search countries by name with clear loading, empty, and network-error states
- Travel-advisory scores translated into four easy-to-read safety levels
- Country briefings with flag, capital, region, currency, population, and languages
- Browse popular destinations and filter them by advisory level
- Persistent local watchlist powered by `localStorage`
- Light and dark themes, plus a mobile-first responsive interface

## Tech stack

- React 19 + Vite
- React Router for client-side navigation
- Native Fetch API for data requests
- REST Countries API and Travel Advisory API
- Plain CSS with custom responsive design tokens
- ESLint and Prettier for code consistency

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite (normally `http://localhost:5173`).

Other useful commands:

```bash
npm run lint
npm run build
npm run preview
```

## Data sources

- [REST Countries](https://restcountries.com) supplies country facts and flags.
- [Travel Advisory API](https://www.travel-advisory.info/api) supplies advisory scores.

The app presents advisory data as a useful starting point, not official travel advice. Check your government’s official travel guidance before booking or travelling.

## Why I built this

I wanted to make the pre-trip research step feel calmer and more useful: rather than jumping between country profiles and safety notices, a traveller can get the key context in one focused view. Building Voyager let me practise composing data from two independent APIs, designing resilient async states, and creating a complete, responsive product experience with React.

## Deployment

This Vite app is ready to deploy to Vercel or Netlify with no environment variables required. See the deployment walkthrough in the project handoff for exact steps.
