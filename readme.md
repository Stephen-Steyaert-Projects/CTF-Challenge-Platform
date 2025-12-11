# Running Instructions <!-- omit in toc -->

**Table of contents**
- [Requirements](#requirements)
- [Environment Files](#environment-files)
- [Instructions](#instructions)
- [To make an Admin Profile](#to-make-an-admin-profile)

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
   1. If you are running on your own machine, you do not need the `.env.frontend` file. The variables will resolve themselves.
2. Run the following command:
    ```bash
    docker compose up -d
    ```
3. Access the application:
    * Frontend: [http://localhost:3000](http://localhost:3000)
    * Backend: [http://localhost:4000](http://localhost:4000)

4. Stop Everything:
   ```bash
    docker compose down
   ```
---

## To make an Admin Profile

Run the following in your terminal after making sure that the backend is running:

```bash
curl --location --request POST 'http://localhost:4000/auth/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "adminUsername",
    "password": "adminPassword",
    "isAdmin": true
}'
```