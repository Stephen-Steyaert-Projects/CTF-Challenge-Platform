# Running Instructions

## Requirements

- Docker with `docker-compose`
- [Environment Files](#environment-files)
- [docker-compose.yaml](docker-compose.yaml)

---

## Environment Files

- For the frontend environment file, download the [.env.example](ctf-frontend/.env.example), rename to `.env.frontend`.

- For the backend environment file, download the [.env.example](ctf-backend/.env.example), rename to `.env.backend`.

---

## Instructions

1. Move `docker-compose.yaml`, `.env.frontend`, and `.env.backend` to the same folder, i.e. `~/ctf/`
2. Run the following command:
    ```bash
    docker compose up -d
    ```
3. Access the application:
    * Frontend: [http://localhost:3000](http://localhost:3000)
    * Backend: [http://localhost:5000](http://localhost:5000)

5. Stop Everything:
   ```bash
    docker compose down
   ```
