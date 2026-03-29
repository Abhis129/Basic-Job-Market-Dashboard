# Job Market Dashboard


🔗 **Live Demo:** [https://abhis129.github.io/Basic-Job-Market-Dashboard/] (https://abhis129.github.io/Basic-Job-Market-Dashboard/)

A clean, interactive job market analytics dashboard built with vanilla HTML, CSS, and JavaScript. Visualizes job listings, salary ranges, hiring trends, and top companies — all in a single-page app with no frameworks or build tools required.

![Job Market Dashboard](https://img.shields.io/badge/Status-Live-brightgreen) ![HTML](https://img.shields.io/badge/HTML-5-orange) ![CSS](https://img.shields.io/badge/CSS-3-blue) ![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow) ![Chart.js](https://img.shields.io/badge/Chart.js-4.4.1-pink)


## Features

- **Live job listings table** with search, filter by role, source, and sort by salary
- **Salary range chart** — Min, Avg, Max salary breakdown by role (Engineer, Data, Product, Design, DevOps)
- **Jobs by source** — Doughnut chart showing LinkedIn, Indeed, Glassdoor distribution
- **14-day trend chart** — Line chart showing new listings over the past two weeks
- **Top hiring companies** — Horizontal bar chart of most active employers
- **Skill tag filters** — Filter jobs by Python, React, TypeScript, Go, Kubernetes, SQL, AWS, Figma, PyTorch
- **Pagination** — Browse through all listings 8 at a time
- **Refresh button** — Simulates a live data refresh with animation
- **Dark mode support** — Automatically adapts to system preference
- **Fully responsive** — Works on mobile and desktop


## Tech Stack

| Technology | Purpose |
|------------|---------|
| HTML5 | Structure and layout |
| CSS3 | Styling, animations, dark mode, responsive design |
| Vanilla JavaScript (ES6) | Filtering, sorting, pagination, DOM manipulation |
| Chart.js 4.4.1 | Salary bar chart, source doughnut, trend line chart |

No frameworks. No build tools. No npm. Just open `index.html` in a browser.


## Project Structure

```
job-market-dashboard/
├── index.html      # Main HTML structure
├── styles.css      # All styling, animations, dark mode
├── app.js          # Job data, filtering, sorting, pagination logic
├── charts.js       # Chart.js chart initializations
└── README.md       # Project documentation
```



## Getting Started

### Option 1 — Just open it
```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/job-market-dashboard.git

# Open in browser
cd job-market-dashboard
open index.html       # Mac
start index.html      # Windows
```

No installation needed. Works immediately in any modern browser.

### Option 2 — VS Code Live Server
1. Install the **Live Server** extension in VS Code
2. Right-click `index.html`
3. Click **Open with Live Server**



## Screenshots

### Dashboard Overview
- 4 metric cards showing total jobs, average salary, top source, and remote percentage
- Interactive charts with hover tooltips
- Filterable job listings table with salary color coding



## How It Works

### Data
Job data is stored as a JavaScript array in `app.js`. Each job object contains:
```javascript
{
  title: "Senior Frontend Engineer",
  company: "Stripe",
  salary: 165,        // in $k
  type: "Remote",     // Remote | Hybrid | On-site
  source: "LinkedIn", // LinkedIn | Indeed | Glassdoor
  posted: "2h ago",
  skills: ["React", "TypeScript", "CSS"],
  role: "Engineer",   // Engineer | Data | Product | Design | DevOps
  match: 96           // match score percentage
}
```

### Filtering
- **Search** — filters by title, company, and skills simultaneously
- **Role filter** — Engineer, Data, Product, Design, DevOps
- **Source filter** — LinkedIn, Indeed, Glassdoor
- **Sort** — Most Recent, Salary High→Low, Salary Low→High
- **Skill tags** — click any skill pill to filter by that technology

### Charts
All 3 charts are initialized in `charts.js` using Chart.js:
- **Salary bar chart** — grouped bar chart with Min/Avg/Max per role
- **Source doughnut** — shows distribution of listings per platform
- **Trend line** — area chart showing new listings over 14 days


## Roadmap

- [ ] Connect to a real jobs API (Adzuna, JSearch)
- [ ] Add a Python + FastAPI backend
- [ ] Store jobs in a SQLite database
- [ ] Auto-refresh every 60 minutes via scheduler
- [ ] Deploy frontend to Vercel
- [ ] Deploy backend to Railway

> The full-stack version with live API integration is in development.


## Author

Built as a portfolio project to demonstrate frontend data visualization and job market analytics.
