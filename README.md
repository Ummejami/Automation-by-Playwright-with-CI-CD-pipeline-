# 🎭 Playwright Automation Testing

A simple UI automation testing project built with **Playwright** using the **Page Object Model (POM)** design pattern. The project automates common user interactions on a web application while keeping test scripts clean and maintainable.

## 📌 Project Overview

This project demonstrates:

- Playwright automation with JavaScript
- Page Object Model (POM)
- Reusable page classes
- End-to-end UI testing

## 🛠️ Technologies Used

- Playwright
- JavaScript
- Node.js
- Visual Studio Code

## 📂 Project Structure

```text
playwright-project/
│
├── pages/
│   ├── LoginPage.js
│   ├── ProductPage.js
│   ├── CartPage.js
│   └── CheckoutPage.js
│
├── tests/
│   └── example.spec.js
│
├── playwright.config.js
├── package.json
├── package-lock.json
└── README.md
```

## 📄 Page Objects

| File | Description |
|------|-------------|
| `LoginPage.js` | Contains methods related to user login. |
| `ProductPage.js` | Handles product selection and product-related actions. |
| `CartPage.js` | Manages shopping cart operations such as viewing and updating the cart. |
| `CheckoutPage.js` | Contains methods for completing the checkout process. |

## 🚀 Installation

### Clone the repository

```bash
git clone https://github.com/your-username/playwright-project.git
cd playwright-project
```

### Install dependencies

```bash
npm install
```

### Install Playwright browsers

```bash
npx playwright install
```

## ▶️ Run Tests

Run all tests:

```bash
npx playwright test
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

View the HTML report:

```bash
npx playwright show-report
```

## 📚 Features

- Page Object Model (POM)
- Reusable page classes
- Automated UI interactions
- Built-in Playwright assertions
- HTML test reports
- Cross-browser support

