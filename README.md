# Klaws

Klaws is a spatial sound composition interface in the browser associated with an AR mobile application.

**This repository wraps the sound composition interface**.

It allows users to draw shapes on a map with their mouse, upload a sample in each of them, select a playback mode and apply several sound effects.

The idea is to create through this application, then let users discover the composition on an associated mobile app using geolocation, playing crossed areas samples with real-time audio spatialization.


## Tech stack
Client: React, Maplibre, Reshaped

Server: FastAPI, SQLModel

dB: PostGIS
## Installation

Clone the project:

```
git clone git@github.com:rh-el/klaws.git
```

### 1) With Docker
If you have Docker installed:
```
./start-dev.sh
```

Both applications (client and server) are running:
- <http://localhost:8000/docs> API visualization and tests
- <http://localhost:5173/> client application

### 2) Without Docker
### Server

**Create a virtual environment**

```python
cd server
python3 -m venv .venv
source .venv/bin/activate
```
**Install dependencies**
```python
python -m pip install --upgrade pip
pip install -r requirements.txt
```
**Start server**
```python
uvicorn app.main:app --reload
```


### Client
**Install dependencies**
```python
cd client
npm i
```
**Start client**
```python
npm run dev
```
