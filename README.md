# RESTful API Node Server Hotel Booking
![workflow](https://github.com/keturss/hotel-backend/actions/workflows/backend.yml/badge.svg)

A School project RESTful APIs using Node.js, Express, and Mongoose.

By running a single command, you will get a production-ready Node.js app installed and fully configured on your machine. The app comes with many built-in features, such as authentication using JWT, request validation, unit and integration tests, continuous integration, docker support, API documentation, pagination, etc. For more details, check the features list below.


## Manual Installation

If you want to do the installation, follow these steps:

Clone the repo:

```bash
git clone https://github.com/keturss/frontend-backend-CI-CD.git
cd frontend-backend-CI-CD.git
```

Install the dependencies:

```bash
yarn install
```

Set the environment variables:

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```



## Commands

Running locally:

```bash
yarn dev
```

Running in production:

```bash
yarn start
```

Testing:

```bash
# run all tests
yarn test

# run all tests in watch mode
yarn test:watch

# run test coverage
yarn coverage
```

Docker:

```bash
# run docker compose
docker compose up

```

Linting:

```bash
# run ESLint
yarn lint

# fix ESLint errors
yarn lint:fix

# run prettier
yarn prettier

# fix prettier errors
yarn prettier:fix
```

## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
# Port number
PORT=3000

# URL of the Mongo DB
MONGODB_URL=mongodb://127.0.0.1:27017/expressApi

```

## Project Structure

```
src\
 |--config\         # Environment variables and configuration
 |--controllers\    # Route controllers (controller layer) 
 |--databases\      # Connection mongodb 
 |--dtos\           # Data transfer object 
 |--exceptions\     # HTTP Exception 
 |--http\           # Request HTTP ( Postman alternative)
 |--interfaces\     # Request data validation schemas
 |--middlewares\    # Custom express middlewares
 |--models\         # Mongoose models (data layer)
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--utils\          # Utility classes and functions
 |--validations\    # Request data validation schemas
 |--app.js          # Express app
 |--index.js        # App entry point
```
