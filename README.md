# CSE 341 - Project 2: Bookstore REST API

A RESTful API built with **Node.js**, **Express**, **MongoDB**, **validatorjs**, and **Swagger** for BYU CSE 341.

---

## 📚 Project Overview

The **Bookstore API** provides complete CRUD operations for managing a bookstore catalog across two collections in MongoDB:

1. **`books` Collection**: Contains detailed information about books with **8 fields** (satisfying the assignment requirement for at least 7 fields).
2. **`authors` Collection**: Contains author profiles with **5 fields**.

---

## 🗄️ Database Collections & Schemas

### 1. `books` Collection (8 Fields)

| Field           | Type   | Description            | Validation Rules                  |
| :-------------- | :----- | :--------------------- | :-------------------------------- |
| `title`         | String | Title of the book      | Required, string                  |
| `author`        | String | Author name            | Required, string                  |
| `isbn`          | String | ISBN identifier        | Required, string                  |
| `publishedYear` | Number | Year published         | Required, numeric, min: 1000      |
| `genre`         | String | Book genre/category    | Required, string                  |
| `pageCount`     | Number | Total number of pages  | Required, integer, min: 1         |
| `rating`        | Number | Reader rating (0 to 5) | Required, numeric, min: 0, max: 5 |
| `language`      | String | Language written in    | Required, string                  |

### 2. `authors` Collection (5 Fields)

| Field         | Type   | Description                     | Validation Rules             |
| :------------ | :----- | :------------------------------ | :--------------------------- |
| `name`        | String | Author's full name              | Required, string             |
| `bio`         | String | Short biography                 | Required, string             |
| `nationality` | String | Nationality / Country of origin | Required, string             |
| `birthYear`   | Number | Year born                       | Required, numeric, min: 1000 |
| `website`     | String | Official website or profile URL | Required, string             |

---

## 🚀 API Endpoints

### Books Endpoints (`/books`)

| Method   | Endpoint     | Description                  | Status Codes                      |
| :------- | :----------- | :--------------------------- | :-------------------------------- |
| `GET`    | `/books`     | Retrieve all books           | `200`, `401`, `500`               |
| `GET`    | `/books/:id` | Retrieve a single book by ID | `200`, `400`, `401`, `404`, `500` |
| `POST`   | `/books`     | Create a new book            | `201`, `400`, `401`, `500`        |
| `PUT`    | `/books/:id` | Update an existing book      | `204`, `400`, `401`, `404`, `500` |
| `DELETE` | `/books/:id` | Delete a book                | `200`, `400`, `401`, `404`, `500` |

### Authors Endpoints (`/authors`)

| Method   | Endpoint       | Description                    | Status Codes                      |
| :------- | :------------- | :----------------------------- | :-------------------------------- |
| `GET`    | `/authors`     | Retrieve all authors           | `200`, `401`, `500`               |
| `GET`    | `/authors/:id` | Retrieve a single author by ID | `200`, `400`, `401`, `404`, `500` |
| `POST`   | `/authors`     | Create a new author            | `201`, `400`, `401`, `500`        |
| `PUT`    | `/authors/:id` | Update an existing author      | `204`, `400`, `401`, `404`, `500` |
| `DELETE` | `/authors/:id` | Delete an author               | `200`, `400`, `401`, `404`, `500` |

### Authentication Endpoints

| Method | Endpoint                | Description                                        | Status Codes        |
| :----- | :---------------------- | :------------------------------------------------- | :------------------ |
| `GET`  | `/auth/github`          | Create an account or log in with GitHub            | `302`, `503`        |
| `GET`  | `/auth/github/callback` | Complete GitHub authorization and create a session | `302`, `503`        |
| `GET`  | `/auth/me`              | Get the current GitHub profile                     | `200`, `401`        |
| `POST` | `/auth/logout`          | End the current session                            | `204`, `401`, `500` |

All `/books` and `/authors` operations require a logged-in GitHub user. Account creation and login are handled by GitHub OAuth, so this API never receives or stores user passwords. Successful login is maintained by an HTTP-only session cookie.

---

## 🛡️ Validation & Error Handling

- **Data Validation**: Uses `validatorjs` via dedicated middleware in `middleware/validate.js`. If any required fields are missing or fail type/range checks on `POST` or `PUT`, the API returns HTTP `400 Bad Request` with structured error messages.
- **ID Validation**: Validates that `:id` is a 24-character hexadecimal MongoDB ObjectId. Invalid IDs return HTTP `400 Bad Request`.
- **Error Handling**: Every route handler wraps database calls in `try/catch` blocks and delegates to the global error middleware, returning HTTP `400` or `500` with descriptive JSON messages.

---

## 📖 Swagger Documentation

Interactive Swagger documentation is served at:

```
http://localhost:8080/api-docs
```

To regenerate `swagger.json` after making route changes:

```bash
npm run swagger
```

---

## 🛠️ Getting Started Locally

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file based on `.env.example`:

```env
PORT=8080
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.bwjbowr.mongodb.net/bookstore?retryWrites=true&w=majority
SWAGGER_HOST=localhost:8080
SESSION_SECRET=<long-random-secret>
GITHUB_CLIENT_ID=<github-oauth-client-id>
GITHUB_CLIENT_SECRET=<github-oauth-client-secret>
GITHUB_CALLBACK_URL=http://localhost:8080/auth/github/callback
```

> **Security Notice**: `.env` is listed in `.gitignore` and must never be committed to Git.

Create a GitHub OAuth App and set its **Authorization callback URL** to the value of `GITHUB_CALLBACK_URL`. Use a different callback URL for deployment, set `SESSION_SECRET` to a long random value, and use HTTPS in production.

### 3. Start the Server

```bash
npm start
```

The server will start at `http://localhost:8080`.

---

## 🧪 Testing with REST Client

Use the included [`requests.rest`](./requests.rest) file to execute and test all 15 CRUD and validation test cases locally or against your deployed Render service.
