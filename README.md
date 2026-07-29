# David Muhaimin — Premium Portfolio Website

An interactive, premium, and cybersecurity-themed portfolio website built for **David Muhaimin**, a Computer Engineering Technology student specializing in **Infrastructure Engineering** and **Security Engineering**.

---

## Live Demo & Key Features

* **Interactive Terminal CLI Widget**: A simulated retro-modern CLI terminal in the About section. Try clicking on the input field and typing commands like `help`, `neofetch`, `skills`, `projects`, `contact`, or `clear`.
* **Dynamic Mouse Spotlight Glow**: A radial gradient glow overlay that tracks the user's cursor position smoothly across the dark viewport.
* **Pixel-Perfect ScrollSpy**: A clean side-navigation bar that automatically highlights the active section as the user scrolls, optimized to prevent layout-timing and browser reload quirks.
* **Modern Two-Column Layout**: Left-aligned sticky profiles and links with a scrollable right panel that automatically collapses into a single-column layout on mobile devices.
* **Cybersecurity Themed Design**: Obsidian dark background, cyan accents for infrastructure/networking, cyber-purple for security elements, and green accents for IoT entries.

---

## Tech Stack

* **Frontend Framework**: [React 19](https://react.dev/)
* **Build Tool & Bundler**: [Vite 8](https://vite.dev/)
* **Styling**: Vanilla CSS (no heavy utility libraries, maintaining 100% control over design transitions and responsiveness)
* **Icons**: Inline SVGs for quick loads and no external package dependency issues

---

## Project Structure

```bash
dapit_website/
├── src/
│   ├── App.jsx        # Main application component, state, terminal & scrollspy logic
│   ├── App.css        # Layout structure, card hovers, terminal, and mobile responsiveness
│   ├── index.css      # Core theme variables, spotlight overlay tracker, and global CSS reset
│   └── main.jsx       # React DOM root render
├── public/            # Static assets & favicons
├── document.md        # Personal customization guide (how to edit sections, colors, or CLI commands)
├── package.json       # Project dependencies & scripts
└── README.md          # Project documentation (this file)
```

---

## Getting Started

Follow these steps to run the project locally on your machine:

### 1. Clone the Repository
```bash
git clone https://github.com/netph4ntom/dapit_website.git
cd dapit_website
```

### 2. Install Dependencies
Make sure you have Node.js installed, then run:
```bash
npm install
```

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) (or the port specified in your terminal) in your browser to view the portfolio.

### 4. Build for Production
To generate the static optimized production bundles under the `dist/` directory, run:
```bash
npm run build
```

---

## How to Customize

For detailed instructions on how to change colors, edit sections (Experience, Projects, Education, Blog, Certifications), customize CLI terminal commands, or edit social links, please refer to the custom guide:
 **[document.md](./document.md)**
