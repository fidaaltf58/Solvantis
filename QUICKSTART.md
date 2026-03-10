# Solvantis Dashboard - Quick Start Guide

## 🚀 Get Started in 2 Minutes

### Option 1: Using Vite (Fastest)

```bash
# 1. Create a new Vite project
npm create vite@latest solvantis -- --template react
cd solvantis

# 2. Install dependencies
npm install recharts lucide-react
npm install -D tailwindcss postcss autoprefixer

# 3. Initialize Tailwind
npx tailwindcss init -p

# 4. Copy these files from the outputs folder:
# - SolvantisDriver.jsx → src/App.jsx
# - index.css → src/index.css
# - tailwind.config.js → tailwind.config.js

# 5. Run development server
npm run dev
```

Visit `http://localhost:5173`

---

### Option 2: Using Create React App

```bash
# 1. Create React App
npx create-react-app solvantis-dashboard
cd solvantis-dashboard

# 2. Install dependencies
npm install recharts lucide-react
npm install -D tailwindcss postcss autoprefixer

# 3. Setup Tailwind
npx tailwindcss init -p

# 4. Copy configuration files:
# - SolvantisDriver.jsx → src/App.jsx
# - index.css → src/index.css
# - tailwind.config.js → tailwind.config.js

# 5. Update src/App.jsx import
# Change from: import App from './App';
# To: import Solvantis from './App';
# And export default Solvantis;

# 6. Run the app
npm start
```

Visit `http://localhost:3000`

---

### Option 3: Using the Provided Files

1. **Install Node.js** (v16 or higher)
   - Download from https://nodejs.org/

2. **Create project directory**
   ```bash
   mkdir solvantis-dashboard
   cd solvantis-dashboard
   ```

3. **Copy all files** from outputs folder:
   - `package.json`
   - `tailwind.config.js`
   - `index.css`
   - `SolvantisDriver.jsx`

4. **Create src directory and setup**
   ```bash
   mkdir src
   cp SolvantisDriver.jsx src/App.jsx
   cp index.css src/
   ```

5. **Install dependencies**
   ```bash
   npm install
   ```

6. **Create `index.html`** in root:
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

7. **Create `src/main.jsx`**:
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

8. **Run the dashboard**
   ```bash
   npm run dev
   ```

---

## ✅ Verification Checklist

After setup, verify:

- [ ] Dashboard loads without errors
- [ ] Dark/Light mode toggle works
- [ ] Site selector dropdown functions
- [ ] Charts render with data
- [ ] KPI cards display metrics
- [ ] Alerts panel shows 4 alerts
- [ ] Sidebar collapses on mobile
- [ ] Responsive layout adapts to screen size

---

## 🛠️ Common Issues & Solutions

### Issue: "Module not found" errors

**Solution:**
```bash
npm install recharts lucide-react
npm install -D tailwindcss postcss autoprefixer
```

### Issue: Tailwind CSS not applying

**Solution:** Ensure `tailwind.config.js` includes the correct content paths:
```javascript
content: [
  "./index.html",
  "./src/**/*.{js,jsx,ts,tsx}",
],
```

### Issue: Charts not displaying

**Solution:** Verify Recharts is installed:
```bash
npm install recharts
```

### Issue: Icons not showing

**Solution:** Verify lucide-react is installed:
```bash
npm install lucide-react
```

### Issue: Port already in use

**Solution for Vite:**
```bash
npm run dev -- --port 3001
```

**Solution for CRA:**
```bash
PORT=3001 npm start
```

---

## 📱 Testing Responsive Design

1. **Open DevTools**: F12 or Right-click → Inspect
2. **Toggle Device Mode**: Ctrl+Shift+M (Windows) or Cmd+Shift+M (Mac)
3. **Test Breakpoints**:
   - Mobile: 375px width
   - Tablet: 768px width
   - Desktop: 1024px width
   - Wide: 1536px width

---

## 🎯 Next Steps

### 1. Customize with Your Data
Replace mock data arrays with real API calls:

```javascript
useEffect(() => {
  // Fetch real data
  fetchPowerData().then(data => {
    setRealtimePowerData(data);
  });
}, [selectedSite]);
```

### 2. Connect to Backend
```javascript
const fetchAlerts = async () => {
  const response = await fetch('/api/alerts');
  const alerts = await response.json();
  setActiveAlerts(alerts);
};
```

### 3. Add Real Authentication
```javascript
const [user, setUser] = useState(null);

useEffect(() => {
  checkAuth().then(userData => {
    setUser(userData);
  }).catch(() => {
    // Redirect to login
  });
}, []);
```

### 4. Implement Dark Mode Persistence
```javascript
useEffect(() => {
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}, [isDark]);

useEffect(() => {
  const saved = localStorage.getItem('theme');
  if (saved) setIsDark(saved === 'dark');
}, []);
```

---

## 📦 Project Structure

```
solvantis-dashboard/
├── src/
│   ├── App.jsx                  # Main dashboard component
│   ├── index.css                # Global styles
│   └── main.jsx                 # Entry point
├── public/
│   └── index.html               # HTML template
├── package.json                 # Dependencies
├── tailwind.config.js           # Tailwind configuration
└── README.md                    # Documentation
```

---

## 🔄 Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

Output files will be in the `dist/` folder, ready for deployment.

---

## 🌐 Deploy to Vercel (Free)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Follow the prompts. Your dashboard will be live in seconds!

---

## 📊 Performance Tips

1. **Reduce chart animation**:
   ```javascript
   <LineChart data={data} isAnimationActive={false}>
   ```

2. **Lazy load components**:
   ```javascript
   const ChartComponent = lazy(() => import('./Chart'));
   ```

3. **Optimize images**:
   - Use WebP format
   - Resize appropriately
   - Implement lazy loading

4. **Monitor bundle size**:
   ```bash
   npm install -D source-map-explorer
   ```

---

## 🎓 Learning Resources

- **React**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Recharts**: https://recharts.org/
- **Lucide Icons**: https://lucide.dev

---

## 🤝 Need Help?

1. Check the README.md for detailed documentation
2. Review SETUP.md for advanced configuration
3. Check browser console (F12) for error messages
4. Verify all dependencies are installed: `npm list`

---

**You're all set! Start building your solar monitoring dashboard! 🚀☀️**
