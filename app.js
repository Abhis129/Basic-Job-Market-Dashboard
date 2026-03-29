// Data 

const JOBS = [
  {title:"Senior Frontend Engineer",company:"Stripe",salary:165,type:"Remote",source:"LinkedIn",posted:"2h ago",skills:["React","TypeScript","CSS"],role:"Engineer",match:96},
  {title:"Data Scientist",company:"OpenAI",salary:180,type:"Remote",source:"Indeed",posted:"3h ago",skills:["Python","PyTorch","SQL"],role:"Data",match:88},
  {title:"Product Manager",company:"Notion",salary:140,type:"Hybrid",source:"LinkedIn",posted:"5h ago",skills:["Roadmap","SQL","Figma"],role:"Product",match:74},
  {title:"Backend Engineer (Go)",company:"Cloudflare",salary:158,type:"Remote",source:"Glassdoor",posted:"6h ago",skills:["Go","Kubernetes","gRPC"],role:"Engineer",match:82},
  {title:"ML Engineer",company:"Anthropic",salary:195,type:"Hybrid",source:"LinkedIn",posted:"7h ago",skills:["Python","JAX","CUDA"],role:"Data",match:91},
  {title:"UX Designer",company:"Figma",salary:128,type:"Remote",source:"Indeed",posted:"9h ago",skills:["Figma","Prototyping","User Research"],role:"Design",match:67},
  {title:"DevOps Engineer",company:"HashiCorp",salary:148,type:"Remote",source:"LinkedIn",posted:"11h ago",skills:["Terraform","AWS","CI/CD"],role:"DevOps",match:79},
  {title:"Data Engineer",company:"Databricks",salary:162,type:"Hybrid",source:"Glassdoor",posted:"12h ago",skills:["Spark","Python","Airflow"],role:"Data",match:85},
  {title:"Full Stack Engineer",company:"Linear",salary:145,type:"Remote",source:"LinkedIn",posted:"13h ago",skills:["React","Node.js","PostgreSQL"],role:"Engineer",match:88},
  {title:"iOS Engineer",company:"Duolingo",salary:152,type:"Hybrid",source:"Indeed",posted:"14h ago",skills:["Swift","SwiftUI","Xcode"],role:"Engineer",match:72},
  {title:"Product Designer",company:"Loom",salary:135,type:"Remote",source:"LinkedIn",posted:"1d ago",skills:["Figma","Motion","Systems"],role:"Design",match:69},
  {title:"Site Reliability Engineer",company:"PagerDuty",salary:155,type:"Remote",source:"Glassdoor",posted:"1d ago",skills:["Kubernetes","Go","Prometheus"],role:"DevOps",match:81},
  {title:"Data Analyst",company:"Shopify",salary:108,type:"Hybrid",source:"Indeed",posted:"1d ago",skills:["SQL","Tableau","Python"],role:"Data",match:77},
  {title:"Android Engineer",company:"Spotify",salary:148,type:"Remote",source:"LinkedIn",posted:"2d ago",skills:["Kotlin","Android","Jetpack"],role:"Engineer",match:70},
  {title:"Platform Engineer",company:"Vercel",salary:168,type:"Remote",source:"LinkedIn",posted:"2d ago",skills:["Rust","AWS","Docker"],role:"DevOps",match:84},
  {title:"Research Scientist",company:"DeepMind",salary:210,type:"Hybrid",source:"Glassdoor",posted:"2d ago",skills:["Python","Research","Math"],role:"Data",match:93},
  {title:"Growth PM",company:"Canva",salary:132,type:"Remote",source:"Indeed",posted:"3d ago",skills:["Analytics","A/B Testing","SQL"],role:"Product",match:71},
  {title:"Staff Engineer",company:"Airbnb",salary:205,type:"Hybrid",source:"LinkedIn",posted:"3d ago",skills:["Java","System Design","Leadership"],role:"Engineer",match:86},
  {title:"Infrastructure Engineer",company:"Reddit",salary:142,type:"Remote",source:"Glassdoor",posted:"4d ago",skills:["AWS","Terraform","Python"],role:"DevOps",match:76},
  {title:"NLP Engineer",company:"Cohere",salary:172,type:"Remote",source:"LinkedIn",posted:"4d ago",skills:["Python","HuggingFace","BERT"],role:"Data",match:89},
  {title:"Visual Designer",company:"Adobe",salary:118,type:"Hybrid",source:"Indeed",posted:"5d ago",skills:["Illustrator","Photoshop","Motion"],role:"Design",match:63},
  {title:"Engineering Manager",company:"Plaid",salary:195,type:"Hybrid",source:"LinkedIn",posted:"5d ago",skills:["Leadership","Java","Agile"],role:"Engineer",match:78},
  {title:"BI Developer",company:"Snowflake",salary:125,type:"Remote",source:"Glassdoor",posted:"6d ago",skills:["SQL","dbt","Tableau"],role:"Data",match:73},
  {title:"Cloud Architect",company:"Twilio",salary:188,type:"Remote",source:"LinkedIn",posted:"6d ago",skills:["AWS","GCP","Architecture"],role:"DevOps",match:83},
];

// State 

let filteredJobs = [...JOBS];
let currentPage = 1;
const perPage = 8;

// Skill tag filters 

const skillTags = ["Python","React","TypeScript","Go","Kubernetes","SQL","AWS","Figma","PyTorch"];
const tagFilters = document.getElementById('tag-filters');

skillTags.forEach(s => {
  const b = document.createElement('button');
  b.className = 'filter-btn';
  b.textContent = s;
  b.onclick = () => { b.classList.toggle('active'); filterJobs(); };
  tagFilters.appendChild(b);
});

// Filter & sort

function filterJobs() {
  const q = document.getElementById('search-input').value.toLowerCase();
  const role = document.getElementById('role-filter').value;
  const src = document.getElementById('source-filter').value;
  const sort = document.getElementById('sort-filter').value;
  const activeTags = [...document.querySelectorAll('#tag-filters .filter-btn.active')].map(b => b.textContent);

  filteredJobs = JOBS.filter(j => {
    if (q && !j.title.toLowerCase().includes(q) && !j.company.toLowerCase().includes(q) && !j.skills.join(' ').toLowerCase().includes(q)) return false;
    if (role && !j.role.includes(role)) return false;
    if (src && j.source !== src) return false;
    if (activeTags.length && !activeTags.some(t => j.skills.includes(t))) return false;
    return true;
  });

  if (sort === 'salary_high') filteredJobs.sort((a, b) => b.salary - a.salary);
  else if (sort === 'salary_low') filteredJobs.sort((a, b) => a.salary - b.salary);

  currentPage = 1;
  renderTable();
}

// Helpers

function salaryClass(s) {
  return s >= 160 ? 'salary-high' : s >= 130 ? 'salary-mid' : 'salary-low';
}

// Table render 

function renderTable() {
  const tbody = document.getElementById('jobs-table');
  const start = (currentPage - 1) * perPage;
  const slice = filteredJobs.slice(start, start + perPage);
  const total = filteredJobs.length;
  const pages = Math.ceil(total / perPage);

  document.getElementById('listing-count').textContent = `(${total} results)`;
  document.getElementById('page-info').textContent = `Page ${currentPage} of ${pages || 1}`;

  tbody.innerHTML = slice.map(j => `
    <tr style="cursor:pointer" onclick="alert('${j.title} at ${j.company}')">
      <td>
        <div style="font-weight:500;font-size:13px;">${j.title}</div>
        <div style="font-size:11px;color:var(--color-text-secondary);margin-top:2px;">${j.skills.slice(0, 2).join(' · ')}</div>
      </td>
      <td><span class="company-tag">${j.company}</span></td>
      <td><span class="salary-pill ${salaryClass(j.salary)}">$${j.salary}k</span></td>
      <td style="font-size:12px;color:var(--color-text-secondary);">${j.type}</td>
      <td><span class="source-tag">${j.source}</span></td>
      <td style="font-size:12px;color:var(--color-text-secondary);">${j.posted}</td>
      <td>
        <div style="font-size:12px;font-weight:500;color:${j.match >= 85 ? 'var(--color-text-success)' : j.match >= 70 ? 'var(--color-text-warning)' : 'var(--color-text-secondary)'};">${j.match}%</div>
        <div class="trend-bar" style="background:${j.match >= 85 ? 'var(--color-background-success)' : j.match >= 70 ? 'var(--color-background-warning)' : 'var(--color-border-tertiary)'};width:${j.match}%;"></div>
      </td>
    </tr>`).join('');
}

// Pagination

function prevPage() {
  if (currentPage > 1) { currentPage--; renderTable(); }
}

function nextPage() {
  const pages = Math.ceil(filteredJobs.length / perPage);
  if (currentPage < pages) { currentPage++; renderTable(); }
}

// Refresh

function refreshAll() {
  const icon = document.getElementById('refresh-icon');
  icon.classList.add('spinning');
  setTimeout(() => {
    icon.classList.remove('spinning');
    document.getElementById('m-total').textContent = 247 + Math.floor(Math.random() * 5);
    filterJobs();
  }, 800);
}

// Company bars 

function renderCompanyBars() {
  const counts = {};
  JOBS.forEach(j => counts[j.company] = (counts[j.company] || 0) + 1);
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 6);
  const max = top[0][1];
  const el = document.getElementById('company-bars');
  el.innerHTML = top.map(([c, n]) => `
    <div style="margin-bottom:8px;">
      <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--color-text-secondary);margin-bottom:3px;">
        <span>${c}</span><span>${n}</span>
      </div>
      <div style="height:5px;border-radius:3px;background:var(--color-border-tertiary);overflow:hidden;">
        <div style="height:100%;width:${(n / max * 100).toFixed(0)}%;background:#378ADD;border-radius:3px;"></div>
      </div>
    </div>`).join('');
}

// Init

renderTable();
renderCompanyBars();
