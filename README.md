# TDC Matchmaker Dashboard MVP

Internal CRM and Matchmaker Workbench dashboard for **The Date Crew (TDC)** matchmakers to manage client profiles, search prospects, evaluate compatibilities, and generate introductory outreach letters.

## Live Deployment
- **Live URL**: [https://tdc-matchmaker-mvp.vercel.app](https://matchly-nine.vercel.app/) *(Placeholder for production deployment)*

## Tech Stack
- **Frontend**: React (Vite) + Tailwind CSS v4 + Lucide Icons
- **Backend**: Node.js + Express
- **AI Matching**: Anthropic Claude API (`claude-sonnet-4-20250514`)
- **Database**: Static JSON file (`data/profiles.json` containing 100 Indian matrimonial profiles)

---

## Local Development Setup

### Prerequisites
- Node.js (v18+)
- npm (v9+)
- Anthropic API Key *(Optional. If missing, the app triggers dynamic fallback scores and templates)*

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/tdc-matchmaker.git
   cd tdc-matchmaker
   ```

2. **Configure Environment Variables**:
   Create a `.env` file in the `backend/` folder (or root directory depending on execution):
   ```bash
   cp .env.example backend/.env
   ```
   Add your Anthropic API Key inside `backend/.env`:
   ```env
   PORT=5000
   ANTHROPIC_API_KEY=your_claude_api_key_here
   ```

3. **Install Dependencies**:
   You can install dependencies for both the frontend and backend with a single command from the root directory:
   ```bash
   npm run install-all
   ```
   *(Alternatively, run `npm install` inside both the `backend/` and `frontend/` folders individually.)*

### Running the App locally

From the root directory, launch both the backend and frontend dev servers concurrently:
```bash
npm run dev
```
- The backend API server will run on **`http://localhost:5000`**
- The frontend Vite client will run on **`http://localhost:5173`**

*(Alternatively, you can run them in separate terminal windows: run `npm run dev` inside `backend/` and `npm run dev` inside `frontend/` respectively.)*

Open your browser to **`http://localhost:5173`** to access the dashboard.

---

## Authentication Credentials

To access the internal dashboard portal:
- **Email**: `matchmaker@tdc.com`
- **Password**: `tdc2024`

*Note: Auth status is cached in `localStorage` so sessions persist on page refreshes.*

---

## Matchmaking Algorithm Heuristics

The directory matching engine evaluates compatibilities on traditional and modern criteria:
- **Age Proximity**: Scores higher if partner aligns with gender preferences (e.g. younger for male clients, similar/older for female clients).
- **Height & Physical Metrics**: Custom complementary height offsets (e.g. woman shorter by 5-15cm).
- **Financial Status**: Income matches in LPA (Lakhs Per Annum) to support stable parity.
- **Cultural Markers**: Match score weights same religion, matching caste, family structure (Nuclear vs Joint), and Manglik compatibility.
- **Lifestyle & Location**: Compares diet preferences (Veg/Non-Veg), smoking/drinking habits, local city proximity, and language overlaps.
