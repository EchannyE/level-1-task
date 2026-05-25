# Product Manager REST API Demo

A small full-stack demo application with:

- A Node.js + Express REST API for managing products
- A simple HTML, CSS, and JavaScript frontend that consumes the API
- Full CRUD operations: create, read, update, and delete

The backend stores data in memory, so product changes are reset whenever the server restarts.

## Project Structure

```text
backend/
  app.js
  package.json
  README.md
frontend/
  index.html
  script.js
  style.css
README.md
```

## Features

- View all products
- Add a new product
- Edit an existing product
- Delete a product
- Simple status messages for success and error states
- CORS enabled so the frontend can call the API from a browser

## Tech Stack

### Backend

- Node.js
- Express
- CORS
- Nodemon for development

### Frontend

- HTML5
- CSS3
- Vanilla JavaScript
- Fetch API

## Requirements

- Node.js 18 or later recommended
- npm
- A modern browser

## Installation

### 1. Install backend dependencies

Open a terminal in the `backend` folder and run:

```bash
npm install
```

## Running the Project

### Start the backend API

From the `backend` folder:

```bash
npm run dev
```

Or run it without nodemon:

```bash
npm start
```

The API starts at:

```text
http://localhost:5000
```

### Open the frontend

The frontend files are in the `frontend` folder.

You can:

- Open `frontend/index.html` directly in a browser, or
- Serve the `frontend` folder with a simple static server or the VS Code Live Server extension

The frontend is configured to call:

```text
http://localhost:5000/api/products
```

Make sure the backend is running before using the web interface.

## API Overview

Base URL:

```text
http://localhost:5000/api/products
```

### Health route

#### `GET /`

Returns a simple server message.

Response:

```json
"Simple REST API is running"
```

### Get all products

#### `GET /api/products`

Response:

```json
[
  {
    "id": 1,
    "name": "Laptop",
    "price": 350000
  },
  {
    "id": 2,
    "name": "Phone",
    "price": 180000
  }
]
```

### Get one product

#### `GET /api/products/:id`

Example:

```text
GET /api/products/1
```

Success response:

```json
{
  "id": 1,
  "name": "Laptop",
  "price": 350000
}
```

Error response:

```json
{
  "message": "Product not found"
}
```

### Create a product

#### `POST /api/products`

Request body:

```json
{
  "name": "Keyboard",
  "price": 15000
}
```

Success response:

```json
{
  "message": "Product created successfully",
  "product": {
    "id": 4,
    "name": "Keyboard",
    "price": 15000
  }
}
```

Validation error:

```json
{
  "message": "Name and price are required"
}
```

### Update a product

#### `PUT /api/products/:id`

Request body:

```json
{
  "name": "Gaming Keyboard",
  "price": 22000
}
```

Success response:

```json
{
  "message": "Product updated successfully",
  "product": {
    "id": 4,
    "name": "Gaming Keyboard",
    "price": 22000
  }
}
```

### Delete a product

#### `DELETE /api/products/:id`

Success response:

```json
{
  "message": "Product deleted successfully"
}
```

## Default Product Data

The API starts with these in-memory products:

- Laptop - 350000
- Phone - 180000
- Headphones - 25000

## Available Backend Scripts

From the `backend` folder:

```bash
npm start
```

Starts the server with Node.js.

```bash
npm run dev
```

Starts the server with Nodemon for automatic reloads during development.

## How the Frontend Connects to the API

The frontend JavaScript uses the Fetch API in `frontend/script.js` to call the backend:

- `GET` to load all products
- `POST` to add a product
- `PUT` to update a product
- `DELETE` to remove a product

The API URL is currently hardcoded as:

```js
const API_URL = "http://localhost:5000/api/products";
```

If you change the backend port or host, update that value in `frontend/script.js`.

## Limitations

- No database is used
- Data is lost when the server restarts
- No authentication or authorization
- No automated tests are included
- Frontend and backend are run separately

## Manual Test Flow

1. Start the backend with `npm run dev` inside `backend`
2. Open the frontend in a browser
3. Confirm the initial products load
4. Add a new product
5. Edit that product
6. Delete the product
7. Restart the backend and confirm data resets to the default list

## Future Improvements

- Add persistent storage with MongoDB, PostgreSQL, or SQLite
- Add form validation for invalid or negative prices
- Add automated tests for API routes and frontend behavior
- Serve the frontend from the same backend app
- Add search, filtering, and better currency formatting

## Author

This project appears to be a beginner full-stack task demonstrating REST API integration between a browser UI and an Express backend.
