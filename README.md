# 🍹 Cocktail Finder App

Welcome to **Cocktail Finder**, a sleek and performant React Native application that helps you discover your favorite drinks and cocktails seamlessly. Built with modern React Native patterns and Expo, this application provides an intuitive search experience powered by TheCocktailDB API.

## ✨ Features

- **Live Search with Debouncing:** As you type, the app intelligently waits for a pause before fetching results, optimizing network usage and API limits.
- **Beautiful UI:** Vibrant gradient backgrounds and clean, modern cards for displaying drink information.
- **Cross-Platform Compatibility:** Runs flawlessly on both iOS and Android.
- **Dynamic Data:** Fetches real-time cocktail data including images, names, and categories directly from a public REST API.
- **Modular Architecture:** Clean codebase separating hooks, styles, components, and main logic for high maintainability.

## 🛠 Tech Stack

- **Framework:** [React Native](https://reactnative.dev/)
- **Toolchain:** [Expo SDK 50+](https://expo.dev/)
- **Icons:** `@expo/vector-icons` (Ionicons, MaterialIcons, AntDesign, Fontisto)
- **Styling:** `expo-linear-gradient` and modularized `StyleSheet`

## 📂 Project Structure

```
cocktail-finder-app/
├── App.js                     # Main entry point and screen container
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── DrinkCard.js       # Card component to display individual drinks
│   │   └── Header.js          # App header with logo and title
│   ├── hooks/                 # Custom React hooks
│   │   └── useDebounce.js     # Hook to delay search queries
│   └── styles/                # Centralized stylesheet definitions
│       └── AppStyles.js       # Main application styles
├── package.json               # Project dependencies and scripts
└── app.json                   # Expo configuration file
```

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine. You will also need the Expo Go app installed on your iOS or Android physical device, or an emulator/simulator setup on your computer.

### Installation

1. Clone the repository or download the source code.
2. Navigate to the project directory in your terminal:
   ```bash
   cd cocktail-finder-app
   ```
3. Install the dependencies using npm or yarn:
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the App

Start the Expo development server:
```bash
npm start
# or
yarn start
```

Once the server starts, you can:
- **Scan the QR code** with your phone's camera (iOS) or the Expo Go app (Android) to open the app on your physical device.
- Press `i` in the terminal to open the iOS simulator (requires macOS and Xcode).
- Press `a` in the terminal to open the Android emulator (requires Android Studio).
- Press `w` to run it in your web browser.

## 📡 API Reference

This application uses the free tier of [TheCocktailDB API](https://www.thecocktaildb.com/api.php).

- **Endpoint used:** `https://www.thecocktaildb.com/api/json/v1/1/search.php?s={search_query}`
- **Note:** The free tier does not require an authentication key.
