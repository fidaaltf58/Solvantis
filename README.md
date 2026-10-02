# ☀️ Solvantis: Solar Monitoring Dashboard

**Solvantis** is a B2B SaaS dashboard for monitoring **solar PV installations**. It tracks power production, temperature, and voltage across multiple sites. Its **weather-aware anomaly detection** compares expected output with actual output, so it can tell real equipment faults apart from normal effects such as clouds, rain, or sunset.

Built with **React 18**, **Vite**, **Tailwind CSS**, **Recharts**, and **Lucide** icons.

> **Prototype.** All telemetry and weather data is simulated in the browser; there is no backend yet.

---

## ✨ Features

| Page | Highlights |
|---|---|
| **Dashboard** | Live KPI cards (current power, today's production, efficiency, active alerts), weather impact panel (temperature, cloud cover, humidity, wind), 24-hour power curve, expected vs. actual output, detected anomalies |
| **Sites** | Multi-site overview (3 sample sites in California, Arizona, and Texas) with capacity, status, and efficiency |
| **Alerts** | Critical, warning, and info alerts with severity, site, timestamp, and status |
| **Analytics** | Advanced charts: production trends, performance comparisons, correlations |
| **Reports** | Report summaries with PDF download actions |
| **Settings** | Profile, notifications, theme, and language (EN/ES/FR) |

**Across the app:** dark/light mode, a collapsible sidebar, site selection, date-range filters, and a responsive layout.

## 🧠 Anomaly detection

The detector first estimates the power the array *should* produce under current conditions:

```
Expected power = solar curve(time of day) × (1 − cloud cover) × temperature factor
```

It then compares that estimate with the actual output:

- **Low output that matches the weather** (clouds, rain, dusk) is treated as **normal**, so no alert is raised.
- **Low output under good conditions** is flagged as a **possible equipment issue** (inverter, string, soiling).
- **High panel temperature** (above 50 °C, with efficiency under 80%) triggers a **temperature-stress** warning.

See [`ANOMALY_DETECTION.md`](ANOMALY_DETECTION.md) for the full algorithm.

## 🛠️ Tech stack

| | |
|---|---|
| UI | React 18 |
| Build | Vite 5 |
| Styling | Tailwind CSS 3 + PostCSS + Autoprefixer |
| Charts | Recharts 2 (line, area, bar, pie, composed, scatter) |
| Icons | lucide-react |

## 🚀 Getting started

```bash
git clone https://github.com/fidaaltf58/Solvantis.git
cd Solvantis
npm install
npm run dev
```

Then open <http://localhost:5173>.

| Command | Description |
|---|---|
| `npm run dev` / `npm start` | Start the dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build |

## 📁 Project structure

```
Solvantis/
├── src/
│   ├── App.jsx                # Multi-page app (the version that runs)
│   ├── main.jsx
│   └── index.css              # Tailwind directives + global styles
├── SolvantisMultiPage.jsx     # Copy of the multi-page version
├── SolvantisDriver.jsx        # Lighter single-page version
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── QUICKSTART.md
├── MULTIPAGE_SETUP.md
├── FEATURE_GUIDE.md
├── ANOMALY_DETECTION.md
└── PACKAGE_OVERVIEW.md
```

### Two versions
- **`src/App.jsx` / `SolvantisMultiPage.jsx`**: the full six-page app with weather-aware anomaly detection.
- **`SolvantisDriver.jsx`**: a lighter single-page dashboard. To try it, copy it over `src/App.jsx`.

## 📚 Documentation

- [Quick start](QUICKSTART.md)
- [Multi-page setup and deployment](MULTIPAGE_SETUP.md)
- [Feature guide](FEATURE_GUIDE.md)
- [Anomaly detection](ANOMALY_DETECTION.md)
- [Package overview](PACKAGE_OVERVIEW.md)

## 🗺️ Roadmap

- [ ] Connect to real inverter and IoT telemetry (MQTT / REST)
- [ ] Real weather API integration
- [ ] Authentication and multi-tenant accounts
- [ ] Server-side PDF report generation
- [ ] Email and SMS alert notifications

## 📄 License

Proprietary. © Solvantis Team.

## Author

**Fidaa Letaief** · [@fidaaltf58](https://github.com/fidaaltf58)
