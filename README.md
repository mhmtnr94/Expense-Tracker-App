# 📱 Expense Tracker App (React Native Expo)

## 🧠 AI Development Environment
This project is being developed with React Native Expo

---

## 📌 Project Description
A mobile application that allows users to:
- Track income and expenses.
- Categorize transactions.
- View total balance, charts, and recent transactions.
- Filter transactions by date and category.

---

## 🚀 Tech Stack

- **React Native** (Expo)
- **TypeScript**
- **Tailwind CSS**
- **React Navigation**
- **Zustand** (State Management)
- **Victory-Native** (Charts)
- **AsyncStorage** (Local Persistence)

---

## ✅ Goals / Features

- [x] Clean and modern UI
- [x] Add income and expense entries
- [x] Categorize transactions (e.g. Food, Transport, Bills)
- [x] Display total balance, income, and expenses
- [x] View transaction history
- [x] Persistent data (AsyncStorage or local DB)
- [x] Responsive design for Android & iOS

---

## 🔧 Setup Instructions

```bash
npx create-expo-app expense-tracker-app -t with-typescript
cd expense-tracker-app

npm install react-native-svg victory-native zustand @react-navigation/native \
  @react-navigation/native-stack react-native-safe-area-context \
  @react-native-async-storage/async-storage

npx tailwindcss init
