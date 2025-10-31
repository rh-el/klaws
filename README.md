## Klaws

Monorepo:

-   `client/`: React + Vite + TypeScript (React Compiler activé)
-   `server/`: FastAPI + SQLModel

### Démarrage rapide

1. Base de données

```bash
docker compose up -d db
```

2. API

```bash
cd server
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp env.example .env  # ajuste si besoin
uvicorn app.main:app --reload --port 8000
```

3. Client

```bash
cd client
npm install
npm run dev
```

Le client proxifie `/api` vers `http://localhost:8000`.
