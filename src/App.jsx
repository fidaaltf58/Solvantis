import React, { useState, useMemo, useEffect } from 'react';
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, ScatterChart, Scatter
} from 'recharts';
import {
  Sun, Bell, User, Menu, X, ChevronDown, TrendingUp, TrendingDown, AlertCircle,
  CheckCircle, Clock, Zap, Thermometer, Waves, Activity, BarChart3, Settings,
  FileText, MapPin, Search, ChevronRight, Cpu, Home, Cloud, CloudRain, Wind,
  Droplets, Eye, Gauge, Download, Filter, Calendar, ArrowRight, Lock, LogOut,
  Mail, Phone, Globe, Save, ExternalLink, AlertTriangle, Lightbulb, Battery
} from 'lucide-react';

const SolvantisApp = () => {
  const [isDark, setIsDark] = useState(true);
  const [selectedSite, setSelectedSite] = useState('Site A');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [dateRange, setDateRange] = useState('7days');

  // ==================== INTELLIGENT ANOMALY DETECTION ====================
  // Real-world data with time, weather, and conditions
  const generateRealisticDayData = (hour, cloudCover = 0.3, tempDelta = 0) => {
    // Solar radiation curve - peaks at noon
    const solarHours = hour >= 6 && hour <= 18;
    if (!solarHours) return 0;

    const baseRadiation = Math.sin((hour - 6) * Math.PI / 12) * 100;
    const cloudEffect = (1 - cloudCover);
    const power = Math.max(0, baseRadiation * cloudEffect * (1 - tempDelta / 100));
    return Math.round(power * 4.2); // Convert to kW (420kW system)
  };

  const calculateExpectedPower = (hour, weather) => {
    const cloudCover = weather[hour % 24].cloudCover / 100;
    const tempDelta = Math.max(0, weather[hour % 24].temp - 25) * 0.5;
    return generateRealisticDayData(hour, cloudCover, tempDelta);
  };

  // Mock weather data for next 24 hours
  const weatherData = useMemo(() => {
    const weather = [];
    for (let i = 0; i < 24; i++) {
      const isDay = i >= 6 && i <= 18;
      weather.push({
        hour: i,
        temp: isDay ? 20 + Math.sin((i - 6) * Math.PI / 12) * 15 : 15,
        cloudCover: Math.sin(i * 0.3) * 40 + 30, // 10-70% cloud cover variation
        humidity: 50 + Math.sin(i * 0.4) * 20,
        windSpeed: 10 + Math.sin(i * 0.2) * 5,
        uvIndex: isDay ? Math.sin((i - 6) * Math.PI / 12) * 8 : 0,
        rainfall: Math.random() < 0.1 ? Math.random() * 5 : 0
      });
    }
    return weather;
  }, []);

  // Intelligent anomaly detection algorithm
  const detectAnomalies = (actualPower, hour) => {
    const weather = weatherData[hour % 24];
    const expected = calculateExpectedPower(hour, weatherData);
    const efficiency = actualPower / expected > 0 ? (actualPower / expected) * 100 : 0;

    const anomalies = [];
    const isNight = hour < 6 || hour > 18;
    const isEarlyMorning = hour >= 6 && hour < 9;
    const isLatAfternoon = hour > 15 && hour <= 18;

    // 1. String Degradation Detection
    if (!isNight && efficiency < 75 && weather.cloudCover < 50 && weather.rainfall === 0) {
      const severity = efficiency < 50 ? 95 : efficiency < 65 ? 82 : 68;
      anomalies.push({
        id: 1,
        type: 'String Degradation',
        probability: severity,
        severity: severity > 80 ? 'high' : 'medium',
        cause: `Expected: ${expected}kW, Actual: ${actualPower}kW (Efficiency: ${efficiency.toFixed(1)}%)`
      });
    }

    // 2. Inverter Drift Detection (efficiency too high or unusual pattern)
    if (!isNight && efficiency > 105) {
      anomalies.push({
        id: 2,
        type: 'Inverter Drift',
        probability: 72,
        severity: 'medium',
        cause: `Unexpectedly high output. Check inverter calibration.`
      });
    }

    // 3. Temperature Anomaly (not just temp, but deviation from normal solar operation)
    if (!isNight && weather.temp > 50 && efficiency < 80) {
      anomalies.push({
        id: 3,
        type: 'Temperature Stress',
        probability: Math.min(85, 50 + (weather.temp - 50) * 3),
        severity: weather.temp > 55 ? 'high' : 'medium',
        cause: `Elevated panel temperature (${weather.temp.toFixed(1)}°C) reducing efficiency`
      });
    }

    // 4. Soiling Detection (efficiency low in clear weather)
    if (!isNight && weather.cloudCover < 30 && weather.rainfall === 0 && efficiency < 70) {
      anomalies.push({
        id: 4,
        type: 'Panel Soiling',
        probability: 78,
        severity: 'medium',
        cause: `Dust/dirt accumulation detected. Consider cleaning.`
      });
    }

    // 5. Weather Impact Analysis (NOT an anomaly, just context)
    const weatherContext = {
      cloudCover: weather.cloudCover,
      rainfall: weather.rainfall,
      windSpeed: weather.windSpeed,
      isAffectingProduction: weather.cloudCover > 60 || weather.rainfall > 0
    };

    return { anomalies, weatherContext, expected, actual: actualPower, efficiency };
  };

  // ==================== MOCK DATA GENERATION ====================
  const sites = [
    { id: 'A', name: 'Site A', location: 'California, USA', capacity: 420, status: 'Active', efficiency: 92.4 },
    { id: 'B', name: 'Site B', location: 'Arizona, USA', capacity: 380, status: 'Active', efficiency: 88.7 },
    { id: 'C', name: 'Site C', location: 'Texas, USA', capacity: 450, status: 'Maintenance', efficiency: 95.1 }
  ];

  const currentSite = sites.find(s => s.name === selectedSite);

  // Generate 24-hour realistic data
  const realtimePowerData = useMemo(() => {
    const now = new Date();
    const data = [];
    for (let i = 0; i < 24; i++) {
      const hour = (now.getHours() - 12 + i) % 24;
      const weather = weatherData[hour];
      const expected = calculateExpectedPower(hour, weatherData);
      // Add small noise to make it realistic but maintain pattern
      const actual = Math.max(0, expected * (0.95 + Math.random() * 0.1));
      
      data.push({
        time: `${String(hour).padStart(2, '0')}:00`,
        hour,
        power: Math.round(actual),
        expected: Math.round(expected),
        temp: Math.round(weather.temp * 10) / 10,
        cloudCover: Math.round(weather.cloudCover)
      });
    }
    return data;
  }, [weatherData]);

  // Calculate current anomalies
  const currentHour = new Date().getHours();
  const currentData = realtimePowerData[0];
  const { anomalies: detectedAnomalies, weatherContext, efficiency } = detectAnomalies(
    currentData.power,
    currentHour
  );

  const dailyProductionData = [
    { day: 'Mon', production: 1240, expected: 1200, weather: 'Sunny' },
    { day: 'Tue', production: 1420, expected: 1300, weather: 'Cloudy' },
    { day: 'Wed', production: 980, expected: 1350, weather: 'Rainy' },
    { day: 'Thu', production: 1580, expected: 1400, weather: 'Clear' },
    { day: 'Fri', production: 1650, expected: 1380, weather: 'Sunny' },
    { day: 'Sat', production: 1480, expected: 1320, weather: 'Partly Cloudy' },
    { day: 'Sun', production: 1320, expected: 1250, weather: 'Sunny' }
  ];

  const monthlyData = [
    { month: 'Jan', production: 28400, expected: 29000 },
    { month: 'Feb', production: 26200, expected: 27500 },
    { month: 'Mar', production: 35600, expected: 36000 },
    { month: 'Apr', production: 38900, expected: 39200 },
    { month: 'May', production: 41200, expected: 40800 },
    { month: 'Jun', production: 42100, expected: 41500 },
  ];

  const alerts = [
    { id: 1, type: 'critical', title: 'Inverter Malfunction', site: 'Site B', time: '2 min ago', desc: 'Inverter 3 stopped responding', status: 'open', severity: 'High' },
    { id: 2, type: 'warning', title: 'Performance Drop', site: 'Site A', time: '15 min ago', desc: 'Power output 23% below expected (weather considered)', status: 'open', severity: 'Medium' },
    { id: 3, type: 'warning', title: 'High Panel Temperature', site: currentSite.name, time: '1 hour ago', desc: 'Panel temp exceeded 55°C, efficiency reduced', status: 'acknowledged', severity: 'Medium' },
    { id: 4, type: 'info', title: 'Maintenance Scheduled', site: 'Site C', time: '3 hours ago', desc: 'Quarterly panel cleaning scheduled', status: 'acknowledged', severity: 'Low' },
    { id: 5, type: 'critical', title: 'String Fault Detected', site: 'Site A', time: '5 hours ago', desc: 'String 5 showing 22% efficiency loss', status: 'resolved', severity: 'High' }
  ];

  const performanceMetrics = [
    { metric: 'System Availability', value: 99.2, target: 99.0, status: 'exceeded' },
    { metric: 'Performance Ratio', value: 92.4, target: 90.0, status: 'exceeded' },
    { metric: 'Capacity Factor', value: 28.5, target: 27.0, status: 'exceeded' },
    { metric: 'Efficiency Loss', value: 4.2, target: 5.0, status: 'better' },
  ];

  const sitePerformanceData = [
    { site: 'Site A', efficiency: 92.4, availability: 99.2, production: 8420 },
    { site: 'Site B', efficiency: 88.7, availability: 98.5, production: 7850 },
    { site: 'Site C', efficiency: 95.1, availability: 99.8, production: 9120 }
  ];

  const weatherComparison = weatherData.map((w, i) => ({
    hour: i,
    temp: Math.round(w.temp * 10) / 10,
    cloudCover: Math.round(w.cloudCover),
    humidity: Math.round(w.humidity),
    windSpeed: Math.round(w.windSpeed * 10) / 10
  }));

  // ==================== COMPONENTS ====================
  const theme = {
    bg: isDark ? 'bg-slate-950' : 'bg-slate-50',
    card: isDark ? 'bg-slate-900' : 'bg-white',
    text: isDark ? 'text-slate-100' : 'text-slate-900',
    subtext: isDark ? 'text-slate-400' : 'text-slate-600',
    border: isDark ? 'border-slate-800' : 'border-slate-200',
    hover: isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100',
    input: isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-300'
  };

  const KPICard = ({ icon: Icon, label, value, unit, trend, sparkdata }) => (
    <div className={`${theme.card} rounded-xl p-6 border ${theme.border} transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col">
          <span className={`${theme.subtext} text-sm font-medium`}>{label}</span>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              {value}
            </span>
            <span className={`${theme.subtext} text-xs`}>{unit}</span>
          </div>
        </div>
        <div className={`p-3 rounded-lg ${isDark ? 'bg-blue-500/10' : 'bg-blue-100'}`}>
          <Icon className="w-5 h-5 text-blue-400" />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          {trend > 0 ? (
            <TrendingUp className="w-4 h-4 text-green-500" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-500" />
          )}
          <span className={trend > 0 ? 'text-green-500' : 'text-red-500'} style={{ fontSize: '0.75rem' }}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        </div>
        <ResponsiveContainer width="40%" height={30}>
          <LineChart data={sparkdata}>
            <Line type="monotone" dataKey="v" stroke="#06b6d4" dot={false} strokeWidth={2} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const AlertItem = ({ alert, onClick }) => {
    const typeColors = {
      critical: { bg: isDark ? 'bg-red-500/10' : 'bg-red-100', border: 'border-red-500/30', icon: 'text-red-500' },
      warning: { bg: isDark ? 'bg-orange-500/10' : 'bg-orange-100', border: 'border-orange-500/30', icon: 'text-orange-500' },
      info: { bg: isDark ? 'bg-blue-500/10' : 'bg-blue-100', border: 'border-blue-500/30', icon: 'text-blue-500' }
    };
    const colors = typeColors[alert.type];

    return (
      <div onClick={onClick} className={`${colors.bg} border ${colors.border} rounded-lg p-4 mb-3 transition-all duration-200 hover:shadow-md cursor-pointer`}>
        <div className="flex gap-3">
          <AlertCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${colors.icon}`} />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className={`font-semibold text-sm ${theme.text}`}>{alert.title}</h4>
                <p className={`${theme.subtext} text-xs mt-1`}>{alert.desc}</p>
                <div className="flex items-center gap-2 mt-2 text-xs">
                  <span className={`${theme.subtext}`}>{alert.site}</span>
                  <span className={`${theme.subtext}`}>{alert.time}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  alert.status === 'open' ? 'bg-red-500/20 text-red-400' :
                  alert.status === 'acknowledged' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  {alert.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AnomalyItem = ({ anomaly }) => (
    <div className={`${theme.card} border ${theme.border} rounded-lg p-4 mb-3 transition-all duration-200 hover:shadow-md`}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className={`font-semibold text-sm ${theme.text}`}>{anomaly.type}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              anomaly.severity === 'high' ? 'bg-red-500/20 text-red-400' :
              anomaly.severity === 'medium' ? 'bg-orange-500/20 text-orange-400' :
              'bg-yellow-500/20 text-yellow-400'
            }`}>
              {anomaly.severity}
            </span>
          </div>
          <p className={`${theme.subtext} text-xs mt-2`}>{anomaly.cause}</p>
        </div>
        <span className={`text-lg font-bold flex-shrink-0 ${
          anomaly.severity === 'high' ? 'text-red-400' :
          anomaly.severity === 'medium' ? 'text-orange-400' :
          'text-yellow-400'
        }`}>
          {anomaly.probability}%
        </span>
      </div>
      <div className={`w-full h-2 rounded-full ${isDark ? 'bg-slate-800' : 'bg-slate-200'} overflow-hidden`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            anomaly.severity === 'high' ? 'bg-gradient-to-r from-red-500 to-red-400' :
            anomaly.severity === 'medium' ? 'bg-gradient-to-r from-orange-500 to-orange-400' :
            'bg-gradient-to-r from-yellow-500 to-yellow-400'
          }`}
          style={{ width: `${anomaly.probability}%` }}
        />
      </div>
    </div>
  );

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`${theme.card} border ${theme.border} rounded-lg p-3 shadow-lg`}>
          {payload.map((entry, index) => (
            <p key={index} className={`${theme.text} text-xs font-semibold`} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const Header = () => (
    <div className={`${theme.card} border-b ${theme.border} sticky top-0 z-40 backdrop-blur`}>
      <div className="max-w-full mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className={`${theme.hover} p-2 rounded-lg transition-colors`}>
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('dashboard')}>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Sun className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Solvantis
              </span>
            </div>
          </div>

          <div className="flex-1 max-w-xs mx-12">
            <div className={`flex items-center gap-2 px-4 py-2.5 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-slate-100'} border ${theme.border}`}>
              <Search className="w-4 h-4 text-slate-500" />
              <select
                value={selectedSite}
                onChange={(e) => setSelectedSite(e.target.value)}
                className={`bg-transparent text-sm outline-none flex-1 ${theme.text} cursor-pointer`}
              >
                {sites.map(s => <option key={s.id}>{s.name}</option>)}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className={`relative p-2 rounded-lg ${theme.hover} transition-colors group`}>
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="absolute -top-8 right-0 px-2 py-1 rounded text-xs font-semibold bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {alerts.filter(a => a.status === 'open').length} Active
              </span>
            </button>

            <button onClick={() => setIsDark(!isDark)} className={`p-2 rounded-lg ${theme.hover} transition-colors`}>
              <div className="w-5 h-5 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400" />
            </button>

            <button className={`w-9 h-9 rounded-lg ${isDark ? 'bg-gradient-to-br from-blue-500 to-purple-600' : 'bg-gradient-to-br from-blue-400 to-purple-500'} flex items-center justify-center text-white font-bold text-sm hover:shadow-lg hover:shadow-purple-500/50 transition-all`}>
              JD
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const Sidebar = () => (
    <div className={`${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 overflow-hidden`}>
      <div className={`${theme.card} border-r ${theme.border} min-h-screen p-6 space-y-2 overflow-y-auto`}>
        {[
          { id: 'dashboard', icon: Home, label: 'Dashboard' },
          { id: 'sites', icon: MapPin, label: 'Sites' },
          { id: 'alerts', icon: AlertCircle, label: 'Alerts' },
          { id: 'analytics', icon: BarChart3, label: 'Analytics' },
          { id: 'reports', icon: FileText, label: 'Reports' },
          { id: 'settings', icon: Settings, label: 'Settings' }
        ].map((item) => (
          <button key={item.id} onClick={() => setCurrentPage(item.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
            currentPage === item.id
              ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30'
              : theme.hover
          }`}>
            <item.icon className={`w-5 h-5 ${currentPage === item.id ? 'text-blue-400' : theme.subtext}`} />
            <span className={`text-sm font-medium ${currentPage === item.id ? 'text-blue-400' : theme.text}`}>{item.label}</span>
            {currentPage === item.id && <ChevronRight className="w-4 h-4 ml-auto text-blue-400" />}
          </button>
        ))}
      </div>
    </div>
  );

  // ==================== PAGE COMPONENTS ====================
  const DashboardPage = () => (
    <div className="space-y-8">
      <div>
        <h2 className={`text-2xl font-bold ${theme.text} mb-4`}>Live Monitoring</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard icon={Zap} label="Current Power" value="385" unit="kW" trend={12} sparkdata={[{v: 12}, {v: 19}, {v: 8}, {v: 22}, {v: 15}]} />
          <KPICard icon={Sun} label="Today Production" value="8,420" unit="kWh" trend={8} sparkdata={[{v: 12}, {v: 19}, {v: 8}, {v: 22}, {v: 15}]} />
          <KPICard icon={Activity} label="Efficiency" value={efficiency.toFixed(1)} unit="%" trend={-2} sparkdata={[{v: 12}, {v: 19}, {v: 8}, {v: 22}, {v: 15}]} />
          <KPICard icon={AlertCircle} label="Active Alerts" value={alerts.filter(a => a.status === 'open').length} unit="" trend={5} sparkdata={[{v: 12}, {v: 19}, {v: 8}, {v: 22}, {v: 15}]} />
        </div>
      </div>

      {/* Weather Context */}
      <div className={`${theme.card} rounded-xl border ${theme.border} p-6 shadow-lg`}>
        <h3 className={`text-lg font-bold ${theme.text} mb-4`}>Current Weather Impact</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className={`p-4 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
            <div className="flex items-center gap-2 mb-2">
              <Thermometer className="w-4 h-4 text-orange-400" />
              <span className={`text-xs ${theme.subtext}`}>Temperature</span>
            </div>
            <span className={`text-lg font-bold ${theme.text}`}>{weatherData[currentHour].temp.toFixed(1)}°C</span>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
            <div className="flex items-center gap-2 mb-2">
              <Cloud className="w-4 h-4 text-blue-400" />
              <span className={`text-xs ${theme.subtext}`}>Cloud Cover</span>
            </div>
            <span className={`text-lg font-bold ${theme.text}`}>{weatherData[currentHour].cloudCover.toFixed(0)}%</span>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
            <div className="flex items-center gap-2 mb-2">
              <Droplets className="w-4 h-4 text-cyan-400" />
              <span className={`text-xs ${theme.subtext}`}>Humidity</span>
            </div>
            <span className={`text-lg font-bold ${theme.text}`}>{weatherData[currentHour].humidity.toFixed(0)}%</span>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
            <div className="flex items-center gap-2 mb-2">
              <Wind className="w-4 h-4 text-cyan-400" />
              <span className={`text-xs ${theme.subtext}`}>Wind Speed</span>
            </div>
            <span className={`text-lg font-bold ${theme.text}`}>{weatherData[currentHour].windSpeed.toFixed(1)} m/s</span>
          </div>
          <div className={`p-4 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
            <div className="flex items-center gap-2 mb-2">
              <Eye className="w-4 h-4 text-purple-400" />
              <span className={`text-xs ${theme.subtext}`}>UV Index</span>
            </div>
            <span className={`text-lg font-bold ${theme.text}`}>{weatherData[currentHour].uvIndex.toFixed(1)}</span>
          </div>
        </div>
        {weatherContext.isAffectingProduction && (
          <div className={`mt-4 p-3 rounded-lg ${isDark ? 'bg-yellow-500/10' : 'bg-yellow-100'} border border-yellow-500/30`}>
            <p className="text-yellow-400 text-sm font-medium flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              Weather is currently affecting production. Anomaly detection adjusted accordingly.
            </p>
          </div>
        )}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={`lg:col-span-2 ${theme.card} rounded-xl border ${theme.border} p-6 shadow-lg`}>
          <h3 className={`text-lg font-bold ${theme.text} mb-4`}>Real-Time Power Output (24h)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={realtimePowerData}>
              <defs>
                <linearGradient id="colorPower" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1e293b' : '#e2e8f0'} />
              <XAxis dataKey="time" stroke={isDark ? '#64748b' : '#94a3b8'} style={{ fontSize: '12px' }} />
              <YAxis stroke={isDark ? '#64748b' : '#94a3b8'} style={{ fontSize: '12px' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area type="monotone" dataKey="power" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorPower)" name="Actual Power" />
              <Line type="monotone" dataKey="expected" stroke="#f97316" strokeWidth={2} strokeDasharray="5 5" name="Expected Power" />
            </ComposedChart>
          </ResponsiveContainer>
          <p className={`${theme.subtext} text-xs mt-3`}>Expected power accounts for weather, time, and environmental conditions</p>
        </div>

        <div className={`${theme.card} rounded-xl border ${theme.border} p-6 shadow-lg`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Cpu className="w-5 h-5 text-blue-400" />
                <h3 className={`text-lg font-bold ${theme.text}`}>AI Detection</h3>
              </div>
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${isDark ? 'bg-green-500/10' : 'bg-green-100'} border border-green-500/30`}>
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-semibold text-green-400">Healthy</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className={`text-sm font-semibold ${theme.text} mb-3`}>Detected Issues</h4>
            {detectedAnomalies.length > 0 ? (
              detectedAnomalies.map(anomaly => (
                <AnomalyItem key={anomaly.id} anomaly={anomaly} />
              ))
            ) : (
              <p className={`${theme.subtext} text-sm text-center py-4`}>No anomalies detected. System operating normally.</p>
            )}
          </div>
        </div>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`${theme.card} rounded-xl border ${theme.border} p-6 shadow-lg`}>
          <h3 className={`text-lg font-bold ${theme.text} mb-4`}>Weekly Production vs Expected</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyProductionData}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1e293b' : '#e2e8f0'} />
              <XAxis dataKey="day" stroke={isDark ? '#64748b' : '#94a3b8'} style={{ fontSize: '12px' }} />
              <YAxis stroke={isDark ? '#64748b' : '#94a3b8'} style={{ fontSize: '12px' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="production" fill="#10b981" name="Actual" />
              <Bar dataKey="expected" fill="#3b82f6" opacity={0.6} name="Expected" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={`${theme.card} rounded-xl border ${theme.border} p-6 shadow-lg`}>
          <h3 className={`text-lg font-bold ${theme.text} mb-4`}>Site Performance Comparison</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sitePerformanceData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1e293b' : '#e2e8f0'} />
              <XAxis type="number" stroke={isDark ? '#64748b' : '#94a3b8'} style={{ fontSize: '12px' }} />
              <YAxis dataKey="site" type="category" stroke={isDark ? '#64748b' : '#94a3b8'} style={{ fontSize: '12px' }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="efficiency" fill="#3b82f6" name="Efficiency %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Alerts Preview */}
      <div className={`${theme.card} rounded-xl border ${theme.border} p-6 shadow-lg`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className={`text-lg font-bold ${theme.text}`}>Recent Alerts</h3>
          <button onClick={() => setCurrentPage('alerts')} className="text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors">
            View All →
          </button>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {alerts.slice(0, 3).map(alert => (
            <AlertItem key={alert.id} alert={alert} onClick={() => setCurrentPage('alerts')} />
          ))}
        </div>
      </div>
    </div>
  );

  const AlertsPage = () => (
    <div className="space-y-6">
      <div>
        <h2 className={`text-2xl font-bold ${theme.text} mb-2`}>System Alerts</h2>
        <p className={`${theme.subtext} text-sm`}>Manage and monitor all system notifications</p>
      </div>

      {/* Filter Bar */}
      <div className={`${theme.card} rounded-xl border ${theme.border} p-4 shadow-lg`}>
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-400 text-sm font-medium hover:bg-blue-500/30 transition-colors">
            <Filter className="w-4 h-4" />
            All ({alerts.length})
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-400 text-sm font-medium hover:bg-red-500/10 transition-colors">
            Critical ({alerts.filter(a => a.type === 'critical').length})
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-orange-400 text-sm font-medium hover:bg-orange-500/10 transition-colors">
            Warning ({alerts.filter(a => a.type === 'warning').length})
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-blue-400 text-sm font-medium hover:bg-blue-500/10 transition-colors">
            Info ({alerts.filter(a => a.type === 'info').length})
          </button>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {alerts.map(alert => (
          <div key={alert.id} className={`${theme.card} rounded-xl border ${theme.border} p-6 shadow-lg transition-all duration-200 hover:shadow-xl`}>
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-lg flex-shrink-0 ${
                alert.type === 'critical' ? 'bg-red-500/10' :
                alert.type === 'warning' ? 'bg-orange-500/10' :
                'bg-blue-500/10'
              }`}>
                <AlertCircle className={`w-5 h-5 ${
                  alert.type === 'critical' ? 'text-red-500' :
                  alert.type === 'warning' ? 'text-orange-500' :
                  'text-blue-500'
                }`} />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className={`font-bold ${theme.text}`}>{alert.title}</h3>
                    <p className={`${theme.subtext} text-sm mt-1`}>{alert.desc}</p>
                    <div className="flex items-center gap-4 mt-3 text-xs">
                      <span className={`${theme.subtext} flex items-center gap-1`}>
                        <MapPin className="w-3 h-3" /> {alert.site}
                      </span>
                      <span className={`${theme.subtext} flex items-center gap-1`}>
                        <Clock className="w-3 h-3" /> {alert.time}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        alert.severity === 'High' ? 'bg-red-500/20 text-red-400' :
                        alert.severity === 'Medium' ? 'bg-orange-500/20 text-orange-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {alert.severity} Priority
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <span className={`text-xs px-3 py-1.5 rounded-full font-semibold ${
                      alert.status === 'open' ? 'bg-red-500/20 text-red-400' :
                      alert.status === 'acknowledged' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                    </span>
                    <button className="text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors">
                      Details →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ReportsPage = () => (
    <div className="space-y-6">
      <div>
        <h2 className={`text-2xl font-bold ${theme.text} mb-2`}>Reports</h2>
        <p className={`${theme.subtext} text-sm`}>Generate and view performance reports</p>
      </div>

      {/* Report Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Daily Report', icon: Calendar, desc: 'Production summary' },
          { title: 'Weekly Report', icon: BarChart3, desc: 'Performance trends' },
          { title: 'Monthly Report', icon: FileText, desc: 'Detailed analysis' },
          { title: 'Custom Report', icon: Settings, desc: 'Build your own' }
        ].map((report, i) => (
          <div key={i} className={`${theme.card} rounded-xl border ${theme.border} p-6 cursor-pointer hover:shadow-lg transition-all duration-200`}>
            <div className={`w-10 h-10 rounded-lg ${isDark ? 'bg-blue-500/10' : 'bg-blue-100'} flex items-center justify-center mb-3`}>
              <report.icon className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className={`font-bold ${theme.text}`}>{report.title}</h3>
            <p className={`${theme.subtext} text-sm mt-1`}>{report.desc}</p>
          </div>
        ))}
      </div>

      {/* Sample Report */}
      <div className={`${theme.card} rounded-xl border ${theme.border} p-6 shadow-lg`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className={`text-lg font-bold ${theme.text}`}>Monthly Performance Report</h3>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors text-sm font-medium">
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1e293b' : '#e2e8f0'} />
            <XAxis dataKey="month" stroke={isDark ? '#64748b' : '#94a3b8'} />
            <YAxis stroke={isDark ? '#64748b' : '#94a3b8'} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="production" fill="#10b981" name="Actual Production" />
            <Bar dataKey="expected" fill="#3b82f6" opacity={0.6} name="Expected" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Performance Metrics */}
      <div className={`${theme.card} rounded-xl border ${theme.border} p-6 shadow-lg`}>
        <h3 className={`text-lg font-bold ${theme.text} mb-4`}>Performance Metrics</h3>
        <div className="space-y-3">
          {performanceMetrics.map((m, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-800/50 transition-colors">
              <span className={`font-medium ${theme.text}`}>{m.metric}</span>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className={`font-bold ${theme.text}`}>{m.value}</span>
                  <span className={`${theme.subtext} text-xs ml-2`}>Target: {m.target}</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  m.status === 'exceeded' ? 'bg-green-500/20 text-green-400' :
                  'bg-blue-500/20 text-blue-400'
                }`}>
                  {m.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const AnalyticsPage = () => (
    <div className="space-y-6">
      <div>
        <h2 className={`text-2xl font-bold ${theme.text} mb-2`}>Analytics</h2>
        <p className={`${theme.subtext} text-sm`}>Detailed performance analysis and insights</p>
      </div>

      {/* Period Selector */}
      <div className={`${theme.card} rounded-xl border ${theme.border} p-4 shadow-lg`}>
        <div className="flex gap-2">
          {['24h', '7days', '30days', '1year'].map(period => (
            <button key={period} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              dateRange === period
                ? 'bg-blue-500/20 border border-blue-500/30 text-blue-400'
                : `${theme.hover} ${theme.text}`
            }`} onClick={() => setDateRange(period)}>
              {period === '24h' ? '24 Hours' : period === '7days' ? '7 Days' : period === '30days' ? '30 Days' : '1 Year'}
            </button>
          ))}
        </div>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`${theme.card} rounded-xl border ${theme.border} p-6 shadow-lg`}>
          <h3 className={`text-lg font-bold ${theme.text} mb-4`}>Weather vs Production</h3>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={weatherComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1e293b' : '#e2e8f0'} />
              <XAxis dataKey="hour" stroke={isDark ? '#64748b' : '#94a3b8'} />
              <YAxis yAxisId="left" stroke={isDark ? '#64748b' : '#94a3b8'} />
              <YAxis yAxisId="right" orientation="right" stroke={isDark ? '#64748b' : '#94a3b8'} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar yAxisId="left" dataKey="cloudCover" fill="#3b82f6" opacity={0.7} name="Cloud Cover %" />
              <Line yAxisId="right" type="monotone" dataKey="temp" stroke="#f97316" strokeWidth={2} name="Temperature °C" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className={`${theme.card} rounded-xl border ${theme.border} p-6 shadow-lg`}>
          <h3 className={`text-lg font-bold ${theme.text} mb-4`}>Efficiency Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={[
                { name: 'Excellent (>95%)', value: 35, color: '#10b981' },
                { name: 'Good (90-95%)', value: 45, color: '#3b82f6' },
                { name: 'Fair (85-90%)', value: 15, color: '#f59e0b' },
                { name: 'Poor (<85%)', value: 5, color: '#ef4444' }
              ]} cx="50%" cy="50%" labelLine={false} label={(e) => `${e.name}: ${e.value}%`} dataKey="value">
                {[
                  <Cell key="1" fill="#10b981" />,
                  <Cell key="2" fill="#3b82f6" />,
                  <Cell key="3" fill="#f59e0b" />,
                  <Cell key="4" fill="#ef4444" />
                ]}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={`${theme.card} rounded-xl border ${theme.border} p-6 shadow-lg`}>
        <h3 className={`text-lg font-bold ${theme.text} mb-4`}>Power Output vs Temperature Scatter</h3>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1e293b' : '#e2e8f0'} />
            <XAxis dataKey="temp" name="Temperature (°C)" stroke={isDark ? '#64748b' : '#94a3b8'} />
            <YAxis dataKey="power" name="Power (kW)" stroke={isDark ? '#64748b' : '#94a3b8'} />
            <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name="Power Output" data={realtimePowerData.map(d => ({ temp: d.temp, power: d.power }))} fill="#06b6d4" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const SitesPage = () => (
    <div className="space-y-6">
      <div>
        <h2 className={`text-2xl font-bold ${theme.text} mb-2`}>Manage Sites</h2>
        <p className={`${theme.subtext} text-sm`}>Monitor and manage all solar installations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sites.map(site => (
          <div key={site.id} className={`${theme.card} rounded-xl border ${theme.border} p-6 shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer`} onClick={() => setSelectedSite(site.name)}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className={`text-lg font-bold ${theme.text}`}>{site.name}</h3>
                <p className={`${theme.subtext} text-sm flex items-center gap-1 mt-1`}>
                  <MapPin className="w-4 h-4" /> {site.location}
                </p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                site.status === 'Active' 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-yellow-500/20 text-yellow-400'
              }`}>
                {site.status}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`${theme.subtext} text-sm`}>Capacity</span>
                <span className={`font-bold ${theme.text}`}>{site.capacity} kW</span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`${theme.subtext} text-sm`}>Efficiency</span>
                <span className={`font-bold text-green-400`}>{site.efficiency}%</span>
              </div>
              <button className="w-full mt-4 px-4 py-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                <ExternalLink className="w-4 h-4" />
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const SettingsPage = () => (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className={`text-2xl font-bold ${theme.text} mb-2`}>Settings</h2>
        <p className={`${theme.subtext} text-sm`}>Manage your account and preferences</p>
      </div>

      {/* Profile Settings */}
      <div className={`${theme.card} rounded-xl border ${theme.border} p-6 shadow-lg`}>
        <h3 className={`text-lg font-bold ${theme.text} mb-4`}>Profile Information</h3>
        <div className="space-y-4">
          <div>
            <label className={`${theme.subtext} text-sm font-medium block mb-2`}>Full Name</label>
            <input type="text" defaultValue="John Doe" className={`w-full px-4 py-2 rounded-lg border ${theme.input} text-sm`} />
          </div>
          <div>
            <label className={`${theme.subtext} text-sm font-medium block mb-2`}>Email</label>
            <input type="email" defaultValue="john@example.com" className={`w-full px-4 py-2 rounded-lg border ${theme.input} text-sm`} />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors font-medium">
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>

      {/* Notification Settings */}
      <div className={`${theme.card} rounded-xl border ${theme.border} p-6 shadow-lg`}>
        <h3 className={`text-lg font-bold ${theme.text} mb-4`}>Notifications</h3>
        <div className="space-y-3">
          {[
            { label: 'Critical Alerts', desc: 'Get notified about critical issues' },
            { label: 'Performance Reports', desc: 'Weekly performance summaries' },
            { label: 'Maintenance Reminders', desc: 'Scheduled maintenance alerts' }
          ].map((notif, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-800/50 transition-colors">
              <div>
                <p className={`font-medium ${theme.text}`}>{notif.label}</p>
                <p className={`${theme.subtext} text-sm`}>{notif.desc}</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 cursor-pointer" />
            </div>
          ))}
        </div>
      </div>

      {/* System Settings */}
      <div className={`${theme.card} rounded-xl border ${theme.border} p-6 shadow-lg`}>
        <h3 className={`text-lg font-bold ${theme.text} mb-4`}>System Settings</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-800/50 transition-colors">
            <span className={`font-medium ${theme.text}`}>Theme</span>
            <button onClick={() => setIsDark(!isDark)} className="text-blue-400 hover:text-blue-300 font-medium text-sm">
              {isDark ? 'Dark Mode' : 'Light Mode'}
            </button>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-800/50 transition-colors">
            <span className={`font-medium ${theme.text}`}>Language</span>
            <select className={`px-3 py-1 rounded-lg border ${theme.input} text-sm`}>
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className={`${theme.card} rounded-xl border border-red-500/30 p-6 shadow-lg`}>
        <h3 className={`text-lg font-bold text-red-400 mb-4`}>Danger Zone</h3>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors font-medium">
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className={`${theme.bg} min-h-screen transition-colors duration-300`}>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-8 space-y-8 max-w-7xl mx-auto w-full overflow-y-auto">
          {currentPage === 'dashboard' && <DashboardPage />}
          {currentPage === 'alerts' && <AlertsPage />}
          {currentPage === 'reports' && <ReportsPage />}
          {currentPage === 'analytics' && <AnalyticsPage />}
          {currentPage === 'sites' && <SitesPage />}
          {currentPage === 'settings' && <SettingsPage />}
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${isDark ? '#475569' : '#cbd5e1'};
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${isDark ? '#64748b' : '#94a3b8'};
        }
      `}</style>
    </div>
  );
};

export default SolvantisApp;
