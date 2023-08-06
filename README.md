# eCommerce-Application

This repository contains a SPA web application for an online store selling pets.

The store contains pages:
  - registration;
  - entrance;
  - home;
  - product page in the catalog;
  - detailed product page;
  - user profile;
  - basket;
  - "About Us";

## Technology stack used:
-TS
- SCSS
- ESlint
- Prettier
-Jest
- webpack
- Husky

## To run locally on your computer:

   - fork the repository
   - clone the repository (git clone)
   - install dependencies (npm install)
   - add an .env environment file with BASE_URL and BEARER_TOKEN variables (must be obtained from your API)
   - run the project (npm run start)

## Description scripts

  - npm start = run devServer, open new browser tab, watch mode
  - npm run dev = build app on development mode
  - npm run prod = build app on production mode
  - npm run lint = run eslint in src folder
  - npm run prettier = run prettier format in src folder
  - npm run test = run jest tests
