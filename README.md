# Persistent Etch-A-Sketch

A modern, browser-based Etch-A-Sketch drawing application. This project demonstrates intermediate-to-advanced vanilla JavaScript concepts, including data persistence, object-oriented architecture, and dynamic DOM manipulation.

## 🚀 Features

* **Persistent State:** Uses `localStorage` to save the grid state. Your drawing remains completely intact even if you refresh or close the browser.
* **Fully Responsive:** The canvas strictly adheres to an aspect ratio, shrinking and growing smoothly on mobile devices and desktops using fluid CSS percentages.
* **Dynamic Grid Generation:** Users can set custom grid resolutions (from 10x10 up to 64x64) without relying on intrusive browser popups.
* **Touch Support:** Includes `touchmove` event listeners so the app is fully usable on mobile touchscreens.

## 🛠️ Architecture & Requirements Met

This project was specifically architected to hit standard JavaScript best practices:
1. **Clean Code:** Logic is safely scoped inside closures to avoid polluting the global namespace.
2. **Loops and Arrays:** State is managed via an underlying array data structure (`gridState`), populated using loops.
3. **DOM Manipulation & Events:** Fluidly generates HTML elements and binds both mouse and touch events.
4. **Object Basics & Objects:** Utilizes a configuration object to store app-wide constants without hardcoding magic numbers.
5. **Organizing Code:** Separates persistence, UI rendering, and interaction logic.
6. **Object Constructors:** Generates individual matrix nodes using a `Cell` prototype.
7. **Factory Functions:** The entire app lifecycle is encapsulated and initialized via a `createEtchASketch` factory pattern.

## 💻 Technologies Used

* **HTML5:** Semantic structure and data-attributes for clean JS hooking.
* **CSS3:** Flexbox, media queries, and `aspect-ratio` for responsive, square layouts.
* **Vanilla JavaScript (ES6+):** No external libraries or frameworks.

## 📥 How to Run

1. Clone or download this repository.
2. Ensure `index.html`, `style.css`, and `script.js` are in the same folder.
3. Open `index.html` directly in any modern web browser. No local server or build tools required.
