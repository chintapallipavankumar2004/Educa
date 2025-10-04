# euca - Spring Boot backend (server-java)

This folder contains a Spring Boot backend that mirrors the original Node.js/Express APIs and stores sessions in MySQL using spring-session-jdbc.

Requirements
- Java 17
- Maven
- MySQL server (database `educadb` or set DB_NAME env)

Quick start (dev)

1. Set required environment variables in your shell or create an `.env` file at the project root (do NOT commit secrets). Example values:

```
DB_HOST=localhost
DB_PORT=3306
DB_NAME=educadb
DB_USER=root
DB_PASS=yourpassword
ADMIN_SECRET=some_secret
```

2. Optionally run the SQL in `src/main/resources/schema.sql` to create tables and spring-session tables.

3. Build and run:

```
cd server-java
mvn spring-boot:run
```

The server will run on port 5000 by default and expose the following endpoints (same shapes as the Node server):

- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/logout
- GET  /api/auth/me
- GET  /api/videos
- GET  /api/images
- POST /api/contact
- POST /api/admin/videos
- POST /api/admin/images
- POST /api/admin/promote
- GET  /api/admin/me

Frontend compatibility
- The frontend can remain unchanged; keep `fetch(..., { credentials: 'include' })` so the session cookie (named `session_cookie_name`) is sent to the Spring Boot backend.

Smoke test
1. Register a user via the frontend or POST /api/auth/register.
2. Promote that user using POST /api/admin/promote with the ADMIN_SECRET.
3. Login as that user (POST /api/auth/login).
4. Use Admin page to add a video/image and confirm via GET /api/videos and GET /api/images.
5. Submit contact form and confirm insertion in `contacts` table.
