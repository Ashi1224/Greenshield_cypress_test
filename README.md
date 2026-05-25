# GreenShield – QA Automation Engineer II Technical Assignment

Cypress.io automation suite covering both test cases from the GreenShield take-home assignment. Tests run against the Sauce Labs demo application: [https://www.saucedemo.com](https://www.saucedemo.com).

## Test Coverage

Both test cases from the assignment are implemented.

**Test Case #1 — Add Products to Cart and Complete Order Workflow** (`checkout.cy.js`)

End-to-end purchase flow covering the full lifecycle:

1. Log in with `standard_user`
2. Add Sauce Labs Bike Light, Bolt T-Shirt, and Onesie to cart
3. Navigate to the cart and verify contents
4. Open the Onesie product detail page from the cart
5. Remove the Onesie from the product detail page
6. Navigate back to the inventory page and verify all six products show the correct Add/Remove button state
7. Return to the cart and confirm the Onesie is gone while the other two items remain
8. Complete the checkout form (first name, last name, postal code) and finalize the order
9. Verify the order confirmation page
10. Return home, reset app state, and assert the inventory page is in its default state

**Test Case #2 — Product Sort Dropdown Validation** (`product.cy.js`)

Validates all four sort options plus the page's default state. Each `it` block is isolated to one sort behavior so a failure points directly to the broken option:

- Default sort on page load is Name (A to Z)
- Name (A to Z) — alphabetical ascending
- Name (Z to A) — alphabetical descending
- Price (low to high) — numeric ascending
- Price (high to low) — numeric descending

A bonus login spec (`login.cy.js`) verifies the credentials fixture works and the landing page loads correctly. It also serves as a quick smoke test.

## Project Structure

```
greenshield_test/
├── cypress/
│   ├── e2e/
│   │   ├── checkout.cy.js          # Test Case #1
│   │   ├── login.cy.js             # Login smoke test
│   │   └── product.cy.js           # Test Case #2
│   ├── fixtures/
│   │   └── users.json              # Test credentials
│   ├── pages/                      # Page Object Model classes
│   │   ├── CartPage.js
│   │   ├── CheckoutPage.js
│   │   ├── InventoryPage.js
│   │   └── LoginPage.js
│   └── support/
│       ├── commands.js
│       └── e2e.js
├── cypress.config.js
├── package.json
└── README.md
```

## Prerequisites

- Node.js 18 or newer
- npm

## Setup

Clone the repository (or unzip the submission), then install dependencies:

```bash
npm install
```

This installs Cypress 15 and any other dev dependencies listed in `package.json`.

## Running the Tests

Open Cypress in interactive mode (recommended for the interview walk-through):

```bash
npm run cy:open
```

Pick the E2E testing target, choose a browser, and click any spec file to run it.

Run the entire suite headlessly:

```bash
npm run cy:run
```

Run a single spec headlessly:

```bash
npx cypress run --spec "cypress/e2e/checkout.cy.js"
```

Note: Cypress runs specs in alphabetical order (`checkout`, `login`, `product`), so the login smoke test is not the first to execute. It can be run on its own at any time with the single-spec command above.

### Page Object Model

Each page of the application has its own class under `cypress/pages/`. The workflow specs interact with the app through page object methods rather than calling `cy.get()` inline. This keeps selectors in one place (so a UI change touches one file, not five) and keeps the specs themselves readable as a sequence of user actions.

### Two Login Approaches: Page Object vs. Custom Command

The suite demonstrates both common patterns for a shared action like login:

- The **workflow specs** (`checkout.cy.js`, `product.cy.js`) log in through `LoginPage.login()` — the Page Object Model approach, which centralizes selectors and scales well as the suite grows.
- The **login spec** (`login.cy.js`) logs in through `cy.login()`, a Cypress custom command registered globally in `cypress/support/commands.js`. Custom commands are available on every spec without an import, which makes them convenient for simple, frequently repeated actions.

Both are valid; the choice depends on how much shared state and structure the suite needs. Showing both makes the trade-off explicit.

### `data-test` Selectors Preferred

Where Sauce Labs exposes `data-test` attributes (most buttons, form inputs), those are used in preference to CSS classes or text content. They're stable: they won't break if the team renames a class or rewords a label. CSS classes are used only where no `data-test` attribute is available (e.g., `.title`, `.complete-header`, `.shopping_cart_badge`, `.cart_item`).

### Cart Assertions Check Rows, Not Just Text

The cart verification methods assert on the number of `.cart_item` rows and the contents of the scoped `[data-test="inventory-item-name"]` elements, rather than matching text anywhere on the page. Counting rows catches a duplicate or a stray item that a page-wide text check would miss, and the expected counts reflect the specific scenario under test (three items added, one removed, two remaining).

### Fixtures for Credentials

Login credentials live in `cypress/fixtures/users.json` rather than being hardcoded in specs. This makes it trivial to add a `lockedOutUser` or `problemUser` later (Sauce Labs exposes several test accounts) without touching the test logic.

### Sorting Validation Reads the DOM

Rather than asserting against hardcoded expected arrays, `verifyProductsSortedByName` and `verifyProductsSortedByPrice` extract the actual rendered values, sort a copy programmatically, and compare. If Sauce Labs ever changes the product catalog, the tests still validate sort behavior correctly without needing updates.

### One `it` Per Sort Option

Test Case #2 has five `it` blocks (one per option, plus the default state check) rather than a single block that exercises every option in sequence. If the high-to-low sort breaks, the report tells you exactly that, instead of "the sort test failed somewhere."

### Login via UI

The login step runs through the actual UI in `beforeEach` rather than setting a cookie or session token programmatically. This adds a few seconds per test but means the login flow itself is exercised continuously. For a larger suite, `cy.session()` would cache the logged-in state across specs — worth adding if the suite grew.

## Author
Ashwini Parte
