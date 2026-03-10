# Solvantis Multi-Page Dashboard - Complete Feature Guide

## 🎯 Overview

The Solvantis dashboard is a **production-ready B2B SaaS application** with 6 main pages, intelligent anomaly detection, and comprehensive monitoring capabilities for solar installations.

---

## 📑 Table of Contents

1. [Dashboard Page](#dashboard-page)
2. [Alerts Page](#alerts-page)
3. [Reports Page](#reports-page)
4. [Analytics Page](#analytics-page)
5. [Sites Page](#sites-page)
6. [Settings Page](#settings-page)
7. [Navigation & Features](#navigation--features)

---

## Dashboard Page

### Overview
The main monitoring hub showing real-time data, weather conditions, detected anomalies, and performance metrics.

### Sections

#### 1. Live Monitoring KPIs
Four key metrics displayed prominently:

```
┌─────────────────────────────────────┐
│ Current Power (kW)                   │
│ 385 kW ↑ 12%                        │
│ [Sparkline Chart]                    │
└─────────────────────────────────────┘
```

- **Current Power**: Real-time system output
  - Value: 0-420 kW
  - Trend: % change vs previous period
  - Sparkline: 5-point trend visualization

- **Today Production**: Daily energy total
  - Value: 0-15,000 kWh
  - Tracks cumulative generation
  - Updates every 15 minutes

- **Efficiency**: System efficiency percentage
  - Value: 0-100%
  - Accounts for weather conditions
  - Shows current performance ratio

- **Active Alerts**: Count of open alerts
  - Value: 0-N
  - Only includes "open" status
  - Clickable to go to Alerts page

#### 2. Weather Impact Panel
Real-time environmental data:

```
┌──────────────┬──────────────┬──────────────┐
│ Temp: 35.2°C │ Clouds: 45%  │ Humidity: 65%│
├──────────────┼──────────────┼──────────────┤
│ Wind: 12 m/s │ UV Index: 6.2│ Rainfall: 0mm│
└──────────────┴──────────────┴──────────────┘
```

**Key Features:**
- Updates every 5 minutes
- Color-coded indicators
- Weather alert banner when conditions change
- Visual indicators for:
  - Thermometer (temperature)
  - Cloud (cloud cover)
  - Droplets (humidity)
  - Wind (wind speed)
  - Eye (visibility)
  - Sun (UV index)

**Impact Assessment:**
```
"Weather is currently affecting production.
 Anomaly detection adjusted accordingly."
```
Shows when clouds/rain are actively impacting output.

#### 3. Real-Time Power Output Chart
24-hour area chart with dual overlay:

```
[Chart Type: Area + Line Combination]
- Actual Power (Area, blue gradient)
- Expected Power (Line, orange dashed)
- Y-Axis: 0-450 kW
- X-Axis: 24 hours (00:00 - 23:00)
```

**Features:**
- Interactive tooltips
- Dual-axis comparison
- Shows gap between actual and expected
- Highlights anomalous periods
- Responsive to window resize

**What It Shows:**
- Morning ramp-up (6 AM - 9 AM)
- Peak production (10 AM - 3 PM)
- Afternoon decline (3 PM - 6 PM)
- Night-time zero (6 PM - 6 AM)
- Weather impact on curve

#### 4. Anomaly Detection Panel
AI-powered issue detection:

```
Status: ✓ Healthy
Detected Issues: 2

┌─ String Degradation ──────────────┐
│ Probability: 87%                   │
│ Severity: HIGH                     │
│ Cause: Expected 280kW, got 165kW   │
└────────────────────────────────────┘

┌─ Temperature Stress ──────────────┐
│ Probability: 72%                   │
│ Severity: MEDIUM                   │
│ Cause: Panel temp >50°C            │
└────────────────────────────────────┘
```

**Key Features:**
- System health status (Healthy/Warning/Critical)
- Animated pulse indicator
- Probability confidence bars
- Severity color-coding:
  - 🔴 HIGH (red)
  - 🟠 MEDIUM (orange)
  - 🟡 LOW (yellow)
- Root cause analysis
- Actionable insights

**Anomaly Types Detected:**
1. String Degradation
   - Loose connections
   - Physical damage
   - Partial shading
   - Cable faults

2. Inverter Drift
   - Calibration errors
   - Sensor malfunction
   - Parallel issues

3. Temperature Stress
   - High panel temperature
   - Inadequate cooling
   - Thermal degradation

4. Panel Soiling
   - Dust/dirt accumulation
   - Need for cleaning
   - Degraded light transmission

#### 5. Weekly Production Chart
Bar chart comparing actual vs expected:

```
Monday:   1,240 kWh (Actual) vs 1,200 kWh (Expected)
Tuesday:  1,420 kWh (Actual) vs 1,300 kWh (Expected)
Wednesday:  980 kWh (Actual) vs 1,350 kWh (Expected) ⚠️
Thursday: 1,580 kWh (Actual) vs 1,400 kWh (Expected)
Friday:   1,650 kWh (Actual) vs 1,380 kWh (Expected)
Saturday: 1,480 kWh (Actual) vs 1,320 kWh (Expected)
Sunday:   1,320 kWh (Actual) vs 1,250 kWh (Expected)
```

**Analysis:**
- Shows daily production trends
- Identifies underperforming days
- Color-coded bars (green = good, gray = below target)
- Tooltip details on hover

#### 6. Site Performance Comparison
Horizontal bar chart across all sites:

```
Site A: ████████████░░░░░ 92.4% Efficiency
Site B: ███████████░░░░░░░ 88.7% Efficiency
Site C: █████████████░░░░ 95.1% Efficiency ✓
```

**Metrics Compared:**
- Efficiency percentage
- System availability
- Production capacity

#### 7. Recent Alerts Panel
Quick overview of latest alerts:

```
[CRITICAL] Inverter Malfunction
Site B • 2 min ago
Inverter 3 stopped responding
Status: OPEN

[WARNING] Performance Drop
Site A • 15 min ago
Power 23% below expected (weather considered)
Status: OPEN

[INFO] Maintenance Scheduled
Site C • 1 hour ago
Panel cleaning scheduled
Status: ACKNOWLEDGED
```

**Interactive:**
- Click to view full alert details
- "View All →" link to Alerts page
- Color-coded by type
- Status badges

---

## Alerts Page

### Overview
Comprehensive alert management and monitoring system.

### Features

#### Alert Filtering
Quick filter buttons:

```
[All (5)] [Critical (2)] [Warning (2)] [Info (1)]
```

- Shows count for each type
- Click to filter view
- Real-time updates

#### Alert Types

**🔴 CRITICAL**
- Inverter malfunctions
- Complete string failures
- Critical safety issues
- **Action Required:** Immediate

**🟠 WARNING**
- Performance degradation
- High temperatures
- Minor equipment issues
- **Action Required:** Within hours

**🔵 INFO**
- Maintenance schedules
- System notifications
- Non-urgent updates
- **Action Required:** FYI

#### Alert Details

Each alert card shows:

```
┌─────────────────────────────────────────┐
│ [ICON] TITLE                            │
│                                         │
│ Full description of the alert           │
│                                         │
│ Site A • 15 min ago • HIGH Priority     │
│                  [Status: OPEN] [Details →] │
└─────────────────────────────────────────┘
```

**Information Displayed:**
- Alert title
- Full description
- Affected site
- Time (relative)
- Priority level
- Status (Open/Acknowledged/Resolved)
- Action buttons

#### Status Management

Three status options:

| Status | Color | Meaning |
|--------|-------|---------|
| Open | 🔴 Red | Requires attention |
| Acknowledged | 🟡 Yellow | Under investigation |
| Resolved | 🟢 Green | Issue fixed |

**Workflow:**
1. Alert Created → **Open**
2. Technician Reviews → **Acknowledged**
3. Issue Fixed → **Resolved**

#### Alert Details Button
Click "Details →" to see:
- Root cause analysis
- Recommended actions
- Historical context
- Related alerts
- Equipment logs

---

## Reports Page

### Overview
Generate and download performance reports.

### Report Types

#### 1. Daily Report
```
Date: Tuesday, Feb 11, 2024
Site: Site A
Generation: 8,420 kWh
Expected: 8,100 kWh
Performance: 104% of target
Weather: Sunny, 28°C avg
Issues: None
```

#### 2. Weekly Report
```
Period: Feb 5-11, 2024
Total Generation: 58,700 kWh
Average Daily: 8,386 kWh
Best Day: Friday (9,520 kWh)
Worst Day: Wednesday (6,850 kWh)
Weather Impact: 15% (3 cloudy days)
Uptime: 99.2%
```

#### 3. Monthly Report
```
Month: January 2024
Total Generation: 245,600 kWh
Target: 240,000 kWh
Performance: 102.3%
Available Irradiance: 118 kWh/m²
Performance Ratio: 92.4%
Efficiency Loss: 7.6%
  - Temperature: 3.2%
  - Soiling: 2.1%
  - Other: 2.3%
```

#### 4. Custom Report
Build your own with:
- Date range selection
- Metric selection
- Site selection
- Comparison options
- Chart types

### Monthly Performance Chart

```
[Bar Chart: Monthly Production]
Jan: 28,400 kWh (Actual) vs 29,000 kWh (Expected)
Feb: 26,200 kWh (Actual) vs 27,500 kWh (Expected)
Mar: 35,600 kWh (Actual) vs 36,000 kWh (Expected)
Apr: 38,900 kWh (Actual) vs 39,200 kWh (Expected)
May: 41,200 kWh (Actual) vs 40,800 kWh (Expected) ✓
Jun: 42,100 kWh (Actual) vs 41,500 kWh (Expected) ✓
```

### Performance Metrics Table

```
┌─────────────────────┬────────┬────────┬──────────┐
│ Metric              │ Value  │ Target │ Status   │
├─────────────────────┼────────┼────────┼──────────┤
│ System Availability │ 99.2%  │ 99.0%  │ ✓ Good   │
│ Performance Ratio   │ 92.4%  │ 90.0%  │ ✓ Good   │
│ Capacity Factor     │ 28.5%  │ 27.0%  │ ✓ Good   │
│ Efficiency Loss     │ 4.2%   │ 5.0%   │ ✓ Better │
└─────────────────────┴────────┴────────┴──────────┘
```

### Download Options

**Export Formats:**
- PDF (formatted report)
- CSV (raw data)
- Excel (with charts)
- JSON (API-ready)

**Email Delivery:**
- Schedule automatic reports
- Custom recipients
- Frequency (daily/weekly/monthly)

---

## Analytics Page

### Overview
Deep-dive analysis with advanced visualizations.

### Time Period Selection

```
[24h] [7 days] [30 days] [1 year]
```

- Quick preset filters
- Custom date range picker
- Real-time updates

### Weather vs Production Chart

```
[Composed Chart]
Primary Axis (Left): Cloud Cover (0-100%)
Secondary Axis (Right): Temperature (°C)
Time: 24 hours

Shows correlation between:
- Cloud cover and power output
- Temperature and efficiency
- Rainfall patterns
- Wind effects
```

**Insights:**
- Identifies weather-production relationships
- Shows real-world performance variations
- Validates model accuracy

### Efficiency Distribution Pie Chart

```
Distribution of Efficiency Percentages:

Excellent (>95%)........35%  🟢 Green
Good (90-95%)..........45%  🔵 Blue
Fair (85-90%)...........15%  🟡 Yellow
Poor (<85%).............5%   🔴 Red
```

**Interpretation:**
- Most time in "Good" range = Normal
- Increasing "Poor" = Equipment issue
- Seasonal "Fair" = Weather impact

### Power vs Temperature Scatter

```
[Scatter Chart]
X-Axis: Temperature (°C)
Y-Axis: Power Output (kW)

Shows individual data points:
- Higher temp = lower power (expected)
- Outliers indicate anomalies
- Trend line shows efficiency curve
```

**Analysis:**
- Temperature-efficiency relationship
- Identify efficiency losses
- Validate panel cooling
- Detect thermal issues

---

## Sites Page

### Overview
Manage and monitor all solar installations.

### Site Cards Grid

Each site displayed as interactive card:

```
┌─────────────────────────────┐
│ SITE A                   [Active] │
│ California, USA              │
│                              │
│ Capacity:      420 kW        │
│ Efficiency:    92.4%         │
│                              │
│ [View Details]               │
└─────────────────────────────┘
```

**Card Information:**
- Site name
- Location (city, state, country)
- Operational status
- Installed capacity
- Current efficiency
- Action button

### Site Status Badges

```
[Active] - Green - Operational
[Maintenance] - Yellow - Scheduled downtime
[Offline] - Red - Not operational
```

### Site Comparison

Click "View Details" to see:
- Detailed performance metrics
- Historical trends
- Maintenance history
- Equipment inventory
- Staff assignments
- Configuration settings

### Bulk Actions

```
[Maintenance Schedule] [Export Data] [Generate Report]
```

---

## Settings Page

### Overview
Configure account, notifications, and system preferences.

### Sections

#### 1. Profile Information

```
Full Name: John Doe
Email: john@example.com
Phone: +1 (555) 123-4567
Company: Solar Energy Corp
Role: Operations Manager

[Save Changes]
```

#### 2. Notification Settings

```
☑ Critical Alerts
  Get notified about critical issues

☑ Performance Reports
  Weekly performance summaries

☑ Maintenance Reminders
  Scheduled maintenance alerts

☑ Weather Alerts
  Severe weather notifications

☑ System Updates
  New feature announcements
```

#### 3. System Settings

**Theme Selection:**
- Dark Mode (default)
- Light Mode

**Language:**
- English
- Spanish
- French
- German

**Time Format:**
- 24-hour
- 12-hour

**Temperature Unit:**
- Celsius (default)
- Fahrenheit

#### 4. API Configuration

```
API Key: sk_live_51H8q2gX...
API Endpoint: https://api.solvantis.io/v1
Webhook URL: https://yoursite.com/webhook
Rate Limit: 1000 req/hour

[Generate New Key] [Revoke] [Copy]
```

#### 5. Danger Zone

```
🔴 DANGER ZONE

[Logout]
[Delete Account]
[Disable 2FA]
```

---

## Navigation & Features

### Header Navigation

**Logo/Home:**
- Click to return to dashboard
- Always accessible

**Site Selector:**
```
[Site A ▼]
```
- Switch between sites
- Filters all pages
- Remembers selection

**Notification Bell:**
```
🔔 [3] Active
```
- Red dot when alerts
- Hover to see count
- Click to go to Alerts page

**Theme Toggle:**
- Sun/Moon button
- Switches dark/light mode
- 300ms smooth transition

**User Profile:**
```
[JD] - User Avatar
```
- Gradient background
- Initials display
- Click for profile menu

### Sidebar Navigation

**Menu Items:**
```
🏠 Dashboard       ← Active
📍 Sites
🔔 Alerts
📊 Analytics
📄 Reports
⚙️ Settings
```

**Features:**
- Active state highlighting (blue border)
- Chevron indicator
- Smooth transitions
- Collapse on mobile

**Mobile Responsive:**
- Menu button (hamburger)
- Slide-out sidebar
- Full-width on collapse
- Touch-friendly

---

## Data Flow & Updates

### Real-Time Updates

**Dashboard Refresh:**
- Power data: Every 5 minutes
- Weather: Every 10 minutes
- Alerts: Real-time
- Anomalies: Every 15 minutes

**Alert Notifications:**
- Immediate popup
- Audio alert (configurable)
- Email notification (configurable)
- SMS for critical (configurable)

### Data Sources

1. **Inverter Telemetry**
   - Power output (kW)
   - Voltage (V)
   - Current (A)
   - Frequency (Hz)
   - Temperature (°C)

2. **Weather Station**
   - Temperature
   - Cloud cover
   - Humidity
   - Wind speed
   - Rainfall
   - UV index

3. **Sensors**
   - Panel temperature
   - Irradiance (W/m²)
   - Ambient temperature
   - Wind speed

4. **Historical Database**
   - Past production
   - Maintenance logs
   - Alert history
   - Performance metrics

---

## Performance Metrics

### Key Indicators

**System Availability:**
- Percentage of time system is operational
- Target: 99%+
- Tracked daily

**Performance Ratio:**
- Actual output / Expected output
- Industry standard metric
- Target: 75-85%

**Capacity Factor:**
- Actual output / Maximum theoretical
- Varies by location
- Target: 20-30%

**Efficiency Loss:**
- Temperature-related: 3-4%
- Soiling: 2-3%
- Other factors: 1-2%
- Total acceptable: <7%

---

## Alerts & Notifications

### Alert Severity Matrix

```
CRITICAL (Red)
├─ Inverter offline
├─ String failure
├─ Safety issue
└─ Revenue loss >50%

WARNING (Orange)
├─ Performance drop 20-50%
├─ High temperature
├─ Minor equipment issue
└─ Maintenance due

INFO (Blue)
├─ Scheduled maintenance
├─ Software update
├─ New feature available
└─ System message
```

### Alert Routing

```
On Alert Creation:
  ↓
Severity Assessment
  ↓
Critical → Immediate Notification
Warning → Queue for Review
Info → Log Only
  ↓
Dashboard Update
Sidebar Badge
Email/SMS (if enabled)
Alert Page Entry
```

---

## Export & Integration

### Data Export

**Supported Formats:**
- CSV (spreadsheet)
- JSON (API)
- PDF (formatted)
- Excel (with charts)

**Exportable Data:**
- Production metrics
- Alert history
- Anomaly reports
- Weather data
- Performance statistics

### API Integration

**Endpoints:**
```
GET /api/sites
GET /api/sites/{id}/production
GET /api/alerts
GET /api/weather/{id}
GET /api/analytics/{id}
POST /api/reports/generate
```

**Webhooks:**
- Alert notifications
- Daily summaries
- Weekly reports
- Monthly analysis

---

## Troubleshooting

### Dashboard Issues

**No Data Showing:**
- Check internet connection
- Verify API keys
- Check inverter status
- Refresh page (Ctrl+R)

**Slow Performance:**
- Clear browser cache
- Disable unused alerts
- Update browser
- Check connection speed

**Charts Not Rendering:**
- Update Recharts library
- Clear browser storage
- Try different browser
- Contact support

### Alerts Not Triggering

- Verify alert settings
- Check email filters
- Enable notifications
- Verify API connection
- Review anomaly thresholds

### Missing Data

- Check data source connectivity
- Verify sensor calibration
- Review network logs
- Check firewall settings

---

## Keyboard Shortcuts

```
Shortcut | Action
---------|--------
D        | Go to Dashboard
A        | Go to Alerts
R        | Go to Reports
S        | Go to Settings
T        | Toggle Dark/Light
/        | Focus search
ESC      | Close modals
```

---

## Best Practices

1. **Regular Monitoring**
   - Check dashboard daily
   - Review alerts promptly
   - Schedule regular reports

2. **Alert Management**
   - Acknowledge new alerts
   - Investigate root causes
   - Update remediation status

3. **Maintenance**
   - Schedule preventive maintenance
   - Clean panels seasonally
   - Service inverters annually

4. **Data Analysis**
   - Review monthly reports
   - Compare vs benchmarks
   - Identify trends early

---

## Support & Help

**Resources:**
- Help center: https://help.solvantis.io
- Documentation: https://docs.solvantis.io
- API docs: https://api.solvantis.io/docs
- Community: https://community.solvantis.io
- Email: support@solvantis.io
- Phone: +1 (555) SOLAR-TECH

---

**Version:** 2.0 - Multi-Page Edition  
**Last Updated:** February 2024  
**Status:** Production Ready
