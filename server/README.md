# Klaws Server (FastAPI + SQLModel)

## Dev setup

1. Create and activate venv

```bash
python3 -m venv .venv
source .venv/bin/activate
```

2. Install dependencies

```bash
pip install -r requirements.txt
```

3. Start Postgres (Docker)

```bash
# from repo root
docker compose up -d db
```

4. Configure environment

Copy `env.example` to `.env` and adjust if needed.

```bash
cp env.example .env
```

5. Run API

```bash
uvicorn app.main:app --reload --port 8000
```

The API exposes `GET /healthz` and will auto-create tables for SQLModel models on startup.

