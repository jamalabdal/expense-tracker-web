# Expense Tracker

A responsive web app for tracking personal spending. Built with plain HTML, CSS, and JavaScript, with no frameworks or build step.

## Features
- Add and delete expenses with description, amount, and category
- Live total and transaction count
- Spending-by-category bar chart (pure CSS)
- Filter the list by category
- Data saved in your browser (`localStorage`), so it survives page refreshes
- Responsive layout for phone and desktop

## Tech Stack
HTML5, CSS3 (variables, flexbox, grid), vanilla JavaScript (DOM, localStorage)

## How to Run
Download or clone the repository and open `index.html` in any browser.

```bash
git clone https://github.com/jamalabdal/expense-tracker-web.git
cd expense-tracker-web
# then double-click index.html
```

## Live Demo
Enable GitHub Pages (Settings -> Pages -> Deploy from branch `main`) and your app will be live at
`https://jamalabdal.github.io/expense-tracker-web/`.

## Project Structure
```
index.html   # page structure
style.css    # styling
script.js    # logic and rendering
```

## Ideas for Improvement
- Monthly budget limit with warnings
- Export to CSV
- Edit existing expenses
