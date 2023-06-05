# End-to-End Testing with Playwright 

This project contains a suite of tests implemented using Playwright, a Node.js library to automate web browsers, to perform end-to-end testing on a website. The test suite includes tests for navigation, interaction with elements, page redirects, and iframe interactions. The tests use both CSS selectors and XPath to locate and interact with the page elements.

## Configuration

The project uses a configuration file `playwright.config.ts` for Playwright settings, which allows different configurations for different environments. The base URL for the tests is determined by the `ENV` environment variable. If `ENV` is not set, 'prod' is used by default.

Configuration options include:
- `headless`: If set to true, the tests will run in the headless mode.
- `viewport`: Sets the viewport size.
- `screenshot`: If set to 'only-on-failure', a screenshot will be taken only when a test fails.

## Installation

1. Make sure you have Node.js installed on your machine. If not, you can download it from [here](https://nodejs.org/en/).

2. Clone this repository to your local machine.

3. Navigate to the project directory and install the dependencies by running the following command:
   
```
npm install
```
## Usage

To run the tests, use the following command in your terminal:
```
npm test
```

If you want to set the `ENV` variable to run tests against different environments, use the following command (replace 'env' with the desired environment):

```
ENV=env npm test
```

The ENV variable can be set as per your needs in your CI/CD pipeline configuration for different environments.

## Test Descriptions

- `User is able to navigate to Newsletter by selector`: This test verifies that the user can successfully navigate to the Newsletter page using a CSS selector.

- `User is able to navigate to Newsletter by XPath`: Similar to the previous test, but it uses XPath to locate the Newsletter link.

- `At the article screen, user is able to click on the first article and it successfully loads`: This test verifies that the user can click on the first article on the page and that it loads successfully.

- `At the article screen, user is able to click on “Older” at first page`: This test verifies that the user can navigate to the older articles page from the first page of articles.

- `At the article screen, user is able to click on “Older” at middle page`: This test checks if the user can navigate to the older articles page from a middle page of articles.

- `At the article screen, user is unable to click on “Older” at last page`: This test checks if the "Older" link is absent on the last page of articles.

- `User is able to click on the search icon and search for “cypress”`: This test verifies that the user can perform a search for the term "cypress".

- `User is able to search for “cypress” and click on the “An Intro to Web Site Testing with Cypress” article and it loads successfully`: This test checks if the user can perform a search for "cypress", click on a specific search result, and verify that it loads successfully.

- `User is able to navigate to the Almanac`: This test checks the user's ability to navigate through the Almanac section of the website, interact with iframe elements and verify code snippet presence.


