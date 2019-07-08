# ChoirJS



Built with Node.js, Webpack.js, React.js and read the package.json for the dependencies.

## Pre-installation:

1) Install [NodeJS](https://nodejs.org)
2) Install [PostgreSQL](https://www.postgresql.org)

## Installation Instructions:

`npm install`

`npm run compile`

### PostgreSQL (default setup) instructions:

1) Create a database named `choir` with user `vagrant` and `vagrant` for the password.
2) Execute the sql queries found in `./libraries/db/README.md`

## Deployment:

`npm run server`

Visit `http://localhost:4000` in your browser.

### Developer Notes:

`npm install -g nodemon`

`npm run translate` - Builds multiple language support (json) files.