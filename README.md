# ⚽ Soccer - AI Tactical & Match Analytics Engine

[![CI/CD Pipeline](https://github.com/Avinashb722/Soccer/actions/workflows/ci.yml/badge.svg)](https://github.com/Avinashb722/Soccer/actions)
[![Powered by Gemini AI](https://img.shields.io/badge/Powered%20by-Gemini%202.5-4285F4?style=flat&logo=google&logoColor=white)](https://ai.google.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**Soccer** is an AI-powered tactical analysis and match analytics platform driven by Google Gemini 2.5 Flash (`@google/genai`). Built for soccer coaches, analysts, and sports science enthusiasts, Soccer provides automated formation recommendations, tactical opponent breakdowns, live match simulations, and player performance metrics.

---

## 🏗 System Architecture

```mermaid
graph TD
    User([Tactical Dashboard - React UI]) -->|HTTPS API| Server[Express Server]
    Server -->|CORS & Security| Middleware[Rate Limiting & Security Headers]
    Middleware -->|Routing Engine| Controllers{Soccer AI Services}
    Controllers -->|Tactical Breakdown| GeminiSDK[@google/genai SDK]
    Controllers -->|Match Simulator| SimEngine[Match Simulation Engine]
    Controllers -->|Player Rankings| DB[Player Analytics Store]
    
    GeminiSDK -->|Google API Call| Gemini25[Gemini 2.5 Flash Model]
    Gemini25 -->|Tactical Recommendations| GeminiSDK
    GeminiSDK -->|Structured JSON Payload| Controllers
    Controllers -->|API Response| User

    subgraph Resilience Layer
        Server -.->|Key Missing / Outage| Fallback[Tactical Fallback Engine]
        Fallback -.->|Mock Tactical Analysis| User
    end
```

---

## ⚡ Key Features

- 🧠 **Google Gemini 2.5 Flash Integration**: Real-time formation and tactical analysis using `@google/genai`.
- 📋 **Tactical Opponent Analysis**: In-depth breakdown comparing team setups against opponent weaknesses.
- 🎮 **Live Match Simulator**: Algorithmic match simulation generating stats, possession metrics, and coaching cues.
- 🏃 **Player Efficiency Rankings**: Real-time metric tracking for top player efficiency.
- 🔒 **Security Hardened**: CORS support, rate-limiting headers (`X-RateLimit-*`), and fallback resiliency.
- 🧪 **Vitest Integration Tests**: Fully integrated unit testing suite validating API response contracts.

---

## ⚙️ Environment Variables

Create a `.env` file in the project root:

```env
PORT=3001
NODE_ENV=development
GEMINI_API_KEY=your_google_gemini_api_key_here
```

---

## 🚀 Quick Setup & Installation

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Avinashb722/Soccer.git
   cd Soccer
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   ```bash
   cp .env.example .env
   # Add your GEMINI_API_KEY into .env
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```
   Server running at `http://localhost:3001`.

---

## 📡 API Reference

### Health Check
- **GET** `/api/health`
- **Response**:
  ```json
  {
    "status": "ok",
    "service": "soccer-ai-api",
    "timestamp": "2026-08-12T12:00:00Z",
    "version": "1.0.0",
    "geminiConfigured": true
  }
  ```

### Ask Gemini AI Agent
- **POST** `/api/gemini/ask`
- **Body**:
  ```json
  {
    "prompt": "Recommend tactical adjustments to exploit a low block defense.",
    "model": "gemini-2.5-flash"
  }
  ```

### Tactical Opponent Analysis
- **POST** `/api/tactics/analyze`
- **Body**:
  ```json
  {
    "teamInfo": "High pressing 4-3-3 with overlapping fullbacks",
    "opponentInfo": "Low block 5-3-2 with fast wingers on counter"
  }
  ```

### Match Simulation
- **POST** `/api/match/simulate`

### Player Rankings
- **GET** `/api/players/rankings`

---

## 🧪 Testing Guide

Run the Vitest integration suite:

```bash
# Execute unit & integration tests
npm test

# Run linter & type checking
npm run lint
```

---

## 📄 License

This project is open-source software licensed under the [MIT License](LICENSE).
