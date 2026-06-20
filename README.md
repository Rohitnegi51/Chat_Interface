# React Chat Application Assessment

A modern, production-ready chat interface built for a frontend engineering assessment. The application features a clean, responsive layout, intelligent auto-scrolling, simulated message states (including network failures and retries), and robust accessibility compliance.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/Rohitnegi51/Chat_Interface.git
   cd Chat_Interface
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:5173` in your browser.

## 🛠 Tech Stack
- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS (v4)
- **Icons:** Lucide React

## 🏗 Architecture & Implementation Approach

The application is structured to decouple state management from presentation, ensuring components remain highly reusable and maintainable.

### Component Hierarchy
- **`App.jsx`**: The core orchestrator. Manages the message history state, handles the simulation delays, and coordinates the message failure/retry logic.
- **`Header.jsx`**: A stateless top navigation bar indicating the bot's current status and providing a utility to clear the local storage.
- **`ChatArea.jsx`**: The scrollable container responsible for rendering the message list and managing the intelligent auto-scroll behavior.
- **`MessageItem.jsx`**: A heavily memoized, reusable component representing individual chat bubbles. It dynamically styles itself based on the sender (user/bot) and delivery status (sending/sent/failed).
- **`ChatInput.jsx`**: A controlled textarea component that dynamically auto-grows based on content and handles advanced keyboard events (e.g., `Shift + Enter` for new lines, `Enter` to submit).

### LocalStorage Persistence
A custom `useLocalStorage` hook intercepts the `messages` array, persisting it safely. Fallbacks are included to gracefully handle storage quota limits or corrupted JSON data, ensuring the conversation seamlessly survives page reloads.

## 📜 Custom Auto-Scroll Logic

To provide a premium user experience, the scrolling behavior in `ChatArea.jsx` is context-aware:
- **Default Auto-Scroll**: When a new message is sent or the bot begins typing, a `requestAnimationFrame` callback smoothly scrolls the viewport to the bottom.
- **Intelligent Scroll Lock**: If a user scrolls up (detecting if distance from bottom > 100px) to read historical messages, the auto-scroll is **disabled** to prevent hijacking their reading flow. Instead, a floating "New messages" button appears, allowing them to safely jump back down when ready.

## ♿ Accessibility (A11y)

Strict adherence to WCAG guidelines was implemented throughout the development process:
- **Keyboard Navigation**: All interactive elements (buttons, inputs) and the scrollable chat container itself are fully navigable via the `Tab` key, complete with visible focus rings.
- **Screen Reader Support**: A centralized Live Region (`role="log"` with `aria-live="polite"`) is used on the chat container to announce new messages without causing "double-reading" bugs in screen readers like NVDA. Decorative icons are explicitly hidden (`aria-hidden="true"`).
- **Color Contrast**: The grayscale palette was strictly tuned to pass WCAG AA contrast requirements (e.g., utilizing `text-neutral-500` for timestamps and placeholders).
- **Focus Management**: Sending a message explicitly returns the browser's focus to the textarea input, maintaining a seamless conversational flow.

## ⚙️ Assumptions & Simulations

Since no real backend is attached, the following simulated behaviors were programmed to satisfy the assessment requirements:
- **Bot Delays**: Every user message triggers a `1500ms` delay to simulate a network request, during which a CSS-animated typing indicator is displayed.
- **Random Responses**: The bot responds by randomly selecting a string from a hardcoded array of generic responses.
- **Delivery Failures**: To demonstrate complex state handling, every outgoing message has a **20% chance to fail** after a `600ms` simulation. Failed messages render in a red alert state and expose a "Retry" button. Clicking retry successfully transitions the *existing* message back into the delivery pipeline rather than duplicating it.
