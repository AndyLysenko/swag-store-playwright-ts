# SauceDemo E2E Tests

This repository contains end-to-end tests for the [SauceDemo](https://www.saucedemo.com/) web application. SauceDemo is a demo internet store web application provided by SauceLabs for testing purposes.

## Technologies

- [Playwright](https://playwright.dev/)
- TypeScript
- Node.js

## Approach

The tests in this repository use a Data Driven approach, with test data stored in JSON files. This allows for easy addition of new test cases.

The tests also perform preauthentication and save the state, allowing tests to run in parallel for increased speed and efficiency.

## Project Structure

```
test 
    ├── data 
    ├── helpers 
    ├── model 
    ├── pages 
    ├── setup 
    └── specs
```

## Running the tests

To run the tests, follow these steps:

1. Install the dependencies: `npm install`
2. Run the tests: `npm test`

## Code Quality

This project uses [ESLint](https://eslint.org/) to enforce a predefined set of code quality rules. This helps to maintain a consistent coding style and catch potential bugs early.

To run ESLint, use the following command:

```bash
npm run lint
```

## Useful Links

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [SauceDemo Application](https://www.saucedemo.com/)

## License

This project is licensed under the terms of the MIT license.