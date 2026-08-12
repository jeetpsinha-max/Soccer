# Soccer

![React 19](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-Enabled-blue)
![Vite](https://img.shields.io/badge/Bundler-Vite-purple)
![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-v4-teal)
![Gemini 2.0 API](https://img.shields.io/badge/Gemini-2.0_API-blueviolet)

## Summary
Soccer AI Analytics & Team Performance Manager — player stat tracking, match tactics visualizer, and AI coaching insights for soccer programs.

## Core Features
*   **Match stats breakdown:** Comprehensive analytics of match events.
*   **Player position map:** Tactical positioning visualizations.
*   **AI tactical recommendations:** AI-driven coaching insights.
*   **Match replay simulation:** Interactive replays and simulations.
*   **Team roster management:** Manage players and positions easily.

## Setup Guide
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```

## API Endpoints
*   GET /api/health - Health check.
*   POST /api/tactics/analyze - AI tactical breakdown and formation recommendations (requires Gemini API).
*   POST /api/match/simulate - Simulates match stats and provides AI coaching cues.
*   GET /api/players/rankings - Returns mock/stored player efficiency metrics.
