# 🧠 FrontGen - React + Tailwind Boilerplate

FrontGen is a production-ready, reusable React boilerplate designed to launch your full-stack projects in minutes. It provides a complete frontend foundation with a design system, UI components, authentication, routing, and pre-built page templates.

It's built to be backend-agnostic, making it the perfect starting point for any stack, including **MERN, Django + React, or FastAPI + React**.

---

## 🎯 Project Goal

The goal of FrontGen is to eliminate the repetitive setup work required for every new project. It provides:

* **Reusable Components:** A library of styled, accessible UI components.
* **Solid Foundation:** Pre-configured routing, auth, and API services.
* **Consistent Design:** A beautiful light/dark mode theme via Tailwind CSS.
* **Developer Experience:** A fast, modern stack using Vite and TypeScript.

## ✨ Features

* **Modern Stack:** React 19, Vite, and TypeScript.
* **Styling:** Tailwind CSS with a pre-configured light/dark mode design system.
* **Component Library:** Reusable components like `Button`, `Input`, `Card`, `Modal`, `Accordion`, and `Loader`.
* **Page Templates:**
    * **Landing Page:** A beautiful, animated hero, features, testimonials, and CTA.
    * **Auth Pages:** A complete flow with pages for Sign In, Sign Up, Forgot Password, and Reset Password.
    * **Profile & Settings Page:** A protected page for users to update their profile and password.
    * **Chat Template:** A modern, responsive chat UI ready to be wired up.
    * **Contact Page:** A functional form integrated with EmailJS.
    * **About Page:** A template with mission, team, and an FAQ section.
    * **Legal Pages:** Placeholders for Terms of Service and Privacy Policy.
* **Authentication:** Full auth flow using Context API, with protected routes and `localStorage` persistence.
* **API Service:** Centralized API client using `axios` with interceptors for auth tokens and error handling.
* **Custom Hooks:**
    * `useAuth`: Global access to user state.
    * `useTheme`: Toggle light/dark mode.
    * `useFetch`: Declarative data fetching with loading/error states.
    * `useDebounce`: For rate-limiting inputs (e.g., search).
* **Animations:** Smooth, subtle animations using `framer-motion`.

## ⚙️ Core Stack

| Category | Choice |
| :--- | :--- |
| **Framework** | React 19 (with Hooks) |
| **Bundler** | Vite |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Routing** | React Router v6 |
| **Animations** | Framer Motion |
| **API Client** | Axios |
| **Email** | EmailJS |
| **UI Primitives** | Radix UI (for Accordion) |
| **Icons** | Lucide React |
---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/duttaturja/frontgen.git
cd frontgen
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root of the project:

```bash
# On Windows (in cmd):
echo. > .env
# On macOS/Linux:
touch .env
```

Add your custom keys:

```bash
# Base URL for backend API
VITE_API_BASE_URL=http://localhost:5000/api

# EmailJS keys
VITE_EMAILJS_SERVICE_ID=YOUR_SERVICE_ID
VITE_EMAILJS_TEMPLATE_ID=YOUR_TEMPLATE_ID
VITE_EMAILJS_PUBLIC_KEY=YOUR_PUBLIC_KEY
```

### 4. Run the Development Server

```bash
npm run dev
```

Your application will be available at [http://localhost:5173](http://localhost:5173).

---

## 📄 Reusability Guide

To use this template for a new project:

### 1. Clone & Rename

```bash
git clone https://github.com/duttaturja/frontgen.git
mv frontgen your-project-name
cd your-project-name
```

### 2. Reset Git

```bash
rm -rf .git
git init -b main
```

### 3. Customize

* **Theme:** Modify colors in `tailwind.config.js`.
* **Content:** Update text and images in `src/pages/` (Landing, About, etc.).
* **API:** Connect your real backend API by updating the mock calls in `src/pages/LoginPage.tsx` and `SignUpPage.tsx`.

### 4. Commit & Push

```bash
git add .
git commit -m "Initial commit from FrontGen template"
git remote add origin <your-new-repo-url>
git push -u origin main
```

---

## 📜 License

This project is licensed under the **MIT License**. See the LICENSE file for details.
