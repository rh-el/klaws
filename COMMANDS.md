# add dependency

add with npm / pip

```bash
# stop containers
docker compose -f docker-compose.dev.yml down

# stop remove frontend / server container
docker compose down -v frontend

# rerun
./start-dev.sh
```
