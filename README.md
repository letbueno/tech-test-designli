# 📖 Tech Test Designli - Stock Dashboard

The Stock Dashboard is a React and TypeScript-based application designed to monitor and visualize real-time stock data using the Finnhub Stock API and WebSocket. It allows users to track stock prices, set price alerts, and analyze trends through an interactive interface.



https://github.com/user-attachments/assets/c800e5de-269b-4bec-a895-4bf5132ba2df



## 📝 Features

- Real-Time Stock Monitoring: Continuously fetch real-time stock data from Finnhub APIs and WebSocket connections to display up-to-date stock information and updates.
- Stocks Alert Form: A form with dropdown to select a stock to monitor and an input field to set price alerts.
- Stock Prices Chart: Display a dynamic line chart that visualizes stock price trends over time, updating in real-time as new data is received.
- Local Storage Persistence: Store stock data in local storage to ensure historical data persists when the app is reopened.
- Push Notifications: Trigger web push notifications when stock prices fall below alert levels.

## 🔧 Technology Used

- React & TypeScript: Frontend framework and language for building a reliable and efficient interface.
- Cache Management (Local Storage): Efficiently caches data to reduce API requests and improve performance.
- WebSocket: A communication protocol that provides real-time, two-way data exchange between the client and Finnhub. It ensures instant updates for stock prices and market activity, enabling the application to respond dynamically to market changes without requiring repeated API calls.
- [Material UI](https://mui.com/material-ui/getting-started/): A popular and flexible component library for React, providing a wide variety of customizable and pre-designed UI components.
- [Finnhub Stock API](https://finnhub.io/): A real-time stock market API that provides detailed information on stock prices, quotes, financial data, and more, essential for market analysis and financial tracking applications.
- [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/): Tools for enforcing consistent coding style and best practices, helping to maintain high-quality, readable code.

## 📊 Project Structure

- src/components: Stores reusable UI components, including elements such as the Stock Alert List and Stock Card, all built with Material-UI icons.
- src/contexts: Contains the Stock Context, managing shared state and logic across the application.
- src/services: Includes services for sending web notifications through the useNotification service and managing WebSocket connections with setupWebSocket.
- src/types: Defines custom types and interfaces such as StockPriceAlert, Stock types used across the application.
- src/pages: Contains the main page components, such as Home and Loading Page.

## 🖥️ Local development

#### Clone the repo:

```shell
git clone git@github.com:letbueno/tech-test-designli.git
```

#### Copy the .env.example to a .env file

This project uses the Finnhub Stock API to fetch real-time the stock data. To access the API, you need to obtain an API key from the [Finnhub Stock API](https://finnhub.io/). Once you have your API key, copy the .env.example file to .env to configure your local environment:

```shell
cp .env.example .env
```

In the **.env** file, replace VITE_API_KEY with your actual API key:

```
VITE_API_KEY=YOUR_API_KEY
```

### Install the application:

```shell
yarn install
```

### Start the app:

```shell
yarn dev
```

## 🧪 Test

For running the test suite

```shell
yarn test
```
