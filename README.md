# 🛸 Pixel Pomodoro Web

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

> A retro sci-fi Pomodoro timer built with vanilla web technologies. Inspired by pixel-art space aesthetics, designed for calm, immersive focus sessions.

---

##  Overview

**Pixel Pomodoro Web** is a browser-based productivity application that implements the classic Pomodoro Technique within a retro-styled spaceship cockpit HUD. Rather than relying on heavyweight frontend frameworks or third-party audio packages, this project is built entirely with **vanilla HTML5, CSS3, and JavaScript**.

The application was developed as a hands-on learning project to explore and solidify core frontend engineering principles: semantic document structure, component styling via modern CSS features, asynchronous timing mechanisms, DOM event lifecycles, and real-time audio synthesis using the Web Audio API.

---

## Features

- **Classic Interval Cycles**:
  - **Focus Mode**: 25-minute concentrated work interval.
  - **Short Rest**: 5-minute break to recharge.
  - **Long Rest**: 15-minute extended rest after multiple cycles.
- **Cozy Pixel Art Aesthetics**:
  - Soft midnight-sky color palette with subtle twinkling stars.
  - Pixel-styled button states with tactile physical displacement effects.
  - Authentic typography using Google Fonts (*Press Start 2P* & *Silkscreen*).
- **Dual Audio Architecture**:
  - **Procedural 8-Bit Clicks**: Generated in real time using the **Web Audio API** (`OscillatorNode` + `GainNode`), producing instantaneous sound without fetching external audio files.
  - **Ambient Space Music**: Integrated HTML5 `<audio>` player with toggle controls for background immersion.
- **Dynamic Session Tracker**: Automatically increments completed Pomodoro cycles upon session completion.
- **Zero External Dependencies**: Pure, dependency-free vanilla code that runs natively in any modern web browser.

---

## 🎯 Learning Objectives & Concepts Practiced

This project was built to explore and reinforce fundamental web development techniques:

### 1. Semantic HTML5 Structure
- Designed an accessible layout using semantic elements (`<main>`, `<nav>`, `<section>`, `<header>`, `<footer>`).
- Ensured assistive technology awareness with `aria-live="polite"` attributes on dynamic display regions.

### 2. Modern CSS3 Architecture
- **CSS Custom Properties (Variables)**: Centralized theming for quick adjustments across colors, shadows, and font stacks.
- **Flexbox Layouts**: Managed alignment, vertical centering, and responsiveness across varied viewport sizes.
- **Layering & Out-of-Flow Positioning**: Implemented layered backgrounds (`fixed`, `absolute`) beneath a glassmorphic HUD without disrupting page flow.
- **CSS Micro-Animations**: Created soft floating icons and twinkling star fields using pure `@keyframes`.

### 3. Asynchronous JavaScript & State Management
- **Single Source of Truth**: Managed application state (`timeLeft`, `currentMode`, `isRunning`, `completedSessions`) through plain JavaScript objects and variables.
- **Timers & Event Loop**: Managed non-blocking countdown ticks using `setInterval()` and safe teardowns with `clearInterval()`.
- **String Formatting**: Formatted numeric time into standardized `MM:SS` strings via `Math.floor()`, modulus `%`, and `String.prototype.padStart()`.
- **Lifecycle & Event Handling**: Guaranteed DOM availability by encapsulating logic within `DOMContentLoaded` and attaching decoupled event listeners.

### 4. Real-Time Audio Synthesis
- Instantiated and resumed the browser's `AudioContext`.
- Dynamically synthesized frequency ramps using `linearRampToValueAtTime()` and `exponentialRampToValueAtTime()` for crisp retro sound effects without latency.

---

## 🗂️ Project Structure

```text
pixel-pomodoro-web/
├── index.html          # Main HTML markup and UI structure
├── styles.css          # Pixel-art styles, color tokens, and layout
├── script.js           # Timer state, DOM manipulation, and audio engine
├── space-travel.png    # Icon / visual asset
├── space.mp3           # Ambient background audio track
└── README.md           # Project documentation
