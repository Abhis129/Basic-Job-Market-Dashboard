// charts.js — all Chart.js chart initialization
// Depends on: Chart.js being loaded before this file

window.addEventListener('load', () => {
  const isDark = matchMedia('(prefers-color-scheme: dark)').matches;
  const textColor = isDark ? '#c2c0b6' : '#3d3d3a';
  const gridColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';

  // ─── Salary by role (bar chart) ─────────────────────────────────────────────
  new Chart(document.getElementById('salaryChart'), {
    type: 'bar',
    data: {
      labels: ['Engineer', 'Data', 'Product', 'Design', 'DevOps'],
      datasets: [
        { label: 'Min', data: [128, 108, 125, 115, 138], backgroundColor: '#B5D4F4', borderRadius: 4 },
        { label: 'Avg', data: [165, 168, 136, 127, 158], backgroundColor: '#378ADD', borderRadius: 4 },
        { label: 'Max', data: [205, 210, 145, 135, 188], backgroundColor: '#185FA5', borderRadius: 4 },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: {
          stacked: false,
          ticks: { color: textColor, font: { size: 11 } },
          grid: { color: gridColor },
        },
        y: {
          ticks: { color: textColor, font: { size: 11 }, callback: v => '$' + v + 'k' },
          grid: { color: gridColor },
        },
      },
    },
  });

  // ─── Jobs by source (doughnut chart) ────────────────────────────────────────
  new Chart(document.getElementById('sourceChart'), {
    type: 'doughnut',
    data: {
      labels: ['LinkedIn', 'Indeed', 'Glassdoor'],
      datasets: [{
        data: [143, 62, 42],
        backgroundColor: ['#378ADD', '#63991b', '#B5752E'],
        borderWidth: 0,
        hoverOffset: 6,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '65%',
      plugins: { legend: { display: false } },
    },
  });

  // ─── New listings over time (line chart) ────────────────────────────────────
  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - 13 + i);
    return d.toLocaleDateString('en', { month: 'short', day: 'numeric' });
  });
  const counts = [12, 9, 14, 18, 11, 16, 22, 19, 25, 20, 28, 18, 24, 31];

  new Chart(document.getElementById('timeChart'), {
    type: 'line',
    data: {
      labels: days,
      datasets: [{
        data: counts,
        fill: true,
        tension: 0.4,
        borderColor: '#378ADD',
        borderWidth: 2,
        pointRadius: 2,
        pointBackgroundColor: '#378ADD',
        backgroundColor: isDark ? 'rgba(55,138,221,0.15)' : 'rgba(55,138,221,0.08)',
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: {
          ticks: { color: textColor, font: { size: 10 }, maxRotation: 45, autoSkip: true, maxTicksLimit: 7 },
          grid: { color: gridColor },
        },
        y: {
          ticks: { color: textColor, font: { size: 11 } },
          grid: { color: gridColor },
        },
      },
    },
  });
});
