# Solvantis Multi-Page Dashboard - Setup & Deployment Guide

## 🚀 Quick Start (5 Minutes)

### Option 1: Using Vite (Recommended - Fastest)

```bash
# 1. Create Vite project
npm create vite@latest solvantis -- --template react
cd solvantis

# 2. Install dependencies
npm install recharts lucide-react
npm install -D tailwindcss postcss autoprefixer

# 3. Initialize Tailwind
npx tailwindcss init -p

# 4. Copy files from outputs:
cp SolvantisMultiPage.jsx src/App.jsx
cp index.css src/index.css
cp tailwind.config.js .

# 5. Create index.html (paste below)

# 6. Run
npm run dev
```

### index.html Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Solvantis - Solar Monitoring Dashboard</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
```

### src/main.jsx

```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

**Visit:** `http://localhost:5173`

---

### Option 2: Using Create React App

```bash
# 1. Create app
npx create-react-app solvantis-dashboard
cd solvantis-dashboard

# 2. Install dependencies
npm install recharts lucide-react
npm install -D tailwindcss postcss autoprefixer

# 3. Setup Tailwind
npx tailwindcss init -p

# 4. Copy files:
cp SolvantisMultiPage.jsx src/App.jsx
cp index.css src/index.css
cp tailwind.config.js .

# 5. Run
npm start
```

**Visit:** `http://localhost:3000`

---

## 📦 File Structure

```
solvantis-dashboard/
├── src/
│   ├── App.jsx                    # Main component (SolvantisMultiPage.jsx)
│   ├── index.css                  # Global styles
│   └── main.jsx                   # Entry point
├── public/
│   └── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js (if using Vite)
```

---

## ✅ Verification Checklist

After setup, verify:

### Navigation
- [ ] Sidebar menu appears
- [ ] Menu items: Dashboard, Sites, Alerts, Reports, Analytics, Settings
- [ ] Clicking menu changes page
- [ ] Active page highlighted in blue
- [ ] Menu collapses on mobile

### Dashboard Page
- [ ] 4 KPI cards display (Power, Production, Efficiency, Alerts)
- [ ] Weather panel shows current conditions (temperature, clouds, humidity)
- [ ] Real-time power chart loads (actual vs expected)
- [ ] Anomaly detection panel shows status
- [ ] Recent alerts preview visible
- [ ] Weekly production chart displays
- [ ] Site comparison chart shows all 3 sites

### Alerts Page
- [ ] All 5 alerts display
- [ ] Filter buttons work (All, Critical, Warning, Info)
- [ ] Alert cards show full details
- [ ] Status badges color-coded
- [ ] Severity indicators display

### Reports Page
- [ ] 4 report type cards visible
- [ ] Monthly chart displays
- [ ] Performance metrics table shows
- [ ] Download PDF button present
- [ ] All metrics have targets

### Analytics Page
- [ ] Time period buttons work (24h, 7days, 30days, 1year)
- [ ] Weather vs Production chart loads
- [ ] Efficiency distribution pie chart shows
- [ ] Power vs Temperature scatter plot displays
- [ ] All tooltips interactive

### Sites Page
- [ ] 3 site cards visible (Site A, B, C)
- [ ] Each shows: name, location, capacity, efficiency
- [ ] Status badges correct
- [ ] "View Details" buttons clickable
- [ ] Cards change color on hover

### Settings Page
- [ ] Profile form loads
- [ ] Notification checkboxes work
- [ ] Theme toggle functional
- [ ] Language selector available
- [ ] Logout button visible

### Global Features
- [ ] Dark/Light mode toggle works (header)
- [ ] Theme smooth transition (300ms)
- [ ] Site selector dropdown changes data
- [ ] Notification bell shows count
- [ ] User profile avatar displays

---

## 🔧 Configuration

### Theme Customization

**Edit `src/App.jsx` theme object:**

```javascript
const theme = {
  bg: isDark ? 'bg-slate-950' : 'bg-slate-50',
  card: isDark ? 'bg-slate-900' : 'bg-white',
  text: isDark ? 'text-slate-100' : 'text-slate-900',
  subtext: isDark ? 'text-slate-400' : 'text-slate-600',
  border: isDark ? 'border-slate-800' : 'border-slate-200',
  hover: isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100',
  input: isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-300'
};
```

### Change Primary Colors

Replace throughout the file:
```javascript
// From
from-blue-400 to-cyan-400

// To your colors
from-purple-400 to-pink-400
```

### Customize Sites

Edit `sites` array (line ~150):

```javascript
const sites = [
  { 
    id: 'A', 
    name: 'Your Site Name',
    location: 'City, Country',
    capacity: 500,  // kW
    status: 'Active',
    efficiency: 93.5
  },
  // ... more sites
];
```

### Update Mock Data

**Real-time power data:**
```javascript
const realtimePowerData = useMemo(() => {
  // Modify the loop to fetch from your API
  // Example:
  // const data = await fetchRealTimeData(selectedSite);
  // return data;
}, [weatherData, selectedSite]);
```

**Weather data:**
```javascript
const weatherData = useMemo(() => {
  // Replace with API call
  // return await fetchWeatherData(selectedSite);
}, []);
```

**Alerts:**
```javascript
const [alerts, setAlerts] = useState([...]);

useEffect(() => {
  // Fetch alerts from backend
  fetchAlerts(selectedSite).then(setAlerts);
}, [selectedSite]);
```

---

## 🔌 API Integration

### Backend Connection Template

```javascript
// Create src/api/client.js
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const apiClient = {
  // Alerts
  getAlerts: async (siteId) => {
    const res = await fetch(`${API_URL}/alerts?site=${siteId}`);
    return res.json();
  },

  // Power data
  getPowerData: async (siteId, duration = '24h') => {
    const res = await fetch(`${API_URL}/power?site=${siteId}&duration=${duration}`);
    return res.json();
  },

  // Weather
  getWeather: async (siteId) => {
    const res = await fetch(`${API_URL}/weather?site=${siteId}`);
    return res.json();
  },

  // Reports
  generateReport: async (siteId, type, dateRange) => {
    const res = await fetch(`${API_URL}/reports`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ siteId, type, dateRange })
    });
    return res.json();
  }
};
```

### Usage in Component

```javascript
import { apiClient } from './api/client';

useEffect(() => {
  const loadAlerts = async () => {
    try {
      const data = await apiClient.getAlerts(selectedSite);
      setAlerts(data);
    } catch (error) {
      console.error('Failed to load alerts:', error);
    }
  };

  loadAlerts();
}, [selectedSite]);
```

### Environment Variables

Create `.env` file:

```env
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_WS_URL=ws://localhost:3001
REACT_APP_ENVIRONMENT=development
```

---

## 🔐 Security Considerations

### For Production Deployment

1. **Authentication**
   ```javascript
   // Protect all API calls with JWT tokens
   const headers = {
     'Authorization': `Bearer ${token}`
   };
   ```

2. **Data Encryption**
   - HTTPS only
   - Encrypt sensitive data at rest
   - Use environment variables for secrets

3. **Access Control**
   - Role-based access (Admin/Manager/Viewer)
   - Site-level permissions
   - API rate limiting

4. **Input Validation**
   - Validate all user inputs
   - Sanitize data from APIs
   - Check date ranges

5. **Audit Logging**
   - Log all user actions
   - Track data access
   - Monitor API usage

---

## 📊 Advanced Customization

### Add Custom Anomaly Detection

```javascript
const detectCustomAnomalies = (data, weather) => {
  const anomalies = [];

  // Your custom detection logic
  if (data.power < customThreshold(weather)) {
    anomalies.push({
      id: 99,
      type: 'Custom Issue',
      probability: 85,
      severity: 'high',
      cause: 'Custom detection logic'
    });
  }

  return anomalies;
};
```

### Real-Time WebSocket Updates

```javascript
useEffect(() => {
  const ws = new WebSocket('ws://localhost:3001');

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    
    if (data.type === 'power-update') {
      setRealtimePowerData(prev => [...prev, data.value]);
    }
    
    if (data.type === 'alert') {
      setAlerts(prev => [data.value, ...prev]);
    }
  };

  return () => ws.close();
}, []);
```

### Add Database Persistence

```javascript
// Example with Supabase
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(URL, KEY);

const fetchAlerts = async () => {
  const { data, error } = await supabase
    .from('alerts')
    .select('*')
    .eq('site_id', selectedSite)
    .order('created_at', { ascending: false });
  
  return data;
};
```

---

## 🚀 Production Deployment

### Vercel (Recommended - Free)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts and your site is live!
```

**Environment Variables on Vercel:**
1. Go to Project Settings
2. Environment Variables
3. Add: `REACT_APP_API_URL`, `REACT_APP_WS_URL`

### Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

### Self-Hosted (Docker)

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "preview"]
```

Build and run:

```bash
docker build -t solvantis .
docker run -p 3000:3000 solvantis
```

### AWS S3 + CloudFront

```bash
npm run build

# Upload build folder to S3
aws s3 sync dist/ s3://your-bucket-name/

# CloudFront will serve from S3
```

---

## 📈 Performance Optimization

### Code Splitting

```javascript
import { lazy, Suspense } from 'react';

const AlertsPage = lazy(() => import('./pages/Alerts'));
const ReportsPage = lazy(() => import('./pages/Reports'));

// Use with Suspense
<Suspense fallback={<LoadingSpinner />}>
  <AlertsPage />
</Suspense>
```

### Image Optimization

```javascript
// Use optimized images
import photo from './photo.jpg?w=400&h=300&format=webp';
```

### Bundle Analysis

```bash
npm install -D source-map-explorer

npm run build
npx source-map-explorer 'build/static/js/*.js'
```

### Caching Strategy

```javascript
// Cache API responses
const cache = new Map();

const cachedFetch = async (url, ttl = 5 * 60 * 1000) => {
  if (cache.has(url)) {
    const { data, timestamp } = cache.get(url);
    if (Date.now() - timestamp < ttl) return data;
  }

  const data = await fetch(url).then(r => r.json());
  cache.set(url, { data, timestamp: Date.now() });
  return data;
};
```

---

## 🐛 Troubleshooting

### Issue: Module Not Found

```bash
npm install recharts lucide-react
```

### Issue: Tailwind Styles Not Applied

Verify `tailwind.config.js`:
```javascript
content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"]
```

### Issue: Charts Not Rendering

```bash
npm install --save-exact recharts@2.10.3
```

### Issue: Performance Slow

- Use React DevTools Profiler
- Check for unnecessary re-renders
- Lazy load heavy components
- Optimize API calls with caching

### Issue: WebSocket Connection Failed

- Verify WebSocket URL in `.env`
- Check firewall settings
- Ensure backend is running
- Check CORS settings

---

## 📝 Logging & Monitoring

### Client-Side Logging

```javascript
const log = (level, message, data) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${level}: ${message}`, data);
  
  // Send to logging service
  fetch('/api/logs', {
    method: 'POST',
    body: JSON.stringify({ timestamp, level, message, data })
  });
};

// Usage
log('ERROR', 'Failed to fetch alerts', { error });
log('INFO', 'Page loaded', { page: currentPage });
```

### Error Boundaries

```javascript
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
    // Send to error tracking service
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

---

## 📱 Mobile Optimization

### Responsive Breakpoints

```javascript
// sm: 640px
// md: 768px
// lg: 1024px
// xl: 1280px
// 2xl: 1536px

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* Automatically responsive */}
</div>
```

### Touch-Friendly

- Buttons min 44px (touch target)
- Spacing increased on mobile
- Simplified mobile navigation
- Large text for readability

---

## 🔄 Continuous Integration/Deployment

### GitHub Actions Example

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## 📚 Learning Resources

- **React:** https://react.dev
- **Tailwind:** https://tailwindcss.com
- **Recharts:** https://recharts.org
- **Lucide Icons:** https://lucide.dev
- **Vite:** https://vitejs.dev
- **API Documentation:** https://docs.solvantis.io

---

## 🎯 Next Steps

1. ✅ Set up local development environment
2. ✅ Customize theme and branding
3. ✅ Connect to your backend API
4. ✅ Add authentication
5. ✅ Set up database
6. ✅ Configure alerts system
7. ✅ Test all features
8. ✅ Deploy to production

---

## 📞 Support

**Resources:**
- Docs: https://docs.solvantis.io
- Help: https://help.solvantis.io
- Email: support@solvantis.io
- GitHub Issues: https://github.com/solvantis/dashboard

---

**Version:** 2.0 - Multi-Page with Intelligent Anomaly Detection  
**Last Updated:** February 2024  
**Status:** Production Ready ✅
